const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const View = use('View')
  const Env = use('Env')
  View.global('appUrl', Env.get('APP_URL'))
  View.global('appHost', Env.get('HOST'))
  View.global('appPort', Env.get('PORT'))
})
