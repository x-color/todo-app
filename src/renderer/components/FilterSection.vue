<template>
  <ul class="list-inline text-center">
    <li class="list-inline-item">
      <base-filter-button
        v-model="filter"
        :text="filters[0]">
      </base-filter-button>
    </li>
    <li class="list-inline-item">
      <base-filter-button
        v-model="filter"
        :text="filters[1]">
      </base-filter-button>
    </li>
    <li class="list-inline-item">
      <base-filter-button
        v-model="filter"
        :text="filters[2]">
      </base-filter-button>
    </li>
  </ul>
</template>

<script>
import BaseFilterButton from './BaseFilterButton.vue';

const filters = ['All', 'Active', 'Completed'];

export default {
  name: 'FilterSection',

  components: {
    BaseFilterButton,
  },

  data() {
    return {
      filter: this.value,
      filters,
    };
  },

  props: {
    value: {
      type: String,
      default: filters[0],
      required: true,
      validator(value) {
        return filters.indexOf(value) !== -1;
      },
    },
  },

  watch: {
    filter: {
      handler(newFilter) {
        this.$emit('input', newFilter);
      },
    },
  },
};
</script>

<style>
</style>
