(this.webpackJsonpipad=this.webpackJsonpipad||[]).push([[0],{32:function(e,t,n){e.exports=n.p+"static/media/minus.e06ee095.svg"},33:function(e,t,n){e.exports=n.p+"static/media/plus.7fdd4344.svg"},34:function(e,t,n){e.exports=n.p+"static/media/click.56a99ebe.mp3"},35:function(e,t,n){e.exports=n(72)},40:function(e,t,n){},68:function(e,t){},71:function(e,t,n){},72:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(30),l=n.n(c),s=(n(40),n(12)),r=n(31),i=n.n(r),u=(n(71),n(32)),m=n.n(u),d=n(33),p=n.n(d),b=n(34),f=new Audio(n.n(b).a),g=function(){var e=i()("https://2dda0d12.ngrok.io"),t=Object(a.useState)(0),n=Object(s.a)(t,2),c=n[0],l=n[1],r=Object(a.useState)(!1),u=Object(s.a)(r,2),d=u[0];u[1];Object(a.useEffect)((function(){console.log("sending: ",c),e.emit("values to server",c)}));var b=function(e){f.play(),"add"===e&&c<1?l(c+.01):"subtract"===e&&c>.01&&l(c-.01)};return o.a.createElement("div",{className:"wrapper",onDoubleClick:function(e){e.target.className.includes("allowDoubleClick")||e.preventDefault()}},o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Control the mood!"),o.a.createElement("h3",null,"Be a part of controlling the ambience by increasing or decreasing the energy level"),o.a.createElement("div",{className:d?"controls wasClicked":"controls"},o.a.createElement("button",{className:"controls__control controls__minus allowDoubleClick",onClick:function(){return b("subtract")}},o.a.createElement("img",{className:"allowDoubleClick",src:m.a})),o.a.createElement("button",{className:"controls__control controls__plus allowDoubleClick",onClick:function(){return b("add")}},o.a.createElement("img",{className:"allowDoubleClick",src:p.a}))),o.a.createElement("div",{className:"status"},"Energy:"," ",o.a.createElement("span",{className:"status__peopleValue"},Math.round(100*c))," ","/ 100")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[35,1,2]]]);
//# sourceMappingURL=main.23ab8d12.chunk.js.map