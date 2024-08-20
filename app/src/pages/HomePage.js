import React from 'react';
import styled from 'styled-components';

import UserTest from '../components/Spec/UserTest';

const PageContainer = styled.div`
    min-height:         100vh;
    max-height:         fit-content;
    min-width:          100vw;
    max-width:          100vw;
    display:            flex;
    flex-direction:     column;
    background-color:   #212212;
    padding:            4rem;
    box-sizing:         border-box;
`

const HomePage = () =>
{
    return (
        <PageContainer>
            <UserTest />
        </PageContainer>
    )
}

export default HomePage