//初始化数据
function initData() {
    var keysLst = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ]

    var locLst = JSON.parse(localStorage.getItem('save') || 'null')
    if(!locLst){
        locLst = {
            'q': 'qq.com',
            'w': 'weibo.com',
            'e': 'ele.me',
            'r': 'renren.com',
            't': 'tianya.com',
            'y': 'youtube.com',
            'u': 'uc.com',
            'i': 'iqiyi.com',
            'o': 'opera.com',
            'a': 'acfun.tv',
            's': 'sohu.com',
            'z': 'zhihu.com',
            'm': 'www.mcdonalds.com.cn'
        }
    }

    return {
        keys: keysLst,
        loc: locLst
    }
}

//创建标签
function tag(elem, tClass) {
    var tElement = document.createElement(elem)
    tElement.className = tClass
    return tElement
}

function creatKbd() {
    var tElement = tag("kbd", "key")
    // tElement.onclick = function (xxx) {
    //     var tmpBtn = xxx.target.lastChild
    //     var tmpId = tmpBtn.id
    //     openNewWindow(tmpBtn, locHash[tmpId])
    // }
    return tElement
}

function createText(tText) {
    var tElement = tag("span", "text")
    tElement.textContent = tText
    return tElement
}

function creatImg(loc) {
    var tElement = document.createElement("img")
    if (loc) {
        tElement.src = 'http://' + loc + '/favicon.ico'
    } else {
        tElement.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    tElement.onerror = function (xxx) {
        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    return tElement
}

function creatEditBtn(tId) {
    var tElement = document.createElement("button")
    tElement.id = tId
    tElement.textContent = "E"

    tElement.onclick = function (xxx) {
        onEditBtnDown(xxx.target)
    }

    return tElement
}

function onEditBtnDown(tmpBtn) {
    var tmpKey = tmpBtn.id
    var tmpImg = tmpBtn.previousSibling

    var newUrl = prompt("输入新的网址")
    if (newUrl) {
        locHash[tmpKey] = newUrl
        localStorage.setItem("save", JSON.stringify(locHash))

        tmpImg.src = 'http://' + newUrl + '/favicon.ico'
        tmpImg.onerror = function (tmpclick) {
            tmpclick.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
    }
}

//打开新窗口
function openNewWindow(tmpBtn, loc) {
    if (loc) {
        window.open('http://' + loc, '_blank')
    } else {
        alert("invalid url! please click the E button!")
        //onEditBtnDown(tmpBtn)
    }
}

var allData = initData()
var keyHash = allData.keys
var locHash = allData.loc

var index = 0
console.log(keyHash.length)
while (index < keyHash.length) {
    var box = tag("div", "row")
    main.appendChild(box)

    var keyLst = keyHash[index]
    var index2 = 0;
    while (index2 < keyLst.length) {
        var curKey = keyLst[index2]

        var kbdbox = creatKbd()
        box.appendChild(kbdbox)

        var spanbox = createText(curKey)
        var fav = creatImg(locHash[curKey])
        var btn = creatEditBtn(curKey)
        kbdbox.appendChild(spanbox)
        kbdbox.appendChild(fav)
        kbdbox.appendChild(btn)

        index2++
    }
    index++
}

//键盘控制
document.onkeypress = function (xxx) {
    console.log(xxx)
    openNewWindow(xxx, locHash[xxx.key])
}