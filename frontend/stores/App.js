import { makeObservable, action } from 'mobx'
import { Store } from './Store'
import { sweetAlert } from '../helpers'


const initialState = {}

export class App extends Store {

  static key = 'app'

  constructor() {
    super(App.key)
    Object.assign(this, initialState)
    makeObservable(this, {
      reset: action,
      setDialog: action,
    })
  }

  setDialog = (dialogProps = {}) => {
    sweetAlert(dialogProps)
  }

  reset = () => {
    Object.assign(this, initialState)
  }
}

