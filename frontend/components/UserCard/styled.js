import styled from 'styled-components'
import { FlexBox } from '@oladimillion/react-form'

export const Card = styled.div.attrs(() => ({
  className: 'Card'
}))`
  border-radius: 5px;
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  transition: all 0.5s ease-in-out;
  margin-right: 2rem;
  margin-bottom: 2rem;
  margin-top: 1rem;

  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;

  padding: 1.5rem;
  width: 300px;
  height: 200px;
`

const linkStyle = `
  border-radius: 5px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  min-height: auto;
  position: relative;
  margin-right: 5px;
  margin-bottom: 5px;
  color: #fff;
  border: 0px;
  cursor: pointer;

  &:hover {
    outline: none;
    text-decoration: none;
  }
`

export const DeleteButton = styled.button`
  ${linkStyle};
  background: linear-gradient(-135deg, #899FD4 0%, #A389D4 100%);
`

export const UpdateButton = styled.button`
  ${linkStyle};
  background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
`

export const StatusButton = styled.button`
  ${linkStyle};
  background: linear-gradient(-135deg,#21ba45 0%,#185025 100%);
  pointer-events: none;
  align-self: right;
  margin-bottom: 1rem;
`

export const Label = styled.label`
  color: ${({ mutedText }) => mutedText ? '#6c757d' : '#111'};
  font-weight: 400;
  font-size: 1.1rem;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  text-transform: ${({ lowercase, uppercase, capitalize }) => {
    if (uppercase) return 'uppercase'
    if (capitalize) return 'capitalize'
    if (lowercase) return 'lowercase'
    return 'inherit'
  }}
`

export const FlexRow = styled(FlexBox).attrs(() => ({
  className: 'FlexRow',
}))``

export const FlexColumn = styled(FlexBox).attrs(() => ({
  className: 'FlexColumn',
  flexDirection: 'column',
}))``

