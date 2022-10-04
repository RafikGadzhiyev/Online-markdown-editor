// Libraries and frameworks
import React from 'react';
import styled from 'styled-components'
// Components
import { BlockName } from '../elements/BlockName';

// Local Interfaces
interface IProps extends React.PropsWithChildren {
    name: string
}

// Local styled components
const BlockContainer = styled.div`
    background-color: #15161a;
    height: 867px;
    width: 100%;
    word-break: break;
    color: #838488;
    position: relative;
    overflow: auto;

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