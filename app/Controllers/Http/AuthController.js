'use strict'

class AuthController {
  async register({ response, view, request }) {
    return view.render('auth/register')
  }
  async login({ response, view, request }) {
    return view.render('auth/login')
  }
  async forgotPassword({ response, view, request }) {
    return view.render('auth/forgotPassword')
  }
}

module.exports = AuthController
