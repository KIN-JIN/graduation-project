<template>
  <div class="com-container">
    <!-- <div class="total" :style="comStyle">
      全球累计疫苗接种数：
      <span class="world" :style="comStyle2"> {{ totalSet }} 亿剂</span>
    </div> -->
    <div class="com-chart" ref="world_ref"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      total: null,
      Count: 0,
      titleFontSize: 0,
    };
  },
  created() {
    this.$socket.registerCallBack("vaccinationData", this.getData);
  },
  mounted() {
    this.initChart();
    // this.getData();
    this.$socket.send({
      action: "getData",
      socketType: "vaccinationData",
      chartName: "VaccineSituationData",
      value: "",
    });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    this.$socket.unRegisterCallBack("vaccinationData");
  },
  computed: {
    totalSet() {
      const totalCount = this.Count / 100000000;
      let result = parseFloat(totalCount);
      if (isNaN(result)) {
        console.log("数据有误，请重新检查");
      }
      result = Math.round(totalCount * 100) / 100;
      return result;
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize / 2 + "px",
      };
    },
    comStyle2() {
      return {
        fontSize: this.titleFontSize + "px",
      };
    },
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.world_ref, "vintage");
      const ret = await axios.get(
        "http://localhost:8999/static/map/world_Chinese.json"
      );
      // console.log(ret.data)
      this.$echarts.registerMap("worldMap", ret.data);
      var initOption = {
        title: {
          text: "|  全球疫苗接种实时数据实况",
          left: 20,
          top: 20,
        },
        geo: {
          type: "map",
          map: "worldMap",
          top: "15%",
          bottom: "5%",
          roam: true,
        },
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      const dataArr = await axios.get(
        "https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineSituationData"
      );
      this.allData = dataArr.data.data.VaccineSituationData;
      this.total = this.allData.map((item) => {
        return item.total_vaccinations;
      });
      for (let i = 0; i < this.total.length; i++) {
        this.Count += this.total[i];
      }
      this.updateChart();
    },
    updateChart() {
      // console.log(this.allData)
      const dataArr = this.allData.map((item) => {
        // console.log(item)
        return {
          name: item.country,
          value: item.total_vaccinations,
          date: item.date,
        };
      });
      var dataOption = {
        tooltip: {
          show: true,
          formatter: function (arg) {
            return (
              arg.data.name +
              "</br>" +
              "累计疫苗接种:" +
              arg.data.value +
              "剂" +
              "</br>" +
              "更新日期：" +
              arg.data.date
            );
          },
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            data: dataArr,
          },
        ],
        visualMap: [
          {
            min: 100,
            max: 4000000000,
            text: ["40亿", "100"],
            textStyle: {
              // color: "while",
            },
            inRange: {
              color: ["#e6f7ff", "#1890FF", "#0050b3"], // 渐变颜色
            },
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.world_ref.offsetWidth / 100) * 3.5;
      // console.log(this.$refs.world_ref.offsetWidth)
      var adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize/1.5,
          },
        },
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>

<style>
.com-container {
  position: relative;
}
.total {
  position: absolute;
  left: 35%;
  color: black;
  z-index: 1;
}
.world {
  color: #93b469;
}
</style>
