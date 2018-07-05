<template>
  <div class="todo-wrapper">
    <!-- todo editer -->
    <input class="editor text-light bg-dark" type="text" id="edit-todo"
       v-model="todo.title"
       v-if="todo.isEditing"
       @blur="doneEdit(todo)"
       @keyup.enter="doneEdit(todo)"
       @keyup.esc="cancelEdit(todo)">
    <!-- show todo -->
    <div v-else class="input-group show-todo">
      <div class="check-button"
        :class="{ checked: todo.isDone }"
        @click="todo.isDone = !todo.isDone">
        <i class="fas fa-check"></i>
      </div>
      <label class="todo-title text-truncate"
        :class="{ completed: todo.isDone }"
        @dblclick="editTodo(todo)">
        {{ todo.title }}
      </label>
      <div class="delete-button" @click="$emit('remove', todo)">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTodo',

  data() {
    return {
      todo: this.value,
      cacheTodo: '',
    };
  },

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  methods: {
    editTodo(todo) {
      this.cacheTodo = todo.title;
      todo.isEditing = true;
      this.$nextTick(() => document.getElementById('edit-todo').focus());
    },
    doneEdit(todo) {
      todo.isEditing = false;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.$emit('remove', todo);
      }
    },
    cancelEdit(todo) {
      todo.isEditing = false;
      todo.title = this.cacheTodo;
    },
  },

  watch: {
    todo: {
      handler(newTodo) {
        this.$emit('input', newTodo);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
%todo-size {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}

.editor {
  @extend %todo-size;
  margin: 3px 0;
  margin-left: 26px;
  width: calc(100% - 45px);
  border: none;
}
.editor:focus {
  outline: none;
}

.todo-wrapper:hover .delete-button {
  visibility: visible;
  opacity: 0.4;
}

.show-todo {
  margin: 3px 0;

  .check-button {
    margin: auto 0;
    color: gray;
    opacity: 0.2;
  }
  .check-button:hover {
    color: #22aa48;
    opacity: 0.6;
  }
  .check-button.checked {
    color: #22aa48;
    opacity: 1;
  }
  .delete-button {
    margin-top: 5px;
    color: #de3747;
    visibility: hidden;
  }
  .delete-button:hover {
    opacity: 1;
  }

  .todo-title {
    @extend %todo-size;
    margin: 0 10px;
    width: calc(100% - 60px);
  }
  .todo-title.completed {
    color: gray;
    text-decoration: line-through;
  }
}
</style>
