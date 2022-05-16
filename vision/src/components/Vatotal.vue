<template>
  <div class="com-container">
    <div class="com-chart" ref="totalep_ref"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
    };
  },
  created() {
    this.$socket.registerCallBack("vatatolData", this.getData);
  },
  mounted() {
    this.initChart();
    this.$socket.send({
      action: "getData",
      socketType: "vatatolData",
      chartName: "CityDetail",
      value: "",
    });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    this.$socket.unRegisterCallBack("vatatolData");
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.totalep_ref,
        "vintage"
      );
      var initOption = {
        tooltip: {
          formatter: function (reg) {
            return (
              reg.data.name +
              "\n" +
              reg.data.value + "亿剂" +
              "</br>" +
              "较上日增" +
              reg.data.addData + "万剂" +
              "</br>" +
              "每百人接种" +
              reg.data.perData + '剂'
            );
          },
        },
        title: {
          text: "|  全球疫苗接种情况",
          top: 20,
          left: 20,
        },
        series: [
          {
            type: "sunburst",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      const dataArr = await axios.get(
        "https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTopData"
      );
      this.allData = dataArr.data.data.VaccineTopData;
      console.log(this.allData);
      this.updateChart();
    },
    updateChart() {
      const globalArr = this.allData["全球"];
      const chinaArr = this.allData["中国"];
      const data = [
        {
          name: "全国累计接种",
          value: this.totalSet(globalArr.total_vaccinations),
          addData: this.totalSet1(globalArr.new_vaccinations),
          perData: globalArr.total_vaccinations_per_hundred,
          itemStyle: {
            color: "#5e90b8",
          },
          children: [
            {
              name: "中国累计接种",
              value: this.totalSet(chinaArr.total_vaccinations),
              addData: this.totalSet1(chinaArr.new_vaccinations),
              perData: chinaArr.total_vaccinations_per_hundred,
              itemStyle: {
                color: "#658a98",
              },
            },
          ],
        },
      ];
      var dataOption = {
        series: [
          {
            data: data,
            radius: [0, "90%"],
            label: {
              rotate: "radial",
            },
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.totalep_ref.offsetWidth / 100) * 3.5;
      var adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            label: {
              fontSize: titleFontSize / 3,
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    totalSet(arg) {
      const totalCount = arg / 100000000;
      let result = parseFloat(totalCount);
      if (isNaN(result)) {
        console.log("数据有误，请重新检查");
      }
      result = Math.round(totalCount * 10) / 10;
      return result;
    },
    totalSet1(arg) {
      const totalCount = arg / 10000;
      let result = parseFloat(totalCount);
      if (isNaN(result)) {
        console.log("数据有误，请重新检查");
      }
      result = Math.round(totalCount * 10) / 10;
      return result;
    }
  }
};
</script>

<style>
</style>