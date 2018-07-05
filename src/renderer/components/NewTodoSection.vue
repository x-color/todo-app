<template>
  <div class="new-todo-wrapper">
    <h1 class="text-center font-weight-bold">Todos</h1>
    <div class="form-wrapper">
      <input type="text"
        class="form-control custom-form-control text-light border-secondary"
        placeholder="New Todo"
        autofocus
        v-model="newTodo"
        @keyup.enter="emitTodo()">
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewTodoSection',

  data() {
    return {
      newTodo: '',
      id: this.startId,
    };
  },

  props: {
    startId: {
      type: Number,
      defalt: 0,
      required: true,
    },
  },

  methods: {
    getNextId() {
      const id = this.id;
      this.id += 1;
      return id;
    },
    emitTodo() {
      const title = this.newTodo.trim();
      if (title) {
        const todo = {
          title,
          id: this.getNextId(),
          isDone: false,
          isEditing: false,
        };
        this.$emit('add-todo', todo);
      }
      this.newTodo = '';
    },
  },
};
</script>

<style lang="scss" scoped>
// Addition todo section
.new-todo-wrapper {
  margin-bottom: 5px;

  .form-wrapper {
    margin: 0 20px;

    .custom-form-control {
      background: #293035;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
                  0 0 8px rgba(200, 200, 200, 0.3);
    }
    .custom-form-control:focus {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
                  0 0 8px rgba(200, 200, 200, 0.8);
      outline: 0 none;
    }
  }
}
</style>
