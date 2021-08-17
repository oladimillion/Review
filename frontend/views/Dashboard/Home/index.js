import React from 'react'; 
import { connect } from './connect'
import { List } from '../../../components/List'

const Home = (props) => {
  const { data, isAdmin } = props
  return (
    <List 
      canCreate={isAdmin}
      createLabel={'Add User'}
      createRoute={'/user/create'}
      data={data}
    />
  )
};

export default connect(Home)

