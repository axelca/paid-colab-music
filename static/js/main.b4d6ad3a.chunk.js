(this.webpackJsonpipad=this.webpackJsonpipad||[]).push([[0],{117:function(e,t,n){},118:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(15),i=n.n(c),r=(n(66),n(52)),u=n(5),s=n(55),l=n.n(s),d=n(56),v=n.n(d),f=function(e){var t=e.data,n=e.onClick,c=t.text,i=t.active,r=t.id,s=t.voteCount,l="&q=".concat(encodeURI(c),"&limit=1&offset=0&rating=G&lang=en"),d=Object(a.useState)({}),f=Object(u.a)(d,2),g=f[0],m=f[1];return Object(a.useEffect)((function(){v.a.get("https://api.giphy.com/v1/gifs/search?api_key=lUxuo0G2Dg5qHDcas6AXWCY2RY8Y0td7"+l).then((function(e){m(e.data.data[0])})).catch((function(e){console.log(e)}))}),[c]),g&&g.images?o.a.createElement("div",{onClick:function(){return n(r)},className:"gif"},o.a.createElement("img",{src:g.images.fixed_width_downsampled.url})," ",o.a.createElement("div",{className:"votes"},s),i?null:o.a.createElement("div",{className:"inactive"})):o.a.createElement("div",null)},g=n(129),m=n(17),h=(Object(m.a)({root:{color:"#52af77",height:8},thumb:{height:24,width:24,backgroundColor:"#fff",border:"2px solid currentColor",marginTop:-8,marginLeft:-12,"&:focus,&:hover,&$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"calc(-50% + 4px)"},track:{height:8,borderRadius:4},rail:{height:8,borderRadius:4}})(g.a),n(117),l()("https://6172e9f5.ngrok.io")),p=[{voteCount:0,active:!1,id:0,energy:0,text:"standing still"},{voteCount:0,active:!1,id:1,energy:10,text:"listen to music"},{voteCount:0,active:!1,id:2,energy:20,text:"hiphop"},{voteCount:0,active:!0,id:3,energy:30,text:"dance"},{voteCount:0,active:!1,id:4,energy:40,text:"moderate dance"},{voteCount:0,active:!1,id:5,energy:50,text:"energetic dance"},{voteCount:0,active:!1,id:6,energy:60,text:"hyper dance"},{voteCount:0,active:!1,id:7,energy:70,text:"hyper energetic dance"},{voteCount:0,active:!1,id:8,energy:80,text:"super hyper energetic dance"},{voteCount:0,active:!1,id:9,energy:90,text:"freak out"}],b=function(){var e=Object(a.useState)({}),t=Object(u.a)(e,2),n=(t[0],t[1],Object(a.useState)(!1)),c=Object(u.a)(n,2),i=(c[0],c[1],Object(a.useState)(0)),s=Object(u.a)(i,2),l=(s[0],s[1],Object(a.useState)([{name:"energy",value:50,avg:50,active:!1}])),d=Object(u.a)(l,2),v=d[0],g=(d[1],Object(a.useState)([50])),m=Object(u.a)(g,2),b=m[0],j=(m[1],Object(a.useState)(!1)),C=Object(u.a)(j,2),O=C[0],y=(C[1],Object(a.useState)(p)),x=Object(u.a)(y,2),k=x[0],w=x[1];Object(a.useEffect)((function(){console.log(v),h.emit("new value",v)}),[b]),Object(a.useEffect)((function(){return h.on("new song",(function(e){S(e)})),function(){h.off("news song")}}));var E=function(e){var t=k.map((function(t){return t.id!==e?t:Object(r.a)({},t,{voteCount:t.voteCount+1})}));w(t)},S=function(e){console.log(100*e)};return o.a.createElement("div",{className:"wrapper",onDoubleClick:function(e){return e.preventDefault()}},o.a.createElement("div",{className:O?"App touch":"App"},o.a.createElement("div",{className:"gifs"},k.map((function(e){return o.a.createElement(f,{key:e.id,data:e,onClick:E})})),k.map((function(e){return o.a.createElement(f,{key:e.id,data:e,onClick:E})})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},61:function(e,t,n){e.exports=n(118)},66:function(e,t,n){},94:function(e,t){}},[[61,1,2]]]);
//# sourceMappingURL=main.b4d6ad3a.chunk.js.map