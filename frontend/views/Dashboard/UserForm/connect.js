import { compose } from 'lodash/fp'
import { 
  withAccount,
  withData,
  withModes,
} from '../../../hoc'

export const connect = compose(
  withModes,
  withAccount,
  withData(async (props) => {
    const { accountStore, getParams } = props
    const { addUser, updateUser, getUserById } = accountStore
    const id = getParams('id')
    let initialValues = {}
    if (id) {
      initialValues = await getUserById(id)
    }
    return { initialValues, addUser, updateUser }
  }),
)
