(() => {
  // src/utils.esm.js
  var named = (host) => {
    var list = {};
    var els = host.querySelectorAll("[name]");
    if (els == void 0)
      return;
    for (var i = 0; i < els.length; i++) {
      var nameValue = els[i].getAttribute("name");
      list[nameValue] = els[i];
    }
    return list;
  };
  var html = (str, callback) => {
    var el = document.createElement("div");
    el.innerHTML = str;
    var elem = el.firstElementChild;
    if (callback)
      callback(elem, named(elem));
    return elem;
  };

  // src/colorpicker.js
  function colorpicker(callback) {
    var color = {};
    var element = html(`<div></div>`);
    function updateColor() {
      var string = `hsl(${color.hue}, ${color.lig}%, ${color.sat}%)`;
      element.style.background = string;
      callback(string);
    }
    var ligsat = html(`<div class="matrix"><div class="gradient-clickthrew"></div>
<div class="point" name="point"></div>
</div>`, (el, ch) => {
      el.addEventListener("mousedown", (e) => {
        ch.point.style.marginLeft = e.offsetX - 10 + "px";
        ch.point.style.marginTop = e.offsetY - 10 + "px";
        var lig = Math.round(e.offsetX / el.offsetWidth * 100);
        var sat = Math.round(e.offsetY / el.offsetHeight * 100);
        color.lig = lig;
        color.sat = sat;
        updateColor();
      });
    });
    var hue = html(`<div class="track">

<div class="thumb" name="thumb"></div>
</div>`, (element2, child) => {
      function moveMouse(e) {
        child.thumb.style.marginLeft = e.offsetX - 15 + "px";
        var value = Math.round(e.offsetX / element2.offsetWidth * 360);
        child.thumb.innerText = value;
        ligsat.style.background = `hsl(${value}, 100%, 50%)`;
        color.hue = value;
        updateColor();
      }
      var moveable = true;
      const stopMoveable = () => {
        moveable = true;
        element2.removeEventListener("mousemove", moveMouse);
        child.thumb.style.height = "26px";
        child.thumb.style.width = "50px";
        child.thumb.style.background = "black";
      };
      element2.addEventListener("mousedown", (e) => {
        moveMouse(e);
        if (moveable) {
          moveable = false;
          element2.addEventListener("mousemove", moveMouse);
          child.thumb.style.height = "26px";
          child.thumb.style.width = "30px";
          child.thumb.style.background = "transparent";
          element2.addEventListener("mouseleave", () => {
            stopMoveable();
          });
        } else {
          stopMoveable();
        }
      });
    });
    element.append(hue, ligsat);
    return element;
  }

  // src/palletPicker.js
  function palletPicker(callback) {
    var element = html(`<div>

<div name="colorpicker"></div>
<div name="colorlist" class="colorlist"></div>
<div>
<button name="addColor">add color</button>
<button name="output">output</button>
</div>
</div>`, (el, ch) => {
      var lastSelected;
      var setColorValue = () => {
      };
      var voidEl = html("<div></div>");
      const select = (el2) => {
        if (lastSelected == el2) {
          el2 = voidEl;
        }
        el2.style.boxShadow = "inset 0px 0px 0px 3px grey";
        setColorValue = (color2) => {
          var ch2 = named(el2);
          ch2.color.style.background = color2;
          ch2.label.innerText = color2;
        };
        if (lastSelected)
          lastSelected.style.boxShadow = "";
        lastSelected = el2;
      };
      const coloritem = () => {
        var el2 = html(`<div class="color-item">
            <div class="color" name="color" style="background:${color};"></div>
            <label name="label">${color}</label>
            <div name="remove" class="button"><i class="gg-close"></i></div>
        </div>`);
        var ch2 = named(el2);
        ch2.remove.addEventListener("click", () => {
          el2.remove();
        });
        el2.addEventListener("click", () => {
          select(el2);
        });
        return el2;
      };
      var color;
      ch.colorpicker.append(colorpicker((value) => {
        setColorValue(value);
        color = value;
      }));
      ch.addColor.addEventListener("click", () => {
        ch.colorlist.append(coloritem(color));
      });
      ch.output.addEventListener("click", () => {
        var colorlist = [];
        var colorlistEls = ch.colorlist.children;
        for (var i = 0; i < colorlistEls.length; i++) {
          colorlist.push(colorlistEls[i].children[0].style.background);
        }
        callback(colorlist);
      });
    });
    return element;
  }

  // src/index.js
  document.body.append(palletPicker((value) => {
    document.body.append(value);
  }));
})();
