window.onload = function () {
    let bigbox = document.getElementsByClassName("bigbox")[0];
    let box = document.getElementsByClassName("box");
    let btn = document.getElementsByClassName("btn");
    let rightbtn = document.getElementsByClassName("rightbtn")[0];
    let leftbtn = document.getElementsByClassName("leftbtn")[0];
    let t = setInterval(move, 2000);
    let num = 0;

    function move() {
        num >= box.length - 1 ? num = 0 : num++;
        for (let i = 0; i < box.length; i++) {
            for (let j = 0; j < box.length; j++) {
                box[j].style.zIndex = 0;
                btn[j].style.backgroundColor = "#000";
            }
            Btn(num)
        }
    }

    //btn交互的处理函数
    for (let i = 0; i < btn.length; i++) {
        btn[i].index = i;
        btn[i].onmouseover = function () {
            clearTimeout(t);
            for (let j = 0; j < btn.length; j++) {
                box[j].style.zIndex = 0;
                btn[j].style.backgroundColor = "#000";
            }
            Btn(this.index);
            num = this.index;
        };
    }
    //左右点击的处理函数
    rightbtn.onclick = function () {
        move();
    };
    leftbtn.onclick = function () {
        num -= 2;
        if (num == -2) {
            num = box.length - 2;
        }
        move();
    };
    //鼠标移入移出的处理函数
    leftbtn.onmouseover = rightbtn.onmouseover = function () {
        clearTimeout(t);
    };
    leftbtn.onmouseout = rightbtn.onmouseout = function () {
        t = setInterval(move, 2000)
    };

    //处理btn颜色
    function Btn(num) {
        box[num].style.zIndex = 1;
        btn[num].style.backgroundColor = "orange";
    }

    //左右按钮效果，优化用户体验
    bigbox.onmouseover = function () {
        animate(leftbtn, {opacity: 1}, 200);
        animate(rightbtn, {opacity: 1}, 200);
    };
    bigbox.onmouseout = function () {
        animate(leftbtn, {opacity: 0}, 200);
        animate(rightbtn, {opacity: 0}, 200);
    };
};
