<template>
    <div id="i1" style="width: 100%">
        <div class="demo">
            <p>摄像点选择:</p>
            <el-input
                    size="small"
                    placeholder="输入关键字搜索"
                    v-model="filterText">
            </el-input>
            <el-tree
                    class="filter-tree"
                    :data="data"
                    :props="defaultProps"
                    :filter-node-method="filterNode"
                    @node-click="gotoMap"
                    ref="tree">
            </el-tree>
        </div>
        <div class="map_box">
            <div id="content" v-cloak>
                <div id="container" class="map"></div>
                <div id="xy" style="color: red;height: 80px;width: 160px;"></div>
            </div>
            <!-- <Hik class="videobox" ref="H1" :openOWebName="ddd"></Hik> -->
        </div>
        <videoDialog class="dialog" :visible.sync="videoVisible" >
            <div class="videobox">
                <div class="demo">
                    <p>摄像点选择:</p>
                    <el-input style="padding: 10px"
                            size="small"
                            placeholder="输入关键字搜索"
                            v-model="filterText">
                    </el-input>
                    <el-tree
                            class="filter-tree"
                            :data="data"
                            :props="defaultProps"
                            :filter-node-method="filterNode"
                            ref="tree">
                    </el-tree> <!-- @node-click="gotoMap" -->
                </div>
                <Hik class="videobox" ref="H1" :openOWebName="ddd"></Hik>
            </div>

        </videoDialog>
    </div>
</template>
<script>
    import { Input,Tree,Button} from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
    import 'iview/dist/styles/iview.css'
    import Hik from "./component/Hik"
    import videoDialog from './videoDialog'
    export default {
        inject:["app"],
        components:{
            [Input.name]:Input,
            [Tree.name]:Tree,
            [Button.name]:Button,
            Hik,
            videoDialog
        },
        data(){
            return{
                filterText: '',
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                lineArr:[[121.434756, 28.666385], [121.437235, 28.660603], [121.435004, 28.657439], [121.426592, 28.638458], [121.425734, 28.636499], [121.411658, 28.637253], [121.412001, 28.664971], [121.397067, 28.664218], [121.395865, 28.643882]],
                tzSite:[121.15923,28.861499],//台州的坐标
                map:{},//地图
                marker:{},//点标记
                isPath:false,
                pline:{},
                markerArr:[
                    {id:1,isSign:false,unit:0,text:'单',xy:[121.156569,28.86646],line:[[121.156569,28.86646],[121.140984,28.853966],[121.106308,28.859078]]},
                    {id:2,isSign:false,unit:0,text:'车',xy:[121.214848,28.871721],line:[[121.214848,28.871721],[121.193855,28.892148],[121.211365,28.921301]]},
                    {id:3,isSign:false,unit:0,text:'车',xy:[121.150561,28.830675],line:[[121.150561,28.830675],[121.151798,28.810491],[121.131027,28.815605]]}
                ],
                videoVisible:false,
                ddd:'aWebControl',
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        created:function(){
            let _this=this
            window. markerHint= _this.markerHint
            window. opvideo= _this.opvideo
            window. polyline= _this.polyline
            window.markerClick=_this.markerClick
        },
        mounted: function () {
            this.startMap();//地图
            this.getxy();//经纬度
            this.redian();//热点
            this.addsite();//标点
            this.getList()//获取地区列表
            this.resize()//实时更改视频插件窗口大小
        },
        methods:{
            videoinit(){//初始化视频插件
                this.$refs.H1.init(()=>{
                    this.$refs.H1.initVideo()
                    this.$refs.H1.resizeWindow(this.$refs.H1.$el.offsetHeight,this.$refs.H1.$el.offsetWidth);//初始化大小
                });
            },
            hideVideo(){//隐藏视频插件
                this.app[this.ddd].JS_HideWnd();
            },
            resize(){//视频插件窗口大小
                const that = this
                window.onresize = () => {
                    var target = this;
                    if (target.resizeFlag) {
                        clearTimeout(target.resizeFlag);
                    }
                    target.resizeFlag = setTimeout(function() {
                        console.log(that.$refs.H1.$el.offsetHeight)
                        that.$refs.H1.resizeWindow(that.$refs.H1.$el.offsetHeight,that.$refs.H1.$el.offsetWidth);
                        target.resizeFlag = null;
                    }, 200);
                    // that.$refs.H1.resizeWindow(that.$refs.H1.$el.offsetHeight,that.$refs.H1.$el.offsetWidth);
                    // console.log('高度',that.$refs.H1.$el.offsetHeight)
                    // console.log('宽度',that.$refs.H1.$el.offsetWidth)
                }
            },
            getList(){ //获取地区列表
                let params ={};
                params = this.$secret_key.func(this.$store.state.on_off, params);
                this.$https.fetchPost('/plugin/statistics/api_index/getSchoolDir').then((res) => {
                    var res_data = this.$secret_key.func(this.$store.state.on_off, res ,"key");
                    this.data = res_data
                })
            },
            gotoMap(data){//地图跳转
                let _this=this
                if(data.parentIndexCode){
                    _this.map.setZoomAndCenter(12, [data.longitude,data.latitude]);
                }else if(!data.children){
                    _this.map.setZoomAndCenter(17, [data.longitude-0.0058,data.latitude-0.0056]);
                    _this.tzSite=[data.longitude-0.0058,data.latitude-0.0056];
                }
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //地图
            startMap:function(){
                let _this=this
                _this.map = new AMap.Map('container', {
                    resizeEnable: true,//监听尺寸变化
                    center: _this.tzSite,
                    zoom: 12,
                    isHotspot: true//是否开启地图热点和标注效果
                });
            },

            //点击经纬度
            getxy:function(){
                let _this=this
                _this.map.on('click', function (e) {
                    $("#xy").text(e.lnglat.getLng() + ',' + e.lnglat.getLat())
                });
            },
            //添加点标记,
            addsite: function () {
                let _this=this
                _this.markerArr.map((va,key) => {
                    // console.log(key)
                    _this.marker = new AMap.Marker({
                        position: va.xy,
                        map: _this.map,
                        offset: new AMap.Pixel(-13, -30)
                    });
                    _this.marker.content = '<div style="width: 200px">选择操作</div><a class=\'btn btn-info\' onclick=\'opvideo()\' style="margin-left: 12px;margin-top: 10px">查看监控</a><a class=\'btn btn-info\' onclick=\'polyline('+key+')\' style="margin-left: 12px;margin-top: 10px">查看轨迹</a></div>';
                    _this.marker.on('click', markerClick);
                    _this.marker.emit('click', {target: _this.marker});
                    _this.marker.setMap(_this.map);
                })
            },
            markerClick:function(e) {
                // console.log(e)console
                let _this=this
                _this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                _this.infoWindow.setContent(e.target.content);
                _this.infoWindow.open(_this.map, e.target.getPosition());
            },
            //轨迹
            polyline:function(key){
                let _this=this
                let line=_this.markerArr[key]
                _this.pline=new AMap.Polyline({
                    map: _this.map,
                    path: line.line,
                    showDir: true,
                    strokeColor: "#28F",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6,      //线宽
                    // strokeStyle: "solid"  //线样式
                });
            },
            //查看监控
            opvideo:function(){
                this.videoVisible = true
                this.videoinit()
                // alert('监控视频');
                return false;
            },
            //返回学校列表
            // returnList(){
            //     this.buttonif = false
            //     this.hideVideo()
            // },
            //显示热点
            redian:function(){
                let _this=this
                let placeSearch = new AMap.PlaceSearch();  //构造地点查询类
                let infoWindow = new AMap.InfoWindow({});//信息
                _this.map.on('hotspotclick', function (result) {
                    placeSearch.getDetails(result.id, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            let poiArr = result.poiList.pois;
                            let location = poiArr[0].location;
                            let code=[];
                            code[0]=poiArr[0].name.indexOf("学");
                            code[1]=poiArr[0].name.indexOf("幼儿园");
                            code[2]=poiArr[0].name.indexOf("校");
                            if(code[0]>0||code[1]>0||code[2]>0){
                                infoWindow.setContent(_this.createContent(poiArr[0]));
                                infoWindow.open(_this.map, location);
                            }

                        }
                    });
                });
            },
            createContent:function(e){
                let s = [];
                s.push('<div style="width: 200px">是否查看【' + e.name + '】视频？</div><a class=\'btn btn-info\' onclick=\'opvideo()\' style="margin-left: 12px;margin-top: 10px">查看视频</a>');
                s.push('<div>');
                return s.join("<br>");
            },
            //绘制轨迹
            addpath: function () {
                marker.moveAlong(lineArr, 1000);
            }
        }
    }
</script>
<style scoped lang="less">
    #i1{
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .videobox{
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .demo{
        // width: 18%;
        // float: left;
        min-width: 200px;
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
        background: #fff;
        overflow: auto;
         transition: all .8s ease;
    }
    .map_box{
        // float: left;
        // width: 82%;
        flex: 1;
        height: 100%;
        max-width: calc(~'100% - 200px');
    }
    .videobox{
        width: 100%;
        height: 100%;
    }
    .map{height:100vh;width:100%;float:left;}
    .info-content img{float:left;margin:3px;}
    .amap-info-combo .keyword-input{height:auto;}
    .btn-info{margin-left: 6px;}
    [v-cloak] {
        display: none;
    }
    .el-tree /deep/ .el-tree-node{
        .el-tree-node__content{
            height: auto;
            &>.el-tree-node__label{
                line-height: 2.2rem;
            }
        }
        .el-tree-node__children{
            .el-tree-node{
                .el-tree-node__content{
                    .el-tree-node__expand-icon{padding: 0;}
                    .el-tree-node__label{font-size: 0.9rem;color:#666;}
                }
            }
        }
    }

    .tree_input{
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        padding-top: 10px;
        .el-input{flex: 1;}
        button{
            margin-left: 5px;
            font-size: 12px;
        }
    }
</style>
