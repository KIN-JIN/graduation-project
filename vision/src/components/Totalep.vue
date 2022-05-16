<template>
  <div class="com-container">
      <div class="com-chart" ref="totalep_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            chartInstance: null,
            allData: null
        }
    },
    created() {
    this.$socket.registerCallBack("totalepData", this.getData);
    },
    mounted() {
        this.initChart();
        this.$socket.send({
        action: "getData",
        socketType: "totalepData",
        chartName: "CityDetail",
        value: "",
        });
        window.addEventListener("resize", this.screenAdapter);
        this.screenAdapter();
    },
    destroyed() {
        window.removeEventListener("resize", this.screenAdapter);
        this.$socket.unRegisterCallBack("totalepData");
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.totalep_ref,"vintage")
            var initOption = {
                tooltip: {
                    formatter: function(reg){
                        return (reg.data.name + '\n' + reg.data.value + '</br>' + '较上日增' + reg.data.addData)
                    }
                },
                title: {
                    text: '|  国内疫情情况',
                    top: 20,
                    left: 20
                },
                series: [
                    {
                        type: 'sunburst'
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            const dataArr = await axios.get("https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf")
            this.allData = dataArr.data.data.diseaseh5Shelf
            // console.log(this.allData)
            this.updateChart()
        },
        updateChart() {
            const addArr = this.allData.chinaAdd
            const totalArr = this.allData.chinaTotal
            // console.log(addArr)
            const data = [{
                name: '国内累计确诊',
                value: totalArr.confirm,
                addData: addArr.confirm,
                itemStyle: {
                    color: '#5e90b8'
                },
                children: [
                    {
                        name: '现有确诊',
                        value: totalArr.nowConfirm,
                        addData: addArr.nowConfirm,
                        itemStyle: {
                                    color: '#658a98'
                        },
                        children: [
                            {
                                name: '本土现有确诊',
                                value: totalArr.localConfirm,
                                addData: addArr.localConfirm,
                                itemStyle: {
                                    color: '#d2ae8c'
                                }
                            },
                            {
                                name: '无症状感染者',
                                value: totalArr.noInfect,
                                addData: addArr.noInfect,
                                itemStyle: {
                                    color: '#e7bb7c'
                                }
                            },
                            {
                                name: '境外输入',
                                value: totalArr.importedCase,
                                addData: addArr.importedCase,
                                itemStyle: {
                                    color: '#bb848c'
                                }
                            }
                        ]
                    },
                    {
                        name: '累计死亡',
                        value: totalArr.dead,
                        addData: addArr.dead,
                        itemStyle: {
                            color: '#84c0be'
                        }
                    }
                ]
            }]
            // console.log(data)
            var dataOption = {
                series: [
                    {
                        data: data,
                        radius: [0, '90%'],
                        label: {
                            rotate: 'radial'
                        }
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontSize = (this.$refs.totalep_ref.offsetWidth / 100) * 3.5;
            var adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize,
                    }
                },
                series: [
                    {
                        label: {
                            fontSize: titleFontSize / 3
                        }
                    }
                ]
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        }
    }
}
</script>

<style>

</style>