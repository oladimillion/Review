import { makeObservable, action, observable, runInAction } from 'mobx'
import { Store } from './Store'

const initialState = {
  data: [],
}


export class PerformanceReview extends Store {

  static key = 'performance_review';

  constructor() {
    super(PerformanceReview.key);
    Object.assign(this, initialState);
    makeObservable(this, {
      data: observable,
      getPerformanceReviews: action,
      getPerformanceReviewById: action,
      createPerformanceReview: action,
      updatePerformanceReview: action,
      reset: action,
    });
  }

  get api() {
    return this.getStore('api')
  }

  get accountStore() {
    return this.getStore('account')
  }

  load = async () => {
    if (this.accountStore.isAdmin) {
      await this.getPerformanceReviews()
    }
  }

  createPerformanceReview = async (payload = {}) => {
    const { data } = await this.api.post('performance_review', payload)
    this.data = [data, ...this.data]
    return data
  }

  updatePerformanceReview = async (id, payload = {}) => {
    const { data } = await this.api.patch(`performance_review/${id}`, payload)
    this.data = this.data.map((pr) => {
      if (pr.id === data.id) {
        return data
      }
      return pr
    })
    return data
  }

  getPerformanceReviews = async () => {
    if (!this.data.length) {
      const { data } = await this.api.get('performance_review')
      runInAction(() => {
        this.data = data
      })
    }
    return this.data
  }

  getPerformanceReviewById = async (id=null, params={}) => {
    if (!id) return null
    const { data } = await this.api.get(`performance_review/${id}`, params)
    return data
  }

  reset = () => {
    Object.assign(this, initialState);
  }
}

