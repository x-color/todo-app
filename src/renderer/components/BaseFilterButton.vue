<template>
  <p class="filter-item font-weight-bold"
    :class="{ selected: value === text }"
    @click="$emit('input', text)">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'BaseFilterButton',

  props: {
    value: {
      type: String,
      default: false,
      required: true,
    },
    text: {
      type: String,
      default: '',
      required: true,
    },
  },
};
</script>

<style scoped>
.filter-item {
  margin: 0;
  width: 80px;
  font-size: 12px;
}
.filter-item:hover {
  border-bottom: solid 1px gray;
  cursor: default;
}
.filter-item.selected {
  border: solid 1px gray;
  border-radius: 2px;
}
</style>
