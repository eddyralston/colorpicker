const named = (host) => {
    var list = {};var els = host.querySelectorAll('[name]')
    if(els==undefined)return ; 
    for (var i = 0; i < els.length; i++) {
       var nameValue = els[i].getAttribute('name');
       list[nameValue] = els[i]
    }
    return list
}

const id = id => document.getElementById(id)

const html = (str,callback) => {
   var el = document.createElement('div')
   el.innerHTML = str
   var elem = el.firstElementChild
   if(callback)callback(elem,named(elem))
   return elem
}


export {html,named,id}