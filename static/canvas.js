var link;
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
// Keep everything in anonymous function, called on window load.
if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    if(link!=null){
        openInNewTab(link)
    }
    e.preventDefault();
  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    if(link!=null){
        openInNewTab(link)
    }
    window.event.returnValue = false;
  });
}

if(window.addEventListener) {
window.addEventListener('load', function () {
  var canvas, context, canvaso, contexto;

  // The active tool instance.
  var tool;
  var tool_default = 'rect';

  function init () {
    // Find the canvas element.
    canvaso = document.getElementById('imageView');
    if (!canvaso) {
      alert('Error: I cannot find the canvas element!');
      return;
    }

    if (!canvaso.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }

    // Get the 2D canvas context.
    contexto = canvaso.getContext('2d');
    if (!contexto) {
      alert('Error: failed to getContext!');
      return;
    }

    // Add the temporary canvas.
    var container = canvaso.parentNode;
    canvas = document.createElement('canvas');
    if (!canvas) {
      alert('Error: I cannot create a new canvas element!');
      return;
    }

    canvas.id     = 'imageTemp';
    canvas.width  = canvaso.width;
    canvas.height = canvaso.height;
    container.appendChild(canvas);

    context = canvas.getContext('2d');

    // Get the tool select input.
    var tool_select = document.getElementById('dtool');
    if (!tool_select) {
      alert('Error: failed to get the dtool element!');
      return;
    }
    tool_select.addEventListener('change', ev_tool_change, false);

    // Activate the default tool.
    if (tools[tool_default]) {
      tool = new tools[tool_default]();
      tool_select.value = tool_default;
    }

    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
  }

  // The general-purpose event handler. This function just determines the mouse
  // position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    // Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }

  // The event handler for any changes made to the tool selector.
  function ev_tool_change (ev) {
    if (tools[this.value]) {
      tool = new tools[this.value]();
    }
  }

  // This function draws the #imageTemp canvas on top of #imageView, after which
  // #imageTemp is cleared. This function is called each time when the user
  // completes a drawing operation.
  function img_update () {
		contexto.drawImage(canvas, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // This object holds the implementation of each drawing tool.
  var tools = {};

  // The drawing pencil.
  tools.pencil = function () {
    var tool = this;
    this.started = false;

    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };

    // This function is called every time you move the mouse. Obviously, it only
    // draws if the tool.started state is set to true (when you are holding down
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
      }
    };

    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };

  // The rectangle tool.
  tools.rect = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      x = Math.min(ev._x,  tool.x0),
      y = Math.min(ev._y,  tool.y0),
      w = Math.abs(ev._x - tool.x0),
      h = Math.abs(ev._y - tool.y0);


      context.clearRect(0, 0, canvas.width, canvas.height);

      if (!w || !h || x==0 || y==0) {
        return;
      }
      if(w>1000){
        if(h<0.5*w){
        return;
        }
      }
      if(h>1000){
        if(w<0.5*h){
        return;
        }
      }

      context.strokeRect(x, y, w, h);
    };
    var x,y,w,h;
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
        console.log(x,y,w,h);
        if (!w || !h || x==0 || y==0) {
        return;
      }
      if(w>1000){
        if(h<0.5*w){
        return;
        }
      }
      if(h>1000){
        if(w<0.5*h){
        return;
        }
      }

        document.getElementById("wow").innerHTML += `<img style='position: absolute;top: ${y+(0.061*window.innerHeight)};left: ${x+(0.0052*window.innerWidth)};margin: auto;' src='/cage/${w}/${h}'>`}
        link = `/cage/${w}/${h}`;
   };
  };

  // The line tool.
  tools.line = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.moveTo(tool.x0, tool.y0);
      context.lineTo(ev._x,   ev._y);
      context.stroke();
      context.closePath();
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };

  init();

}, false); }

// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix: