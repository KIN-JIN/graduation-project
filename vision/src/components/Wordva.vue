<template>
  <div class="com-container">
      <div class="com-chart" ref="wordva_ref"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            chartInstance: null,
            allData: null
        }
    },
    created() {
        this.$socket.registerCallBack("wordvaData", this.getData);
    },
    mounted() {
        this.initChart()
        this.$socket.send({
            action: "getData",
            socketType: "wordvaData",
            chartName: "vaccination",
            value: "",
        });
        window.addEventListener('resize',this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('resize')
        this.$socket.unRegisterCallBack("wordvaData",this.screenAdapter);
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.wordva_ref,"vintage")
            var initOption = {
                title:{
                    text: '|  疫苗关键词',
                    left: 20,
                    top: 20
                }
            }
            this.chartInstance.setOption(initOption)
        },
        getData(ret) {
            this.allData = ret.data.VaccineSituationData
            // console.log(this.allData)
            this.updateChart()
        },
        updateChart() {
            const dataArr = this.allData.map((item,index) => {
                return {
                    name: item.vaccinations,
                    value: 1/(index+1)
                }
            })
            const nameData = this.allData.map((item,index) => {
                return {
                    name: item.country,
                    value: 10/(index+1)
                }
            })
            const nameList = []
            for(let i=0;i<20;i++){
                nameList.push(nameData[i])
            }
            for(let i=0;i<5;i++){
                nameList.push(dataArr[i])
            }
            const colorList = [
                "#2084D9",
                "#17BB51",
                "#8B70F5",
                "#00FCFF",
                "#F9BD3D",
                '#FD626C'
            
            ]
            var dataOption = {
                series: [
                    {
                        type: 'wordCloud',
                        sizeRange: [15, 80],
                        rotationRange: [0, 0],
                        rotationStep: 45,
                        gridSize: 8,
                        shape: 'diamond',//pentagon、cardioid
                        textStyle: {
                            color: function () {
                                return 'rgb(' + 
                                    Math.round(Math.random() * 255) +','+
                                    Math.round(Math.random() * 255)+','+
                                    Math.round(Math.random() * 255)
                            }
                        },
                        data:nameList
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            this.titleFontSize = (this.$refs.wordva_ref.offsetWidth / 100) * 3.5;
            var adapterOption = {
                title: {
                    textStyle: {
                        fontSize: this.titleFontSize,
                    },
                },
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        }
    }
}
</script>

<style>

</style>
