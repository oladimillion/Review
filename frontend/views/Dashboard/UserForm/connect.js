import { compose } from 'lodash/fp'
import { 
  withCustomRouter,
  withAccount,
  withData,
  withModes,
} from '../../../hoc'

export const connect = compose(
  withCustomRouter,
  withModes,
  withAccount,
  withData(async (props) => {
    const { accountStore, getParams } = props
    const { getUserById } = accountStore
    const id = getParams('id')
    let initialValues = {}
    if (id) {
      initialValues = await getUserById(id)
    }
    return { initialValues }
  }),
)
