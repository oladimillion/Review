import React from 'react'; 
import { connect } from './connect'
import { List } from '../../../components/List'

const AssignedReviewerList = (props) => {

  const { assignedReviewerStore, accountStore } = props
  const { isAdmin } = accountStore
  const data = isAdmin
    ? assignedReviewerStore.data.map((data) => ({ 
        ...data,
        employee: data.performance_review_detail.member_detail.name,
        reviewer: data?.reviewer_detail?.name,
        status: 'Employee',
        route: `/assigned_reviewers/${data.id}`,
        actionLabel: 'View',
      }))
    : assignedReviewerStore.reviewer_review
      .map(({ id, performance_review_detail }) => ({
        id,
        employee: performance_review_detail.member_detail.name,
        status: 'Review',
        route: `/assigned_reviewers/${id}`,
        actionLabel: 'View',
      }))

  return (
    <List 
      canCreate={accountStore.isAdmin}
      createLabel={'Assign a Reviewer'}
      createRoute={'/assigned_reviewers/create'}
      data={data}
    />
  )
};

export default connect(AssignedReviewerList)

