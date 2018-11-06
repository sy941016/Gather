window.onload=function(){
    var innerbox=getClass("innerbox")[0];
    var leftbtn=getClass("leftbtn")[0];
    var rightbtn=getClass("rightbtn")[0];
    var flag=true;
    var t1=setInterval(move,2000);
    var t2;
    var flag1=false;
    var flag2=true;
    var flag3=true;
    function move(){
        if(flag){
            flag=false;
            animate(innerbox,{marginLeft:-295},500,function(){
                var first=getFirstChild(innerbox);
                innerbox.appendChild(first);
                innerbox.style.marginLeft=0;
                flag=true;
            })
        }
    }
    function move1(){
        if(flag3) {
            flag3=false;
            innerbox.style.marginLeft = "-295px";
            var last = getLastChild(innerbox);
            var first = getFirstChild(innerbox);
            innerbox.insertBefore(last, first);
            animate(innerbox, {marginLeft: 0}, 500, function () {
                flag3=true;
            })
        }
    }
    rightbtn.onclick=function(){
        flag2=true;
        if(flag1){
            flag1=false;
            clearTimeout(t2);
            animate(innerbox,{marginLeft:-295},500,function(){
                var first=getFirstChild(this);
                this.appendChild(first);
                this.style.marginLeft=0;
                flag=true;
                t1 = setInterval(move, 2000);
            });
        }else {
            move();
        }
    };
    leftbtn.onclick=function() {
        flag1 = true;
        clearTimeout(t1);
        if (flag2) {
            flag2=false;
        var left = parseInt(getStyle(innerbox, "margin-left"));
        if (left < 0 && left > -295) {
            animate(innerbox, {marginLeft: 0}, 500, function () {
                flag3=true;
                t2 = setInterval(move1, 2000);
            })
        } else if (left == 0 || left == -295) {
            move1();
            t2 = setInterval(move1, 2000);
            }
        }else{
            move1();
        }
    }
};

