<template>
  <div class="com-container">
      <div class="com-chart" ref="epnotice_ref"></div>
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
    mounted() {
        this.initChart()
        window.addEventListener('resize',this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('resize',this.screenAdapter)
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.epnotice_ref,"vintage")
            const dataArr = [
                {name: '新冠',value: 8},
                {name: '确诊',value: 3},
                {name: '肺炎',value: 5},
                {name: '医护',value: 5},
                {name: '一线',value: 4},
                {name: '中国',value: 5},
                {name: '动态',value: 5},
                {name: '病毒',value: 5},
                {name: '冠状',value: 5},
                {name: '实时',value: 5},
                {name: '数据',value: 3},
                {name: '疫情',value: 3},
                {name: '追踪',value: 3},
                {name: '核酸',value: 4},
            ]
            var initOption = {
                title: {
                    text: '|  注意事项',
                    top: 20,
                    left: 20
                },
                graphic: {
                    elements: [
                    {
                        type: 'text',
                        left: 'center',
                        top: '13%',
                        style: {
                            text: '勤洗手，戴口罩！',
                            fontSize: 70,
                            lineDash: [0, 200],
                            lineDashOffset: 0,
                            fill: 'transparent',
                            stroke: '#f4a9aa',
                            lineWidth: 1
                        },
                        keyframeAnimation: {
                            duration: 3000,
                            loop: true,
                            keyframes: [
                                {
                                    percent: 0.7,
                                    style: {
                                        fill: 'transparent',
                                        lineDashOffset: 200,
                                        lineDash: [200, 0]
                                    }
                                },
                                {
                                    percent: 0.8,
                                    style: {
                                        fill: 'transparent'
                                    }
                                },
                                {
                                    percent: 1,
                                    style: {
                                        fill: '#4d1919'
                                    }
                                }
                            ]
                        }
                    }
                ]
                },
                series: [
                    {
                        top: '18%',
                        type: 'wordCloud',
                        sizeRange: [15, 80],
                        rotationRange: [-90, 90],
                        rotationStep: 45,
                        gridSize: 8,
                        shape: 'Square',
                        textStyle: {
                            color: function () {
                                return 'rgb(' + 
                                    Math.round(Math.random() * 255) +','+
                                    Math.round(Math.random() * 255)+','+
                                    Math.round(Math.random() * 255)
                            }
                        },
                        data:dataArr
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        screenAdapter() {
            const titleFontSize = (this.$refs.epnotice_ref.offsetWidth / 100) * 3.5;
            var adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize,
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