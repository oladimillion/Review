import { toJS } from 'mobx'

const memo = {}

export class Store {

  constructor(key) {
    memo[key] = this
  }

  static getStore = (key) => memo[key]

  getStore = (key) =>  {
    return Store.getStore(key)
  }

  static getAllStore = () => memo

  static resetStores = (stores = memo) => {
    Object.values(stores).forEach((store) => {
      store.reset()
    })
  }

  resetStores = (stores = memo) => {
    Store.resetStores(stores)
  }

  _toJS = (data) => toJS(data)

  reset = () => null
}
