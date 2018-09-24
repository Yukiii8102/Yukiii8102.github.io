var p = document.getElementById("p");
var texts = document.querySelectorAll("#text li")
var cards = document.querySelectorAll("#card li");

// 获取元素的兄弟元素
var siblings = function (ele) {
    var node = [];
    var allNodes = ele.parentNode.children;
    for (var i = 0; i < allNodes.length; i++) {
        if (allNodes[i] != ele) {
            node.push(allNodes[i]);
        }
    }
    return node;
}

// var siblings = function (ele) {
//     var node = [];
//     var prev = ele.previousElementSibling;
//     var next = ele.nextElementSibling;
//     while (prev != null) {
//         node.unshift()
//     }
// }

//向元素添加class
var addClass = function (element, className) {
    var oldClass = element.className;
    var classArray = oldClass.split(" ");
    if (classArray.indexOf(className) == -1) {
        classArray.push(className);
    } else {
        return;
    }
    element.className = classArray.join(' ').trim();
}

//删除元素中的class
var removeClass = function (element, className) {
    var oldClass = element.className;
    var classArray = oldClass.split(" ");
    if (classArray.indexOf(className) == -1) {
        return;
    } else {
        classArray.splice(classArray.indexOf(className), 1);
    }
    if (classArray.length == 0) {
        element.removeAttribute("class");
    } else {
        element.className = classArray.join(' ').trim();
    }
}

for (var i = 0; i < cards.length; i++) {
    cards[i].index = i;
    cards[i].onclick = function () {
        // 点击选项卡变化
        addClass(this, "active");
        // 清除选项卡兄弟颜色
        for (var j = 0; j < cards.length -1; j++) {
            removeClass(siblings(this)[j], "active");
        }
        // 点击选项卡的文本变化
        addClass(texts[this.index], "active");
        // 清除选项卡兄弟的文本变化
        for (var k = 0; k < texts.length -1; k++) {
            removeClass(siblings(texts[this.index])[k], "active");
        }
    }
}