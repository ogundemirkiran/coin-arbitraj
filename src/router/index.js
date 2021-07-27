import Vue from "vue";
import VueRouter from "vue-router";
import CoinList from "../views/CoinList.vue";
import AddDeleteCoin from "../views/AddDeleteCoin.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/coin_list", name: "CoinList", component: CoinList },
  { path: "/add_delete_coin", name: "AddDeleteCoin", component: AddDeleteCoin },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
