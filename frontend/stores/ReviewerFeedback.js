import { makeObservable, action, observable, runInAction } from 'mobx'
import { Store } from './Store'

const initialState = {
  data: [],
}

export class ReviewerFeedback extends Store {

  static key = 'reviewer_feedback';

  constructor() {
    super(ReviewerFeedback.key);
    Object.assign(this, initialState);
    makeObservable(this, {
      data: observable,
      getReviewerFeedbacks: action,
      getReviewerFeedbackById: action,
      createReviewerFeedback: action,
      updateReviewerFeedback: action,
      reset: action,
    });
  }

  get api() {
    return this.getStore('api')
  }

  load = async () => {
    await this.getReviewerFeedbacks()
  }

  createReviewerFeedback = async (payload = {}) => {
    const { data } = await this.api.post('reviewer_feedback', payload)
    this.data = [data, ...this.data]
    return data
  }

  updateReviewerFeedback = async (id, payload = {}) => {
    const { data } = await this.api.patch(`reviewer_feedback/${id}`, payload)
    this.data = this.data.map((pr) => {
      if (pr.id === data.id) {
        return data
      }
      return pr
    })
    return data
  }

  getReviewerFeedbacks = async () => {
    if (!this.data.length) {
      runInAction(() => {
        const { data } = await this.api.get('reviewer_feedback')
        this.data = data
      })
    }
  }

  getReviewerFeedbackById = async (id=null, params={}) => {
    if (!id) return null
    const { data } = await this.api.get(`reviewer_feedback/${id}`, params)
    return data
  }

  reset = () => {
    Object.assign(this, initialState);
  }
}

