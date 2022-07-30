import React from 'react';
import styled from 'styled-components';

const CreateFileBtn = styled.button`
    width: 100%;
    max-width: 400px;
    height: 50px;
    border-radius: 5px;
    background-color:#2C2D30;
    padding: .5rem;
    text-align: center;
    transition: 300ms ease;

    &:hover{
        background-color: #333;
    }

`

interface IProps extends React.PropsWithChildren {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateFileButton: React.FC<IProps> = ({ setIsModalOpen, setIsOpen }) => {

    const openCreateFileModal = () => {
        setIsModalOpen(() => true);
        if (setIsOpen) {
            setIsOpen(() => false);
        }
    }

    return <CreateFileBtn onClick={() => openCreateFileModal()}>Create <i className="bi bi-plus-lg"></i></CreateFileBtn>
}