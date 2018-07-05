const STORAGE_KEY = 'todo-app';

export default class {
  static fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach((todo, index) => {
      todo.id = index;
    });
    return todos;
  }
  static save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
