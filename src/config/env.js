/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 * FileUrl: 帮助文档域名地址
 */
import Vue from 'vue'
let baseUrl = '';
let FileUrl=''

if (process.env.NODE_ENV == 'development') { //测试环境
    baseUrl='https://ceshi.ctbls.com/shop/'
    Vue.prototype.uploadUrl='https://ceshi.ctbls.com/shop/Main/uploadImg'
    Vue.prototype.baseUrl='https://ceshi.ctbls.com/shop/'
    FileUrl='https://doc.ctbls.com/admin/docs/doc'
}else if(process.env.NODE_ENV == 'production'){ //线上环境
    baseUrl='https://cc.ctbls.com/shop/'
    Vue.prototype.uploadUrl='https://cc.ctbls.com/shop/Main/uploadImg'
    Vue.prototype.baseUrl='https://cc.ctbls.com/shop/'
    FileUrl='https://doc.ctbls.com/admin/docs/doc?d_id'
}
export {
    baseUrl,
    FileUrl
}
