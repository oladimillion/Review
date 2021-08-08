import React from 'react'; 
import { connect } from './connect'
import { List } from '../../../components/List'

const Home = (props) => {

  const { accountStore, assignedReviewerStore } = props
  const { users, isAdmin, deleteUser, self } = accountStore
  const { reviewer_review } = assignedReviewerStore

  const data = isAdmin 
    ? users.map((data) => ({ 
        ...data,
        employee: data.name,
        status: 'Employee',
        route: `/user/${data.id}/update`,
        deletable: true,
        handleDelete: () => deleteUser(data.id),
      }))
    : reviewer_review.map(({ id, performance_review_detail }) => ({
        id,
        employee: performance_review_detail.member_detail.name,
        status: 'Employee',
        route: `/assigned_reviewers/${id}/update`,
        actionLabel: 'Review',
      }))

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

