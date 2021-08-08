import axios from 'axios'
import { makeObservable, action } from 'mobx'
import { Store } from './Store'

const initialState = {}

export class Api extends Store {

  static key = 'api';

  constructor() {
    super(Api.key);
    Object.assign(this, initialState)
    makeObservable(this, {
      reset: action,
    })
  }

  get baseURL() {
    return 'http://127.0.0.1:8000'
  }

  get token() {
    const token = localStorage.getItem('token')
    return token ? `Bearer ${token}` : null
  }

  axios = (args = {}) => {
    return axios({
      ...args,
      baseURL: this.baseURL,
      url: `/api/v1/${args.url}`,
      ...(this.token && { headers: { 'Authorization': this.token } }),
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
    })
  }

  get = (url, params={}, method='get') => {
    return this.axios({ method, url, params })
  }

  delete = (url) => this.get(url, {}, 'delete')

  post = (url, data={}, method='post') => {
    return this.axios({ method, url, data })
  }

  put = (...args) => this.post(...args,'put')

  patch = (...args) => this.post(...args, 'patch')

  reset = () => {
    Object.assign(this, initialState);
  }
}

