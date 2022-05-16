<template>
  <div class="screen-container">
    <header class="screen-header">
      <div>
        <img src="/static/img/header_border_light.png" />
      </div>
      <span class="logo">
        作者:3218001113 祝金婷 电子信息工程（信息安全）
      </span>
      <span class="title">疫情疫苗数据实时监控系统</span>
      <div class="title-right">
        <span class="datetime">{{ setTime }}</span>
      </div>
    </header>
    <router-link to="/epscreen" @click.native="refresh">
        <button class="change-china">查看中国疫情数据情况</button>
    </router-link>
    <router-link to="/vatest" @click.native="refresh">
        <button class="change">显示变换</button>
    </router-link>
    <span class="theme">全球疫苗数据实况</span>
    <div class="screen-body">
      <section class="screen-left">
        <div
          id="left-top"
          :class="[fullScreenStatus.per ? 'fullscreen' : '']"
        >
          <per ref="per"></per>
          <div class="resize">
            <span
              @click="changeSize('per')"
              :class="[
                'iconfont',
                fullScreenStatus.per
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="left-bottom"
          :class="[fullScreenStatus.totalvaChina ? 'fullscreen' : '']"
        >
          <TotalvaChina ref="totalvaChina"></TotalvaChina>
          <div class="resize">
            <span
              @click="changeSize('totalvaChina')"
              :class="[
                'iconfont',
                fullScreenStatus.totalvaChina
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div
          id="middle-top"
          :class="[fullScreenStatus.vaccination ? 'fullscreen' : '']"
        >
          <Vaccination ref="vaccination"></Vaccination>
          <div class="resize">
            <span
              @click="changeSize('vaccination')"
              :class="[
                'iconfont',
                fullScreenStatus.vaccination ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div class="to">数据来源于：
          <span>国家卫健委|WHO等</span>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.sort ? 'fullscreen' : '']">
          <Sort ref="sort"></Sort>
          <div class="resize">
            <span
              @click="changeSize('sort')"
              :class="[
                'iconfont',
                fullScreenStatus.sort ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="right-bottom"
          :class="[fullScreenStatus.vatotal ? 'fullscreen' : '']"
        >
          <Vatotal ref="vatotal"></Vatotal>
          <div class="resize">
            <span
              @click="changeSize('vatotal')"
              :class="[
                'iconfont',
                fullScreenStatus.vatotal
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Per from "@/components/Per.vue";
import TotalvaChina from "@/components/TotalvaChina.vue";
import Vaccination from "@/components/Vaccination.vue";
import Sort from "@/components/Sort.vue";
import Wordva from "@/components/Wordva.vue";
import Vatotal from "@/components/Vatotal.vue";
export default {
  data() {
    return {
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        per: false,
        totalvaChina: false,
        vaccination: false,
        sort: false,
        vatotal: false,
      },
    };
  },
  methods: {
    changeSize(chartName) {
      this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      });
    },
    refresh(){
          this.$router.go(0)
      }
  },
  computed: {
    setTime() {
      let date = new Date()
      //年
      var year = date.getFullYear()
      //月
      var month = date.getMonth() + 1
      //日
      var day = date.getDate()
      //时
      var hh = date.getHours()
      //分
      var mm = date.getMinutes()
      var rq =
        year + "年" + month + "月" + day + "日" + hh + ":" + mm;
      return rq
    },
  },
  components: {
    Per,
    TotalvaChina,
    Vaccination,
    Sort,
    Wordva,
    Vatotal
  },
};
</script>

<style>

</style>