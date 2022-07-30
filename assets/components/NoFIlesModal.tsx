import { CreateFileButton } from "../elements/CreateFileButton"
import styled from 'styled-components';
import React from "react";

const CreateFileModalContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 100%;
    background-color: #000c;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
    gap: 2rem;
    left: 0;
`;
const CreateFileModalIcon = styled.i`
    font-size: 10rem;
`;
const CreateFileModalText = styled.span`
    font-size: 1.5rem;
`;

interface IProps extends React.PropsWithChildren {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const NoFilesModal: React.FC<IProps> = ({ setIsModalOpen }) => {
    return <CreateFileModalContainer>
        <CreateFileModalIcon className="bi bi-emoji-frown" />
        <CreateFileModalText>To start just create a new emptry .MD file</CreateFileModalText>
        <CreateFileButton
            setIsModalOpen={setIsModalOpen}
        />
    </CreateFileModalContainer>
}