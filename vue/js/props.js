Vue.component('child',{
    template:'\
        <div>\
         <table>\
        <tr><th>明星</th><th>删除操作</th><th>修改操作</th></tr>\
        <tr v-for="(item,key) in stars"><td>{{item}}</td><td v-on:click="del(key)">删除</td><td v-on:click="getvalue(key,item)">修改</td>\
        </tr>\
        </table>\
        <div v-show="isShow">\
        <input type="text" v-model="star">\
        <button v-on:click="setValue">save</button><button v-on:click="hid">cancle</button>\
        </div>\
        </div>\
        ',
    data:function () {
        return {
            isShow:false,
            key:'',
            star:''
        }
    },
    props:{
        stars:{
            type:Array,
            default:function () {
                return []
            }
        }
    },
    methods:{
        hid:function () {
            this.isShow=false
        },
        setValue:function (val) {
            this.$set(this.stars,this.key,this.star)
            this.isShow=false
        },
        del:function (key) {
            this.stars.splice(key,1)
            console.log(this.stars)
        },
        getvalue:function (key,val) {
            this.isShow=true
            this.key=key
            this.star=val
        }
    }
})