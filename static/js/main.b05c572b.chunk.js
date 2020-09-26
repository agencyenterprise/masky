(this["webpackJsonpdoctor-masky"]=this["webpackJsonpdoctor-masky"]||[]).push([[0],{33:function(e,t,n){e.exports=n.p+"static/media/corona.95f04a28.svg"},34:function(e,t,n){e.exports=n.p+"static/media/health.9599ae06.svg"},35:function(e,t,n){e.exports=n.p+"static/media/logo.0a98c8a5.svg"},36:function(e,t,n){e.exports=n(94)},72:function(e,t){},73:function(e,t){},74:function(e,t){},77:function(e,t){},78:function(e,t){},79:function(e,t){},89:function(e,t){},94:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(29),i=n.n(r),c=n(1),s=(new Date).getFullYear(),l=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(c.Box,{id:"about",p:4,backgroundColor:"primary",color:"secondary"},o.a.createElement(c.Heading,{variant:"display",mb:3},"Doctor Masky is here to remind you, just put on a mask."),o.a.createElement(c.Text,{variant:"body"},"Like everyone else these days, our neural network is trained to recognize faces in masks, and to watch out for faces without them."),o.a.createElement(c.Text,{variant:"body"},"So take your mask off (when you're inside please!) and let the Doctor show you just ",o.a.createElement("em",null,"really")," going on."),o.a.createElement(c.Heading,{variant:"display",mt:4},"FAQ"),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"Are you stealing pictures of my face?!"),o.a.createElement(c.Text,{variant:"body"},"We promise we're not. Your video stream never leaves your device, and all the mask detecting is happing right there on your machine. Doctor Masky is always with you."),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"How does it work?"),o.a.createElement(c.Text,{variant:"body"},"If you want to get technical, we used",o.a.createElement(c.Link,{href:"",color:"secondary"},"Google AutoML Vision"),"to train the model, TensorFlow.js to run the inferences, and React to put it all together. You can read more in"," ",o.a.createElement(c.Link,{href:"",color:"secondary"},"this blog post")),o.a.createElement(c.Text,{variant:"body"},"If you don't want to get technical, then it's magic\xa0",o.a.createElement("span",{role:"img","aria-label":"sparkles"},"\u2728")),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"This is taking a while to load."),o.a.createElement(c.Text,{variant:"body"},"Yeah it takes a few seconds to get going. Think of it like visiting any other doctor, you're going to spend some time waiting."),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"Are viruses really shooting out of my mouth whenever I take my mask off?"),o.a.createElement(c.Text,{variant:"body"},"Yes."),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"Why did you make this?"),o.a.createElement(c.Text,{variant:"body"},"We're AE Studio, and we care about increasing human agency. We know you want to help protect people, and we think this is a fun way to remind yourself."),o.a.createElement(c.Text,{variant:"body"},"Also, if you've got a human-agency increasing data science project, we'd love to\xa0",o.a.createElement(c.Link,{href:"mailto:info@ae.studio",color:"secondary"},"help build it!"))),o.a.createElement(c.Flex,{justifyContent:"space-between",alignItems:"center",backgroundColor:"background",p:4,color:"primary"},o.a.createElement(c.Text,{variant:"body"},"\xa9 ",s," AE Studio, all rights reserved"),o.a.createElement(c.Link,{href:"mailto:info@ae.studio"},o.a.createElement(c.Text,{variant:"body"},"Contact"))))},u=n(9),d=n(2);function f(){var e=Object(u.a)(["\n        body {\n          margin: 0;\n        }\n\n        html {\n          height: -webkit-fill-available;\n        }\n      "]);return f=function(){return e},e}var m=function(){return Object(d.jsx)(d.Global,{styles:Object(d.css)(f())})},h=n(30),b={colors:{text:"#000",background:"#032B43",primary:"#f9f9f9",secondary:"#032B43",muted:"#f6f6f9",gray:"#dddddf",noMask:"#D00000",yesMask:"#136F63",mixedMasks:"#ffba08",highlight:"hsla(205, 100%, 40%, 0.125)"},fonts:{body:"system-ui, sans-serif",heading:"system-ui, sans-serif",monospace:"Menlo, monospace"},fontSizes:[12,14,16,20,24,32,48,64,96],fontWeights:{body:400,heading:700,bold:700},lineHeights:{body:1.5,heading:1.25},space:[0,4,8,16,32,64,128,256,512],sizes:{avatar:48},radii:{default:4,circle:99999},shadows:{card:"0 0 4px rgba(0, 0, 0, .125)"},text:{heading:{fontFamily:"heading",lineHeight:"heading",fontWeight:"heading"},display:{fontFamily:"heading",fontWeight:"heading",lineHeight:"heading",fontSize:[5,6,7]},body:{fontFamily:"body",fontWeight:"body",lineHeight:"body",fontSize:[1,2,3]},caps:{textTransform:"uppercase",letterSpacing:"0.1em"}},variants:{avatar:{width:"avatar",height:"avatar",borderRadius:"circle"},card:{p:2,bg:"background",boxShadow:"card"},link:{color:"primary"},nav:{fontSize:1,fontWeight:"bold",display:"inline-block",p:2,color:"inherit",textDecoration:"none",":hover,:focus,.active":{color:"primary"}}},buttons:{primary:{fontSize:2,fontWeight:"bold",color:"background",bg:"primary",borderRadius:"default"},outline:{variant:"buttons.primary",color:"primary",bg:"transparent",boxShadow:"inset 0 0 2px"},secondary:{variant:"buttons.primary",color:"background",bg:"secondary"}},styles:{root:{fontFamily:"body",fontWeight:"body",lineHeight:"body"}}},g=function(e){var t=e.children;return Object(d.jsx)(h.ThemeProvider,{theme:b},t)},y=n(5),v=n(12),j=n.n(v),p=n(31),x=function(e){var t=p.zeros([3,3,3]);e.detect(t)},k={facingMode:"user"},w=n(32),O={waiting:"Waiting for camera...",connected:"Starting predictions...",failed:"Couldn't connect to camera."},E={loading:"Starting predictions...",none:"I'm not sure. Try getting closer to the screen.",both:"Ask your friends to put on a mask!",face:"Don't forget your mask!",mask:"Thanks for wearing a mask!"},T={loading:"secondary",face:"noMask",mask:"yesMask",both:"mixedMasks",none:"secondary"},M=function(e,t){return e>0&&t>0?"both":e>0?"mask":t>0?"face":"none"},S={status:"loading",masks:0,faces:0,boxes:[]},A=n(20),F=n(10),W=n(33),H=n.n(W),I=n(34),D=n.n(I),B=function(e,t){switch(t.type){case"tick":var n=e.objects.filter((function(t){return t.x>0&&t.x<e.video.width&&t.y>0&&t.y<e.video.height})).slice(0,20).map((function(e){return Object(F.a)({},e,{x:e.x+e.dx*(1e3/t.payload),y:e.y+e.dy*(1e3/t.payload)})}));return Object(F.a)({},e,{objects:n});case"video":return Object(F.a)({},e,{video:t.payload});case"generate":var a=e.detections.map(P);return Object(F.a)({},e,{objects:[].concat(Object(A.a)(a),Object(A.a)(e.objects))});case"detections":return Object(F.a)({},e,{detections:t.payload.boxes});default:throw new Error}},z=function(e){var t=e.detections,n=e.videoRef,r=Object(a.useReducer)(B,{objects:[],detections:[],video:{width:0,height:0}}),i=Object(y.a)(r,2),c=i[0],s=i[1];R(t,s),C(s),L(s),Y(n,s);var l=c.objects;return o.a.createElement(o.a.Fragment,null,l.map((function(e){var t=e.id,n=e.x,a=e.y,r=e.url;return o.a.createElement("image",{key:t,x:n,y:a,href:r,height:20,width:20})})))},C=function(e){Object(a.useEffect)((function(){var t=requestAnimationFrame((function t(n){e({type:"tick",payload:n}),requestAnimationFrame(t)}));return function(){return cancelAnimationFrame(t)}}),[e])},L=function(e){Object(a.useEffect)((function(){var t=setInterval((function(){e({type:"generate"})}),500);return function(){return clearInterval(t)}}),[e])},R=function(e,t){Object(a.useEffect)((function(){t({type:"detections",payload:e})}),[e,t])},Y=function(e,t){var n,o,r=(null===(n=e.current)||void 0===n?void 0:n.videoWidth)||0,i=(null===(o=e.current)||void 0===o?void 0:o.videoHeight)||0;Object(a.useEffect)((function(){t({type:"video",payload:{width:r,height:i}})}),[r,i,t])},P=function(e){var t=e.label,n=e.box,a=n.top,o=n.left,r=n.height,i=n.width;if("face"===t){var c=2*Math.PI*Math.random(),s=40*Math.cos(c),l=40*Math.sin(c);return{id:q(),url:H.a,x:o+i/2,y:a+r*(2/3),dx:s,dy:l}}return{id:q(),url:D.a,x:o+i*Math.random(),y:a-10,dx:0,dy:-40}},_=0,q=function(){return _++},G=function(){return Object(d.jsx)(c.Flex,{justifyContent:"space-between",px:4,py:2},Object(d.jsx)(c.Box,{flex:"1 0 0"}),Object(d.jsx)(c.Box,null,Object(d.jsx)(c.Text,{color:"primary",textAlign:"center",variant:"body"},"Made with"," ",Object(d.jsx)("span",{role:"img","aria-label":"love"},"\u2764\ufe0f"),"\xa0 by \xa0",Object(d.jsx)(c.Link,{href:"https://ae.studio"},"AE Studio"))),Object(d.jsx)(c.Box,{flex:"1 0 0"},Object(d.jsx)(c.Link,{href:"#about"},Object(d.jsx)(c.Text,{color:"primary",variant:"body",textAlign:"right"},"About"))))},J=n(35),X=n.n(J);function Q(){var e=Object(u.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  transform: scaleX(-1);\n"]);return Q=function(){return e},e}function U(){var e=Object(u.a)(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  transform: scaleX(-1);\n  flex-grow: 1;\n"]);return U=function(){return e},e}function V(){var e=Object(u.a)(["\n  position: relative;\n  flex-grow: 1;\n  flex-shrink: 1;\n"]);return V=function(){return e},e}var Z="".concat("https://storage.googleapis.com/masky-model/model-export/iod/tf_js-masks_and_faces-2020-08-31T05:05:37.235Z","/model.json"),$=function(){var e,t,n=function(e){var t=Object(a.useState)(null),n=Object(y.a)(t,2),o=n[0],r=n[1];return Object(a.useEffect)((function(){w.loadObjectDetection(e).then(r)}),[e]),o}(Z),o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=Object(a.useRef)(null),n=Object(a.useState)("waiting"),o=Object(y.a)(n,2),r=o[0],i=o[1];return Object(a.useEffect)((function(){navigator.mediaDevices.getUserMedia({video:e}).then((function(e){t.current?(t.current.srcObject=e,i("connected")):(console.error("Webcam connected before video was ready."),i("failed"))})).catch((function(e){console.error(e),i("failed")}))}),[e]),[t,r]}(),r=Object(y.a)(o,2),i=r[0],s=r[1],l=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,o=Object(a.useState)(null),r=Object(y.a)(o,2),i=r[0],c=r[1],s=Object(a.useState)(!1),l=Object(y.a)(s,2),u=l[0],d=l[1],f=Object(a.useCallback)((function(){return d(!0)}),[d]);return Object(a.useEffect)((function(){e&&x(e)}),[e]),Object(a.useEffect)((function(){var a=t.current;if(u&&e&&a){var o=setInterval((function(){return e.detect(a).then(c)}),n);return function(){clearInterval(o)}}}),[u,n,e,t,c]),[i,f]}(n,i,500),u=Object(y.a)(l,2),f=u[0],m=u[1],h=function(e){if(!e)return S;var t=e.filter((function(e){return e.score>.65})),n=t.filter((function(e){return"mask"===e.label})).length,a=t.filter((function(e){return"face"===e.label})).length;return{masks:n,faces:a,status:M(n,a),boxes:t}}(f);return Object(d.jsx)(c.Box,{color:"primary"},Object(d.jsx)(K,{detections:h},Object(d.jsx)(c.Flex,{justifyContent:"center",alignItems:"center",p:2},Object(d.jsx)(c.Image,{height:[40,60,80],mr:3,src:X.a}),Object(d.jsx)(c.Text,{color:"primary",textAlign:"center",variant:"display"},"Doctor Masky")),Object(d.jsx)(N,null,Object(d.jsx)(ee,{autoPlay:!0,muted:!0,playsInline:!0,ref:i,onLoadedData:m}),i.current&&Object(d.jsx)(te,{viewBox:"0 0 ".concat(null===(e=i.current)||void 0===e?void 0:e.videoWidth," ").concat(null===(t=i.current)||void 0===t?void 0:t.videoHeight)},Object(d.jsx)(z,{detections:h,videoRef:i}))),Object(d.jsx)(c.Box,null,Object(d.jsx)(c.Text,{fontSize:[3,4,5],color:"primary",textAlign:"center",variant:"heading",paddingY:3},function(e,t){return"loading"===e.status?O[t]:E[e.status]}(h,s)),Object(d.jsx)(G,null))))},K=function(e){var t=e.detections,n=e.children;return Object(d.jsx)(c.Flex,{bg:T[t.status],width:"100%",height:"100vh",maxHeight:"-webkit-fill-available",flexDirection:"column",justifyContent:"space-between",sx:{position:"relative"}},n)},N=j.a.div(V()),ee=j.a.video(U()),te=j.a.svg(Q()),ne=function(){return o.a.createElement(g,null,o.a.createElement(m,null),o.a.createElement($,null),o.a.createElement(l,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(ne,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.b05c572b.chunk.js.map