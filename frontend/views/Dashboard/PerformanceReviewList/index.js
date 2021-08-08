import React from 'react'; 
import { connect } from './connect'
import { List } from '../../../components/List'

const PerformanceReviewList = (props) => {

  const { performanceReviewStore, accountStore } = props
  const data = performanceReviewStore.data.map((data) => ({ 
      ...data,
      employee: data?.member_detail?.name,
      status: 'Performance',
      route: `/performance_reviews/${data.id}/update`,
    }))

  return (
    <List 
      canCreate={accountStore.isAdmin}
      createLabel={'Add Employee Performance'}
      createRoute={'/performance_reviews/create'}
      data={data}
    />
  )
};

export default connect(PerformanceReviewList)

