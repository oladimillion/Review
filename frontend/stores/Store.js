import { toJS } from 'mobx'
import { toJS as deepToJS } from '../helpers'

const memo = {}

export class Store {

  constructor(key) {
    memo[key] = this
  }

  get api () {
    return this.getStore('api')
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

  deepToJS = (data=this) => deepToJS(data) 

  toJS = (data=this) => toJS(data) 

  reset = () => null
}
