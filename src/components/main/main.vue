<style scoped>
    .layout{
        /*border: 1px solid #d7dde4;*/
        background: #f5f7f9;
        position: relative;
        /*border-radius: 4px;*/
        overflow: hidden;
    }
    .logo-con{
        height: 64px;
        padding: 10px;
    }
    .logo-con img{
        height: 44px;
        width: auto;
        display: block;
        margin: 0 auto;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        display: flex;
        justify-content: space-between;
        padding: 0 50px 0 0px;
    }
    .main-content-con{
        height: calc(100vh - 160px);
        overflow: hidden;
        overflow-y: scroll;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout" >
        <Layout class="main">
            <Sider  ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" style="height: 100vh">
                <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" :menu-list="menuList" @on-select="turnToPage">
                    <div class="logo-con">
                        <img  :src="minLogo"  />
                    </div>
                </side-menu>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                    <div>
                        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px'}" type="md-menu" size="24"></Icon>
                        <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
                    </div>


                    <div class="user-logo">
                        <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
                        <user  :message-unread-count="0" :user-avatar="img"/>

                    </div>
                </Header>
                <Content class="main-content-con">
                    <Layout class="main-layout-con">
                        <div class="tag-nav-wrapper">
                            <tags-nav :value="$route" @input="handleClick" :list="tagsNav" @on-close="closeClick"/>
                        </div>
                        <Content class="content-wrapper" >
                            <div style="background-color:#fff;height:100%" id='i2'>
                           <keep-alive :include="cacheList">
                                    <router-view></router-view>
                           </keep-alive>
                             </div>
<!--                            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>-->
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import minLogo from '@/assets/logo.png'
    import headImg from '@/assets/11.jpeg'
    import route from '@/router/modules/route';
    import user from './component/user'
    import SideMenu from './component/side-menu'
    import TagsNav from './component/tags-nav'
    import fullscreen from './component/fullscreen'
    import { mapMutations} from 'vuex'
    import {  routeEqual } from '@/libs/common'
    import routers from '@/router/modules/route'
    import customBreadCrumb from './component/custom-bread-crumb'
    import './main.less'
    //import 'swiper/dist/css/swiper.css'
    export default {
        inject:["app"],
        data () {
            return {
                isCollapsed: false,
                minLogo,
                route,
                collapsed:false,
                img:headImg,
                isFullscreen:false

            }
        },
        components:{
            user,
            SideMenu,
            TagsNav,
            fullscreen,
            customBreadCrumb
        },
        computed: {
            breadCrumbList () {
                return this.$store.state.app.breadCrumbList
            },
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            tagNavList () {
                return this.$store.state.app.tagNavList
            },
            menuList () {
                return this.$store.getters.menuList
            },
            tagsNav () {
                return this.$store.state.app.tagNavList
            },
            cacheList () {
                const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
                // const x1 = (this.tagNavList.length);
                window.console.log(list, 111);
                return list
            },
        },
        methods: {
            ...mapMutations([
                'addTag',
                'closeTag',
                'setTagNavList',
                'setBreadCrumb',
                'setHomeRoute'
            ]),
            collapsedSider () {
                this.collapsed = !this.collapsed;
                this.$refs.side1.toggleCollapse();
            },
            turnToPage:function(route){
                // window.console.log(route);
                let { name, params, query } = {}
                if (typeof route === 'string') name = route
                else {
                    name = route.name
                    params = route.params
                    query = route.query
                }
                if (name.indexOf('isTurnByHref_') > -1) {
                    // window.console.log(name)
                    window.open(name.split('_')[1])
                    return
                }

                this.$router.push({
                    name,
                    params,
                    query
                })
            },
            handleClick (item) {
                if(routeEqual(item, this.$route))
                    return ;
                this.turnToPage(item.name)
            },
            closeClick:function(res, type, route){
                // window.console.log(res, type, route);
                if (type !== 'others') {
                    if (type === 'all') {
                    this.turnToPage(this.$config.homeName)
                    } else {
                    if (routeEqual(this.$route, route)) {
                        this.closeTag(route)
                    }
                    }
                }
                this.setTagNavList(res)
            }
        },
        mounted() {
            this.setTagNavList();
            this.setHomeRoute(routers)
            this.setBreadCrumb(this.$route)
            const { name, params, query, meta } = this.$route;
            this.addTag({
                route: { name, params, query, meta }
            });
            // window.console.log(this.menuList, 233);

        },
        watch:{
            "$route"(newRoute){
                if(this.app.oWebControl != "" )
                {
                     window.console.log(newRoute.name );
                    if(newRoute.name != "showVideo")
                        this.app.oWebControl.JS_HideWnd();
                    else
                    {
                        window.console.log(14565);
                        this.app.oWebControl.JS_ShowWnd();
                    }
                }
                // window.console.log(newRoute);
                 window.console.log(newRoute, 1111);
                let route = newRoute;
                this.setBreadCrumb(newRoute)
                this.addTag({route});
            }
        }
    }
</script>
<style lang="less">
    .user-logo{
        display: flex;
    }
    #i1{
        background-color:#f0f0f0;
    }
    #i1{}
    .main .main-layout-con{background: #f0f0f0;}
    .main .content-wrapper{
        padding: 0;
        margin: 15px 0 15px 15px;
        background: '#fff';
        min-Height: '260px'
    }
</style>
