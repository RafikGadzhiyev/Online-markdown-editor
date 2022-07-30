import React, { ChangeEvent } from 'react';
import ReactMarkdown from "react-markdown";
import { useSelector } from 'react-redux';
import remarkGfm from 'remark-gfm';
import styled from "styled-components"
import { Files, IState } from '../../pages';
import { ReduxStore } from '../redux/StoreType';
import { Block } from "./Block";
import { CreateFileModal } from './CreateFileModal';
import { NoFilesModal } from './NoFIlesModal';

const MainContainer = styled.main`
    display: flex;
    width: 100vw;
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
    padding: .5rem 2.5rem;
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
`


interface IProps extends React.PropsWithChildren {
    files: IState,
    setIsCreateFileModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isCreateFileModalOpen: boolean,
    fileState: Files | null,
    setFileState: React.Dispatch<React.SetStateAction<Files | null>>
}

export const MarkDown: React.FC<IProps> = ({ files, setIsCreateFileModalOpen, isCreateFileModalOpen, fileState, setFileState }) => {
    const store: ReduxStore = useSelector((store: ReduxStore) => store);

    const changeState = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const element: HTMLTextAreaElement = e.target as HTMLTextAreaElement;
        if (store.currentFile && fileState) {
            const newState: Files = {
                ...fileState,
                content: element.value
            }
            setFileState(() => newState)
        }
    }

    const keyPressedHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        let key: string = e.key;
        if (key === 'Tab') {
            e.preventDefault();
            if (store.currentFile && fileState) {
                const newState: Files = {
                    ...fileState,
                    content: fileState.content + '\t'
                }
                setFileState(() => newState)
            }
            return;
        }
    }

    React.useEffect(() => {
        for (let file of store.files) {
            if (file.id === store.currentFile) {
                setFileState(() => file);
            }
        }
    }, [store.currentFile, store.files, setFileState])

    return <MainContainer>
        {
            files.files.length === 0 && !isCreateFileModalOpen &&
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
            store.currentFile && fileState &&
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