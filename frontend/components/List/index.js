import React from 'react'; 
import { Text } from '@oladimillion/react-form'
import { UserCard } from '../UserCard'
import { 
  StyledFlexBox, 
  NoItemFound,
  CreateLink,
} from './styled'
import { isEmptyValue } from '../../helpers/isEmptyValue'
import { connect } from './connect'


export const View = (props) => {
  const {
    canCreate,
    accountStore,
    createLabel,
    createRoute,
    data,
  } = props

  return (
    <>
      <Text as='h3' mb={0}>Welcome {accountStore.name}</Text>
      {canCreate && (
        <CreateLink to={createRoute}>
          {createLabel}
          <CreateLink.Icon />
        </CreateLink>
      )}
      {isEmptyValue(data) && (
        <NoItemFound as='h2'>
          Nothing to display
        </NoItemFound>
      )}
      <StyledFlexBox>
        {data.map((data) => (
          <UserCard 
            key={data.id}
            {...data}
          />
        ))}
      </StyledFlexBox>
    </>
  )
}

View.defaultProps = {
  data: [],
  canCreate: false,
  createRoute: null,
  createLabel: null,
}

export const List = connect(View)

