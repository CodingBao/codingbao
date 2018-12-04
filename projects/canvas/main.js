var canvasBox = document.getElementById("canvas")
var context = canvasBox.getContext('2d')

onInitCanvas()

//适应全屏
function onInitCanvas() {
    canvasBox.width = document.documentElement.clientWidth
    canvasBox.height = document.documentElement.clientHeight

    window.onresize = function () {
        canvasBox.width = document.documentElement.clientWidth
        canvasBox.height = document.documentElement.clientHeight
    }
}

var bInEraser = false
var eraserBtn = document.getElementById("eraser")
var penBtn = document.getElementById("pen")
var clearBtn = document.getElementById("clear")
eraserBtn.onclick = function () {
    bInEraser = true
    eraserBtn.classList.add("actived")
    penBtn.classList.remove("actived")
}

penBtn.onclick = function () {
    bInEraser = false
    eraserBtn.classList.remove("actived")
    penBtn.classList.add("actived")
}

clearBtn.onclick = function () {
    context.clearRect(0,0,document.documentElement.clientWidth,document.documentElement.clientHeight)
}

red.onclick = function(){
    context.strokeStyle = "red"
}
green.onclick = function(){
    context.strokeStyle = "green"
}
blue.onclick = function(){
    context.strokeStyle = "blue"
}

document.getElementById("lineWidthNum").value = 5
var lineWidth = document.getElementById("lineWidthNum").value
var addBtn = document.getElementById("add")
var reduceBtn = document.getElementById("reduce")
addBtn.onclick = function(){
    document.getElementById("lineWidthNum").value++
}
reduceBtn.onclick = function(){
    if(document.getElementById("lineWidthNum").value > 1){
        document.getElementById("lineWidthNum").value--
    }
}


var bInUse = false
var oldPoint = {
    x: undefined,
    y: undefined
}
draw()
//画直线
function drawLine(srcX, srcY, dstX, dstY) {
    context.beginPath()
    context.lineWidth = lineWidth
    context.moveTo(srcX, srcY)
    context.lineTo(dstX, dstY)
    context.stroke()
}

function draw() {
    if (window.ontouchstart == undefined) {
        window.onmousedown = function (a) {
            lineWidth = document.getElementById("lineWidthNum").value
            bInUse = true
            oldPoint = {
                x: a.clientX,
                y: a.clientY
            }
        }

        window.onmousemove = function (a) {
            if (bInUse) {
                if (bInEraser) {
                    context.clearRect(a.clientX - lineWidth/2, a.clientY - lineWidth/2, lineWidth, lineWidth)
                } else {
                    var newPoint = {
                        x: a.clientX,
                        y: a.clientY
                    }
                    drawLine(oldPoint.x, oldPoint.y, newPoint.x, newPoint.y)
                    oldPoint = newPoint
                }
            }
        }

        window.onmouseup = function (a) {
            bInUse = false
        }
    } else {
        window.ontouchstart = function (a) {
            lineWidth = document.getElementById("lineWidthNum").value
            bInUse = true
            oldPoint = {
                x: a.touches[0].clientX,
                y: a.touches[0].clientY
            }
        }

        window.onmousemove = function (a) {
            if (bInUse) {
                if (bInEraser) {
                    context.clearRect(a.touches[0].clientX - lineWidth/2, a.touches[0].clientY - lineWidth/2, lineWidth, lineWidth)
                } else {
                    var newPoint = {
                        x: a.touches[0].clientX,
                        y: a.touches[0].clientY
                    }
                    drawLine(oldPoint.x, oldPoint.y, newPoint.x, newPoint.y)
                    oldPoint = newPoint
                }
            }
        }

        window.onmouseup = function (a) {
            bInUse = false
        }
    }
}