<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <p class="navbar-brand" id="coin-arbitraj">Coin Arbitraj</p>

    <button
      @click="clickBtnColl()"
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="collapse navbar-collapse justify-content-end"
      id="navbarSupportedContent"
    >
      <ul class="nav nav-tabs mr-3">
        <li class="nav-item">
          <router-link class="nav-link" to="/coin_list" tag="a"
            >CoinList</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/add_delete_coin" tag="a"
            >Add/DeleteCoin</router-link
          >
        </li>
      </ul>
    </div>
    <div class="collList" v-if="btnColl">
      <ul>
        <li class="collList">
          <router-link class="nav-link" to="/coin_list" tag="a"
            >CoinList</router-link
          >
        </li>
        <li class="collList">
          <router-link class="nav-link" to="/add_delete_coin" tag="a"
            >Add/DeleteCoin</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      btnColl: false,
    };
  },
  methods: {
    clickBtnColl() {
      this.btnColl = !this.btnColl;
    },
    resizeControl(e) {
      if (e.target.innerWidth < 793) {
        this.btnColl = false;
      }
    },
  },
  created() {
    window.addEventListener("resize", this.resizeControl);
  },
};
</script>
<style scoped>
ul {
  font-size: 17px;
  margin-right: 30px;
}
.nav-link {
  color: blueviolet;
}
.nav-link:hover {
  color: darkblue;
  cursor: pointer;
}
#coin-arbitraj {
  font-size: 35px;
  margin-left: 10px;
  color: darkblue;
  font-family: "Brush Script MT", cursive;
}
#coin-arbitraj:hover {
  opacity: 0.7;
  font-size: 36px;
  cursor: pointer;
}

#btnColl {
  margin-top: 50px;
}
.collList {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
}
</style>