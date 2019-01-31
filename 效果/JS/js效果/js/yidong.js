window.onload = function () {
    let innerbox = getClass("innerbox")[0];
    let leftbtn = getClass("leftbtn")[0];
    let rightbtn = getClass("rightbtn")[0];

    let flag = true;
    let t1 = setInterval(move, 2000);//2s

    let t2;
    let flag1 = false;
    let flag2 = true;
    let flag3 = true;

//初始移动 flag
    function move() {
        if (flag) {
            flag = false;
            animate(innerbox, {marginLeft: -295}, 500, function () {
                let first = getFirstChild(innerbox);
                innerbox.appendChild(first);
                innerbox.style.marginLeft = 0;
                flag = true;
            })
        }
    };

//flag3
    function move1() {
        if (flag3) {
            flag3 = false;
            innerbox.style.marginLeft = "-295px";
            let last = getLastChild(innerbox);
            let first = getFirstChild(innerbox);
//insertBefore() 方法在您指定的已有子节点之前插入新的子节点，node.insertBefore(newnode,existingnode)
            innerbox.insertBefore(last, first);
            animate(innerbox, {marginLeft: 0}, 500, function () {
                flag3 = true;
            })
        }
    };
//右点击
    rightbtn.onclick = function () {
        flag2 = true;
        if (flag1) {
            flag1 = false;
            clearTimeout(t2);
            animate(innerbox, {marginLeft: -295}, 500, function () {
                let first = getFirstChild(this);
                this.appendChild(first);
                this.style.marginLeft = 0;
                flag = true;
                t1 = setInterval(move, 2000);
            });
        } else {
            move();
        }
    };
 //左点击
    leftbtn.onclick = function () {
        flag1 = true;
        clearTimeout(t1);
        if (flag2) {
            flag2 = false;
            let left = parseInt(getStyle(innerbox, "margin-left"));//父盒子距左的距离
            if (left < 0 && left > -295) {
                animate(innerbox, {marginLeft: 0}, 500, function () {
                    flag3 = true;
                    t2 = setInterval(move1, 2000);
                })
            } else if (left == 0 || left == -295) {
                move1();
                t2 = setInterval(move1, 2000);
            }
        } else {
            move1();
        }
    }
}

