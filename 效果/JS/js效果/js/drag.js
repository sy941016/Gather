/**
 * Created by Administrator on 2016/11/15.
 */
function getPosition(obj){
    var Left=obj.offsetLeft;
    var Top=obj.offsetTop;
    var object={};
    var parent=obj.parentNode;
    if(getStyle(parent,"position")!="static"){
        var pLeft=parent.offsetLeft;
        var pTop=parent.offsetTop;
        var pBLeft=parseInt(getStyle(parent,"borderLeftWidth"));
        var pBTop=parseInt(getStyle(parent,"borderTopWidth"));
        Left+=(pLeft+pBLeft);
        Top+=(pTop+pBTop);
    }
    object.x=Left;//距离浏览器左边的距离
    object.y=Top;//距离浏览器顶部有的距离
    return object;
}
function getStyle(obj,arrt){
    if(obj.currentStyle){
        return obj.currentStyle[arrt]
    }else{
        return getComputedStyle(obj)[arrt];
    }
}
function Drag(obj,settingObj) {
    //obj 拖拽的DIV settingObj 拖拽区域  类型是对象，两个属性  dragarea direction
    settingObj = settingObj || {};//settingObj值为实参或者为空对象
    this.area = settingObj.dragarea == undefined ? document : settingObj.dragarea;
    this.direction = settingObj.direction == undefined ? "all" : settingObj.direction;
    this.obj = obj;
    obj.style.position = "absolute";
    if (this.area != document) {
        this.area.style.position = "relative";
    }
    this.bw = this.area == document ? document.documentElement.clientWidth : this.area.offsetWidth - parseInt(getStyle(this.area, "borderLeftWidth"))*2;
    this.bh = this.area == document ? document.documentElement.clientHeight : this.area.offsetHeight - parseInt(getStyle(this.area, "borderTopWidth"))*2;
    this.boxleft = this.area == document ? 0 : getPosition(this.area).x + parseInt(getStyle(this.area, "borderLeftWidth"));
    this.boxtop = this.area == document ? 0 : getPosition(this.area).y + parseInt(getStyle(this.area, "borderTopWidth"));
    this.dw = obj.offsetWidth;//加边框
    this.dh = obj.offsetHeight;//加边框
    this.ox = 0;  //offsetX
    this.oy = 0;  //offsetY
    this.cx = 0;  //clientX
    this.cy = 0;  //clientY;
    this.left = 0;
    this.top = 0;
    this.mousedown();
}
Drag.prototype={
    mousedown:function(){
        var _this=this;
        _this.obj.onmousedown= function (e) {
            var ev=e||window.event;
            _this.prevent(ev);
            _this.ox=ev.offsetX;
            _this.oy=ev.offsetY;
            _this.mousemove();
            _this.mouseup();
        }
    },
    mousemove: function () {
        var _this=this;
        document.onmousemove= function (e) {
            var ev=e||window.event;
            _this.prevent(ev);
            _this.cx=ev.clientX;
            _this.cy=ev.clientY;
            _this.left=_this.cx-_this.ox-_this.boxleft;
            _this.top=_this.cy-_this.oy-_this.boxtop;
            if(_this.left<0){
                _this.left=0;
            }
            if(_this.top<0){
                _this.top=0;
            }
            if(_this.left>=_this.bw-_this.dw){
                _this.left=_this.bw-_this.dw
            }
            if(_this.top>=_this.bh-_this.dh){
                _this.top=_this.bh-_this.dh
            }
            if(_this.direction=="all"||_this.direction=="x"){
                _this.obj.style.left=_this.left+"px";
            }
            if(_this.direction=="all"||_this.direction=="y"){
                _this.obj.style.top=_this.top+"px";
            }
        }
    },
    mouseup: function () {
        document.onmouseup= function () {
            document.onmousemove=null;
        }
    },
    prevent:function(aa){
        if(aa.preventDefault){
            aa.preventDefault()
        }else{
            aa.returnValue=false;
        }
    }
};