<template>
  <div class="body">
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
      <div class="to">数据来源于：
          <span>国家卫健委|WHO等</span>
      </div>
      <router-link to="/eptest" @click.native="refresh">
          <button class="change-china">查看中国疫情数据情况</button>
      </router-link>
      <router-link to="/vascreen" @click.native="refresh">
          <button class="change">显示变换</button>
      </router-link>
      <span class="theme">全球疫苗数据实况</span>
      <section class="body-container">
          <div class="vaccination">
              <Vatotal></Vatotal>
          </div>
          <div class="vaccination">
              <Vaccination></Vaccination>
          </div>
          <div class="vaccination">
              <TotalvaChina></TotalvaChina>
          </div>
          <div class="vaccination">
              <Per></Per>
          </div>
          <div class="vaccination">
              <Sort></Sort>
          </div>
          <div class="vaccination">
              <Wordva></Wordva>
          </div>
      </section>
  </div>
</template>

<script>
import Per from "@/components/Per.vue";
import Vatotal from '@/components/Vatotal.vue'
import TotalvaChina from "@/components/TotalvaChina.vue";
import Vaccination from "@/components/Vaccination.vue";
import Sort from "@/components/Sort.vue";
import Wordva from "@/components/Wordva.vue";
export default {
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
        }
    },
    components: {
    Per,
    TotalvaChina,
    Vaccination,
    Sort,
    Wordva,
    Vatotal
  },
  methods: {
      refresh(){
          this.$router.go(0)
      }
  }
}
</script>

<style>
.to{
    color: #89303f;
    font-size: 20px;
    margin-left: 10px;
    font-weight: 800;
}
.change{
    background-color: white;
    border: 1px solid #89303f;
    margin-left: 10px;
    border-radius:50%;
    cursor: pointer;
}
.change-china{
    border: none;
    background-color: white;
    cursor: pointer;
    color: #89303f;
    font-size: 20px;
    margin-left: 5px;
    font-weight: 800;
}
.theme{
    position: absolute;
    top: 60px;
    left: 42%;
    font-size: 24px;
    font-weight: 700;
    color: #569597;
}
</style>
