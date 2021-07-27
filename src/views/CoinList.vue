<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <P id="sampleAmount">
          <strong>1000 TL İLE BAŞLANAN İŞLEM SONUCU ÖRNEKLENDİRİLMİŞTİR</strong>
        </P>
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="fontWeight" scope="col">FAN TOKENS</th>
              <th scope="col">PARİBU</th>
              <th scope="col">CHİLİZ</th>
              <th scope="col">FARK</th>
              <th scope="col">NET KALAN</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in fanTokenSync" :key="item + '-' + index">
              <th scope="row">{{ item }}</th>
              <td>{{ paribuFanGetData(item) }}</td>
              <td>{{ chzFanGetData(item) }}</td>
              <td>
                {{ (chzFanGetData(item) - paribuFanGetData(item)).toFixed(2) }}
              </td>
              <td>
                {{ netProfit(item, paribuFanGetData(item)) }}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <hr />
        <hr />
        <br />
        <div id="TableListSide">
          <table class="table table-striped sideTable">
            <thead>
              <tr>
                <th class="fontWeight" scope="col">PARİBU</th>
                <th scope="col">ALIŞ</th>
                <th scope="col">SATIŞ</th>
              </tr>
            </thead>
            <tbody
              v-if="
                getCoinDataParibu && getPairsParibu && getPairsParibu.length
              "
            >
              <tr
                v-for="(item, index) in getPairsParibu"
                :key="item + '-' + index"
              >
                <template v-if="getCoinDataParibu[item]">
                  <th scope="row">{{ item }}</th>
                  <td>{{ getCoinDataParibu[item].highestBid }}</td>
                  <td>{{ getCoinDataParibu[item].lowestAsk }}</td>
                  <td></td>
                </template>
              </tr>
            </tbody>
          </table>

          <table class="table table-striped sideTable">
            <thead>
              <tr>
                <th class="fontWeight" scope="col">CHİLİZ</th>
                <th scope="col">ALIŞ</th>
                <th scope="col">SATIŞ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in getDataChz" :key="item + '-' + index">
                <th scope="row">{{ item.symbol }}</th>
                <td>
                  {{ item.bidPrice }}
                </td>
                <td>{{ item.askPrice }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      coinListChz: [],
      costs: {
        prbFanTokenBuy: 0.0035,
        prbChzTransfer: 0,
        chzFanTokenSell: 0.006,
        chzPrbTransfer: 0,
        prbChzSell: 0.0035,
      },
    };
  },
  computed: {
    ...mapGetters([
      "getCoinDataParibu",
      "getPairsParibu",
      "getCoinPairsParibu",
      "getCoinDataChz",
      "getPairsChz",
      "getFanToken",
      "getCoinPairsChz",
    ]),
    getDataChz() {
      let dd = this.getCoinDataChz
        .map((item) => {
          let findIndex = this.getPairsChz.findIndex(
            (res) => res == item.symbol
          );
          if (findIndex >= 0) {
            return item;
          }
        })
        .filter((val) => val);
      return dd;
    },

    fanTokenSync() {
      let aa = this.getFanToken.map((item) => {
        let bb = item + "_TL";
        return bb;
      });

      let dd = aa
        .map((item) => {
          let findIndex = this.getCoinPairsParibu.findIndex(
            (res) => res == item
          );
          if (findIndex >= 0) {
            return item;
          }
        })
        .filter((val) => val);

      return dd;
    },
  },
  methods: {
    ...mapActions(["getLocalStorage", "getLocalStorageChz", "getData"]),

    paribuFanGetData(item) {
      let aa = this.getCoinDataParibu[item].lowestAsk;

      return aa;
    },
    chzFanGetData(item) {
      let aa = item.replace("_TL", "CHZ");

      let bb = this.getCoinDataChz.find((res) => res.symbol == aa);
      let dd = (
        bb.bidPrice * this.getCoinDataParibu["CHZ_TL"].highestBid
      ).toFixed(2);

      return Number(dd);
    },
    netProfit(item, prbFan) {
      let aa = item.replace("_TL", "CHZ");

      let bb = this.getCoinDataChz.find((res) => res.symbol == aa);
      let cc = bb.bidPrice;

      let ee = this.getCoinDataParibu["CHZ_TL"].highestBid;

      let a = 1000;
      let prbPurchasedCoins = a / prbFan; // Paribudan 1000 TL ile alabileceğimiz Fan Token sayısı
      let PrbFee = prbPurchasedCoins * this.costs.prbFanTokenBuy; // Paribuda ki fee ücreti
      let prbOwnedCoin = Number((prbPurchasedCoins - PrbFee).toFixed(2)); // Paribuda aldığımız net Fan Token sayısı
      let prbChzTran = prbOwnedCoin - this.costs.prbChzTransfer; // Paribudan Chilize coin aktardığımızda fee kesinti sonucu Chilizde ki net Fan Token sayımız
      let chzCoinSell = prbChzTran * cc; //Chilizde Fan Token satıp Chz aldık
      let chzCoinSellFee = chzCoinSell * this.costs.chzFanTokenSell; //Chilizde FanTokenı Chz coine çevirirken kesilen fee
      let chzOwnedCoin = chzCoinSell - chzCoinSellFee; // chilizde elimizde kalan net Chz sayısı
      let chzPrbTrans = chzOwnedCoin - this.costs.chzPrbTransfer; // Chilizden Paribuya geçen net Chz sayısı
      let prbCoinSell = chzPrbTrans * ee; // Paribuda Chz satıp TL aldık
      let prbChzSellFee = prbCoinSell * this.costs.prbChzSell; //Paribuda ki Chz yi TL ye çevirirken kesilen fee
      let prbTotalTl = prbCoinSell - prbChzSellFee; // Paribudaki Total Net TL tutarı

      /* console.log(prbPurchasedCoins);
      console.log(PrbFee);
      console.log(prbOwnedCoin);
      console.log(prbChzTran);
      console.log(chzCoinSell);
      console.log(chzCoinSellFee);
      console.log(chzOwnedCoin);
      console.log(chzPrbTrans);
      console.log(prbCoinSell);
      console.log(prbChzSellFee);
      console.log(prbTotalTl); */

      return prbTotalTl.toFixed(2);
    },
  },
  created() {
    setInterval(() => {
      this.getData();
    }, 5000000);

    this.getLocalStorage();
    this.getLocalStorageChz();
  },
};
</script>
<style scoped>
.container {
  margin-top: auto;
  margin-bottom: auto;
  height: 550px;
  margin-right: auto;
  margin-left: auto;
  padding-left: auto;
  padding-right: auto;
}
.row {
  width: 100%;
}
.col {
  padding: 10px;
}
.sideTable {
  width: 48%;
  display: inline-table;
  margin-left: 15px;
}
.fontWeight {
  font-weight: 900;
  font-size: 17px;
  padding-left: 0;
}
#sampleAmount {
  color: blueviolet;
  background-color: rgb(201, 229, 143);
  text-align: center;
}
</style>>
