// Libraries and frameworks
import React from 'react';
import styled from 'styled-components';
import { v4 as uuid4 } from 'uuid';
// Hooks
import { useDispatch } from 'react-redux';
// Types
import type { File } from '../../pages';
// Actions
import { createFile, selectFile } from './../redux/slices/FileActions.slice'

// Local styled components

const CreateFileModalContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
`;
const CreateFileModalWrapper = styled.div`
    background-color: #35383E;
    border-radius: 5px;
    width: 500px;
    height: 350px;
    padding: 1rem;
    color: white;
`  ;

const FieldLabel = styled.label`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;
const Field = styled.input`
    border-radius: 5px;
    height: 30px;
    border: 1px solid ;
    outline: none;
    background: transparent;
    color: white;
    text-indent: .5rem;
`;
const ExtensionsList = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .5rem;
    margin-top: 1rem;
`;
const Extension = styled.li``;
const ChooseExtensionButton = styled.button`
    width: 100px;
    height: 70px;
    border-radius: 10px;
    background-color: #2C2D30;
    text-align: center;
    transition: 300ms ease;

    &:hover{
        background-color: #333;
    }

    &.chosen{
        background-color: #444;
    }

`;

const ButtonsContainer = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1rem;
`

const CloseButton = styled.button`
    padding: .5rem 1rem;
    background-color: #af0000;
    border-radius: 5px;
    transition: 300ms ease;

    &:hover{
        background-color: #9f0000;
    }

`;
const CreateButton = styled.button`
    padding: .5rem 1rem;
    background-color: #00af00;
    border-radius: 5px;
    transition: 300ms ease;

    &:hover{
        background-color: #009f00;
    }

`;

interface IProps extends React.PropsWithChildren {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export const CreateFileModal: React.FC<IProps> = ({ setIsOpen }) => {
    const dispatch: React.Dispatch<any> = useDispatch();
    const EXTENSIONS: readonly string[] = ["MD", "TXT"] as const;
    const [fileState, setFileState] = React.useState<{ filename: string, extension: string }>({
        filename: '',
        extension: ''
    })

    const createFileHandler = () => {
        if (fileState.extension === '' || fileState.filename === '') return;

        const NEW_FILE_ID = uuid4();

        const newFile: File = {
            name: fileState.filename + '.' + fileState.extension,
            content: '',
            createdAt: new Date(Date.now()),
            lastChanges: new Date(Date.now()),
            id: NEW_FILE_ID
        }

        dispatch(createFile(newFile));
        dispatch(selectFile(NEW_FILE_ID))

        setIsOpen(() => false)
    }


    return <CreateFileModalContainer>
        <CreateFileModalWrapper>
            <FieldLabel>
                Filename
                <Field
                    type='text'
                    value={fileState.filename}
                    onChange={(e) => setFileState((prev) => ({ ...prev, filename: e.target.value }))}
                />
            </FieldLabel>
            <span>Choose file extension</span>
            <ExtensionsList>
                {
                    EXTENSIONS.map((e, i) => <Extension
                        key={uuid4()}
                    >
                        <ChooseExtensionButton
                            onClick={() => setFileState((prev) => ({ ...prev, extension: e.toLowerCase() }))}
                            className={fileState.extension === e.toLowerCase() ? 'chosen' : ''}
                        >
                            {e}
                        </ChooseExtensionButton>
                    </Extension>)
                }

            </ExtensionsList>
            <ButtonsContainer>
                <CloseButton
                    onClick={() => setIsOpen(() => false)}
                >Cancel</CloseButton>
                <CreateButton
                    onClick={() => createFileHandler()}
                >Create</CreateButton>
            </ButtonsContainer>
        </CreateFileModalWrapper>
    </CreateFileModalContainer>
}