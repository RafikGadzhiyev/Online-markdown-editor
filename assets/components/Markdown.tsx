// Libraries and frameworks
import React, { ChangeEvent } from 'react';
import ReactMarkdown from "react-markdown";
import styled from "styled-components"
// HighLight
import { PrismLight as SyntaxHighLighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp'
import rangeParser from 'parse-numeric-range'
import { atomDark as darkTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
// Types
import type { File, IState } from '../../pages';
import type { RootState } from '../redux/store';
// Actions
import { updateFile } from './../redux/slices/FileActions.slice'
// Components
import { Block } from "./Block";
import { CreateFileModal } from './CreateFileModal';
import { NoFilesModal } from './NoFIlesModal';

// Local styled components
const MainContainer = styled.main`
    display: flex;
    width: 100%;
    min-height: 867px;
    position: relative;
    background-color: #15161a;
`;


const MarkDownWrapper = styled.div`
    height: 820px;
    display: flex;
    align-items: stretch;
`

const PreviewWrapper = styled.div`
    color: white;
    padding: .5rem 1rem;
`;

const MarkDownField = styled.textarea`
    all: unset;
    padding: .5rem 1rem;
    width: 100%;
    resize: none;
`

const PreviewViewer = styled.pre`
    word-break: break-all;
    white-space: pre-wrap;

    a{
        text-decoration: underline;

        &:hover{
            color: #ccc;
        }

    }

    ul,ol{
        padding-left: 1.5rem;
    }

    code{
        background: #2C2D30;
        padding: .5rem 1rem;
        display: block;
        margin-block: 1rem;
    }

`

// Local Interface
interface IProps extends React.PropsWithChildren {
    setIsCreateFileModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isCreateFileModalOpen: boolean,
    fileState: File | null,
    setFileState: React.Dispatch<React.SetStateAction<File | null>>
}

// Registering markdwon styles 
SyntaxHighLighter.registerLanguage('tsx', tsx)
SyntaxHighLighter.registerLanguage('typescript', typescript)
SyntaxHighLighter.registerLanguage('scss', scss)
SyntaxHighLighter.registerLanguage('json', json)
SyntaxHighLighter.registerLanguage('markdown', markdown)
SyntaxHighLighter.registerLanguage('c++', cpp)

export const MarkDown: React.FC<IProps> = ({ setIsCreateFileModalOpen, isCreateFileModalOpen, fileState, setFileState }) => {
    const store: RootState = useSelector((store: RootState) => store);
    const dispatch: React.Dispatch<any> = useDispatch();

    // Creating hightlight data object 
    const MarkdownComponents: object = {
        code({ node, inline, className, ...props }: any) {
            const syntaxTheme = darkTheme;
            const match = /language-(\w+)/.exec(className || '')
            const hasMeta = node?.data?.meta

            const applyHighlights: object = (applyHighlights: number) => {
                if (hasMeta) {
                    const RE = /{([\d,-]+)}/
                    const metadata = node.data.meta?.replace(/\s/g, '')
                    const strlineNumbers = RE?.test(metadata)
                        ? (RE?.exec(metadata) || ['', ''])[1]
                        : '0'
                    const highlightLines = rangeParser(strlineNumbers)
                    const highlight = highlightLines
                    const data: string = highlight.includes(applyHighlights)
                        ? 'highlight'
                        : ''
                    return { data }
                } else {
                    return {}
                }
            }
            return match ? (
                <SyntaxHighLighter
                    style={syntaxTheme}
                    language={match[1]}
                    PreTag="div"
                    className="codeStyle"
                    showLineNumbers={true}
                    wrapLines={hasMeta ? true : false}
                    useInlineStyles={true}
                    lineProps={applyHighlights}
                    {...props}
                />
            ) : (
                <code className={className} {...props} />
            )
        },
    }

    const changeState = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const element: HTMLTextAreaElement = e.target as HTMLTextAreaElement;
        if (store.fileSlice.data.currentFile && fileState) {
            setFileState(() => ({
                ...fileState,
                content: element.value
            }))
        }
    }

    const keyPressedHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        let key: string = e.key;
        if (key === 'Tab') {
            e.preventDefault();
            if (store.fileSlice.data.currentFile && fileState) {
                let selectionStart = e.target.selectionStart,
                    selectionEnd = e.target.selectionEnd;
                const newState: File = {
                    ...fileState,
                    content: fileState.content.substring(0, selectionStart) + '\t' + fileState.content.substring(selectionEnd)
                }
                setFileState(() => newState)
            }
            return;
        }
        if (key === 's' && e.ctrlKey) {
            if (fileState) {
                e.preventDefault();
                dispatch(updateFile({ id: store.fileSlice.data.currentFile, content: fileState.content }))
                alert("Saved");
                return false;
            }
        }
    }

    React.useEffect(() => {
        for (let file of store.fileSlice.data.files) {
            if (file.id === store.fileSlice.data.currentFile) {
                setFileState(() => file);
            }
        }
    }, [store.fileSlice.data.currentFile, store.fileSlice.data.files, setFileState])



    return <MainContainer>
        {
            store.fileSlice.data.files.length === 0 && !isCreateFileModalOpen &&
            <NoFilesModal
                setIsModalOpen={setIsCreateFileModalOpen}
            />
        }
        {
            isCreateFileModalOpen &&
            <CreateFileModal
                setIsOpen={setIsCreateFileModalOpen}
            />
        }
        {
            store.fileSlice.data.currentFile && fileState &&
            <>
                <Block
                    name="Markdown"
                >
                    <MarkDownWrapper>
                        <MarkDownField
                            value={fileState.content}
                            onChange={(e) => changeState(e)}
                            onKeyDown={(e) => keyPressedHandler(e)}
                        />
                    </MarkDownWrapper>
                </Block>
                {
                    fileState.name.split('.')[1] === 'md' &&
                    <Block
                        name="Preview"
                    >
                        <PreviewWrapper>
                            <PreviewViewer>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={MarkdownComponents}
                                >
                                    {
                                        fileState.content
                                    }
                                </ReactMarkdown>
                            </PreviewViewer>
                        </PreviewWrapper>
                    </Block>
                }
            </>
        }

    </MainContainer>
}
