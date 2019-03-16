import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
router.beforeEach((to,from,next)=>{
    NProgress.start(); 
    if(to.meta.requireAuth){
        if(!window.sessionStorage.getItem('token')){
                alert('请先登录')
                next({
                    path:'/login'
                })
                NProgress.done();
        }else {
            next()
            NProgress.done();
        }
    }else {
        next()
        NProgress.done();
    }

})