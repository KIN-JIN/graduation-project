<template>
  <div class="com-container">
      <div class="com-chart" ref="epperadd_ref">zujian</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            currentPage: 1, // 当前显示的页数
            totalPage: 0, // 一共有多少页
            timerId: null, // 定时器标识
        }
    },
    created() {
        this.$socket.registerCallBack("epperaddData", this.getData)
    },
    mounted() {
        this.initChart()
        this.$socket.send({
        action: "getData",
        socketType: "epperaddData",
        chartName: "CityDetail",
        value: "",
        })
        window.addEventListener("resize", this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener("resize", this.screenAdapter)
        this.$socket.unRegisterCallBack("epmapData")
        clearInterval(this.timerId)
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.epperadd_ref,"vintage")
            var initOption = {
                tooltip: {
                    formatter: function(arg){
                        // console.log(arg)
                        return (arg.data.province+arg.data.name+'</br>'+'日新增：'+arg.data.value+'</br>'+'日期：'+arg.data.date)
                    },
                },
                grid: {
                    top: "25%",
                    left: "10%",
                    right: "5%",
                    bottom: "15%",
                    containterLabel: true,
                },
                title: {
                    text: '|  各城市日新增确诊',
                    top: 20,
                    left: 20
                },
                xAxis: {
                    type: 'category',
                    name: '城市'
                },
                yAxis: {
                    type: 'value'
                },
                series:[
                    {
                        type: 'bar'
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
            this.chartInstance.on("mouseover", () => {
                clearInterval(this.timerId)
            })
            this.chartInstance.on("mouseout", () => {
                this.startInterval()
            })
        },
        async getData() {
            const dataArr = await axios.get("https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf")
            // console.log(dataArr.data.data.statisGradeCityDetail)
            this.allData = dataArr.data.data.statisGradeCityDetail.map((item) => {
                return {
                    name: item.city,
                    value: item.confirmAdd,
                    province: item.province,
                    date: item.date
                }
            })
            this.allData.sort((a,b) => {
                return b.value - a.value
            })
            this.updateChart()
            this.startInterval()
        },
        updateChart() {
            let dataArr = []
            for(let i=0;this.allData[i].value>0;i++){
                dataArr.push(this.allData[i])
            }
            this.totalPage =
                dataArr.length % 10 === 0
                ? dataArr.length / 10
                : dataArr.length / 10 + 1;
            // console.log(this.totalPage)
            const start = (this.currentPage - 1) * 10;
            const end = this.currentPage * 10;
            const showDate = dataArr.slice(start, end);
            const addName = showDate.map((item) => {
                return item.name;
            });
            const addValue = showDate.map((item) => {
                return {
                    name: item.name,
                    value: item.value,
                    province: item.province,
                    date: item.date
                };
            });
            var dataOption = {
                xAxis: {
                    data: addName
                },
                series:[
                    {
                        data: addValue,
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
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontSize = (this.$refs.epperadd_ref.offsetWidth / 100) * 3.5
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
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        startInterval() {
            if (this.timerId) {
                clearInterval(this.timerId);
            }
            this.timerId = setInterval(() => {
                this.currentPage++;
                if (this.currentPage > this.totalPage) {
                this.currentPage = 1;
                }
                this.updateChart();
            }, 3000);
        }
    }
}
</script>

<style>

</style>