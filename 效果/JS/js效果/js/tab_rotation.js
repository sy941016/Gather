window.onload = function () {
    let bigbox = document.getElementsByClassName("bigbox")[0];
    let box = document.getElementsByClassName("box");
    let t = setInterval(move, 2000);
    let num = 0;
    let btn = document.getElementsByClassName("btn");
    let rightbtn = document.getElementsByClassName("rightbtn")[0];
    let leftbtn = document.getElementsByClassName("leftbtn")[0];

    function move() {
        num++;
        if (num >= box.length) {
            num = 0;
        }
        for (let i = 0; i < box.length; i++) {
            for (let j = 0; j < box.length; j++) {
                box[j].style.zIndex = 0;
                btn[j].style.backgroundColor = "#000";
            }
            box[num].style.zIndex = 1;
            btn[num].style.backgroundColor = "orange";
        }
    }

    for (let i = 0; i < btn.length; i++) {
        btn[i].index = i;
        btn[i].onmouseover = function () {
            clearTimeout(t);
            for (let j = 0; j < btn.length; j++) {
                box[j].style.zIndex = 0;
                btn[j].style.backgroundColor = "#000";
            }
            btn[this.index].style.backgroundColor = "orange";
            box[this.index].style.zIndex = 1;
        };
        btn[i].onmouseout = function () {
            t = setInterval(move, 3000);
            num = this.index;
        }
    }
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
    bigbox.onmouseover = function () {
        animate(leftbtn, {opacity: 1}, 200);
        animate(rightbtn, {opacity: 1}, 200);
    };
    bigbox.onmouseout = function () {
        animate(leftbtn, {opacity: 0}, 200);
        animate(rightbtn, {opacity: 0}, 200);
    };
    leftbtn.onmouseover = rightbtn.onmouseover = function () {
        clearTimeout(t);
    };
    leftbtn.onmouseout = rightbtn.onmouseout = function () {
        t = setInterval(move, 2000)
    };
};
