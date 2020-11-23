(this["webpackJsonpdoctor-masky"]=this["webpackJsonpdoctor-masky"]||[]).push([[0],{31:function(e,t,n){e.exports=n.p+"static/media/corona.95f04a28.svg"},32:function(e,t,n){e.exports=n.p+"static/media/health.9599ae06.svg"},35:function(e,t,n){e.exports=n.p+"static/media/logo.0a98c8a5.svg"},36:function(e,t,n){e.exports=n(94)},72:function(e,t){},73:function(e,t){},74:function(e,t){},77:function(e,t){},78:function(e,t){},79:function(e,t){},89:function(e,t){},94:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(28),i=n.n(r),c=n(1),s=(new Date).getFullYear(),l=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(c.Box,{id:"about",p:4,backgroundColor:"primary",color:"secondary"},o.a.createElement(c.Heading,{variant:"display",mb:3},"Doctor Masky is here to remind you, just put on a mask."),o.a.createElement(c.Text,{variant:"body"},"Like everyone else these days, our neural network is trained to recognize faces in masks, and to watch out for faces without them."),o.a.createElement(c.Text,{variant:"body"},"So take your mask off (when you're inside please!) and let the Doctor show you what's ",o.a.createElement("em",null,"really")," going on."),o.a.createElement(c.Heading,{variant:"display",mt:4},"FAQ"),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"Are you stealing pictures of my face?!"),o.a.createElement(c.Text,{variant:"body"},"We promise we're not. Your video stream never leaves your device, and all the mask detecting is happing right there on your machine. Doctor Masky is always with you."),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"How does it work?"),o.a.createElement(c.Text,{variant:"body"},"If you want to get technical, we used"," ",o.a.createElement(c.Link,{href:"https://cloud.google.com/automl",color:"secondary"},"Google AutoML Vision")," ","to train the model,"," ",o.a.createElement(c.Link,{href:"https://www.tensorflow.org/js",color:"secondary"},"TensorFlow.js")," ","to run the inferences, and React to put it all together. You can read more in"," ",o.a.createElement(c.Link,{href:"",color:"secondary"},"this blog post")," ","(coming soon)."),o.a.createElement(c.Text,{variant:"body"},"If you don't want to get technical, then it's magic"," ",o.a.createElement("span",{role:"img","aria-label":"sparkles"},"\u2728")),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"This is taking a while to load."),o.a.createElement(c.Text,{variant:"body"},"Yeah it takes a few seconds to get going. Think of it like visiting any other doctor, you're going to spend some time waiting."),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"Are viruses really shooting out of my mouth whenever I take my mask off?"),o.a.createElement(c.Text,{variant:"body"},"Yes."),o.a.createElement(c.Heading,{variant:"heading",mt:3,mb:2},"Why did you make this?"),o.a.createElement(c.Text,{variant:"body"},"We're AE Studio, and we care about increasing human agency. We know you want to help protect people, and we think this is a fun way to remind yourself to do it."),o.a.createElement(c.Text,{variant:"body"},"Also, if you've got a human-agency increasing data science project, we'd love to"," ",o.a.createElement(c.Link,{href:"https://ae.studio",color:"secondary"},"help you build it!"))),o.a.createElement(c.Flex,{justifyContent:"space-between",alignItems:"center",backgroundColor:"background",p:4,color:"primary"},o.a.createElement(c.Text,{variant:"body"},"\xa9 ",s," AE Studio, all rights reserved"),o.a.createElement(c.Link,{href:"mailto:info@ae.studio"},o.a.createElement(c.Text,{variant:"body"},"Contact"))))},u=n(29),d=n(2);function f(){var e=Object(u.a)(["\n        html,\n        body,\n        #root {\n          height: 100%;\n        }\n\n        body {\n          margin: 0;\n        }\n      "]);return f=function(){return e},e}var m,b=function(){return Object(d.jsx)(d.Global,{styles:Object(d.css)(f())})},h=n(30),g={colors:{text:"#000",background:"#032B43",primary:"#f9f9f9",secondary:"#032B43",muted:"#f6f6f9",gray:"#dddddf",noMask:"#D00000",yesMask:"#136F63",mixedMasks:"#ffba08",highlight:"hsla(205, 100%, 40%, 0.125)"},fonts:{body:"system-ui, sans-serif",heading:"system-ui, sans-serif",monospace:"Menlo, monospace"},fontSizes:[12,14,16,20,24,32,48,64,96],fontWeights:{body:400,heading:700,bold:700},lineHeights:{body:1.5,heading:1.25},space:[0,4,8,16,32,64,128,256,512],sizes:{avatar:48},radii:{default:4,circle:99999},shadows:{card:"0 0 4px rgba(0, 0, 0, .125)"},text:{heading:{fontFamily:"heading",lineHeight:"heading",fontWeight:"heading"},display:{fontFamily:"heading",fontWeight:"heading",lineHeight:"heading",fontSize:[5,6,7]},body:{fontFamily:"body",fontWeight:"body",lineHeight:"body",fontSize:[1,2,3]},caps:{textTransform:"uppercase",letterSpacing:"0.1em"}},variants:{avatar:{width:"avatar",height:"avatar",borderRadius:"circle"},card:{p:2,bg:"background",boxShadow:"card"},link:{color:"primary"},nav:{fontSize:1,fontWeight:"bold",display:"inline-block",p:2,color:"inherit",textDecoration:"none",":hover,:focus,.active":{color:"primary"}}},buttons:{primary:{fontSize:2,fontWeight:"bold",color:"background",bg:"primary",borderRadius:"default"},outline:{variant:"buttons.primary",color:"primary",bg:"transparent",boxShadow:"inset 0 0 2px"},secondary:{variant:"buttons.primary",color:"background",bg:"secondary"}},styles:{root:{fontFamily:"body",fontWeight:"body",lineHeight:"body"}}},y=function(e){var t=e.children;return Object(d.jsx)(h.ThemeProvider,{theme:g},t)},v=n(3),j=n(7),p=n.n(j),x=n(19),O=n(10),k=n(31),w=n.n(k),E=n(32),S=n.n(E);!function(e){e.face="b'face'",e.mask="b'mask'"}(m||(m={}));var T={loading:"secondary",face:"noMask",mask:"yesMask",both:"mixedMasks",none:"secondary"},A=function(e,t){return e>0&&t>0?"both":e>0?"mask":t>0?"face":"none"},M=function(e,t){switch(t.type){case"tick":var n=e.objects.filter((function(t){return t.x>0&&t.x<e.video.width&&t.y>0&&t.y<e.video.height})).slice(0,20).map((function(e){return Object(O.a)({},e,{x:e.x+e.dx*(1e3/t.payload),y:e.y+e.dy*(1e3/t.payload)})}));return Object(O.a)({},e,{objects:n});case"video":return Object(O.a)({},e,{video:t.payload});case"generate":var a=e.detections.map(B);return Object(O.a)({},e,{objects:[].concat(Object(x.a)(a),Object(x.a)(e.objects))});case"detections":return Object(O.a)({},e,{detections:t.payload});default:throw new Error}},F=function(e){var t=e.detections,n=e.videoRef,r=Object(a.useReducer)(M,{objects:[],detections:[],video:{width:0,height:0}}),i=Object(v.a)(r,2),c=i[0],s=i[1];C(t,s),I(s),W(s),H(n,s);var l=c.objects;return o.a.createElement(o.a.Fragment,null,l.map((function(e){var t=e.id,n=e.x,a=e.y,r=e.url;return o.a.createElement("image",{key:t,x:n,y:a,href:r,height:20,width:20})})))},I=function(e){Object(a.useEffect)((function(){var t=requestAnimationFrame((function t(n){e({type:"tick",payload:n}),requestAnimationFrame(t)}));return function(){return cancelAnimationFrame(t)}}),[e])},W=function(e){Object(a.useEffect)((function(){var t=setInterval((function(){e({type:"generate"})}),500);return function(){return clearInterval(t)}}),[e])},C=function(e,t){Object(a.useEffect)((function(){t({type:"detections",payload:e})}),[e,t])},H=function(e,t){var n,o,r=(null===(n=e.current)||void 0===n?void 0:n.videoWidth)||0,i=(null===(o=e.current)||void 0===o?void 0:o.videoHeight)||0;Object(a.useEffect)((function(){t({type:"video",payload:{width:r,height:i}})}),[r,i,t])},B=function(e){var t=e.label,n=e.box,a=n.top,o=n.left,r=n.height,i=n.width;if(t===m.face){var c=2*Math.PI*Math.random(),s=40*Math.cos(c),l=40*Math.sin(c);return{id:L(),url:w.a,x:o+i/2,y:a+r*(2/3),dx:s,dy:l}}return{id:L(),url:S.a,x:o+i*Math.random(),y:a-10,dx:0,dy:-40}},D=0,L=function(){return D++};var z=function(e){var t=e.audio,n=e.onChange,a=t?"audio on":"muted",o=t?"\ud83d\udd0a":"\ud83d\udd07";return Object(d.jsx)(R,{onClick:function(){return n(!t)}},Object(d.jsx)(c.Text,{variant:"body"},Object(d.jsx)("span",{role:"img","aria-label":a},o)))},R=p()("button",{target:"e12u6y6o0"})({name:"binhd2",styles:"position:fixed;top:1rem;right:1rem;background:transparent;border:none;"}),Y=function(){return Object(d.jsx)(c.Flex,{justifyContent:"space-between",px:4,py:2},Object(d.jsx)(c.Box,{flex:"1 0 0"}),Object(d.jsx)(c.Box,null,Object(d.jsx)(c.Text,{color:"primary",textAlign:"center",variant:"body"},"Made with"," ",Object(d.jsx)("span",{role:"img","aria-label":"love"},"\u2764\ufe0f"),"\xa0 by \xa0",Object(d.jsx)(c.Link,{href:"https://ae.studio"},"AE Studio"))),Object(d.jsx)(c.Box,{flex:"1 0 0"},Object(d.jsx)(c.Link,{href:"#about"},Object(d.jsx)(c.Text,{color:"primary",variant:"body",textAlign:"right"},"About"))))},P={waiting:"Waiting for camera...",connected:"Loading model...",failed:"Couldn't connect to camera."},_={loading:"Loading model...",none:"I'm not sure. Try getting closer to the screen.",both:"Ask your friends to put on a mask!",face:"Don't forget your mask!",mask:"Thanks for wearing a mask!"},q=function(e){var t=e.status,n=e.children;return Object(d.jsx)(c.Flex,{bg:T[t],width:"100%",height:"100%",flexDirection:"column",justifyContent:"space-between",sx:{position:"relative"}},n)},G=function(){var e=window.localStorage.getItem("canPlay");return!e||"true"===e},J=n(33),X=function(e){var t=J.zeros([3,3,3]);e.detect(t)},Q=n(34),U={facingMode:"user"},V=n(35),Z=n.n(V);var $="".concat("https://storage.googleapis.com/masky-ae-model/model-export/iod/tf_js-masks_and_faces_20201123022002-2020-11-23T16%3A04%3A53.931240Z","/model.json"),K=function(){var e,t,n=function(e){var t=Object(a.useState)(null),n=Object(v.a)(t,2),o=n[0],r=n[1];return Object(a.useEffect)((function(){Q.loadObjectDetection(e).then(r)}),[e]),o}($),o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=Object(a.useRef)(null),n=Object(a.useState)("waiting"),o=Object(v.a)(n,2),r=o[0],i=o[1];return Object(a.useEffect)((function(){navigator.mediaDevices.getUserMedia({video:e}).then((function(e){t.current?(t.current.srcObject=e,i("connected")):(console.error("Webcam connected before video was ready."),i("failed"))})).catch((function(e){console.error(e),i("failed")}))}),[e]),[t,r]}(),r=Object(v.a)(o,2),i=r[0],s=r[1],l=function(e,t){var n=Object(a.useState)(null),o=Object(v.a)(n,2),r=o[0],i=o[1],c=Object(a.useState)(!1),s=Object(v.a)(c,2),l=s[0],u=s[1],d=Object(a.useCallback)((function(){return u(!0)}),[u]);return Object(a.useEffect)((function(){e&&X(e)}),[e]),Object(a.useEffect)((function(){var n=t.current;if(l&&e&&n){var a=function(t){return e.detect(t,{score:.62})};a(n).then(i);var o=setInterval((function(){return a(n).then(i)}),500);return function(){clearInterval(o)}}}),[l,e,t,i]),[r,d]}(n,i),u=Object(v.a)(l,2),f=u[0],b=u[1],h=Object(a.useState)(!1),g=Object(v.a)(h,2),y=g[0],j=g[1],p=function(){var e=Object(a.useState)(G),t=Object(v.a)(e,2),n=t[0],o=t[1];return Object(a.useEffect)((function(){window.localStorage.setItem("canPlay",n.toString())}),[n]),[n,o]}(),x=Object(v.a)(p,2),O=x[0],k=x[1],w=function(e){if(!e)return"loading";var t=0,n=0;return e.forEach((function(e){e.label===m.mask?t+=1:e.label===m.face&&(n+=1)})),A(t,n)}(f);console.log(f,w),function(e){var t=e.src,n=e.playing,o=e.started,r=Object(a.useState)(null),i=Object(v.a)(r,2),c=i[0],s=i[1];Object(a.useEffect)((function(){o&&s(new Audio(t))}),[o,t]),Object(a.useEffect)((function(){c&&(n?c.play():(c.pause(),c.currentTime=0))}),[c,n])}({src:"assets/coronavirus.mp3",playing:O&&"face"===w,started:y});var E=function(e){k(e),j(!0)};return Object(d.jsx)(q,{status:w},Object(d.jsx)(z,{audio:O,onChange:k}),Object(d.jsx)(c.Flex,{justifyContent:"center",alignItems:"center",p:2},Object(d.jsx)(c.Image,{height:[40,60,80],mr:3,src:Z.a}),Object(d.jsx)(c.Text,{color:"primary",textAlign:"center",variant:"display"},"Doctor Masky")),Object(d.jsx)(N,null,Object(d.jsx)(ee,{autoPlay:!0,muted:!0,playsInline:!0,hide:!f||!y,ref:i,onLoadedData:b}),i.current&&f&&Object(d.jsx)(te,{viewBox:"0 0 ".concat(null===(e=i.current)||void 0===e?void 0:e.videoWidth," ").concat(null===(t=i.current)||void 0===t?void 0:t.videoHeight)},Object(d.jsx)(F,{detections:f,videoRef:i})),!y&&!!f&&Object(d.jsx)(ne,null,Object(d.jsx)(c.Button,{variant:"primary",onClick:function(){return E(!0)}},"Start with sound"),Object(d.jsx)(c.Button,{variant:"primary",onClick:function(){return E(!1)},ml:"2"},"Start without sound"))),Object(d.jsx)(c.Box,null,Object(d.jsx)(c.Text,{fontSize:[3,4,5],color:"primary",textAlign:"center",variant:"heading",paddingY:3},function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return"loading"===e?P[t]:n?_[e]:"Ready to start"}(w,s,y)),Object(d.jsx)(Y,null)))},N=p()("div",{target:"e12ub1lv0"})({name:"ro9tqn",styles:"position:relative;flex-grow:1;flex-shrink:1;"}),ee=p()("video",{target:"e12ub1lv1"})("position:absolute;width:100%;height:100%;transform:scaleX(-1);flex-grow:1;display:",(function(e){return e.hide?"none":"block"}),";"),te=p()("svg",{target:"e12ub1lv2"})({name:"1ypjy38",styles:"position:absolute;top:0;left:0;width:100%;height:100%;transform:scaleX(-1);"}),ne=function(e){var t=e.children;return Object(d.jsx)(c.Flex,{width:"100%",height:"100%",justifyContent:"center",alignItems:"center",sx:{top:"0",left:"0",position:"absolute"}},t)},ae=function(){return o.a.createElement(y,null,o.a.createElement(b,null),o.a.createElement(K,null),o.a.createElement(l,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.5df0c1be.chunk.js.map