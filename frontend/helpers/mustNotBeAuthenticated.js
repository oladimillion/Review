
export const mustNotBeAuthenticated = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
  }
}
