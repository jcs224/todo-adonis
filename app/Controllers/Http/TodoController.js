'use strict'

const Ws = use('Ws')
const Todo = use('App/Models/Todo')

class TodoController {
  async index() {
    let todos = await Todo.all()
    return todos
  }

  async store({ request }) {
    let todo = new Todo()
    todo.text = request.input('text')
    todo.completed = false
    await todo.save()
    Ws.getChannel('todos').topic('todos').broadcast('todo::new', todo)
    return todo
  }

  async destroy({ params }) {
    let todo = await Todo.find(params.id)
    await todo.delete()
    Ws.getChannel('todos').topic('todos').broadcast('todo::delete', todo)
    return todo
  }

  async update({ request, params }) {
    let todo = await Todo.find(params.id)
    todo.completed = request.input('completed')
    await todo.save()
    Ws.getChannel('todos').topic('todos').broadcast('todo::update', todo)
    return todo
  }
}

module.exports = TodoController
