import React from 'react'; 
import { connect } from './connect'
import { List } from '../../../components/List'

const PerformanceReviewList = (props) => {
  const { data, isAdmin } = props
  return (
    <List 
      canCreate={isAdmin}
      createLabel={'Add Employee Performance'}
      createRoute={'/performance_reviews/create'}
      data={data}
    />
  )
};

export default connect(PerformanceReviewList)

