var Home = Vue.component("home",{
    template:`
        <section>
            <navs></navs>
            <div class="imgBox">
            <h1>首页</h1>
                <img src="img/20.jpeg" alt="">
            </div>
        </section>
    `
});
var Nav = Vue.component("navs",{
    template:`
        <div class="nav-box">
             <div class="navs">
                <router-link v-for="(item,key) in navData" :to="item.url" :key="key" exact>{{item.title}}</router-link>
                <router-link to="/login" v-if="!islogin">登陆</router-link>
                <span v-if="islogin" class="infos" @click="show">
                    {{name}}
                    <span  class="logout" v-show="isshow" @click="logout">退出</span>
                </span>
            </div>
        </div>
        <router-view></router-view>
    `,
    data(){
        return{
            navData:[
                {title:"首页",url:"/"},
                {title:"公司简介",url:"/info"},
                {title:"文档中心",url:"/doc"},
            ],
            islogin:false,
            isshow:false,
            name:""
        }
    },
    created(){
        this.name = this.get("login","name");
        this.islogin = this.get("login","name");
    },
    methods:{
        show(){
           this.isshow = !this.isshow;
        },
        logout(){
            this.del("login");
            router.push('/');
        }
    }
});
var Info = Vue.component("info",{
    template:`
        <section>
            <navs></navs>
            <transition name="opac" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    `
});
var List = Vue.component("list",{
    template:`<ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/1" tag="a">
                        <img class="mui-media-object mui-pull-right" src="http://placehold.it/40x30">
                        <div class="mui-media-body">
                            幸福
                            <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                        </div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/2" tag="a">
                        <img class="mui-media-object mui-pull-right" src="http://placehold.it/40x30">
                        <div class="mui-media-body">
                            木屋
                            <p class="mui-ellipsis">想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
                        </div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/info/list/3" tag="a">
                        <img class="mui-media-object mui-pull-right" src="http://placehold.it/40x30">
                        <div class="mui-media-body">
                            CBD
                            <p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
                        </div>
                    </router-link>
                </li>
	        </ul>`
});
var Doc = Vue.component('dov',{
    template:`<section> 
                    <navs></navs>
                    <router-view name="left" class="left"></router-view>
                    <router-view name="right" class="right"></router-view>
                </section>`,
    beforeRouteEnter(to,from,next){
        next(function (vm) {
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
});
var left = Vue.component("left",{
    template:`<div>
               <ul>
                    <li><router-link to="#one">one</router-link></li>
                    <li><router-link to="#two">two</router-link></li>
                    <li><router-link to="#three">three</router-link></li>
                    <li><router-link to="#four">four</router-link></li>
                    <li><router-link to="#five">five</router-link></li>
               </ul>
            </div>`,
    watch:{
        $route(){
            var hash = this.$route.hash.slice(1);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ aaa: document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ aaa: document.querySelector("#"+hash).offsetTop - 10 }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.aaa.toFixed(0)
                })
                .start()
            animate()
        }
    }
});
var right = Vue.component("right",{
    template:`<div>
                <div id="one" class="abc">one</div>
                <div id="two" class="abc">two</div>
                <div id="three" class="abc">three</div>
                <div id="four" class="abc">four</div>
                <div id="five" class="abc">five</div>
            </div>`,
});
var con = Vue.component("con",{
    template:`
    <div class="content">
        <h1>{{data[$route.params.id-1].title}}</h1>
        <div class="word"><p>{{data[$route.params.id-1].con}}</p></div>
    </div>
    `,
    data(){
        return {
            data:[
                {id:"1",title:"公司历史",con:"vue-router 使用 path-to-regexp 作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。查看它的 文档 学习高阶的路径匹配，还有 这个例子 展示 vue-router 怎么使用这类匹配。"},
                {id:"2",title:"公司组成",con:"『重定向』的意思是，当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b，那么『别名』又是什么呢？\n" +
                "\n" +
                "/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。\n" +
                "\n" +
                "上面对应的路由配置为"},
                {id:"3",title:"公司未来",con:"如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。"},
            ]
        }
    },
    created(){

    }
});
var loginPage = Vue.component("loginPage",{
    template:`<section>
                    <header class="mui-bar mui-bar-nav">
                    <a class="mui-icon mui-icon-undo" @click="back"></a>
                        <h1 class="mui-title">登录</h1>
                    </header>
                    <div class="mui-content">
                        <form id='login-form' class="mui-input-group">
                            <div class="mui-input-row">
                                <label>账号</label>
                                <input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
                            </div>
                            <div class="mui-input-row">
                                <label>密码</label>
                                <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
                            </div>
                        </form>
                        <div class="mui-content-padded">
                            <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit()">登录</button>
                        </div>
                    </div>
               </section>`,
    methods:{
        back(){
            router.push('/');
        },
        submit(){
            var obj = {"name":document.querySelector("#name").value};
            this.save("login",obj);
            router.push('/doc');
        }
    }
})