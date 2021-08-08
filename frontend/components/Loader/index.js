import React from 'react'
import styled from 'styled-components'
import { Loader as BaseLoader } from 'semantic-ui-react'
import { FlexBox } from '@oladimillion/react-form'

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
`

export const Loader = () => (
  <Wrapper>
    <BaseLoader active />
  </Wrapper>
)
