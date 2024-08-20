import React , { useState } from 'react';
import styled from 'styled-components';

let ComponentContainer = styled.div`
    min-height:         100px;
    max-height:         fit-content;
    min-width:          100%;
    max-width:          100%;
    background-color:   #818282;
    box-sizing:         border-box;
    padding:            2rem;
    border-radius:      1rem;
    display:            flex;
    flex-direction:     column;
    gap:                1rem;
`

let Tab = styled.div`
    background-color:   white;
    width:              100%;
    text-align:         center;
    padding:            1rem;
    border-bottom:      0.5rem solid ${(props) => (props.selected ? 'darkblue' : 'transparent')};
    cursor:             pointer;
    background-color:   #6da3d2;
    font-size:          large;
    font-weight:        bold;
    color:              darkblue;
`

let Tabs = styled.div`
    display:            flex;
    width:              100%;
`


const UserTest = () => 
{
    let [ selectedTab , setSelectedTab ] = useState('LOGIN');

    const changeSelectedTab = (tab) =>
    {
        setSelectedTab(tab);
    }

    return (
      <ComponentContainer>
          <h1>User Test</h1>
          <Tabs>
              <Tab onClick={() => changeSelectedTab('LOGIN')} selected={selectedTab === 'LOGIN'}>Login</Tab>
              <Tab onClick={() => changeSelectedTab('REGISTER')} selected={selectedTab === 'REGISTER'}>Register</Tab>
          </Tabs>
      </ComponentContainer>
    )
}

export default UserTest