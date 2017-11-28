var router = new VueRouter({
    routes:[
        {path:'/',component:Home},
        {
            path:'/info',
            component:Info,
            children:[
                {
                    path:"",
                    component:List,
                    beforeEnter(to,from,next){
                        //console.log(1);
                        next();
                    }
                },
                {path:"list/:id",component:con}
            ]
        },
        {
            path:'/doc',
            component:Doc,
            children:[
                {
                    path:"",
                    components:{left:left,right:right}
                }
            ]
        },
        {path:'/login',component:loginPage},
        {path:'*',redirect:"/"},
    ]
});
router.beforeEach(function (to,from,next) {
    next();
})