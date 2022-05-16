<template>
  <div class="com-container">
      <div class="com-chart" ref="sort_ref"></div>
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
        this.$socket.registerCallBack("sortData", this.getData);
    },
    mounted() {
        this.initChart()
        // this.getData()
        this.$socket.send({
            action: "getData",
            socketType: "sortData",
            chartName: "vaccination",
            value: "",
        });
        window.addEventListener('resize',this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('resize',this.screenAdapter)
        this.$socket.unRegisterCallBack("sortData");
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.sort_ref,"vintage")
            var initOption = {
                tooltip: {
                    formatter: function(arg){
                        // console.log(arg)
                        return (arg.data.name + '\n' + '研制单位如下：' + "</br>" + arg.data.children)
                    }
                },
                title: {
                    text: '|  累计疫苗接种前20国疫苗研制单位',
                    left: 20,
                    top: 20
                },
                series: [
                    {
                        type: 'pie'
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        getData(ret) {
            this.allData = ret.data.VaccineSituationData
            this.updatechart()
        },
        async updatechart() {
            const countArr = []
            for(let i = this.allData.length-1;i >= 0;i--){
                countArr.push(i)
            }
            const seriesArr = this.allData.map((item,index) => {
                return {
                    name: item.country,
                    value: countArr[index]-180,
                    children: item.vaccinations
                }
            })
            let seriesArr1 = []
            for(let i = 0;i < 20;i++){
                seriesArr1.push(seriesArr[i])
            }
            var dataOption = {
                series: [
                    {
                        data: seriesArr1,
                        roseType:'radius',
                        selectedMode:'single',

                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontSize = (this.$refs.sort_ref.offsetWidth / 100) * 3.5;
            const innerRadius = titleFontSize * 2;
            const outterRadius = innerRadius * 2;
            var adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize / 1.2 ,
                    },
                },
                series: [
                    {
                        type: "pie",
                        radius: [innerRadius, outterRadius],
                        label: {
                            fontSize: titleFontSize / 2
                        },
                        selectedOffset: titleFontSize / 1.5
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
