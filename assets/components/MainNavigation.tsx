import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.header`
    width: 100%;
    height: 3.5rem;
    background-color: #2c2d30;
    color: #fff;
    padding: 0 1rem 0 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: center;
`;
const NavigationLeftSideContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    gap: 1rem;
`;
const NavigationRightSideContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding: .5rem 0;
`;
const OpenMenuButton = styled.button`
    font-size: 2rem;
    height: 3.5rem;
    width: 3.5rem;
    background-color: #35383e;
    text-align: center;
`;
const AppName = styled.span`
    margin-right: 1rem;
    position: relative;
    text-transform: uppercase;
    letter-spacing: .25rem;

    &::after{
        content: '';
        width: 2px;
        height: 200%;
        position: absolute;
        background-color: #35383e;
        right: -1rem;
        top: -50%;
    }

`;
const DocumentDataContainer = styled.div`
    display: flex;
    gap: .5rem;
    align-items: center;
`
const DocumentDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const DocumentNameText = styled.span`
    font-size: .6rem;
    color: #a4a6a9;
`;
const DocumentName = styled.span``;
const DeleteButton = styled.button``;
const SaveButton = styled.button`
    display: flex;
    align-items: center;
    gap: .5rem;
`;


export const MainNavigation: React.FC = () => {
    return <NavigationContainer>
        <NavigationLeftSideContainer>
            <OpenMenuButton>
                <i className="bi bi-list"></i>
            </OpenMenuButton>
            <AppName>MarkDown</AppName>
            <DocumentDataContainer>
                <i className="bi bi-file-earmark"></i>
                <DocumentDataWrapper>
                    <DocumentNameText>Document name</DocumentNameText>
                    <DocumentName>Document.md</DocumentName>
                </DocumentDataWrapper>
            </DocumentDataContainer>
        </NavigationLeftSideContainer>
        <NavigationRightSideContainer>
            <DeleteButton>
                <i className="bi bi-trash"></i>
            </DeleteButton>
            <SaveButton>
                <i className="bi bi-hdd"></i>
                Save changes</SaveButton>
        </NavigationRightSideContainer>
    </NavigationContainer>
}