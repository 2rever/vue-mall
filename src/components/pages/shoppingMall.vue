<template>
  <div>
    <div class="search-bar">
      <van-row class="test-row">
        <van-col span="3">
          <van-icon name="location" color="#fff" style="padding-left:0.8rem;" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- swipper-area -->
    <div class="swipper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(item,index) in bannerPic" :key="index">
          <img :src="item.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- type-bar -->
    <div class="type-bar">
      <div v-for="(item,index) in category" :key="index">
        <img :src="item.image" width="90%" alt>
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adBanner area-->
    <div>
      <img :src="adBanner" width="100%" alt>
    </div>

    <!-- Recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" alt>
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>

    <!-- Hot Area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list gutter="20">
          <van-row>
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goodsInfoComponent :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfoComponent>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import floorComponent from "../component/floorComponent";
  import goodsInfoComponent from "../component/goodsInfoComponent";
  import {
    toMoney
  } from "@/filter/moneyFilter.js";
  import url from '@/serviceAPI.config.js'
  export default {
    filters: {
      moneyFilter(money) {
        return toMoney(money);
      }
    },
    components: {
      floorComponent,
      goodsInfoComponent
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 3
        },
        msg: "Shopping Mall",
        bannerPic: [],
        category: [],
        adBanner: "",
        recommendGoods: [],
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {},
        hotGoods: []
      };
    },
    created() {
      axios
        .get(
          'http://reachxout.coding.me/miao/mallInfo.json'
        )
        .then(res => {
          console.log(res.data.data);
          if (res.status == 200) {
            this.category = res.data.data.category;
            this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
            this.bannerPic = res.data.data.slides;
            this.recommendGoods = res.data.data.recommend;
            this.floor1 = res.data.data.floor1;
            this.floor2 = res.data.data.floor2;
            this.floor3 = res.data.data.floor3;
            this.floorName = res.data.data.floorName;
            this.hotGoods = res.data.data.hotGoods;
          }
        })
        .catch(err => console.log(err));
    }
  };

</script>

<style scoped>
  .search-bar {
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
  }

  .search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
  }

  .type-bar {
    background-color: #fff;
    margin: 0 0.3rem 0.3rem 0.3rem;
    border-radius: 0.3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .type-bar div {
    padding: 0.3rem;
    font-size: 12px;
    text-align: center;
  }

  .recommend-area {
    background-color: #fff;
    margin-top: 0.3rem;
  }

  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 0.2rem;
    color: #e5017d;
  }

  .recommend-body {
    border-bottom: 1px solid #eee;
  }

  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }

  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }

</style>
