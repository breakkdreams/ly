<!--地图-->
<template>
    <div style="width: 100%;height: 100%;">
        <div ref="chart" class="echarts"></div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    const json = require("./LHMap");
    export default {
        data(){
            return{
                chart: null,
                mapInfo:json,
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(this.$refs.chart);
            var that = this;

            this.init("LinHai");
            this.chart.on('click', function (params) {
                var city = params.data.value;
                window.console.log(params.data);
                window.console.log(params);
                that.init(city)
            });
            // 浏览器自适应
            window.addEventListener('resize', ()=> {
                this.chart.resize();
            })
        },
        methods:{
            init(initData){
                // 指定图表的配置项和数据
                // var mapData = [
                //
                //     {'latitude':28.911139, 'longitude':121.201716, 'name':'大田街道新希望幼儿园', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.908932, 'longitude':121.214184, 'name':'临海市东塍镇中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.908612, 'longitude':121.211643, 'name':'临海市东塍镇中心校', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.928965, 'longitude':121.279441, 'name':'临海市桐峙中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.929863, 'longitude':121.280798, 'name':'临海市汇溪镇中心校', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.854852, 'longitude':121.466618, 'name':'临海市东塍镇第二小学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.964944, 'longitude':121.222291, 'name':'大田初级中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.931469, 'longitude':121.258369, 'name':'临海江南中心小学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.923046, 'longitude':121.20289 , 'name':'临海汛桥镇中心校', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.826816, 'longitude':121.135505, 'name':'临海沿江镇中心校', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.797815, 'longitude':121.182479, 'name':'西岑小学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.74927, 'longitude':121.247081, 'name':'临海市尤溪镇中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.738583, 'longitude':121.309496, 'name':'临海市灵江中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.747137, 'longitude':121.111868, 'name':'临海市杜桥中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.834603, 'longitude':121.133521, 'name':'临海市学海中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.777519, 'longitude':121.508212, 'name':'上盘中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.766684, 'longitude':121.495266, 'name':'桃渚中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.760501, 'longitude':121.604628, 'name':'杜桥第二小学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.833992, 'longitude':121.599904, 'name':'临海市上盘镇中心校', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.768127, 'longitude':121.519365, 'name':'临海市头门港新区幼儿园', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.751542, 'longitude':121.599576, 'name':'临海杜桥市场小学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.731249, 'longitude':121.645981, 'name':'临海杜桥镇大汾巧克力幼儿园', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.765745, 'longitude':121.561679, 'name':'成职教中心', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.747014, 'longitude':121.490158, 'name':'大洋中心校', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.890153, 'longitude':121.199139, 'name':'回浦实验中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.89355, 'longitude':121.195703, 'name':'回浦中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.886792, 'longitude':121.164461, 'name':'台州学院临海校区', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.885385, 'longitude':121.164501, 'name':'涌泉镇中心校', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.88326, 'longitude':121.173077, 'name':'涌泉中学', 'value':100, 'color':'#ff6521'},
                // ]
                // var disAline = [
                //     {'latitude':28.865639, 'longitude':121.161312, 'name':'高级职业中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.860924, 'longitude':120.997773 , 'name':'城西中学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.905503, 'longitude':120.90579 , 'name':'双港小学', 'value':100, 'color':'#ff6521'},
                //     {'latitude':28.960066, 'longitude':120.959857, 'name':'括苍镇中心幼儿园', 'value':100, 'color':'#ff6521'},
                // ];
                this.chart.showLoading();
                window.console.log(initData);
                var result = this.mapInfo[initData]["mapInfo"];

                echarts.registerMap(initData, result); //加载地图数据
                this.chart.hideLoading();
                let option = null;
                this.chart.setOption(option = {
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: function (params) {
                    //         // console.log(params);
                    //         return params.name+"的摄像头个数："+params.value[2];
                    //     }
                    // },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data:['正常','异常'],
                        bottom:"20",
                        textStyle:{//图例文字的样式
                            color:'#ffffff',
                        }
                    },
                    toolbox: {
                        show: false, //此字段表示是否显示或启用
                        //orient: 'vertical', //工具栏
                        left: 'left',
                        top: 'top',
                        feature: {
                            dataView: {
                                readOnly: false
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    geo: {
                        map:initData,
                        //zoom: 1.2,   //地图初始大小，这里是关键，一定要放在 series中  因为geo在series中会加载，所以zoom放在此处
                        //roam: true,

                    },
                    series: [
                        {
                            name: initData,
                            type: 'map',
                            map: initData,
                            data:[{name:"河头镇", value:"htz", label: {
                                    normal: {
                                        show: true,
                                        color:'#333'
                                    },
                                    emphasis: {
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderColor: '#4a86fd', //区域边框颜色
                                        areaColor: '#bfdfe0', //区域填充颜色
                                    },
                                    emphasis: {
                                        areaColor: '#4380fd',
                                        borderWidth: 0
                                    }
                                },}, {name:"上盘镇", value:"spz"}]
                        },
                        // {
                        //     name:"正常",
                        //     type: 'scatter',
                        //     coordinateSystem: 'geo',
                        //     showEffectOn: 'render',
                        //     data: mapData.map(function (itemOpt) { //散点生成
                        //         return {
                        //             name: itemOpt.name,
                        //             value: [
                        //                 itemOpt.longitude,
                        //                 itemOpt.latitude,
                        //                 itemOpt.value
                        //             ],
                        //             label: {
                        //                 formatter: '{b}',
                        //                 position: 'right',
                        //                 show: false,
                        //                 color:'#000'
                        //
                        //             },
                        //             itemStyle: {
                        //                 normal: {
                        //                     color: '#ff6521'
                        //                 }
                        //             }
                        //         };
                        //     })
                        // },
                        // {
                        //     name:"异常",
                        //     type: 'scatter',
                        //     coordinateSystem: 'geo',
                        //     showEffectOn: 'render',
                        //     data: disAline.map(function (itemOpt) { //散点生成
                        //         return {
                        //             name: itemOpt.name,
                        //             value: [
                        //                 itemOpt.longitude,
                        //                 itemOpt.latitude,
                        //                 itemOpt.value
                        //             ],
                        //
                        //
                        //             label: {
                        //                 formatter: '{b}',
                        //                 position: 'right',
                        //                 show: false,
                        //                 color:'#000'
                        //
                        //             },
                        //             itemStyle: {
                        //                 normal: {
                        //                     color: '#000'
                        //                 }
                        //             }
                        //         };
                        //     })
                        // },

                    ]
                },true);
            }
        }
    }
</script>
<style scoped lang="less">
    .echarts{
        width: 100%;
        height: 100%;
    }
</style>
