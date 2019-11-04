'use strict'
const { validate, sanitize } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')
class AuthController {
  async register({ response, view, request }) {
    return view.render('auth/register')
  }

  async storeUser({ request, session, response, auth }) {
    const rules = {
      email: 'required|email|unique:users,email',
      password: 'required',
      confirm_password: 'required'

    }
    // console.log("lllllllllllllllllllllllllllll");
    // Validation rules
    const validation = await validate(request.all(), rules)
    // return await Hash.make(validation.body.password)
    // console.log(await auth.attempt(request.input('email'), request.input('password')))

    // return `stop! debugging now`
    // check if passwords match
    if (request.input('password') == request.input('confirm_password')) {
      // check if validation fails
      if (validation.fails()) {
        session
          .withErrors(validation.messages())
          .flashExcept(['password'])
        console.log("the pass word is : ", request.input('password'))
        // return (`there is a problem with pass or email`)

        return response.redirect('back')
      }
      try {
        let newUser = await User.create({
          email: request.input('email'),
          password: request.input('password')
          // confirm_password: request.input('confirm_password')
        })
      } catch (error) {
        console.log("==========================")
        console.log(error);
        console.log("==========================")
        session
          .withErrors([{ field: 'database', message: 'problem with database or this email is already registered' }])
          .flashExcept(['password'])
        return response.redirect('back')
        // return `problem with DB`
      }
      // session
      // alert("c'est boooooooooon")
      session.flash({ notification: `welcome to toku` })
      return response.redirect('/home')
      // return 'Validation passed'
    } else {
      //if passwords don't match
      session
        .withErrors([
          { field: 'password', message: 'need to confirm password' },
          { field: 'confirm_password', message: 'need to confirm password' }
        ])
        .flashExcept(['password'])
      return response.redirect('back')
      // return `password doesn't match`
    }
  }

  async login({ response, view, request }) {
    return view.render('auth/login')
  }
  async forgotPassword({ response, view, request }) {
    return view.render('auth/forgotPassword')
  }
}

module.exports = AuthController