/**
 * Created by Administrator on 2018/11/6.
 */
import {
    OPEN_AGREEMENT,
    SET_LOGINTITLE,
    OPEN_PUTFORWARD,
    OPEN_REJECT_REASON,
    ADD_UPLOAD,
    DELETE_ADD_UPLOAD,
    VERIFICATION_CODE,
    CHANGE_SID,
    GET_PROVINCE,
    GET_CITY,
    GET_CITYID,
    GET_BANK,
    ACTION_NUMBER,
    CHANGE_NUMBER, 
    SET_MSGCOUNT, 
} from './mutation-types'
export default{
    mutationsMsg(state, payload) {
        state.rem = payload;
    },
    mutationsMsg2(state, payload) {
        state.fault = payload;
    },
    mutationsMsg3(state, payload) {
        state.collRem = payload;
    },
    mutationsMsg4(state, payload) {
        state.mar--;
    },
    [OPEN_AGREEMENT](state,status){ //改变协议状态
        state.Agreement_State=status
    },
    [SET_LOGINTITLE](state,title){ //改变登录title
        state.login_title=title
    },
    [OPEN_PUTFORWARD](state,status){ //动态改变可提现金额弹框状态
        state.Putforward_Dialog=status
    }, 
    [OPEN_REJECT_REASON](state,status){ //驳回理由弹框状态
        state.Reject_ReasonState=status
    },
    [ADD_UPLOAD](state,src){
        state.imgList.push(src)
    },
    [CHANGE_SID](state,sid){  //改变sid
        state.sid=sid
    },
    [GET_BANK](state,Bank){
           state.BankList=Bank
    },
    [DELETE_ADD_UPLOAD](state,uid){  //查找,并删除店铺图片
      let findIndex= state.imgList.findIndex(v=>{
          console.log(uid)
          return v.uid == uid
        })
        state.imgList.splice(findIndex,1)
    },
    [VERIFICATION_CODE](state,verify){ //图形验证码
        state.verify=verify
    },
    [GET_PROVINCE](state,province,sid){ //获取省份
        state.province=province,
        state.provinceID=sid
    },
    [GET_CITY](state,city){
        state.city=city
    },
    [GET_CITYID](state,provinceID){
        state.provinceID=provinceID
    },
    [ACTION_NUMBER](state,data){  /** 审核条数 **/
        state.numberList=data
    },
    [CHANGE_NUMBER](state,Current_item){ /** 操作每一项条数 **/
        state.numberList[Current_item]-=1
    },
    [SET_MSGCOUNT](state,count){ /** 获取维保商机各个项提醒数目 **/
        state.rem=count.rem,
        state.fault=count.fault,
        state.collRem= count.collRem,
        state.mar= count.yanghu
    },
    shop_status(state,status){
        state.shop_status = status;
    }
}
