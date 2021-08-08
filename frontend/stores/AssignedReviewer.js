import { makeObservable, action, observable } from 'mobx'
import { Store } from './Store'

const initialState = {
  data: [],
  reviewer_review: []
}

export class AssignedReviewer extends Store {

  static key = 'assigned_reviewer';

  constructor() {
    super(AssignedReviewer.key);
    Object.assign(this, initialState);
    makeObservable(this, {
      data: observable,
      reviewer_review: observable,
      getReviewerReview: action,
      getAssignedReviewer: action,
      getAssignedReviewerById: action,
      createAssignedReviewer: action,
      updateAssignedReviewer: action,
      updateReviewerReview: action,
      getReviewerReview: action,
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
      await this.getAssignedReviewer()
    }
  }

  createAssignedReviewer = async (payload = {}) => {
    const { data } = await this.api.post('assigned_reviewer', payload)
    this.data = [data, ...this.data]
    return data
  }

  updateAssignedReviewer = async (id, payload = {}) => {
    const { data } = await this.api.patch(`assigned_reviewer/${id}`, payload)
    this.data = this.data.map((ar) => {
      if (ar.id === data.id) {
        return data
      }
      return ar
    })
    return data
  }

  getAssignedReviewer = async () => {
    if (!this.data.length) {
      const { data } = await this.api.get('assigned_reviewer')
      this.data = data
    }
    return this.data
  }

  getReviewerReviewById = async (id) => {
    const { data } = await this.api.get(`assigned_reviewer/${id}/get_reviewer_review`)
    return data
  }

  updateReviewerReview = async (id, payload = {}) => {
    const { data } = await this.api.patch(`assigned_reviewer/${id}/update_reviewer_review`, payload)
    this.reviewer_review = this.reviewer_review.map((rr) => {
      if (rr.id === data.id) {
        return data
      }
      return rr
    })
    return data
  }

  getReviewerReview = async () => {
    if (!this.reviewer_review.length) {
      const { data } = await this.api.get('assigned_reviewer/get_reviewer_reviews')
      this.reviewer_review = data
    }
    return this.reviewer_review
  }

  getAssignedReviewerById = async (id=null, params={}) => {
    if (!id) return null
    const { data } = await this.api.get(`assigned_reviewer/${id}`, params)
    return data
  }

  reset = () => {
    Object.assign(this, initialState);
  }
}

