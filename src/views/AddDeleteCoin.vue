<template>
  <div id="selectDiv">
    <h4>Paribu</h4>
    <Select
      :selectData="getCoinPairsParibu"
      selectType="Paribu"
      @addNewCoin="addNewCoin($event)"
    ></Select>
    <br />
    <Table
      :tableData="getPairsParibu"
      selectType="Paribu"
      @btnDelete="btnDelete($event)"
    ></Table>
    <br />
    <h4>Chiliz</h4>
    <Select
      :selectData="getCoinPairsChz"
      selectType="Chiliz"
      @addNewCoin="addNewCoin($event)"
    ></Select>
    <br />
    <Table
      :tableData="getPairsChz"
      selectType="Chiliz"
      @btnDelete="btnDelete($event)"
    ></Table>
  </div>
</template>
<script>
import Table from "../components/Table";
import Select from "../components/Select";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Table,
    Select,
  },
  data() {
    return {
      coinDataName: [],
      coinData: [],

      disabledNewCoin: false,
      localInCoin: "",
    };
  },
  computed: {
    ...mapGetters([
      "getCoinPairsParibu",
      "getPairsParibu",
      "getCoinPairsChz",
      "getPairsChz",
    ]),
  },
  methods: {
    ...mapActions([
      "getData",
      "setLocalStorage",
      "getLocalStorage",
      "removeItemParibu",
      "setLocalStorageChz",
      "getLocalStorageChz",
      "removeItemChz",
    ]),

    addNewCoin(item) {
      if (item.type == "Paribu") {
        console.log(item);
        this.setLocalStorage(item.name);
      } else {
        console.log(item);
        this.setLocalStorageChz(item.name);
      }
    },
    btnDelete(item) {
      console.log(item);
      if (item.type == "Paribu") {
        this.removeItemParibu(item.name);
      } else {
        this.removeItemChz(item.name);
      }
    },
  },
  created() {
    this.getLocalStorage();
    this.getLocalStorageChz();

    this.getData();
  },
};
</script>
<style scoped>
#selectDiv {
  width: 80%;
  margin: auto;
  margin-top: 20px;
}

table {
  width: 80%;
}
</style>