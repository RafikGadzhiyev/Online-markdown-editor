import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import styled from "styled-components"
import { Block } from "./Block";

const MainContainer = styled.main`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

export const MarkDown: React.FC = () => {
    const [state, setState] = React.useState<string>('');

    return <MainContainer>
        <Block
            name="Markdown"
        >
            <MarkDownWrapper>
                <MarkDownField
                    value={state}
                    onChange={(e) => setState(() => e.target.value)}
                />
            </MarkDownWrapper>
        </Block>
        <Block
            name="Preview"
        >
            <PreviewWrapper>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                >
                    {
                        state
                    }
                </ReactMarkdown>
            </PreviewWrapper>
        </Block>
    </MainContainer>
}