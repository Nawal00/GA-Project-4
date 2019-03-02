class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static removeToken() {
    localStorage.removeItem('token')
  }

  static getPayload() {
    const token = this.getToken()
    if (!token) return false
    const parts = token.split('.')
    if (parts.length < 3) return false
    try {
      return JSON.parse(atob(parts[1]))
    } catch {
      return false
    }
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    if(!payload) return false
    const now = Math.floor(Date.now() / 1000)
    return now < payload.exp
  }

  static canEdit(id) {
    const payload = this.getPayload()
    if(!payload) return false
    return payload.sub === id
  }

  static doesFollow(followed_by) {
    const currentUser = this.getUserId()
    followed_by = followed_by.map(follow => follow.id)
    return followed_by.includes(currentUser)
  }

  static getUserId() {
    const payload = this.getPayload()
    return payload.sub
  }

}


export default Auth
