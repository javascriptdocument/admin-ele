/**
 * Created by Administrator on 2018/11/7.
 */
import {
    post,
    GET
} from '../config/axios'

/**
 * 获取网签协议
 */
export const protocol = () => post('login/protocol')

/**
 * 帮助文档
 */
export const file = (id) => GET('', true, id)


/**
 * 获取验证码
 */
export const getVerificationCode = (phone) => post('Reg/getcode', {
    phone: phone
})

/**
 * 注册处的清楚无效数据
 */
export const deleteInfo = () => GET('Reg/deleteInfo', '')
/**
 * 注册第一步
 */
export const regOne = (form) => post('Reg/regOne', form)

/**
 * 注册第二步
 */

export const regTwo = (form) => post('Reg/regTwo', form)

/**
 * 注册第三步
 */
export const regThird = (form) => post('Reg/regThird', form)

/**
 * 根据维修厂id来获取token
 */
export const createToken = (sid) => GET('Qr/createToken', '', sid)

/**
 * 找回密码处的发送短信验证码
 */
export const vcode = (form) => post('login/vcode', form)

/**
 * 找回密码  
 */
export const forget = (form) => post('Login/forget', form)

/**
 * 获取银行列表
 */
export const getBankCode = () => GET('Reg/getBankCode')

/**
 * 车管家合作店铺二维码页面信息
 */

export const createcode = (sid) => post('Cfshop/createcode', sid)
/**
 * 获取车管家合作店铺的认证状态
 */
export const getAuthStatus = (sid) => post('Cfshop/getAuthStatus', sid)

/**
 * 获取二维码
 */
export const GET_QRCode = (sid, shop_type) => GET('Qr/pay', '', {
    sid: sid,
    shop_type: shop_type
})

/**
 * 查看用户是否已经扫码支付
 */
export const GET_Status = (sid) => GET('Qr/getStatus', '', {
    sid: sid
})


/**
 * 获取所有省份
 */
export const getPro = () => post('main/getPro')

/**
 * 三级联动，获取下一级内容。
 */
export const getSon = (id) => post('main/getSon', {
    id: id
})

/**
 * 完善账户信息
 */
export const setShopInfo = (form) => post('main/setShopInfo', form)

/**
 * 修改手机号页面上的获取验证码
 */
export const pcode = () => post('main/alterCode')

/**
 * 修改手机号
 */
export const modifyPhone = (form) => post('main/alterPhone', form)

/**
 *上传图片
 */
export const uploadImg = (image) => GET('Main/uploadImg', image)


/**
 * 获取维修厂原有信息
 */
export const getShopInfo = () => post('main/getShopInfo')

/**
 * 登录
 */
export const login = (form) => post('login/doin', form)

/**
 * 修改密码页面上的获取验证码
 */
export const pass_code = () => post('main/pcode')

/**
 * 修改密码
 */
export const setPasswd = (form) => post('main/setPasswd', form)

/**
 * 反馈
 */
export const feedback = (form) => post('Suggest/add', form)

/**
 * 取消合作
 */
export const abolish = (reason) => post('main/abolish', {
    reason: reason
})

/**
 *  是否有系统消息
 */
export const msgStatus = () => post('FundOver/msgStatus')

/**
 *  消息
 */
export const unreadMsg = () => post('SystemMsg/unreadMsg')

/** 已读 **/
export const unreaLock = (data) => post('SystemMsg/unreaLock', data)

/**
 * 是否补充物料
 */
export const apply = () => post('mate/apply')


/**
 *  首页下方的两个电话号
 */
export const getPhoneIndex = () => post('main/getPhoneIndex')

/**
 * 通知
 */
export const getList = (page) => post('Msgs/getList', page)
/**
 * 系统消息
 */
export const msgList = (page) => post('System/msgList', page)
/**
 * 查看系统消息详情
 */
export const typeChose = (data) => post('Template/typeChose', data)
/**
 * 删除指定消息
 */
export const ignore = (id) => post('Template/ignore', id)

/** 资金管理 **/
/**
 * 获取账户余额  shop/main/getTnsExshop
 */
export const balance = (form) => post('Money/balance', form)
/**
 * 提现信息
 */
export const drawInfo = (form) => post('Money/draw', form)
/**
 * 获取提现验证码
 */
export const drawCode = (form) => post('Money/vcode', form)
/**
 * 提现操作
 */
export const Money_handle = (form) => post('Money/handle', form)
/**
 * 提现记录
 */
export const drawList = (data) => post('Money/drawList', data)
/**
 *  提现驳回查看理由
 */
export const checkReason = (id) => post('Money/checkReason', id)

/** 收入明细 **/
/** 邦保养收入明细 **/

/**
 *  服务费
 */
export const getServiceList = (data) => post('Account/getServiceList', data)

/**
 * 好评收入
 */
export const getGoodList = (data) => post('Account/getGoodList', data)

/**
 * 售卡奖励 
 */
export const getCarList = (data) => post('Account/getCarList', data)

/**
 * 活动奖励
 */
export const getActivityReward = (data) => post('Account/getActivityReward ', data)
/**
 *  滤芯补贴
 */
export const getFilterList = (data) => post('Account/getFilterList', data)
/**
 *  推荐奖励
 */
export const getRecommendList = (data) => post('Money/recommendList', data)

/** 会员半价收入 **/
/**
 * 首次录入奖励
 */
export const getOneHalf = () => post('Svip/getOneHalf')

/**
 * 再次服务收入
 */
export const getAgainList = () => post('Svip/getAgainList')

/**
 * 审核管理
 */

/**
 *   审核条数
 */
export const number = () => post('Check/number')

/**
 * 物料审核
 */
export const unConfirm = (page) => post('Check/unConfirm', page)

/**
 * 物料未确认收货搜索
 */
export const materialSearch = (form) => post('Check/materialSearch', form)

/**
 * 物料详情
 */
export const detail = (id) => post('Mate/detail', id)

/**
 * 确认收货
 */
export const confirm_goods = (id) => post('Mate/confirm', id)

/**
 * 技师未认证列表
 */
export const unverified = () => post('Check/unverified')

/**
 * 技师未认证搜索
 */
export const techSearch = (form) => post('Check/techSearch', form)

/**
 * 查看技师技能详情
 */
export const skillDetail = (id) => post('Check/skillDetail', id)

/**
 * 认证
 */
export const auditTns = (data) => post('Main/auditTns', data)

/**
 * 车主换店列表
 */
export const changeShop = () => post('Check/changeShop')

/**
 * 车主换店搜索
 */
export const carSearch = (form) => post('Check/carSearch', form)

/**
 * 查看车主换店理由
 */
export const shopReason = (id) => post('Check/checkReason', id)

/**
 *   车主换店操作 
 */
export const agreeOperation = (id) => post('Check/agreeOperation', id)
/**
 * 客户预约审核列表
 */
export const reservation = () => post('Check/reservation')

/**
 * 客户预约列表+搜索
 */
export const reservationSearch = (data) => post('Check/reservationSearch', data)

/**
 * 预约详情
 */
export const getDetailMake = (id) => post('Svip/getDetailMake', id)

/**
 * 客户预约确认操作
 */
export const validation = (id) => post('Check/validation', id)



/**
 * 邦保养模块
 */
// 邦保养-邦保养页面 根据车牌号查获取历史记录
export const getPlateRecord = (plate) => post('Bang/query', {
    plate: plate
})
// 邦保养-邦保养页面 根据车牌号查找车主信息
export const searchByPlate = (plate) => post('bang/getInfo', {
    plate: plate
})

// 邦保养-邦保养页面 发送验证码给车主
export const sendCode = (phone, card) => post('bang/vcode', {
    phone: phone,
    card_number: card
})
// 邦保养-邦保养页面 提交服务表单
export const submitServeForm = (form) => post('bang/handle', {
    form: form
})

// 邦保养-物料管理页面  获取物料
export const getMaterial = () => post('mate/getStock')

// 邦保养-物料管理页面  获取短缺的物料
export const materialIsLack = () => post('mate/apply')
// 邦保养-物料管理页面  申请物料
export const applyMaterial = (detail) => post('mate/handle', {
    detail: detail
})
// 邦保养-物料管理页面
export const materialSupplyRecord = (page, key, startTime, endTime, status) => post('mate/log', {
    page: page,
    key: key,
    start_time: startTime,
    end_time: endTime,
    status: status
})
// 邦保养-物料管理页面
export const cancelMaterialApply = (id, reason) => post('mate/cancel', {
    id: id,
    reason: reason
})
// 邦保养-物料管理页面
export const applyOrderDet = (id) => post('mate/detail', {
    id: id
})

//export const getAllMember = () => post('main/getUsers')
// 邦保养-车主管理
export const getFilterMember = (page, key, cardType, startTime, endTime, status) => post('main/searchUsers', {
    page: page,
    key: key,
    card_type: cardType,
    start_time: startTime,
    end_time: endTime,
    status: status
})
// 邦保养 技师管理
export const getTechnician = (key, page, startTime, endTime) => post('main/getTns', {
    key: key,
    page: page,
    start_time: startTime,
    end_time: endTime
})
// 邦保养 技师管理
export const technicianWorkRecord = (id) => post('main/getTnsExshop', {
    id: id
})
// 邦保养 技师管理 技师取消认证
export const techCancelAuth = (id, reason) => post('main/cancelTns', {
    id: id,
    reason: reason
})
// 邦保养 技师管理 取消授权记录
export const cancelAuthRecord = (key, page, startTime, endTime) => post('main/cancelTnsList', {
    key: key,
    page: page,
    start_time: startTime,
    end_time: endTime
})
// 邦保养 保养记录 获取保养记录
export const upkeepRecord = (key, page, startTime, endTime) => post('bang/log', {
    key: key,
    page: page,
    start_time: startTime,
    end_time: endTime
})
// 邦保养 投诉页面  省略没用
export const getOwnAgent = (type) => post('Complain/agent', {
    type: type
})
// 邦保养 投诉页面 获取运营商或者服务经理 名字
export const getAgentName = (type) => post('Complain/selection', {
    type: type
})

// 邦保养 投诉管理页面提交投诉
export const submitComplaint = (type, sm_id, title, content) => post('Complain/complaint', {
    type: type,
    sm_id: sm_id,
    title: title,
    content: content,
})
// 邦保养 投诉页面 撤回投诉
export const withdrawComplaint = (id) => post('Complain/withdrawComplaint', {
    id: id
})
// 邦保养 投诉页面 获取未撤回投诉列表
export const getUnWithdrawList = () => post('Complain/getUnWithdrawList')
// 邦保养 投诉页面 已撤回的投诉列表
export const getWithdrawList = () => post('Complain/index')


/*
 维保提醒条数
 */
export const count = () => post('BusOppos/indexWarn', )



/**
 * 数据分析模块
 */
// 数据分析  收入方框
export const getTablePricD = (number) => post('fundOver/getTablePrice', {
    number: number,
})
// 数据分析  关注度方框
export const attentShareD = (number) => post('Attention/attentShare', {
    number: number,
})
// 数据分析  总购卡方框
export const cardShareD = (number) => post('Buycard/cardShare', {
    number: number,
})
// 数据分析  物料消耗方框
export const shareD = (number) => post('Analyze/share', {
    number: number,
})

// 数据分析  资金饼图
export const getFundAllD = () => post('fundOver/getFundAll')
// 数据分析  资金折线图
export const getTrendListD = (num, startTime, endTime, ) => post('fundOver/getTrendList', {
    num: num,
    startTime: startTime,
    endTime: endTime,
})

// 数据分析  车主饼图
export const CarPriceD = () => post('fundOver/CarPrice')
export const CompleteCountD = () => post('fundOver/CompleteCount')

// 数据分析  车主折线图
export const getCarTrendD = (num, startTime, endTime, ) => post('fundOver/getCarTrend', {
    num: num,
    startTime: startTime,
    endTime: endTime,
})

// 数据分析  物料消耗饼图
export const materialD = () => post('Analyze/material')
// 数据分析  物料消耗折线
export const materialLineD = (num, startTime, endTime, ) => post('Analyze/materialLine', {
    num: num,
    startTime: startTime,
    endTime: endTime,
})


// 数据分析  物料补充总饼图
export const getSumD = () => post('MateAna/getSum')
// 数据分析  物料补充1饼图
export const getMaAllNum1D = () => post('MateAna/getMaAllNum1')
// 数据分析  物料补充2饼图
export const getMaAllNum2D = () => post('MateAna/getMaAllNum2')
// 数据分析  物料补充3饼图
export const getMaAllNum3D = () => post('MateAna/getMaAllNum3')
// 数据分析  物料补充4饼图
export const getMaAllNum4D = () => post('MateAna/getMaAllNum4')
// 数据分析  物料补充表格
export const embodyD = (num, startTime, endTime, ) => post('Analyze/embody', {
    num: num,
    startTime: startTime,
    endTime: endTime,
})


// 数据分析  关注折线图
export const attentLineD = (num, startTime, endTime, ) => post('Attention/attentLine', {
    num: num,
    startTime: startTime,
    endTime: endTime,
})
// 数据分析  关注度表格
export const userListD = (page) => post('Attention/userList', {
    page: page,
})



// ubi店面弹窗
export const homegettext = () => GET('login/systemInfo')

export const shareCode = (share_promo_code) => post('Recommend/codeInfo',{share_promo_code:share_promo_code});

export const getCode = ( ) => post('Main/ifRepetition')
