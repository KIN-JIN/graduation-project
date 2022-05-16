<template>
  <div class="com-container">
    <div class="com-chart" ref="total_ref"></div>
    <div class="add">
      <span :style="setStyle1">较上日新增（剂）</span>
      <span :style="setStyle" class="setAdd">{{ setAdd }}万 </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      // 通过区域缩放的功能进行平移
      startValue: 0, // 区域开始值
      endValue: 9, // 区域结束值
      timeId: null, // 定时器
      addData: 0,
      fontSize: 0
    };
  },
  created() {
    this.$socket.registerCallBack("totalvaData", this.getData);
  },
  computed: {
    setAdd() {
      return this.addData/10000
    },
    setStyle(){
      return {
        fontSize: this.fontSize + 'px'
      }
    },
    setStyle1(){
      return {
        fontSize: this.fontSize/2 + 'px'
      }
    }
  },
  mounted() {
    this.initChart();
    this.$socket.send({
      action: "getData",
      socketType: "totalvaData",
      chartName: "ChinaVaccineTrendData",
      value: "",
    });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timeId);
    this.$socket.unRegisterCallBack("totalvaData");
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.total_ref, "vintage");
      var initOption = {
        title: {
          text: "|  中国累计接种趋势",
          left: 20,
          top: 20,
        },
        grid: {
          top: "40%",
          left: "10%",
          right: "5%",
          bottom: "15%",
          containterLabel: true,
        },
        tooltip: {},
        xAxis: {
          type: "category",
          name: "日期",
        },
        yAxis: {
          type: "value",
          min: 3000000000,
          name: "(剂)",
        },
        series: [
          {
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timeId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    async getData() {
      const dataArr = await axios.get(
        "https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=ChinaVaccineTrendData"
      );
      this.allData = dataArr.data.data.ChinaVaccineTrendData;
      this.allData.sort((a, b) => {
        return b.total_vaccinations - a.total_vaccinations;
      });
      this.updateChart();
      this.startInterval();
    },
    updateChart() {
      const nameArr = this.allData.map((item) => {
        return item.date;
      });
      const valueArr = this.allData.map((item) => {
        return item.total_vaccinations;
      });
      this.addData = valueArr[0] - valueArr[1]
      console.log(this.addData)
      var dataOption = {
        xAxis: {
          data: nameArr,
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: () => {
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#a9f99e",
                  },
                  {
                    offset: 1,
                    color: "#46add5",
                  },
                ]);
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.total_ref.offsetWidth / 100) * 3.5;
      this.fontSize = titleFontSize
      var adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              borderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId);
      }
      this.timeId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        if (this.endValue > 16) {
          this.startValue = 0;
          this.endValue = 9;
        }
        this.updateChart();
      }, 3000);
    },
  },
};
</script>

<style>
.com-container{
  position: relative;
}
.add{
  position: absolute;
  top: 15%;
  left: 5%;
  z-index: 1;
}
.setAdd{
  color: #93b469;
}
</style>
