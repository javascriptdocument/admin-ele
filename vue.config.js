/**
 * Created by Administrator on 2018/11/8.
 */
module.exports = {
   
    baseUrl:'./' ,      //process.env.NODE_ENV === 'production' ? './' : './'
    outputDir: 'dist',
    assetsDir:'public',
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8081,
        // 设置代理
    }
}