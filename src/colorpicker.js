import {html,named,id} from './utils.esm'
function colorpicker(callback){
var color = {}
var element = html(`<div></div>`)
function updateColor(){
    var string = `hsl(${color.hue}, ${color.lig}%, ${color.sat}%)`
    element.style.background=string
    callback(string)
}
var ligsat = html(`<div class="matrix"><div class="gradient-clickthrew"></div>
<div class="point" name="point"></div>
</div>`,(el,ch)=>{
    el.addEventListener('mousedown',(e)=>{
        ch.point.style.marginLeft=e.offsetX-10+'px'
        ch.point.style.marginTop=e.offsetY-10+'px'
        var lig = Math.round(e.offsetX/el.offsetWidth*100)
        var sat = Math.round(e.offsetY/el.offsetHeight*100)
        color.lig=lig
        color.sat=sat
        updateColor()
    })
})
var hue = html(`<div class="track">

<div class="thumb" name="thumb"></div>
</div>`,(element,child)=>{
    function moveMouse(e){
        child.thumb.style.marginLeft=e.offsetX-15+'px'
        var value = Math.round(e.offsetX/element.offsetWidth*360)
        child.thumb.innerText = value
        ligsat.style.background = `hsl(${value}, 100%, 50%)`
        color.hue=value
        updateColor()
    }
    var moveable = true
    const stopMoveable=()=>{
        moveable=true;
        element.removeEventListener('mousemove',moveMouse)
        child.thumb.style.height='26px'
        child.thumb.style.width='50px'
        child.thumb.style.background='black'
    }
    element.addEventListener('mousedown',(e)=>{
        moveMouse(e)
        if(moveable){moveable=false
            element.addEventListener('mousemove',moveMouse)
            child.thumb.style.height='26px'
            child.thumb.style.width='30px'
            child.thumb.style.background='transparent'
            element.addEventListener('mouseleave',()=>{
                stopMoveable()
            })
        } else { stopMoveable()
        }
    })
})

element.append(hue,ligsat)
return element
}
export {colorpicker}