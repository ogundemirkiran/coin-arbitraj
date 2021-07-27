<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Borsa</th>
        <th scope="col">Short Name</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody id="newListAdd">
      <tr v-for="item in tableData" :key="item">
        <th scope="row">#</th>
        <td>{{ selectType }}</td>
        <td>{{ item }}</td>

        <td>
          <button
            @click="$emit('btnDelete', { name: item, type: selectType })"
            type="button"
            class="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    tableData: { type: Array, default: () => [] },
    selectType: {
      type: String,
      default: "",
    },
  },
};
</script>