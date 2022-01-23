import { colorpicker } from "./colorpicker";
import {id,html,named} from './utils.esm'
function palletPicker(callback){
var element = html(`<div>

<div name="colorpicker"></div>
<div name="colorlist" class="colorlist"></div>
<div>
<button name="addColor">add color</button>
<button name="output">output</button>
</div>
</div>`,(el,ch)=>{
    var lastSelected
    var setColorValue =()=>{}
    var voidEl = html('<div></div>')
    const select=(el)=>{
        if(lastSelected==el){
        el=voidEl
        }
        el.style.boxShadow='inset 0px 0px 0px 3px grey'
        setColorValue=(color)=>{
            var ch = named(el);
            ch.color.style.background=color
            ch.label.innerText=color
        }
        if(lastSelected)lastSelected.style.boxShadow=''
        lastSelected=el
    }
    const coloritem=()=>{
        var el = html(`<div class="color-item">
            <div class="color" name="color" style="background:${color};"></div>
            <label name="label">${color}</label>
            <div name="remove" class="button"><i class="gg-close"></i></div>
        </div>`)
        var ch = named(el)
        ch.remove.addEventListener('click',()=>{
            el.remove()
        })
        el.addEventListener('click',()=>{
            select(el)


        })
        return el
    }
    var color
    ch.colorpicker.append(colorpicker((value)=>{setColorValue(value);color=value}))
    ch.addColor.addEventListener('click',()=>{
        ch.colorlist.append(coloritem(color))
    })
    ch.output.addEventListener('click',()=>{
        var colorlist = []
        var colorlistEls = ch.colorlist.children
        for (var i=0;i<colorlistEls.length;i++){
            colorlist.push(colorlistEls[i].children[0].style.background)
        }
        callback(colorlist)
    })
})
return element
}
export {palletPicker}