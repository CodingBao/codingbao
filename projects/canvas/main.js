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

context.fillStyle = "rgb(255,0,0)"

//画直线
function drawLine(srcX,srcY,dstX,dstY){
    context.beginPath()
    context.moveTo(srcX,srcY)
    context.lineTo(dstX,dstY)
    context.stroke()
}

var bInUse = false
var bInEraser = false
var oldPoint = {x:undefined,y:undefined}
window.onmousedown = function(a){
    bInUse = true
    oldPoint = {x:a.clientX,y:a.clientY}
}

window.onmousemove = function(a){
    if(bInUse){
        if(bInEraser){
            context.clearRect(a.clientX-5,a.clientY-5,10,10)
        }else{
            var newPoint = {x:a.clientX,y:a.clientY}
            drawLine(oldPoint.x,oldPoint.y,newPoint.x,newPoint.y)
            oldPoint = newPoint
        }
    }
}

window.onmouseup = function(a){
    bInUse = false
}

var eraserBtn = document.getElementById("eraser")
eraserBtn.onclick = function(){
    bInEraser = !bInEraser
}

