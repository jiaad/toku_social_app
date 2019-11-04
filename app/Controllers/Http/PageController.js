'use strict'

class PageController {
  async home({ reponse, request, view, auth }) {
    // return auth.user
    return view.render('pages/home')
  }
  async welcome({ reponse, request, view }) {
    return view.render('pages/welcome')
  }
}


module.exports = PageController
