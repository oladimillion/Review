import React from 'react'; 
import { connect } from './connect'
import { List } from '../../../components/List'

const AssignedReviewerList = (props) => {
  const { isAdmin, data } = props
  return (
    <List 
      canCreate={isAdmin}
      createLabel={'Assign a Reviewer'}
      createRoute={'/assigned_reviewers/create'}
      data={data}
    />
  )
};

export default connect(AssignedReviewerList)

