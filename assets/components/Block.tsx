import React from 'react';
import { BlockName } from '../elements/BlockName';
import styled from 'styled-components'

interface IProps extends React.PropsWithChildren {
    name: string
}

const BlockContainer = styled.div`
    background-color: #15161a;
    height: 867px;
    color: #838488;

    &:not(:last-of-type){
        border-right: 2px solid #35383e;
    }

`;

export const Block: React.FC<IProps> = ({ name, children }) => {
    return <BlockContainer>
        <BlockName
            name={name}
        />
        {
            children
        }
    </BlockContainer>
}