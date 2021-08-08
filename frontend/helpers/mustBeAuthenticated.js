
export const mustBeAuthenticated = () => {
  if (!localStorage.getItem('token')) {
    return { redirectTo: '/login' }
  }
}
