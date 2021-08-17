import { runInAction, observable, makeObservable, action } from 'mobx'
import { Store } from './Store'
import { isEmptyValue } from '../helpers/isEmptyValue'

const initialState = {
  navItems: [
    {
      icon: 'home',
      name: 'Dashboard',
      to: '/',
      exact: true,
    },
    {
      icon: 'thumbs up outline',
      name: 'Performance Reviews',
      to: '/performance_reviews',
    },
    {
      icon: 'users',
      name: 'Assigned Reviewers',
      to: '/assigned_reviewers',
    }
  ],
}

export class Navigation extends Store {

  static key = 'navigation';
  showSideBar = true

  constructor() {
    super(Navigation.key);
    Object.assign(this, initialState)
    makeObservable(this, {
      navItems: observable,
      showSideBar: observable,
      reset: action,
      toggleSideBar: action,
    })
  }

  toggleSideBar = () => {
    runInAction(() => {
      this.showSideBar = !this.showSideBar
    })
  }

  reset = () => {
    Object.assign(this, initialState);
  }
}

