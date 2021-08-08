import { observable, makeObservable, action, runInAction } from "mobx"
import { Store } from './Store'

const initialState = {
  self: null,
  isAdmin: false,
  users: []
}

export class Account extends Store {

  static key = 'account'

  constructor() {
    super(Account.key)
    Object.assign(this, initialState)
    makeObservable(this, {
      self: observable,
      isAdmin: observable,
      users: observable,
      reset: action,
      signin: action,
      getSelf: action,
      getUsers: action,
      deleteUser: action,
      addUser: action,
      updateUser: action,
    })
  }

  get api() {
    return this.getStore('api')
  }

  get name() {
    return this.self?.name
  }

  load = async () => {
    await this.getSelf()
  }

  setPassword = async (payload) => {
    const { data } = await this.api.post('member/set_password', payload)
    return data
  }

  getUserById = async (id) => {
    const { data } = await this.api.get(`member/${id}/get_user`)
    return data
  }

  addUser = async (payload) => {
    const { data } = await this.api.post('member/add_user', payload)
    this.users = [data, ...this.users]
    return data
  }

  updateUser = async (id, payload = {}) => {
    const { data } = await this.api.patch(`member/${id}/update_user`, payload)
    this.users = this.users.map((user) => {
      if (user.id === data.id) {
        return data
      }
      return user
    })
    return data
  }

  signin = async (payload) => {
    const { data } = await this.api.post('member/signin', payload)
    return data
  }

  checkCredential = async (payload) => {
    const { data } = await this.api.post('member/credential_check', payload)
    return data
  }

  deleteUser = async (id) => {
    await this.api.delete(`member/${id}/delete_user`)
    runInAction(() => {
      this.users = this.users.filter((user) => {
        return user.id !== id
      })
    })
    return id
  }

  getUsers = async () => {
    if (!this.users.length) {
      const { data } = await this.api.get('member/get_users')
      runInAction(() => {
        this.users = data
      })
    }
    return this.users
  }

  getSelf = async () => {
    if (!this.self) {
      const { data } = await this.api.get('member/get_self')
      runInAction(() => {
        this.self = data
        this.isAdmin = data.member_type === 'A'
      })
    }
  }

  logout = () => {
    localStorage.removeItem('token')
    this.resetStores()
  }

  reset = () => {
    Object.assign(this, initialState);
  }
}

