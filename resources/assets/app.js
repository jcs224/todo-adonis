import m from 'mithril'
import "@babel/polyfill"

import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')
ws.connect()

ws.on('open', () => {
  console.log('websocket connection successful')
})

ws.on('open', () => {
  console.log('websocket dis-connection successful')
})

const todoNotif = ws.subscribe('todos')
todoNotif.on('ready', () => {
  console.log('subscribed to todos channel')
})
todoNotif.on('error', (error) => {
  console.log(error)
})

let ListTodoModel = {
  todos: [],

  getTodos() {
    m.request('http://localhost:3333/api/todos', {
      body: {
        '_csrf': '{{ csrfToken }}',
      }
    }).then(response => {
      ListTodoModel.todos = response
    })
  }
}

let CreateTodoModel = {
  text: '',

  submitTodo() {
    m.request('http://localhost:3333/api/todos', {
      method: 'post',
      body: {
        '_csrf': '{{ csrfToken }}',
        text: CreateTodoModel.text
      }
    }).then(response => {
      CreateTodoModel.text = ''
      ListTodoModel.getTodos()
    })
  }
}

let DeleteTodoModel = {
  deleteTodo(id) {
    m.request('http://localhost:3333/api/todos/'+id, {
      method: 'delete',
      body: {
        '_csrf': '{{ csrfToken }}'
      }
    }).then(response => {
      console.log('Todo deleted.')
      ListTodoModel.getTodos()
    })
  }
}

let Todos = {
  oninit() {
    ListTodoModel.getTodos()
  },

  view() {
    return [
      m('.container', [
        m('.columns.is-centered', [
          m('.column.is-one-third', [
            m('nav.panel', [
              m('p.panel-heading', 'Todos'),
              m('.panel-block', [
                m('form', {
                  style: 'width: 100%',
                  onsubmit(e) {
                    e.preventDefault()
                    CreateTodoModel.submitTodo()
                  }
                }, [
                  m('.field.has-addons', [
                    m('p.control', {
                        style: 'width: 100%'
                      }, [
                      m('input.input.is-small', {
                        type: 'text',
                        placeholder: 'Add todo...',
                        oninput(e) {
                          CreateTodoModel.text = e.target.value
                        },
                        value: CreateTodoModel.text
                      })
                    ]),
                    m('p.control', [
                      m('input.button.is-info.is-small', {
                        type: 'submit',
                        value: 'Submit'
                      })
                    ])
                  ])
                ])
              ]),
              ListTodoModel.todos.map(todo => {
                return m('.panel-block', {
                  style: 'justify-content: space-between'
                }, [
                  todo.text,
                  m('button.button.is-small.is-danger', {
                    onclick() {
                      DeleteTodoModel.deleteTodo(todo.id)
                    }
                  }, 'Delete')
                ])
              })
            ])
          ])
        ])
      ])
    ]
  }
}

m.mount(document.body, Todos)
