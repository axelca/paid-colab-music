(this.webpackJsonpipad=this.webpackJsonpipad||[]).push([[0],{51:function(e,t,a){e.exports=a(91)},56:function(e,t,a){},84:function(e,t){},91:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(13),r=a.n(c),i=(a(56),a(5)),l=a(25),u=a(4),s=a(47),h=a.n(s),d=a(102),m=a(15),b=Object(m.a)({root:{color:"#52af77",height:8},thumb:{height:24,width:24,backgroundColor:"#fff",border:"2px solid currentColor",marginTop:-8,marginLeft:-12,"&:focus,&:hover,&$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"calc(-50% + 4px)"},track:{height:8,borderRadius:4},rail:{height:8,borderRadius:4}})(d.a),v=h()("https://6172e9f5.ngrok.io"),f=function(e){var t=e.data,a=e.handleChange,n=e.touchEnd,c=t.name,r=t.value,i=t.active;return o.a.createElement(b,{className:i?"slider active":"slider",onChangeCommitted:n,valueLabelDisplay:"auto","aria-label":"slider for ".concat(c),value:r,onChange:a,min:1,max:100})},g=function(){var e=Object(n.useState)({}),t=Object(u.a)(e,2),a=(t[0],t[1]),c=Object(n.useState)(!1),r=Object(u.a)(c,2),s=(r[0],r[1],Object(n.useState)(0)),h=Object(u.a)(s,2),d=(h[0],h[1],Object(n.useState)([{name:"energy",value:50,avg:50,active:!1}])),m=Object(u.a)(d,2),b=m[0],g=m[1],p=Object(n.useState)([50]),j=Object(u.a)(p,2),O=j[0],w=j[1],E=Object(n.useState)(!1),k=Object(u.a)(E,2),C=k[0];k[1];v.on("now playing",(function(e){a(e)})),Object(n.useEffect)((function(){console.log(b),v.emit("new value",b)}),[O]);var y=function(e,t,a){var n=b.map((function(t){return t.name!==e?t:Object(l.a)({},t,{value:a,active:!0})}));g(n)},S=function(e,t,a){var n=O.reduce((function(e,t){return e+t}),0)/O.length||0;O.length>5&&(n=O.slice(O.length-5,O.length).reduce((function(e,t){return e+t}),0)/5||0);var o=b.map((function(t){return t.name!==e?t:Object(l.a)({},t,{value:Math.round(n),avg:Math.round(n),active:!1})}));g(o),w([].concat(Object(i.a)(O),[a]))};return o.a.createElement("div",{className:"wrapper",onDoubleClick:function(e){return e.preventDefault()}},o.a.createElement("div",{className:C?"App touch":"App"},o.a.createElement("h1",null,"Control the mood!"),o.a.createElement("h3",null,"Be a part of controlling the ambience by adjusting the music"),o.a.createElement("div",{className:"controls"},b.map((function(e){return o.a.createElement(f,{key:e.name,data:e,handleChange:y.bind(null,e.name),touchEnd:S.bind(null,e.name)})})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[51,1,2]]]);
//# sourceMappingURL=main.19478bd0.chunk.js.map