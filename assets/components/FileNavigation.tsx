// Libraries and framewords
import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import { v4 as uuid4 } from 'uuid';
// Hooks
import { useDispatch, useSelector } from 'react-redux';
// Components and elements
import { CreateFileButton } from '../elements/CreateFileButton';
// Types
import type { File } from '../../pages';
import type { RootState } from '../redux/store';
// Actions
import { selectFile } from './../redux/slices/FileActions.slice';

// Components customg Attributes
type FileNavigationContainerAttributes = {
    isOpen: boolean;
}

// Local styled components
const CloseButton = styled.button`
    align-self: flex-end;
    font-size: 1.5rem;
`;

const FileNavigationContainer: StyledComponent<'nav', any, FileNavigationContainerAttributes, never> = styled.nav`
    width: 100%;
    height: 100%;
    background-color: ${(props: FileNavigationContainerAttributes) => props.isOpen ? '#000a' : 'transparent'};
    position: absolute;
    transition: 300ms ease;
    z-index: ${(props: FileNavigationContainerAttributes) => props.isOpen ? 100 : -100}

`;

const FileNavigationWrapper: StyledComponent<'div', any, FileNavigationContainerAttributes, never> = styled.div`
    width: 350px;
    height: 100%;
    display: flex;
    padding: .5rem 1rem;
    flex-direction: column;
    gap: 1rem;
    color: white;
    background: #35383E;
    transition: 300ms ease;
    transform: translateX(${(props: FileNavigationContainerAttributes) => props.isOpen ? '0' : "-100%"})
`;

const FilesList = styled.ul`
    list-style: none;
`;
const File = styled.li`
    &:not(:last-of-type){
        margin-bottom: 1rem;
    }
`;
const ChooseFileButton: StyledComponent<'button', any, { 'data-fileid': string }, never> = styled.button`
    padding: .5rem 1rem;
    border: 1px solid transparent;
    transition: 300ms ease;
    width: 100%;

    &:hover,
    &.chosen{
        border-color: white
    }

`;

interface IProps extends React.PropsWithChildren {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export const FileNavigation: React.FC<IProps> = ({
    isOpen,
    setIsOpen,
    setIsModalOpen
}) => {
    const store: RootState = useSelector((store: RootState) => store);
    const dispatch: React.Dispatch<any> = useDispatch();

    const CloseHandler = (e: React.SyntheticEvent) => {
        const element: HTMLElement = e.target as HTMLElement;
        if (element.tagName !== 'NAV') return;
        setIsOpen(() => false);
    }

    const chooseFile = (e: React.SyntheticEvent) => {
        const element: HTMLButtonElement = e.target as HTMLButtonElement;

        for (let file of store.fileSlice.data.files) {
            if (file.id === element.dataset.fileid) {
                dispatch(selectFile(file.id))
            }
        }

    }

    return <FileNavigationContainer
        isOpen={isOpen}
        onClick={(e) => CloseHandler(e)}
    >
        <FileNavigationWrapper
            isOpen={isOpen}
        >
            <CloseButton
                onClick={() => setIsOpen(() => false)}
            >
                <i className="bi bi-x-lg"></i>
            </CloseButton>
            <FilesList>
                {
                    store.fileSlice.data.files.map((e: File) => <File
                        key={uuid4()}
                    >
                        <ChooseFileButton
                            data-fileid={e.id}
                            onClick={(e) => chooseFile(e)}
                            className={store.fileSlice.data.currentFile === e.id ? 'chosen' : ''}
                        >
                            {e.name}
                        </ChooseFileButton>
                    </File>)
                }
            </FilesList>
            <CreateFileButton
                setIsModalOpen={setIsModalOpen}
                setIsOpen={setIsOpen}
            />
        </FileNavigationWrapper>
    </FileNavigationContainer>
}