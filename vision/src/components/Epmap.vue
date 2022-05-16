<template>
  <div class="com-container" @dblclick="revertMap">
      <div class="com-chart" ref="epmap_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { getProvinceMapInfo } from "@/utils/map_utils"
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            epmapData: {},
            provinceArr: null,
            proData: null
        }
    },
    created() {
        this.$socket.registerCallBack("epmapData", this.getData)
    },
    mounted() {
        this.initChart();
        this.$socket.send({
        action: "getData",
        socketType: "epmapData",
        chartName: "CityDetail",
        value: "",
        });
        window.addEventListener("resize", this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener("resize", this.screenAdapter)
        this.$socket.unRegisterCallBack("epmapData")
    },
    methods: {
        async initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.epmap_ref,"vintage")
            const ret = await axios.get(
                "http://localhost:8999/static/map/china.json"
            );
            this.$echarts.registerMap("china", ret.data)
            var initOption = {
                tooltip: {
                    formatter: function(reg){
                        return (reg.data.name + '</br>' + '现有确诊：' + reg.data.value + '</br>' + '今日新增：' + reg.data.addData + '</br>' + '本土无症状：' + reg.data.wzz)
                    }
                },
                title: {
                    text: '|  国内疫情地图分布',
                    top: 20,
                    left: 20
                },
                geo: {
                    type: "map",
                    map: "china",
                    top: "10%",
                    // roam: true,
                    bottom: "3%",
                    label: {
                        show:true
                    }
                },
            }
            this.chartInstance.setOption(initOption)
            this.chartInstance.on("click",async (arg) => {
                const provinceInfo = getProvinceMapInfo(arg.name);
                if (!this.epmapData[provinceInfo.key]) {
                    const ret = await axios.get(
                        "http://localhost:8999" + provinceInfo.path
                    );
                    this.epmapData[provinceInfo.key] = ret.data;
                    // 全局echarts对象注册地图
                    this.$echarts.registerMap(provinceInfo.key, ret.data)
                }
                for(let i = 0;i < this.provinceArr.length;i++){
                    if(this.provinceArr[i].name === arg.name){
                        this.proData = this.provinceArr[i].children
                    }
                }
                const proValue = this.proData.map((item) => {
                    return {
                        name: item.name,
                        value: item.total.nowConfirm,
                        addData: item.today.confirm,
                        wzz: item.total.wzz
                    }
                })
                console.log(proValue)
                const changeOption = {
                    tooltip: {
                        formatter: function(reg){
                            return (reg.data.name + '</br>' + '现有确诊：' + reg.data.value + '</br>' + '今日新增：' + reg.data.addData)
                        }
                    },
                    geo: {
                        map: provinceInfo.key,
                    },
                    series: [
                        {
                            type: 'map',
                            geoIndex: 0,
                            data:proValue
                        }
                    ],
                    visualMap: {
                        pieces: [
                            {min: 300},
                            {min:100,max:299},
                            {min:1,max:99}
                        ]
                    }
                }
                this.chartInstance.setOption(changeOption);
            })
        },
        async getData() {
            const dataArr = await axios.get("https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf")
            this.allData = dataArr.data.data.diseaseh5Shelf.areaTree[0].children
            const provinceData = dataArr.data.data.diseaseh5Shelf.areaTree[0].children
            this.provinceArr = provinceData.map((item) => {
                    return {
                        name: item.name,
                        children: item.children
                    }
            })
            this.updateChart()
        },
        updateChart() {
            const mapData = this.allData.map((item) => {
                return {
                    name: item.name,
                    value: item.total.nowConfirm,
                    addData: item.today.confirm,
                    wzz: item.total.wzz
                }
            })
            // console.log(mapData)
            var dataOption = {
                series: [
                    {
                        type: 'map',
                        geoIndex: 0,
                        data: mapData
                    }
                ],
                visualMap: {
                    pieces: [
                        {min: 10000},
                        {min: 1000,max:9999},
                        {min: 500,max: 999},
                        {min: 100,max: 499},
                        {min:10,max: 99},
                        {min: 1,max: 9}
                    ]
                }
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontSize = (this.$refs.epmap_ref.offsetWidth / 100) * 3.5
            var adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize,
                    }
                }
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        revertMap() {
            const revertOption = {
                geo: {
                map: "china",
                },
                tooltip: {
                    formatter: function(reg){
                        return (reg.data.name + '</br>' + '现有确诊：' + reg.data.value + '</br>' + '今日新增：' + reg.data.addData + '</br>' + '本土无症状：' + reg.data.wzz)
                    }
                }
            };
            this.chartInstance.setOption(revertOption)
            this.updateChart()
        }
    }
}
</script>

<style>

</style>