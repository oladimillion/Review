import { makeObservable, action, observable, runInAction } from 'mobx'
import { Store } from './Store'

const initialState = {
  data: [],
  reviewerReviews: []
}

export class AssignedReviewer extends Store {

  static key = 'assigned_reviewer';

  constructor() {
    super(AssignedReviewer.key);
    Object.assign(this, initialState);
    makeObservable(this, {
      data: observable,
      reviewerReviews: observable,
      createAssignedReviewer: action,
      getAssignedReviewers: action,
      getAssignedReviewerById: action,
      updateAssignedReviewer: action,
      getReviewerReviews: action,
      getReviewerReviewById: action,
      updateReviewerReview: action,
      reset: action,
    });
  }

  get accountStore() {
    return this.getStore('account')
  }

  load = async () => {
    // NOTE: We need to call Account.load() before calling this.load()
    if (this.accountStore.isAdmin) {
      await this.getAssignedReviewers()
    } else {
      await this.getReviewerReviews()
    }
  }

  createAssignedReviewer = async (payload = {}) => {
    const { data } = await this.api.post('assigned_reviewers', payload)
    this.data = [data, ...this.data]
    return data
  }

  getAssignedReviewers = async () => {
    if (!this.data.length) {
      const { data } = await this.api.get('assigned_reviewers')
      runInAction(() => {
        this.data = data
      })
    }
    return this.data
  }

  getAssignedReviewerById = async (id=null, params={}) => {
    if (!id) return null
    const { data } = await this.api.get(`assigned_reviewers/${id}`, params)
    return data
  }

  updateAssignedReviewer = async (id, payload = {}) => {
    const { data } = await this.api.patch(`assigned_reviewers/${id}`, payload)
    this.data = this.data.map((ar) => {
      if (ar.id === data.id) {
        return data
      }
      return ar
    })
    return data
  }

  getReviewerReviewById = async (id) => {
    const { data } = await this.api.get(`assigned_reviewers/${id}/get_reviewer_review`)
    return data
  }

  getReviewerReviews = async () => {
    if (!this.reviewerReviews.length) {
      const { data } = await this.api.get('assigned_reviewers/get_reviewer_reviews')
      runInAction(() => {
        this.reviewerReviews = data
      })
    }
    return this.reviewerReviews
  }

  updateReviewerReview = async (id, payload = {}) => {
    const { data } = await this.api.patch(`assigned_reviewers/${id}/update_reviewer_review`, payload)
    this.reviewerReviews = this.reviewerReviews.map((rr) => {
      if (rr.id === data.id) {
        return data
      }
      return rr
    })
    return data
  }

  reset = () => {
    Object.assign(this, initialState);
  }
}

