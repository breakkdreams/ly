import Linhai_login from '@/components/pc/Linhai/Linhai_login.vue'
import Linhai_index from '@/components/pc/Linhai/Linhai_index.vue'
import Linhai_index2 from '@/components/pc/Linhai/Linhai_index2.vue'
import Linhai_index3 from '@/components/pc/Linhai/Linhai_index3.vue'
import Linhai_index4 from '@/components/pc/Linhai/Linhai_index4.vue'
import Linhai_index5 from '@/components/pc/Linhai/Linhai_index5.vue'
import Linhai_index6 from '@/components/pc/Linhai/Linhai_index6.vue'
import Linhai_index7 from '@/components/pc/Linhai/Linhai_index7.vue'
import Linhai_index8 from '@/components/pc/Linhai/Linhai_index8.vue'
import Linhai_index9 from '@/components/pc/Linhai/Linhai_index9.vue'

//学校路由
import Maintain_list from '@/components/pc/Linhai/School2/Maintain_list.vue'
import Message_edit from '@/components/pc/Linhai/School2/Message_edit.vue'
import Report_msg from '@/components/pc/Linhai/School2/Report_msg.vue'

//网格员路由
import Wgy_home from '@/components/pc/Linhai/School/Wgy_home.vue'
import School_list from '@/components/pc/Linhai/School/School_list.vue'
import Violation_list from '@/components/pc/Linhai/School/Violation_list.vue'
import Alert_monitor from '@/components/pc/Linhai/School/Alert_monitor.vue'

import showVideo from '@/components/pc/Linhai/showVideo.vue'
import Main from '@/components/main'

export default [
    {
        path:'/login',
        name:'login',
        meta: {
            //icon: 'logo-buffer',
            hideInMenu: true,
            title: '登录页'
        },
        component: Linhai_login
    },
    {
        path: '/',
        name: '_home',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '首页'
        },
        children:[

            {
                path: '/Linhai_index',
                name: 'Linhai_index',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '数据大屏'
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: Linhai_index
            },
            {
                path: '/home',
                name: 'home',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '首页'
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: showVideo
            },
            {
                path: '/Linhai_index5',
                name: 'Linhai_index5',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '首页1'
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: Linhai_index5
            },

            {
                path: '/Linhai_index',
                name: 'Linhai_index',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '数据大屏'
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: Linhai_index
            },


        ]
    },
    {
        path: '/command',
        name: 'command',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '指挥中心'
        },
        children:[
            {
                path: 'Linhai_index4',
                name: 'Linhai_index4',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '指挥中心'
                },
                component: Linhai_index4
            },
        ]
    },
    {
        path: '/monitor',
        name: 'monitor',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '查看监控'
        },
        children:[
            // {
            //     path: 'Linhai_index2',
            //     name: 'Linhai_index2',
            //     meta: {
            //         icon: 'md-arrow-dropdown-circle',
            //         title: '实时监控'
            //     },
            //     component: Linhai_index2
            // },
            {
                path: 'Linhai_index3',
                name: 'Linhai_index3',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '单兵监控'
                },
                component: Linhai_index3
            },
            {
                path: 'Linhai_index5',
                name: 'Linhai_index5',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '车载监控'
                },
                component: Linhai_index5
            },
            {
                path: 'Linhai_index6',
                name: 'Linhai_index6',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '录像检索'
                },
                component: Linhai_index6
            },
        ]
    },
    {
        path: '/Intelligence',
        name: 'Intelligence',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '智能分析'
        },
        children:[
            {
                path: 'Linhai_index7',
                name: 'Linhai_index7',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '重点人员监控'
                },
                component: Linhai_index7
            },
            {
                path: 'Linhai_index8',
                name: 'Linhai_index8',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '陌生人员监控'
                },
                component: Linhai_index8
            },
            {
                path: 'Linhai_index9',
                name: 'Linhai_index9',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '数据对比'
                },
                component: Linhai_index9
            },
            {
                path: 'Linhai_index10',
                name: 'Linhai_index10',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '学校列表展示'
                },
                component: Linhai_index9
            },
        ]
    },

    //学校路由
    {
        path: '/maintain',
        name: 'maintain',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '人员信息维护'
        },
        children:[
            {
                path: '/Maintain_list',
                name: 'Maintain_list',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '人员信息维护'
                },
                component: Maintain_list
            },
        ]
    },
    {
        path: '/message',
        name: 'message',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '学校信息维护'
        },
        children:[
            {
                path: '/Message_edit',
                name: 'Message_edit',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '学校信息维护'
                },
                component: Message_edit
            },
        ]
    },
    {
        path: '/report',
        name: 'report',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '网格员上报信息'
        },
        children:[
            {
                path: '/Report_msg',
                name: 'Report_msg',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '网格员上报信息'
                },
                component: Report_msg
            },
        ]
    },

    //网格员路由
    {
        path: '/wgy',
        name: 'wgy',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '首页'
        },
        children:[
            {
                path: 'Wgy_home',
                name: 'Wgy_home',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '首页'
                },
                component: Wgy_home
            }
        ]
    },
    {
        path: '/school',
        name: 'school',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '学校列表'
        },
        children:[
            {
                path: 'School_list',
                name: 'School_list',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '学校列表'
                },
                component: School_list
            },
            {
                path: 'Violation_list',
                name: 'Violation_list',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '违规列表'
                },
                component: Violation_list
            },
        ]
    },
    {
        path: '/alert',
        name: 'alert',
        component: Main,
        meta: {
            icon: 'logo-buffer',
            title: '警报监测'
        },
        children:[
            {
                path: '/Alert_monitor',
                name: 'Alert_monitor',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '警报监测'
                },
                component: Alert_monitor
            },
        ]
    },
];
