<template>
  <div>
    <select
      v-model="selectedCoin"
      class="form-select"
      aria-label="Default select example"
    >
      <option selected>Open this select menu</option>
      <option v-for="(item, index) of selectData" :key="item + '-' + index">
        {{ item }}
      </option>
    </select>
    <button
      @click="addNewCoin"
      type="button"
      class="btn btn-success btn-sm"
      id="addNewCoin"
    >
      <strong>+</strong>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedCoin: "",
    };
  },
  props: {
    selectData: {
      type: Array,
      default: () => [],
    },
    selectType: {
      type: String,
      default: "",
    },
  },
  methods: {
    addNewCoin() {
      this.$emit("addNewCoin", {
        name: this.selectedCoin,
        type: this.selectType,
      });
    },
  },
};
</script>
<style scoped>
select {
  width: 80%;
  height: 40px;
  border-radius: 8px;
  display: inline-block;
}
.btn-success {
  width: 50px;
  height: 38px;
  padding: 0;
  margin-left: 5px;
  margin-bottom: 3px;
  border-radius: 10px 10px 25px 10px;
  font-size: 20px;
}
</style>