const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const View = use('View')
  const Env = use('Env')
  View.global('appUrl', Env.get('APP_URL'))
  View.global('websocketUrl', Env.get('WEBSOCKET_URL'))
})
