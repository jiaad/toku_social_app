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
      // console.log(await auth.attempt(request.input('email'), request.input('password')))

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
  async loginUser({ request, auth, response }) {
    //capture the DATA
    let postData = request.post()
    //find the user in the database by there email
    let user = await User.query().where('email', postData.email).first()
    if (user) {//exist
      //verify the password
      const passwordVerified = await Hash.verify(postData.password, user.password)
      // console.log("pass 1", passwordVerified);
      //then login
      if (passwordVerified) {
        await auth.login(user)
        return response.redirect('/home')
      } else { //password incorrect

      }
    } else {
      // can't find user with that email
    }
    console.log("pass 2", passwordVerified);


    // return request.post()
  }

  async logout({ response, auth }) {
    try {
      await auth.logout()
      return response.redirect('/')
    } catch (error) {
      console.log(error)
      return `error couldn't logout`
    }
  }

  async forgotPassword({ response, view, request }) {
    return view.render('auth/forgotPassword')
  }
}

module.exports = AuthController