import React from 'react';
import styled from 'styled-components'

interface IProps extends React.PropsWithChildren {
    name: string
}

const BlockNameContainer = styled.div`
    background-color: #1e1f22;
    padding: .5rem 1rem;
    word-break: break-all;
    position: sticky;
    width: 100%;
    top: 0;
`;

export const BlockName: React.FC<IProps> = ({ name }) => {
    return <BlockNameContainer>
        <h3>{name}</h3>

    </BlockNameContainer>
}
