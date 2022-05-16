<template>
  <div class="com-container">
      <div class="com-chart" ref="epadd_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            chartInstance: null,
            allData: null
        }
    },
    created() {
        this.$socket.registerCallBack("epaddData", this.getData)
    },
    mounted() {
        this.initChart()
        this.$socket.send({
        action: "getData",
        socketType: "epaddData",
        chartName: "chinaDayList",
        value: "",
        })
        window.addEventListener('resize',this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('resize',this.screenAdapter)
        this.$socket.unRegisterCallBack("epaddData")
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.epadd_ref,"vintage")
            var initOption = {
                title: {
                    text: '|  疫情新增数据趋势',
                    top: 20,
                    left: 20
                },
                grid: {
                    left: '3%',
                    top: '23%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true,
                },
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    top: "12%",
                    icon: "circle",
                },
                xAxis: {
                    type: 'category',
                    name: '日期',
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value'
                }
            }
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            const dataArr = await axios.get('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare')
            console.log(dataArr.data.data.chinaDayAddList)
            this.allData = dataArr.data.data.chinaDayAddList
            this.updateChart()
        },
        updateChart() {
            const xAxisArr = this.allData.map(item => {
                return item.date
            })
            const confirmArr = this.allData.map((item) => {
                return item.confirm
            })
            const localConfirmaddArr = this.allData.map(item => {
                return item.localConfirmadd
            })
            const infectArr = this.allData.map(item => {
                return item.infect
            })
            var dataOption = {
                xAxis: {
                    data: xAxisArr
                },
                series: [
                    {
                        type: 'line',
                        name: '全国新增确诊',
                        data: confirmArr,
                        // stack:'epadd',
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color:  "rgba(11,168,44,0.5)",
                            },
                            {
                                offset: 1,
                                color:  "rgba(11,168,44,0)",
                            },
                            ]),
                        }
                    },
                    {
                        type: 'line',
                        name: '本土新增确诊',
                        data: localConfirmaddArr,
                        // stack:'epadd',
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color:  "rgba(44,110,255,0.5)",
                            },
                            {
                                offset: 1,
                                color:  "rgba(44,110,255,0)",
                            },
                            ]),
                        }
                    },
                    {
                        type: 'line',
                        name: '无症状感染新增',
                        data: infectArr,
                        // stack:'epadd',
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color:  "rgba(22,242,217,0.5)",
                            },
                            {
                                offset: 1,
                                color:  "rgba(22,242,217,0)",
                            },
                            ]),
                        }
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
           const titleFontSize = (this.$refs.epadd_ref.offsetWidth / 100) * 3.5
            var adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize
                    }
                },
                legend: {
                    itemWidth: titleFontSize/2,
                    itemHeight: titleFontSize/2,
                    itemGap: titleFontSize/2,
                    textStyle: {
                        fontSize: titleFontSize / 2,
                    }
                }
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        }
    }
}
</script>

<style>

</style>