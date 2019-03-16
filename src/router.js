import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/login'
        },
        { //登录页
            path: '/login',
            name: 'login',
            component: () => import( /* webpackChunkName: "login" */ '@/views/userLogin/login/user_Login')
        },
        { //选择注册店铺
            path: '/Selective_registerType',
            name: 'Selective_registerType',
            component: () => import( /* webpackChunkName: "Selective_registerType" */ '@/views/Selective_registerType/Selective_registerType')
        },
        { //注册
            path: '/register',
            component: () => import( /* webpackChunkName: "register" */ '@/views/userLogin/register/register'),
            meta: {
                title: '注册'
            },
            children: [{
                    path: '/register',
                    redirect: 'login_information'
                },
                {
                    path: 'login_information',
                    name: 'login_information',
                    component: () => import( /* webpackChunkName: "login_information" */ '@/views/userLogin/register/components/login_information/login_information'),
                },
                {
                    path: 'Repair_information',
                    name: 'Repair_information',
                    component: () => import( /* webpackChunkName: "Repair_information" */ '@/views/userLogin/register/components/Repair_information/Repair_information'),
                },
                {
                    path: 'Putforward_information',
                    name: 'Putforward_information',
                    component: () => import( /* webpackChunkName: "Putforward_information" */ '@/views/userLogin/register/components/Putforward_information/Putforward_information'),
                },
                {
                    path: 'complate',
                    name: 'complate',
                    component: () => import( /* webpackChunkName: "complate" */ '@/views/userLogin/register/components/complate/complate'),
                },
            ]
        },
        { //找回密码
            path: '/Reset_Password',
            component: () => import( /* webpackChunkName: "Reset_Password" */ '@/views/userLogin/Reset_Password/ResetPassword'),
            meta: {
                title: '找回密码'
            }
        },
        { //支付系统使用费
            path: '/Unpaid',
            name: '/Unpaid',
            component: () => import( /* webpackChunkName: "Unpaid" */ '@/views/userLogin/Unpaid/Unpaid'),
        },
        { //完善信息
            path: '/perfect_information',
            name: '/perfect_information',
            component: () => import( /* webpackChunkName: "perfect_information" */ '@/views/userLogin/perfect_information/perfect_information'),
        },
        { //提交审核
            path: '/Submit_Toexamine',
            name: '/Submit_Toexamine',
            component: () => import( /* webpackChunkName: "Submit_Toexamine" */ '@/views/userLogin/Submit_Toexamine/Submit_Toexamine'),
        },
        { //首页
            path: '/home',
            name: 'home',
            component: () => import( /* webpackChunkName: "home" */ '@/views/home/home'),
            meta: {
                requireAuth: true
            }
        },
        { //账号和资料
            path: '/account_information',
            name: 'account_information',
            component: () => import( /* webpackChunkName: "account_information" */ '@/views/account_information/account_information'),
            meta: {
                current: [{
                    name: '首页',
                    path: '/home'
                }, {
                    name: ' / 账号与资料',
                    path: '/account_information'
                }],

            }
        },
        { //修改账户和资料
            path: '/modify_information',
            name: "modify_information",
            component: () => import( /* webpackChunkName: "modify_information" */ '@/views/modify_information/modify_information'),
            meta: {
                current: [{
                    name: '首页',
                    path: '/home'
                }, {
                    name: ' / 账号与资料',
                    path: '/account_information'
                }, {
                    name: ' / 修改信息',
                    path: '/modify_information'
                }],
                requireAuth: true
            }
        },
        { //修改手机号
            path: '/modify_Telephone',
            name: 'modify_Telephone',
            component: () => import( /* webpackChunkName: "modify_Telephone" */ '@/views/modify_information/router/modify_Telephone'),
            meta: {
                current: [{
                    name: '首页',
                    path: '/home'
                }, {
                    name: ' / 账号与资料',
                    path: '/account_information'
                }, {
                    name: ' / 修改信息',
                    path: '/modify_information'
                }, {
                    name: ' / 修改手机号',
                    path: '/modify_Telephone'
                }]
            }
        },
        { //修改密码
            path: '/modify_password',
            name: 'modify_password',
            component: () => import( /* webpackChunkName: "modify_password" */ '@/views/modify_password/modify_password'),
            meta: {
                current: [{
                    name: '首页',
                    path: '/home'
                }, {
                    name: ' / 修改密码',
                    path: '/modify_password'
                }]
            }
        },
        { // 取消合作
            path: '/abolish',
            name: 'abolish',
            component: () => import( /* webpackChunkName: "abolish" */ '@/views/abolish/abolish'),
            meta: {
                current: [{
                    name: '首页',
                    path: '/home'
                }, {
                    name: ' / 取消合作',
                    path: '/abolish'
                }]
            }
        },
        { //反馈
            path: '/feedback',
            name: 'feedback',
            component: () => import( /* webpackChunkName: "feedback" */ '@/views/feedback/feedback'),
            meta: {
                current: [{
                    name: '首页',
                    path: '/home'
                }, {
                    name: ' / 反馈',
                    path: '/feedback'
                }]
            }
        },
        { //消息通知
            path: '/news',
            name: '/news',
            component: () => import( /* webpackChunkName: "news" */ '@/views/news/news'),
            meta: {
                current: [{
                    name: '首页',
                    path: '/home'
                }, {
                    name: ' / 消息',
                    path: '/news'
                }]
            }
        },
        { //邦保养管理
            path: '/maintainMode',
            name: 'maintainMode',
            component: () => import( /* webpackChunkName: "maintainMode" */ '@/views/maintainMode/maintainMode'),
            children: [{
                    path: '/maintainMode',
                    name: 'maintainStart',
                    component: () => import( /* webpackChunkName: "maintainStart" */ '@/views/maintainMode/pages/maintainStart'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 邦保养管理',
                            path: '/maintainMode'
                        }, {
                            name: ' / 邦保养',
                            path: 'maintainStart'
                        }],
                        id: 190
                    }
                },
                {
                    path: 'gift',
                    name: 'gift',
                    component: () => import( /* webpackChunkName: "maintainMode" */ '@/views/maintainMode/pages/gift'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 邦保养管理',
                            path: '/maintainMode'
                        }, {
                            name: ' / 礼品兑换',
                            path: 'gift'
                        }],
                        id: 192
                    }
                },
                {
                    path: 'materielM',
                    name: 'materielM',
                    component: () => import( /* webpackChunkName: "materiel" */ '@/views/maintainMode/pages/materiel'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 邦保养管理',
                            path: '/maintainMode'
                        }, {
                            name: ' / 物料管理',
                            path: 'materielM'
                        }],
                        id: 193
                    }
                },
                {
                    path: 'member',
                    name: 'member',
                    component: () => import( /* webpackChunkName: "member" */ '@/views/maintainMode/pages/member'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 邦保养管理',
                            path: '/maintainMode'
                        }, {
                            name: ' / 车主管理',
                            path: 'member'
                        }],
                        id: 194
                    }
                },
                {
                    path: 'technicianM',
                    name: 'technicianM',
                    component: () => import( /* webpackChunkName: "technician" */ '@/views/maintainMode/pages/technician'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 邦保养管理',
                            path: '/maintainMode'
                        }, {
                            name: ' / 技师列表',
                            path: 'technicianM'
                        }],
                        id: 197
                    }
                },
                {
                    path: 'activity',
                    name: 'Activity',
                    component: () => import( /* webpackChunkName: "technician" */ '@/views/maintainMode/pages/activity'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 邦保养管理',
                            path: '/maintainMode'
                        }, {
                            name: ' / 活动管理',
                            path: 'activity'
                        }],
                        id: 198
                    }
                },
                {
                    path: 'upkeepRecord',
                    name: 'upkeepRecord',
                    component: () => import( /* webpackChunkName: "upkeepRecord" */ '@/views/maintainMode/pages/upkeepRecord'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 邦保养管理',
                            path: '/maintainMode'
                        }, {
                            name: ' / 保养记录',
                            path: 'upkeepRecord'
                        }],
                        id: 195
                    }
                },
                {
                    path: 'complaint',
                    name: 'complaint',
                    component: () => import( /* webpackChunkName: "complaint" */ '@/views/maintainMode/pages/complaint'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 邦保养管理',
                            path: '/maintainMode'
                        }, {
                            name: ' / 投诉管理',
                            path: 'complaint'
                        }],
                        id: 196
                    }
                }
            ]
        },
        { //半价
            path: '/memberMode',
            name: 'memberMode',
            component: () => import( /* webpackChunkName: "memberMode" */ '@/views/memberMode/memberMode'),
            children: [{
                    path: '/memberMode',
                    redirect: 'firstEntry'
                },
                {
                    path: 'firstEntry',
                    name: 'firstEntry',
                    component: () => import( /* webpackChunkName: "firstEntry" */ '@/views/memberMode/pages/firstEntry'),
                },
                {
                    path: 'serve',
                    name: 'serve',
                    component: () => import( /* webpackChunkName: "serve" */ '@/views/memberMode/pages/serve'),
                },
                {
                    path: 'bespeak',
                    name: 'bespeak',
                    component: () => import( /* webpackChunkName: "bespeak" */ '@/views/memberMode/pages/bespeak'),
                },
                {
                    path: 'finish',
                    name: 'finish',
                    component: () => import( /* webpackChunkName: "finish" */ '@/views/memberMode/pages/finish'),
                },
                {
                    path: 'abnormal',
                    name: 'abnormal',
                    component: () => import( /* webpackChunkName: "abnormal" */ '@/views/memberMode/pages/abnormal'),
                }
            ]
        },
        { //数据分析
            path: '/dataAnalysisMode',
            name: 'dataAnalysisMode',
            component: () => import( /* webpackChunkName: "dataAnalysisMode" */ '@/views/dataAnalysisMode/dataAnalysis'),
            children: [{
                    path: '/dataAnalysisMode',
                    redirect: 'fund'
                },
                {
                    path: 'fund',
                    name: 'fund',
                    component: () => import( /* webpackChunkName: "fund" */ '@/views/dataAnalysisMode/pages/fund'),
                    meta: {
                        name: '资金'
                    }
                },
                {
                    path: 'follow',
                    name: 'follow',
                    component: () => import( /* webpackChunkName: "follow" */ '@/views/dataAnalysisMode/pages/follow'),
                    meta: {
                        name: '关注度'
                    }
                },
                {
                    path: 'purchases',
                    name: 'purchases',
                    component: () => import( /* webpackChunkName: "purchases" */ '@/views/dataAnalysisMode/pages/purchases'),
                    meta: {
                        name: '车主'
                    }
                },
                {
                    path: 'materielAdd',
                    name: 'materielAdd',
                    component: () => import( /* webpackChunkName: "materiel" */ '@/views/dataAnalysisMode/pages/materielAdd'),
                    meta: {
                        name: '物料补充'
                    }
                },
                {
                    path: 'materielReduce',
                    name: 'materielReduce',
                    component: () => import( /* webpackChunkName: "materiel" */ '@/views/dataAnalysisMode/pages/materielReduce'),
                    meta: {
                        name: '物料消耗'
                    }
                }
            ]
        },
        { //资金管理
            path: '/capital',
            name: 'capital',
            component: () => import( /* webpackChunkName: "capital" */ '@/views/capital/capital'),
            children: [{
                    path: '/capital',
                    redirect: 'account_balance'
                },
                { //账户余额
                    path: 'account_balance',
                    name: 'account_balance',
                    component: () => import( /* webpackChunkName: "account_balance" */ '@/views/capital/router/account_balance/account_balance'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 资金管理',
                            path: '/capital'
                        }, {
                            name: ' / 账户余额',
                            path: 'account_balance'
                        }]
                    }
                },
                { //收入明细
                    path: 'income_Detailed',
                    name: 'income_Detailed',
                    component: () => import( /* webpackChunkName: "Putforward_Record" */ '@/views/capital/router/income_Detailed/income_Detailed'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 资金管理',
                            path: '/capital'
                        }, {
                            name: ' / 收入明细',
                            path: 'income_Detailed'
                        }]
                    }
                },
                { //提现记录
                    path: 'Putforward_Record',
                    name: 'Putforward_Record',
                    component: () => import( /* webpackChunkName: "Putforward_Record" */ '@/views/capital/router/Putforward_Record/Putforward_Record'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 资金管理',
                            path: '/capital'
                        }, {
                            name: ' / 提现记录',
                            path: 'Putforward_Record'
                        }]
                    }
                },
            ]
        },
        { //审核管理
            path: '/Toexamine_Administration',
            name: 'Toexamine_Administration',
            component: () => import( /* webpackChunkName: "Toexamine_Administration" */ '@/views/Toexamine_Administration/Toexamine_Administration'),
            children: [{
                    path: '/Toexamine_Administration',
                    redirect: 'materiel'
                },
                { //物料审核
                    path: 'materiel',
                    name: 'materiel',
                    component: () => import( /* webpackChunkName: "materiel" */ '@/views/Toexamine_Administration/router/materiel/materiel'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 审核管理',
                            path: '/Toexamine_Administration'
                        }, {
                            name: ' / 物料审核',
                            path: 'materiel'
                        }]
                    }
                },
                { //技师审核
                    path: 'technician',
                    name: 'technician',
                    component: () => import( /* webpackChunkName: "technician" */ '@/views/Toexamine_Administration/router/technician/technician'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 审核管理',
                            path: '/Toexamine_Administration'
                        }, {
                            name: ' / 技师审核',
                            path: 'technician'
                        }]
                    }
                },
                { //换店审核
                    path: 'Change_shop',
                    name: 'Change_shop',
                    component: () => import( /* webpackChunkName: "Change_shop" */ '@/views/Toexamine_Administration/router/Change_shop/Change_shop'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 审核管理',
                            path: '/Toexamine_Administration'
                        }, {
                            name: ' / 换店审核',
                            path: 'Change_shop'
                        }]
                    }
                },
                { //客户预约
                    path: 'Customer_reservation',
                    name: 'Customer_reservation',
                    component: () => import( /* webpackChunkName: "Customer_reservation" */ '@/views/Toexamine_Administration/router/Customer_reservation/Customer_reservation'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: ' / 审核管理',
                            path: '/Toexamine_Administration'
                        }, {
                            name: ' / 客户预约',
                            path: 'Customer_reservation'
                        }]
                    }
                },
            ]
        },
        { //维保商机
            path: '/obd',
            component: () => import('@/views/obd/shell'),
            name: 'obd',
            redirect: '/obd/szt',
            children: [{
                    path: '/obd/chance',
                    component: () => import('@/views/obd/chance'),
                    name: '常规提醒',
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 维保商机',
                            path: '/obd'
                        }, {
                            name: ' / 常规提醒',
                            path: '/obd/chance'
                        }]
                    }
                }, {
                    path: '/obd/szt',
                    component: () => import('@/views/obd/szt'),
                    name: '设备状态',
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 维保商机',
                            path: '/obd'
                        }, {
                            name: ' / 设备状态',
                            path: '/obd/szt'
                        }]
                    }
                },
                {
                    path: '/obd/mar',
                    component: () => import('@/views/obd/mar'),
                    name: '养护提醒',
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 维保商机',
                            path: '/obd'
                        }, {
                            name: ' / 设备状态',
                            path: '/obd/mar'
                        }]
                    }
                },
                {
                    path: '/obd/ckt',
                    component: () => import('@/views/obd/ckt'),
                    name: '电路故障',
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 维保商机',
                            path: '/obd'
                        }, {
                            name: ' / 电路故障',
                            path: '/obd/ckt'
                        }]
                    }
                }, {
                    path: '/obd/let',
                    component: () => import('@/views/obd/let'),
                    name: '排放提醒',
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 维保商机',
                            path: '/obd'
                        }, {
                            name: ' / 排放提醒',
                            path: '/obd/let'
                        }]
                    }
                }, {
                    path: '/obd/put',
                    component: () => import('@/views/obd/put'),
                    name: '碰撞故障',
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 维保商机',
                            path: '/obd'
                        }, {
                            name: ' / 碰撞故障',
                            path: '/obd/put'
                        }]
                    }
                }, {
                    path: '/obd/log',
                    component: () => import('@/views/obd/log'),
                    name: '处理记录',
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 维保商机',
                            path: '/obd'
                        }, {
                            name: ' / 处理记录',
                            path: '/obd/log'
                        }]
                    }
                }
            ]
        },
        // { //会员专属
        //     path: '/vip',
        //     name: 'vip',
        //     component: ()=> import('@/views/vip/index'),
        //     redirect: '/vip/reserved',
        //     children: [
        //       {
        //         path: "reserved",
        //         component: ()=> import('@/views/vip/pages/reserved'),
        //         name: '预约服务',
        //         meta: {
        //             current: [{
        //                 name: '首页',
        //                 path: '/home'
        //             }, {
        //                 name: '/ 会员专属',
        //                 path: '/vip'
        //             }, {
        //                 name: ' / 预约服务',
        //                 path: '/vip/reserved'
        //             }]
        //         }
        //       },
        //       {
        //         path: "order",
        //         component: ()=> import('@/views/vip/pages/order'),
        //         name: '用户订单',
        //         meta: {
        //             current: [{
        //                 name: '首页',
        //                 path: '/home'
        //             }, {
        //                 name: '/ 会员专属',
        //                 path: '/vip'
        //             }, {
        //                 name: ' / 用户订单',
        //                 path: '/vip/order'
        //             }]
        //         }
        //       },
        //
        //     ]
        // },
        { //店面推广
            path: '/generalize',
            component: () => import('@/views/generalize/shell'),
            name: 'generalize',
            redirect: '/generalize/upload',
            children: [{
                    path: 'upload',
                    name: '产品上传',
                    component: () => import('@/views/generalize/upload'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 店面推广',
                            path: '/generalize'
                        }, {
                            name: ' / 产品上传',
                            path: '/generalize/upload'
                        }]
                    }
                },
                {
                    path: '/generalize/control',
                    name: '产品管理',
                    component: () => import('@/views/generalize/control'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 店面推广',
                            path: '/generalize'
                        }, {
                            name: ' / 产品管理',
                            path: '/generalize/control'
                        }]
                    }
                },
                {
                    path: '/generalize/Forward',
                    name: '预约单管理',
                    component: () => import('@/views/generalize/Forward'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 店面推广',
                            path: '/generalize'
                        }, {
                            name: ' / 预约单管理',
                            path: '/generalize/Forward'
                        }]
                    }
                },
                {
                    path: '/generalize/assessments',
                    name: '评价管理',
                    component: () => import('@/views/generalize/assessments'),
                    meta: {
                        current: [{
                            name: '首页',
                            path: '/home'
                        }, {
                            name: '/ 店面推广',
                            path: '/generalize'
                        }, {
                            name: ' / 评价管理',
                            path: '/generalize/assessments'
                        }]
                    }
                },
            ]
        }
    ]
})


export default router;
