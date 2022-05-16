<template>
  <div class="com-container">
    <div class="com-chart" ref="per_ref"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      allData: null,
      chartInstance: null,
      allLength: 0,
    };
  },
  created() {
    this.$socket.registerCallBack("perData", this.getData);
  },
  mounted() {
    this.initChart();
    this.getData();
    this.$socket.send({
      action: "getData",
      socketType: "perData",
      chartName: "VaccineTrendData",
      value: "",
    });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    this.$socket.unRegisterCallBack("perData");
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.per_ref, "vintage");
      var initOption = {
        title: {
          text: "|  各国每百人接种趋势",
          left: 20,
          top: 20,
        },
        grid: {
          left: "3%",
          top: "30%",
          right: "4%",
          bottom: "5%",
          containLabel: true,
        },
        legend: {
          left: 20,
          top: "15%",
          icon: "circle",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          min: 0,
        },
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      const dataArr = await axios.get(
        "https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTrendData"
      );
      // console.log(dataArr.data.data.VaccineTrendData.perHundredTrend)
      this.allData = dataArr.data.data.VaccineTrendData.perHundredTrend;
      this.updateChart();
    },
    updateChart() {
      const index = [
        "中国",
        "印度",
        "印度尼西亚",
        "墨西哥",
        "孟加拉",
        "巴基斯坦",
        "巴西",
        "德国",
        "日本",
        "欧盟",
        "美国",
        "越南",
      ];
      const timeArr = this.allData[index[0]].map((item) => {
        return item.date;
      });

      const dataArr = this.allData[index[0]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr1 = this.allData[index[1]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr2 = this.allData[index[2]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr3 = this.allData[index[3]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr4 = this.allData[index[4]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr5 = this.allData[index[5]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr6 = this.allData[index[6]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr7 = this.allData[index[7]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr8 = this.allData[index[8]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr9 = this.allData[index[9]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr10 = this.allData[index[10]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      const dataArr11 = this.allData[index[11]].map((item) => {
        return item.total_vaccinations_per_hundred;
      });
      this.allLength = timeArr.length;
      const seriesArr = [
        {
          name: index[0],
          type: "line",
          data: dataArr,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[1],
          type: "line",
          data: dataArr1,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[2],
          type: "line",
          data: dataArr2,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[3],
          type: "line",
          data: dataArr3,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[4],
          type: "line",
          data: dataArr4,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[5],
          type: "line",
          data: dataArr5,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[6],
          type: "line",
          data: dataArr6,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[7],
          type: "line",
          data: dataArr7,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[8],
          type: "line",
          data: dataArr8,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[9],
          type: "line",
          data: dataArr9,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
        {
          name: index[10],
          type: "line",
          data: dataArr10,
          stack: "Per",
          areaStyle: {
            opacity: 0.3,
          },
        },
      ];
      var dateOption = {
        xAxis: {
          data: timeArr,
        },
        dataZoom: {
          show: false,
          startValue: this.allLength - 11,
          endValue: this.allLength - 1,
        },
        series: seriesArr,
      };
      this.chartInstance.setOption(dateOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.per_ref.offsetWidth / 100) * 3.5;
      var adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize/2,
          itemHeight: titleFontSize/2,
          textStyle: {
            fontSize: titleFontSize/2
          }
        },
        tooltip: {
          textStyle: {
            fontSize: titleFontSize/3
          }
        }
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>

<style>
</style>
