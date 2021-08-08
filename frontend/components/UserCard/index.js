import React from 'react'; 
import { FlexBox } from '@oladimillion/react-form'
import { connect } from './connect'
import {
  Card,
  UpdateButton,
  DeleteButton,
  Label,
  FlexColumn,
  StatusButton,
} from './styled'

const View = (props) => {

  const { 
    id, 
    employee, 
    reviewer,
    status,
    route,
    handleDelete,
    deletable,
    gotoRoute, 
    appStore: { setDialog },
    actionLabel,
  } = props

  const onDelete = () => {
    setDialog({
      title: `Are you sure?`,
      actions: [
        {
          label: 'Yes',
          onClick: handleDelete,
        }
      ],
      closeOnClickOutside: true,
      closeOnEsc: true,
    })
  }

  return (
    <Card>
      <FlexColumn flex={2}>
        <FlexBox >
          <StatusButton>
            {status}
          </StatusButton>
        </FlexBox>
        {employee && (
          <FlexBox 
            justifyContent='space-between'
            flexWrap='wrap'
          >
            <Label mutedText>Employee: </Label>
            <Label capitalize>{employee}</Label>
          </FlexBox>
        )}
        {reviewer && (
          <FlexBox 
            justifyContent='space-between'
            flexWrap='wrap'
          >
            <Label mutedText>Reviewer: </Label>
            <Label capitalize>{reviewer}</Label>
          </FlexBox>
        )}
      </FlexColumn>
      <FlexBox justifyContent='space-around' flex={1}>
        <FlexBox>
          {deletable && (
            <DeleteButton 
              onClick={onDelete}
            >
              Delete
            </DeleteButton>
          )}
          <UpdateButton
            onClick={() => gotoRoute(route)}
          >
            {actionLabel}
          </UpdateButton>
        </FlexBox>
      </FlexBox>
    </Card>
  )
}

View.defaultProps = {
  deletable: false,
  handleDelete: () => {},
  employee: null,
  reviewer: null,
  actionLabel: 'Update',
}

export const UserCard = connect(View)

