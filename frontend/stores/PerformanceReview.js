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
      createPerformanceReview: action,
      getPerformanceReviews: action,
      getPerformanceReviewById: action,
      updatePerformanceReview: action,
      reset: action,
    });
  }

  get accountStore() {
    return this.getStore('account')
  }

  load = async () => {
    // We need to call Account.load() before calling this.load()
    if (this.accountStore.isAdmin) {
      await this.getPerformanceReviews()
    }
  }

  createPerformanceReview = async (payload = {}) => {
    const { data } = await this.api.post('performance_reviews', payload)
    this.data = [data, ...this.data]
    return data
  }

  updatePerformanceReview = async (id, payload = {}) => {
    const { data } = await this.api.patch(`performance_reviews/${id}`, payload)
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
      const { data } = await this.api.get('performance_reviews')
      runInAction(() => {
        this.data = data
      })
    }
    return this.data
  }

  getPerformanceReviewById = async (id=null, params={}) => {
    if (!id) return null
    const { data } = await this.api.get(`performance_reviews/${id}`, params)
    return data
  }

  reset = () => {
    Object.assign(this, initialState);
  }
}

