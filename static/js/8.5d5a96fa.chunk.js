(this.webpackJsonpaccommodationfinder=this.webpackJsonpaccommodationfinder||[]).push([[8],{385:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return c}));var i="http://localhost:4000",c="https://accommodation-finder.herokuapp.com"},669:function(e,t,n){},710:function(e,t,n){},714:function(e,t,n){},757:function(e,t,n){"use strict";n.r(t);var i=n(24),c=n(1),a=n(12),r=n(11),o=n.n(r),s=n(19),l=n(384),d=n(751),h=n(671),u=n(752),j=n.p+"static/media/trash_can.2ab3688e.svg",b=n.p+"static/media/tick_box.51efe03e.svg",p=n(670),m=n.n(p),x=n(56),g=n.n(x),f=n(0),O=function(){return Object(f.jsx)(g.a,{color:"#bf7c2f",height:70,width:70,type:"Bars"})},v=n(10),y=n.n(v),k=n(385),w=n(20);n(51),n(669);var I=function(e){var t=Object(c.useState)([]),n=Object(i.a)(t,2),r=n[0],p=n[1],x=Object(c.useState)(!1),g=Object(i.a)(x,2),v=g[0],I=g[1];Object(c.useEffect)((function(){(function(){var e=Object(s.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!0),e.next=3,y()({method:"GET",url:"".concat(k.a,"/admin/management-post"),headers:{"Content-Type":"application/json"}});case 3:t=e.sent,p(t.data.data),I(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var N=[{title:"Ti\xeau \u0111\u1ec1",dataIndex:"title",align:"center",key:"name",fixed:"left",ellipsis:{showTitle:!1},width:150,render:function(e,t,n){return Object(f.jsx)(l.a,{placement:"topLeft",title:e,children:e})}},{title:"Ki\u1ec3u b\u1ea5t \u0111\u1ed9ng s\u1ea3n",dataIndex:"typeOfAccommodation",key:"typeOfAccommodation",align:"center",responsive:["lg"],width:150},{title:"\u0110\u1ecba ch\u1ec9",key:"address",align:"center",dataIndex:"address",responsive:["lg"],ellipsis:{showTitle:!1},render:function(e,t,n){var i=t.address;return Object(f.jsx)(l.a,{placement:"topLeft",title:i,children:i})}},{title:"Gi\xe1 theo th\xe1ng",align:"center",dataIndex:"pricePerMonth",responsive:["md"],key:"3",sorter:function(e,t){return e.pricePerMonth-t.pricePerMonth},render:function(e,t,n){return Object(f.jsx)("div",{style:{textAlign:"center"},children:Number(e).toLocaleString("en")})}},{title:"\u0110\xe1nh gi\xe1",responsive:["md"],align:"center",dataIndex:["rating","rate"],key:"4",sorter:function(e,t){return e.rating.rate-t.rating.rate}},{title:"L\u01b0\u1ee3t th\xedch",responsive:["md"],align:"center",dataIndex:"sumOfLike",key:"5",sorter:function(e,t){return e.rating.likedUser.length-t.rating.likedUser.length}},{title:"L\u01b0\u1ee3t xem",align:"center",responsive:["md"],dataIndex:"watch",key:"6"},{title:"T\xecnh tr\u1ea1ng",align:"center",dataIndex:"isApproved",render:function(e,t,n){return t.isApproved?"\u0110\xe3 ch\u1ea5p thu\u1eadn":"Ch\u1edd ch\u1ea5p thu\u1eadn"},filters:[{text:"\u0110\xe3 ch\u1ea5p thu\u1eadn",value:!0},{text:"Ch\u1edd ch\u1ea5p thu\u1eadn",value:!1}],onFilter:function(e,t){return t.isApproved===e}},{title:"H\xe0nh \u0111\u1ed9ng",align:"center",fixed:"right",render:function(e,t,n){return Object(f.jsxs)("div",{className:"table-management-post-action",children:[!t.isApproved&&Object(f.jsx)(d.a,{className:"pop-confirm-admin",title:"B\u1ea1n mu\u1ed1n ph\xea duy\u1ec7t b\xe0i \u0111\u0103ng n\xe0y?",okText:"\u0110\u1ed3ng \xfd",cancelText:"Hu\u1ef7 b\u1ecf",onConfirm:function(){y.a.put("http://localhost:4000/accommodation/approve",{accommodationId:r[n].id}).then((function(e){console.log(e.status),w.b.success("\u0110\xe3 ch\u1ea5p thu\u1eadn th\xe0nh c\xf4ng",{position:"bottom-left",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0})}))},children:Object(f.jsx)(l.a,{title:"Ch\u1ea5p thu\u1eadn b\xe0i \u0111\u0103ng",children:Object(f.jsx)("div",{className:"table-icons",children:Object(f.jsx)("img",{alt:"accept-icon",src:b})})})}),Object(f.jsx)(d.a,{className:"pop-confirm-admin",title:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n xo\xe1 b\xe0i \u0111\u0103ng n\xe0y?",okText:"\u0110\u1ed3ng \xfd",cancelText:"Hu\u1ef7 b\u1ecf",onConfirm:function(){y.a.delete("http://localhost:4000/accommodation/".concat(r[n].id),{}).then((function(e){console.log(e.status)}))},children:Object(f.jsx)(l.a,{title:"Xo\xe1 b\xe0i \u0111\u0103ng",children:Object(f.jsx)("div",{className:"table-icons",children:Object(f.jsx)("img",{alt:"delete-icon",src:j})})})}),Object(f.jsx)(a.b,{to:"/home-detail/".concat(t.id),children:Object(f.jsx)(l.a,{title:"\u0110\u1ebfn chi ti\u1ebft b\xe0i \u0111\u0103ng",children:Object(f.jsx)(m.a,{})})})]})}}];return Object(f.jsx)("div",{children:Object(f.jsx)(h.a,{indicator:Object(f.jsx)(O,{}),spinning:v,children:Object(f.jsx)(u.a,{pagination:!1,columns:N,dataSource:r,scroll:{x:1500,y:450},bordered:!0,size:"small",rowKey:"_id"})})})},N=n(754),T=n(764),C=n(765),S=n(435),A=n.n(S);var H=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(!1),p=Object(i.a)(r,2),m=p[0],x=p[1];Object(c.useEffect)((function(){g()}),[]);var g=Object(c.useCallback)(Object(s.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,x(!0),e.next=4,y()({method:"GET",url:"".concat(k.a,"/comment/get-all-comments"),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))}});case 4:t=e.sent,a(t.data.comments),x(!1),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),x(!1);case 13:case"end":return e.stop()}}),e,null,[[0,9]])}))),[]),v=Object(c.useCallback)(function(){var e=Object(s.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y()({method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},url:"".concat(k.a,"/comment/approve-comment"),data:{commentId:t}});case 3:return e.next=5,g();case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),[]),w=Object(c.useCallback)(function(){var e=Object(s.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y()({method:"DELETE",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},url:"".concat(k.a,"/comment/delete-comment"),data:{commentId:t}});case 3:return e.next=5,g();case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),[]),I=[{title:"STT",width:35,fixed:"left",align:"center",render:function(e,t,n){return Object(f.jsx)("div",{style:{textAlign:"center"},children:n+1})}},{title:"ID b\xe0i \u0111\u0103ng",key:"accommodationId",align:"center",dataIndex:"accommodationId",width:100,ellipsis:!0,render:function(e,t,n){return Object(f.jsx)(l.a,{title:t.postId,children:t.accommodationId})}},{title:"Ng\u01b0\u1eddi b\xecnh lu\u1eadn",align:"center",dataIndex:["userInfo","name"],key:"address",width:100,ellipsis:!0},{title:"Th\u1eddi gian",align:"center",width:100,ellipsis:!0,key:"city",render:function(e,t,n){var i=t.createAt,c=A()(i).format("HH:MM DD/MM/YYYY");return Object(f.jsx)(l.a,{title:c,children:c})}},{title:"B\xecnh lu\u1eadn",align:"center",dataIndex:"content",key:"content",ellipsis:!0,width:200},{title:"H\xe0nh \u0111\u1ed9ng",align:"center",fixed:"right",width:150,render:function(e,t,n){return Object(f.jsxs)("div",{className:"table-management-post-action",children:[t.pending&&Object(f.jsx)(d.a,{title:"B\u1ea1n mu\u1ed1n ch\u1ea5p thu\u1eadn b\xecnh lu\u1eadn n\xe0y?",className:"pop-confirm-admin",okText:"\u0110\u1ed3ng \xfd",cancelText:"Hu\u1ef7 b\u1ecf",onConfirm:function(){v(t._id)},children:Object(f.jsx)(l.a,{title:"Ch\u1ea5p thu\u1eadn b\xecnh lu\u1eadn",children:Object(f.jsx)("div",{className:"table-icons",children:Object(f.jsx)("img",{alt:"accept-icon",src:b})})})}),Object(f.jsx)(d.a,{title:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n xo\xe1 b\xecnh lu\u1eadn n\xe0y?",className:"pop-confirm-admin",okText:"\u0110\u1ed3ng \xfd",cancelText:"Hu\u1ef7 b\u1ecf",onConfirm:function(){w(t._id)},children:Object(f.jsx)(l.a,{title:"Xo\xe1 b\xe0i \u0111\u0103ng",children:Object(f.jsx)("div",{className:"table-icons",children:Object(f.jsx)("img",{alt:"delete-icon",src:j})})})})]})}}];return Object(f.jsx)("div",{children:Object(f.jsx)(h.a,{indicator:Object(f.jsx)(O,{}),spinning:m,children:Object(f.jsx)(u.a,{columns:I,dataSource:n,scroll:{x:1500,y:500},size:"small",rowKey:"_id",pagination:!1})})})},B=n(759);var M=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],a=(t[1],Object(c.useState)(!1)),r=Object(i.a)(a,2),o=r[0],s=(r[1],[{title:"ID b\xe0i \u0111\u0103ng",key:"ID",fixed:"left",width:150,ellipsis:!0,render:function(e,t,n){return Object(f.jsx)(l.a,{title:t.posterId,children:t.posterId._id})}},{title:"ID ng\u01b0\u1eddi b\xe1o c\xe1o",dataIndex:"userReportedId",key:"userReportedId",width:150,ellipsis:!0},{title:"Th\u1eddi gian",width:150,ellipsis:!0,key:"time",render:function(e,t,n){var i=t.timeReported,c=moment(i).format("HH:MM DD/MM/YYYY");return Object(f.jsx)(l.a,{title:c,children:c})},sorter:function(e,t){var n=moment.now();return moment(e.timeReported).diff(n)-moment(t.timeReported).diff(n)}},{title:"L\xfd do",dataIndex:"reason",key:"reason",ellipsis:!0,width:200},{title:"\u0110\xe1nh gi\xe1",key:"rate",width:200,render:function(e,t,n){return Object(f.jsx)(B.a,{defaultValue:t.ratingId.rate,disabled:!0})}},{title:"L\u01b0\u1ee3t like",key:"rate",width:100,dataIndex:["ratingId","likedUser","length"]},{title:"L\u01b0\u1ee3t xem",key:"rate",width:100,dataIndex:["ratingId","visits","length"]},{title:"Di\u1ec7n t\xedch",key:"area",dataIndex:["posterId","area"],width:100},{title:"Gi\xe1 thu\xea",key:"pricePerMonth",dataIndex:["posterId","pricePerMonth"],width:100},{title:"H\xe0nh \u0111\u1ed9ng",key:"operation",fixed:"right",width:100,render:function(e,t,n){return Object(f.jsx)("div",{children:Object(f.jsx)(d.a,{title:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n xo\xe1 b\xecnh lu\u1eadn n\xe0y?",okText:"\u0110\u1ed3ng \xfd",cancelText:"Hu\u1ef7 b\u1ecf",children:Object(f.jsx)(l.a,{title:"Xo\xe1 b\xe0i \u0111\u0103ng",children:Object(f.jsx)("div",{className:"table-icons",children:Object(f.jsx)("img",{alt:"delete-icon"})})})})})}}]);return Object(f.jsx)("div",{children:Object(f.jsx)(h.a,{indicator:Object(f.jsx)(O,{}),spinning:o,children:Object(f.jsx)(u.a,{columns:s,dataSource:n,scroll:{x:1500,y:300},size:"small",rowKey:"_id"})})})};n(710);var P=function(e){var t=Object(c.useState)([]),n=Object(i.a)(t,2),a=n[0],r=n[1],p=Object(c.useState)(!1),m=Object(i.a)(p,2),x=m[0],g=m[1];Object(c.useEffect)((function(){(function(){var e=Object(s.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!0),e.next=3,y()({method:"GET",url:"".concat(k.a,"/admin/management-owner"),headers:{"Content-Type":"application/json"}});case 3:t=e.sent,r(t.data.data),g(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var v=[{title:"H\u1ecd v\xe0 t\xean",key:"name",fixed:"left",dataIndex:"name",width:150,ellipsis:!0},{title:"\u0110\u1ecba ch\u1ec9",dataIndex:"address",key:"address",ellipsis:!0,width:150,render:function(e,t,n){var i=t.address;return Object(f.jsx)(l.a,{title:i,children:i})}},{title:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",dataIndex:"phoneNumber",key:"phoneNumber",width:150},{title:"Email",dataIndex:"email",key:"email",ellipsis:!0,render:function(e,t,n){var i=t.email;return Object(f.jsx)(l.a,{title:i,children:i})},width:200},{title:"T\xecnh tr\u1ea1ng",dataIndex:"isApproved",key:"4",render:function(e,t,n){return t.isApproved?"\u0110\xe3 ph\xea duy\u1ec7t":"Ch\u1edd ph\xea duy\u1ec7t"},width:150},{title:Object(f.jsx)("div",{style:{textAlign:"center"},children:"Action"}),key:"operation",fixed:"right",width:100,render:function(e,t,n){return Object(f.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:[!t.isApproved&&Object(f.jsx)(d.a,{className:"pop-confirm-admin",title:"B\u1ea1n mu\u1ed1n ch\u1ea5p thu\u1eadn t\xe0i kho\u1ea3n n\xe0y?",okText:"\u0110\u1ed3ng \xfd",cancelText:"Hu\u1ef7 b\u1ecf",onConfirm:function(){y.a.patch("http://localhost:4000/owner/approve",{email:a[n].email}).then((function(e){console.log(e)}))},children:Object(f.jsx)(l.a,{title:"Ch\u1ea5p thu\u1eadn t\xe0i kho\u1ea3n",children:Object(f.jsx)("div",{className:"table-icons",children:Object(f.jsx)("img",{alt:"accept-icon",src:b})})})}),Object(f.jsx)(d.a,{className:"pop-confirm-admin",title:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n xo\xe1 t\xe0i kho\u1ea3n n\xe0y?",okText:"\u0110\u1ed3ng \xfd",cancelText:"Hu\u1ef7 b\u1ecf",onConfirm:function(){y.a.delete("http://localhost:4000/owner/profile/".concat(a[n].email),{}).then((function(e){console.log(e.status)}))},children:Object(f.jsx)(l.a,{title:"Xo\xe1 t\xe0i kho\u1ea3n",children:Object(f.jsx)("div",{className:"table-icons",children:Object(f.jsx)("img",{alt:"delete-icon",src:j})})})})]})}}];return Object(f.jsx)("div",{children:Object(f.jsx)(h.a,{indicator:Object(f.jsx)(O,{}),spinning:x,children:Object(f.jsx)(u.a,{pagination:!1,columns:v,dataSource:a,scroll:{x:1500,y:300},size:"small",rowKey:"_id"})})})},D=n(175),E=n(30),L=(n(197),n(714),N.a.TabPane);t.default=function(e){var t=Object(c.useState)(!1),n=Object(i.a)(t,2),r=n[0],o=n[1],s=Object(c.useState)(""),l=Object(i.a)(s,2),d=l[0],h=l[1],u=Object(c.useState)(""),j=Object(i.a)(u,2),b=j[0],p=j[1];Object(c.useEffect)((function(){e.changeNavbarState(!1)}),[]);return r?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(D.a,{}),Object(f.jsx)("div",{className:"admin-page",children:Object(f.jsx)(T.a,{justify:"center",children:Object(f.jsx)(C.a,{span:22,children:Object(f.jsxs)(N.a,{defaultActiveKey:"1",children:[Object(f.jsx)(L,{tab:"Qu\u1ea3n l\xfd b\xe0i \u0111\u0103ng",children:Object(f.jsx)(I,{})},"1"),Object(f.jsx)(L,{tab:"Qu\u1ea3n l\xfd b\xecnh lu\u1eadn",children:Object(f.jsx)(H,{})},"2"),Object(f.jsx)(L,{tab:"Qu\u1ea3n l\xfd b\xe1o c\xe1o",children:Object(f.jsx)(M,{})},"3"),Object(f.jsx)(L,{tab:"Qu\u1ea3n l\xfd t\xe0i kho\u1ea3n ch\u1ee7 nh\xe0 tr\u1ecd",children:Object(f.jsx)(P,{})},"4"),Object(f.jsx)(L,{tab:"Ph\xe2n t\xedch v\xe0 th\u1ed1ng k\xea",children:"Ph\xe2n t\xedch v\xe0 th\u1ed1ng k\xea"},"5")]})})})})]}):Object(f.jsx)("div",{className:"login-height-1-1",children:Object(f.jsxs)("div",{className:"login-background-cover login-height-1-1 login-flex login-light",children:[Object(f.jsx)("div",{className:"login-overlay-secondary login-position-cover"}),Object(f.jsxs)("div",{className:"login-auth-2 login-position-z-index",children:[Object(f.jsx)(a.c,{activeStyle:{color:"#fff"},to:"/home",children:Object(f.jsx)("img",{className:"login-logo",src:E.a})}),Object(f.jsx)("h5",{className:"login-heading-line",children:Object(f.jsx)("span",{children:"\u0110\u0103ng nh\u1eadp"})}),Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault(),"admin"==d&&"admin"==b?(w.b.success("\u0110\u0103ng nh\u1eadp th\xe0nh c\xf4ng",{position:"bottom-left",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),o(!0)):w.b.error("Sai t\xean \u0111\u0103ng nh\u1eadp ho\u1eb7c m\u1eadt kh\u1ea9u",{position:"bottom-left",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0})},children:[Object(f.jsx)("div",{className:"login-margin",children:Object(f.jsx)("div",{className:"login-inline",children:Object(f.jsx)("input",{className:"login-input login-border-pill",placeholder:"Username",type:"text",value:d,required:!0,onChange:function(e){h(e.target.value)}})})}),Object(f.jsx)("div",{className:"login-margin",children:Object(f.jsx)("div",{className:"login-inline",children:Object(f.jsx)("input",{className:"login-input login-border-pill",placeholder:"Password",type:"password",value:b,minLength:"5",required:!0,onChange:function(e){p(e.target.value)}})})}),Object(f.jsx)("button",{type:"submit",className:"login-button login-border-pill",children:"\u0110\u0103ng nh\u1eadp"})]})]})]})})}}}]);
//# sourceMappingURL=8.5d5a96fa.chunk.js.map