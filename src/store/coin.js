import axios from "axios";

const state = {
  coinPairsParibu: [],
  coinPairsChz: [],
  coinDataParibu: [],
  coinDataChz: [],
  pairsParibu: [],
  pairsChz: [],
  fanToken: [],
};
const getters = {
  getCoinPairsParibu(state) {
    return state.coinPairsParibu;
  },
  getPairsParibu(state) {
    // console.log(state.pairsParibu);

    return state.pairsParibu;
  },
  getCoinDataParibu(state) {
    return state.coinDataParibu;
  },
  getCoinPairsChz(state) {
    //console.log(state.coinPairsChz);
    return state.coinPairsChz;
  },
  getCoinDataChz(state) {
    return state.coinDataChz;
  },
  getPairsChz(state) {
    // console.log(state.pairsChz);
    return state.pairsChz;
  },
  getFanToken(state) {
    return state.fanToken;
  },
};
const mutations = {
  SET_COINS_DATA_PARIBU(state, payload) {
    state.coinDataParibu = payload;
  },
  SET_COINS_PAIRS_PARIBU(state, payload) {
    state.coinPairsParibu = payload;
  },
  SET_PAIRS_PARIBU(state, data) {
    state.pairsParibu = data;
  },
  SET_COINS_DATA_CHZ(state, payload) {
    state.coinDataChz = payload;
  },
  SET_COINS_PAIRS_CHZ(state, payload) {
    state.coinPairsChz = payload;
  },
  SET_PAIRS_CHZ(state, data) {
    state.pairsChz = data;
  },
  SET_FAN_TOKEN(state, data) {
    state.fanToken = data;
  },
};

const actions = {
  setLocalStorage({ dispatch }, payload) {
    let pairsParibu = JSON.parse(localStorage.getItem("pairsParibu"));
    let coins = [];
    if (!pairsParibu) {
      coins.push(payload);
      localStorage.setItem("pairsParibu", JSON.stringify(coins));
    } else {
      let findIndex = pairsParibu.findIndex((item) => item == payload);
      if (findIndex < 0) {
        coins = [...pairsParibu, payload];
        localStorage.setItem("pairsParibu", JSON.stringify(coins));
      }
    }
    dispatch("getLocalStorage");
  },
  setLocalStorageChz({ dispatch }, payload) {
    let pairsChz = JSON.parse(localStorage.getItem("pairsChz"));
    let coins = [];
    if (!pairsChz) {
      coins.push(payload);
      localStorage.setItem("pairsChz", JSON.stringify(coins));
    } else {
      let findIndex = pairsChz.findIndex((item) => item == payload);
      if (findIndex < 0) {
        coins = [...pairsChz, payload];
        localStorage.setItem("pairsChz", JSON.stringify(coins));
      }
    }
    dispatch("getLocalStorageChz");
  },
  getLocalStorage({ commit }) {
    let pairsParibu = JSON.parse(localStorage.getItem("pairsParibu"));

    commit("SET_PAIRS_PARIBU", pairsParibu);
  },
  getLocalStorageChz({ commit }) {
    let pairsChz = JSON.parse(localStorage.getItem("pairsChz"));

    commit("SET_PAIRS_CHZ", pairsChz);
  },

  getData({ commit }) {
    axios.get("https://www.paribu.com/ticker").then((response) => {
      this.coinDataParibu = response.data;
      this.coinPairsParibu = [];

      for (let item of Object.keys(response.data)) {
        this.coinPairsParibu.push(item);
      }

      commit("SET_COINS_PAIRS_PARIBU", this.coinPairsParibu);
      commit("SET_COINS_DATA_PARIBU", this.coinDataParibu);
    }),
      axios.get("http://localhost:3030").then((response) => {
        this.coinDataChz = response.data;
        this.coinPairsChz = [];

        for (let item of response.data) {
          this.coinPairsChz.push(item.symbol);
        }

        let aa = this.coinPairsChz
          .map((item) => {
            let cc = item.substring(item.length - 3);

            if (cc === "CHZ") {
              let dd = item.replace("CHZ", "");

              return dd;
            }
          })
          .filter((val) => val);

        this.fanToken = aa;

        commit("SET_COINS_PAIRS_CHZ", this.coinPairsChz);
        commit("SET_COINS_DATA_CHZ", this.coinDataChz);
        commit("SET_FAN_TOKEN", this.fanToken);
      });
  },
  removeItemParibu({ dispatch }, payload) {
    let pairsParibu = JSON.parse(localStorage.getItem("pairsParibu"));
    let findIndex = pairsParibu.findIndex((item) => item == payload);
    pairsParibu.splice(findIndex, 1);
    localStorage.setItem("pairsParibu", JSON.stringify(pairsParibu));

    dispatch("getLocalStorage");
  },
  removeItemChz({ dispatch }, payload) {
    let pairsChz = JSON.parse(localStorage.getItem("pairsChz"));
    let findIndex = pairsChz.findIndex((item) => item == payload);
    pairsChz.splice(findIndex, 1);
    localStorage.setItem("pairsChz", JSON.stringify(pairsChz));

    dispatch("getLocalStorageChz");
  },
};

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
};
