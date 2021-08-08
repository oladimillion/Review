import React from 'react';
import { SideBar } from './SideBar'
import { FlexBox } from '@oladimillion/react-form'
import { Header } from './Header'
import { Routes } from './Routes'
import { Wrapper } from '../../components/commonStyles'
import { connect } from './connect'


export const Dashboard = connect((props) => {
  return (
    <FlexBox>
      <SideBar />
      <FlexBox 
        flexDirection='column'
        flex={1}
      >
        <Header />
        <Wrapper>
          <Routes />
        </Wrapper>
      </FlexBox>
    </FlexBox>
  )
});

export { Dashboard as default };
