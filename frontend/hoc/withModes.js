import { compose } from 'lodash/fp'
import { modes } from '../helpers'
import { 
  withCustomRouter,
} from './withCustomRouter'
import { 
  withData,
} from './withData'

export const withModes = compose(
  withCustomRouter,
  withData((props) => {
    const { getMode } = props
    const mode = getMode()
    const createOnly = mode === modes.create
    const updateOnly = mode === modes.update
    const readOnly = mode === modes.read
    const readOrUpdate = readOnly || updateOnly

    return { 
      updateOnly, 
      readOnly, 
      readOrUpdate, 
      createOnly,
      mode,
      modes,
    }
  }),
)
