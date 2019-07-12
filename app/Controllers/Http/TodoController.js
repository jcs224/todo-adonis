'use strict'

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
    return todo
  }

  async destroy({ params }) {
    let todo = await Todo.find(params.id)
    await todo.delete()
    return todo
  }
}

module.exports = TodoController
