/**                               函数库
 * 1.兼容的通过类名获取元素
 * 2.兼容的获取或修改文本内容
 * 3.兼容获取元素的样式 obj 指定获取样式的元素 arr 获取指定的元素
 * 4.兼容地获取父元素中所有的子元素中的元素节点
 * 5.兼容地获取父元素中的第一个元素节点
 * 6.兼容地获取父元素中的最后一个元素节点
 * 7.兼容的获取下一个兄弟元素的元素节点
 * 8.兼容的获取上一个兄弟元素的元素节点
 * 9.兼容的事件绑定函数
 * 10.兼容滚轮下拉函数
 **/
//1.
function getClass(a) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(a);
    } else {
        var tags = document.getElementsByTagName("*");
        var arr = [];
        //var num=0;
        for (var i = 0; i < tags.length; i++) {
            if (check(tags[i].className, a)) {//
                //arr[num]=tags[i];
                //num++;
                arr.push(tags[i])
            }
        }
        return arr;
    }
}

function check(tagClassName, a) {
    var arr = tagClassName.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == a) {
            return true;
        }
    }
    return false;
}

//2.
function getText(obj, val) {
    if (val == undefined) {
        if (obj.innerText == "undefined") {//火狐
            return obj.textContent;
        } else {
            return obj.innerText;//IE或谷歌
        }
    } else {
        if (obj.innerText == "undefined") {//火狐
            return obj.textContent = val;
        } else {
            return obj.innerText = val;//IE或谷歌
        }
    }
}

//3.
function getStyle(obj, arrt) {
    if (obj.currentStyle) {
        return obj.currentStyle[arrt];
    } else {
        return getComputedStyle(obj)[arrt];
    }
}

//4.
function getChilds(obj) {
    var childs = obj.childNodes;
    var arr = [];
    for (var i = 0; i < childs.length; i++) {
        if (childs[i].nodeType == 1) {
            arr.push(childs[i]);
        }
    }
    return arr;
}

//5.
function getFirstChild(obj) {
    return getChilds(obj)[0];
}

//6.
function getLastChild(obj) {
    var arr = getChilds(obj);
    return arr[arr.length - 1];
}

//7.
function nextSibling(node) {
    var next = node.nextSibling;
    if (next == null) {
        return undefined;
    }
    while (next.nodeType != 1) {
        next = next.nextSibling;
        if (next == null) {
            return undefined;
        }
    }
    return next;
}

//递归思想写法
function getNextSibling(node) {//获得下一个兄弟节点
    var next = node.nextSibling;
    if (next.nodeType == 1) {
        //判断下一个兄弟节点的nodeType是不是等于1，条件满足等于
        return next;//当前的NEXT就是想找的下一个兄弟节点
    }
    if (next) {//当前的next的nodeType值不等于1也不为空
        return getNextSibling(next);//继续调用我们自身的这个函数
    }
    return null;
}

//
function getNextSib(node) {
    var tempLast = getLastChild(node.parentNode);//是否为最后一个元素节点，是则为空
    if (node == tempLast) {
        return null;
    }
    var tempObj = node.nextSibling;
    while (tempObj.nodeType != 1 && tempObj.nextSibling != null) {
        tempObj = tempObj.nextSibling;
    }
    return (tempObj.nodeType == 1) ? tempObj : null;//判断是否为1
}

//8.
function prevSibling(node) {
    var prev = node.previousSibling;
    if (prev == null) {
        return undefined;
    }
    while (prev.nodeType != 1) {
        prev = prev.previousSibling;
        if (prev == null) {
            return undefined;
        }
    }
    return prev;
}

//递归思想写法
function getPrevSibling(node) {
    var prev = node.previousSibling;
    if (prev.nodeType == 1) {
        return prev;
    }
    if (prev) {
        return getPrevSibling(prev);
    }
    return null;
}

//9.
function addEvent(obj, types, fn) {
    if (document.addEventListener) {
        return obj.addEventListener(types, fn, false);
    } else {
        return obj.attachEvent("on" + types, fn);
    }
}

//10.
function mouseWheel(obj, upfun, downfun) {
    function wheel(e) {
        let ev = e || window.event;
        if (ev.wheelDelta) {
            if (ev.wheelDelta > 0) {
                upfun.call(obj);
            } else {
                downfun.call(obj);
            }
        } else {
            if (ev.detail > 0) {
                downfun.call(obj);
            } else {
                upfun.call(obj);
            }
        }
    }

    addEvent(obj, "mousewheel", wheel);//IE google
    addEvent(obj, "DOMMouseScroll", wheel);//firefox
}
