import { Api } from './Api'
import { App } from './App'
import { Navigation } from './Navigation'
import { Account } from './Account'
import { AssignedReviewer } from './AssignedReviewer'
import { PerformanceReview } from './PerformanceReview'

export const appStore = new App()
export const navigationStore = new Navigation()
export const accountStore = new Account()
export const apiStore = new Api()
export const assignedReviewerStore = new AssignedReviewer()
export const performanceReviewStore = new PerformanceReview()

