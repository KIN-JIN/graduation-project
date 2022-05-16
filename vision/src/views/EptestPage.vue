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
      <router-link to="/vatest" @click.native="refresh">
          <button class="change-world">查看全球疫苗数据情况</button>
      </router-link>
      <router-link to="/epscreen" @click.native="refresh">
          <button class="change">显示变换</button>
      </router-link>
      <span class="theme">中国疫情数据实况</span>
      <div class="body-container">
          <div class="epidemic">
              <Totalep></Totalep>
          </div>
          <div class="epidemic">
              <Epmap></Epmap>
          </div>
          <div class="epidemic">
              <Epperadd></Epperadd>
          </div>
          <div class="epidemic">
              <Eptrend></Eptrend>
          </div>
          <div class="epidemic">
              <Epadd></Epadd>
          </div>
          <div class="epidemic">
              <EPnotice></EPnotice>
          </div>
      </div>
  </div>
</template>

<script>
import Totalep from '@/components/Totalep.vue'
import Epmap from '@/components/Epmap.vue'
import Epperadd from '@/components/Epperadd.vue'
import Eptrend from '@/components/Eptrend.vue'
import Epadd from '@/components/Epadd.vue'
import EPnotice from '@/components/EPnotice.vue'

export default {
    components: {
        Totalep,
        Epmap,
        Epperadd,
        Eptrend,
        Epadd,
        EPnotice
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
        }
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
.change-world{
    border: none;
    background-color: white;
    cursor: pointer;
    color: #89303f;
    font-size: 20px;
    margin-left: 5px;
    font-weight: 800;
}
</style>
