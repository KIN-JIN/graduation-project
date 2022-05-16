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
    <router-link to="/vascreen" @click.native="refresh">
        <button class="change-world">查看全国疫苗数据情况</button>
    </router-link>
    <router-link to="/eptest" @click.native="refresh">
        <button class="change">显示变换</button>
    </router-link>
    <span class="theme">中国疫情数据实况</span>
    <div class="screen-body">
      <section class="screen-left">
        <div
          id="left-top"
          :class="[fullScreenStatus.petrend ? 'fullscreen' : '']"
        >
          <Eptrend ref="petrend"></Eptrend>
          <div class="resize">
            <span
              @click="changeSize('petrend')"
              :class="[
                'iconfont',
                fullScreenStatus.petrend
                  ? 'icon-compress-alt'
                  : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="left-bottom"
          :class="[fullScreenStatus.epperadd ? 'fullscreen' : '']"
        >
          <Epperadd ref="epperadd"></Epperadd>
          <div class="resize">
            <span
              @click="changeSize('epperadd')"
              :class="[
                'iconfont',
                fullScreenStatus.epperadd
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
          :class="[fullScreenStatus.epmap ? 'fullscreen' : '']"
        >
          <Epmap ref="epmap"></Epmap>
          <div class="resize">
            <span
              @click="changeSize('epmap')"
              :class="[
                'iconfont',
                fullScreenStatus.epmap ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div class="to">数据来源于：
          <span>国家卫健委|WHO等</span>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.epadd ? 'fullscreen' : '']">
          <Epadd ref="epadd"></Epadd>
          <div class="resize">
            <span
              @click="changeSize('epadd')"
              :class="[
                'iconfont',
                fullScreenStatus.epadd ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
            ></span>
          </div>
        </div>
        <div
          id="right-bottom"
          :class="[fullScreenStatus.totalep ? 'fullscreen' : '']"
        >
          <Totalep ref="totalep"></Totalep>
          <div class="resize">
            <span
              @click="changeSize('totalep')"
              :class="[
                'iconfont',
                fullScreenStatus.totalep
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
import Epmap from "@/components/Epmap.vue";
import Epadd from "@/components/Epadd.vue";
import Epperadd from "@/components/Epperadd.vue";
import Eptrend from "@/components/Eptrend.vue";
import Totalep from "@/components/Totalep.vue";
export default {
  data() {
    return {
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        petrend: false,
        epperadd: false,
        epmap: false,
        epadd: false,
        totalep: false,
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
    Epmap,
    Epadd,
    Epperadd,
    Eptrend,
    Totalep
  },
};
</script>

<style>

</style>