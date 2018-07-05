<template>
  <div class="todo-list-wrapper bg-dark text-light">
    <new-todo-section :startId="todos.length" @add-todo="addTodo">
    </new-todo-section>
    <section class="todo-list-section">
      <transition-group name="todo-list" tag="ul" class="list-group" appear>
        <li v-if="sortedTodos.length == 0" key="no-todo"
          class="list-group-item text-center text-muted border-secondary bg-dark mb-1 no-todo">
           No Todos...
        </li>
        <!-- todo -->
        <li v-else v-for="todo, index in sortedTodos"
          :key="todo.id"
          class="list-group-item todo-item border-secondary bg-dark mb-1">
          <base-todo v-model="sortedTodos[index]" @remove="removeTodo"></base-todo>
        </li>
        <!-- filter section -->
        <li class="list-group-item border-secondary bg-dark" key="filter">
          <filter-section v-model="filter"></filter-section>
        </li>
      </transition-group>
    </section>
  </div>
</template>

<script>
import storage from './storage.js';
import FilterSection from './FilterSection.vue';
import BaseTodo from './BaseTodo.vue';
import NewTodoSection from './NewTodoSection.vue';

export default {
  name: 'TheTodoList',

  components: {
    storage,
    FilterSection,
    BaseTodo,
    NewTodoSection,
  },

  data() {
    return {
      todos: storage.fetch(),
      cacheTodo: null,
      newTodo: '',
      filter: 'All',
    };
  },

  methods: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(item => item !== todo);
    },
  },

  computed: {
    sortedTodos() {
      if (this.filter === 'Active') {
        return this.todos.filter(todo => !todo.isDone).reverse();
      } else if (this.filter === 'Completed') {
        return this.todos.filter(todo => todo.isDone).reverse();
      }
      return this.todos.slice().reverse();
    },
  },

  watch: {
    todos: {
      handler(todos) {
        storage.save(todos);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list-wrapper {
  padding: 10px 0;
}

// Show todo list section.
.todo-list-section {
  margin: 0 5px 3px;

  .no-todo {
    cursor: default;
  }

  .todo-item {
    padding: 5px 10px;
  }
}

// Todo list animation
.todo-list-enter-active, .todo-list-leave-active {
  transition: transform .5s, opacity .5s;
}
.todo-list-leave-active {
  position: absolute;
  z-index: -1;
}
.todo-list-move:not(.todo-list-leave-active) {
  transition: transform .5s;
}
.todo-list-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.todo-list-leave {
  width: calc(100% - 10px);
  margin: 0 auto;
}
.todo-list-leave-to {
  @extend .todo-list-leave;
  opacity: 0;
}
</style>
