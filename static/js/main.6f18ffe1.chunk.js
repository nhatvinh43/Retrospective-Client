(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{153:function(e,t,a){},155:function(e,t,a){},156:function(e,t,a){},157:function(e,t,a){},207:function(e,t,a){},230:function(e,t,a){},233:function(e,t,a){},234:function(e,t,a){"use strict";a.r(t);var n=a(5),c=a(0),s=a(10),r=a.n(s),o=(a(153),a(34)),i=a.n(o),l=a(53),d=a(6),j=(a(155),a(236)),b=(a(156),a(235)),u=a(243),h=a(244),O=a(246),x=(a(157),a(238)),f=a(240),m=a(60),p=function(e){return Object(n.jsx)(b.a,{children:Object(n.jsx)(x.a,{footer:[],centered:!0,visible:e.isModalOpened,onCancel:e.onCancel,children:Object(n.jsx)(f.a,{className:"result",status:e.status,title:e.title,subTitle:e.subTitle,extra:[Object(n.jsx)(m.a,{type:"text",onClick:e.onCancel,children:"Cancel"},"cancel"),Object(n.jsx)(m.a,{type:"dashed",danger:!0,shape:"round",onClick:e.onConfirm,children:e.confirmLabel},"console")]})})})},g=function(e){var t=Object(c.useState)(!1),a=Object(d.a)(t,2),s=a[0],r=a[1],o=new Date(e.board.created).toDateString();return Object(n.jsxs)(b.a,{children:[Object(n.jsx)(j.a,{title:e.board.name,className:"card",style:{width:280,height:290},hoverable:"true",extra:o,cover:Object(n.jsx)("img",{alt:"avatar",src:"../../../public/board-avt.jpg"}),actions:[Object(n.jsx)(u.a,{},"share"),Object(n.jsx)(h.a,{},"clone"),Object(n.jsx)(O.a,{onClick:function(e){e.stopPropagation(),r(!0)}},"delete")]}),Object(n.jsx)(p,{isModalOpened:s,status:"error",title:"Delete this board?",subtitle:"This cannot be undone!",confirmLabel:"Delete",onConfirm:function(t){t.stopPropagation(),e.onConfirm(),r(!1)},onCancel:function(e){e.stopPropagation(),r(!1)}})]})},v=(a(207),a(241)),y=a(242),w=function(e){return Object(n.jsx)(b.a,{children:Object(n.jsx)(x.a,{footer:[],centered:!0,visible:e.isModalOpened,onCancel:e.onCancel,children:Object(n.jsx)(f.a,{title:"New board",className:"result",status:e.status,icon:Object(n.jsx)(y.a,{style:{fontSize:60}}),extra:[Object(n.jsx)(v.a,{id:"newBoardName",size:"large",allowClear:"true",placeholder:"New board name",onChange:e.onChange,onPressEnter:e.onConfirm,value:e.newBoardName}),Object(n.jsx)(m.a,{id:"addNewBoardButton",type:"primary",shape:"round",onClick:e.onConfirm,children:"Create"})]})})})},C=a(239),N=b.a.Header,k=function(e){return Object(n.jsxs)(N,{className:"header",children:[Object(n.jsx)("div",{className:"logo"}),Object(n.jsxs)(C.a,{theme:"light",mode:"horizontal",defaultSelectedKeys:["2"],children:[Object(n.jsx)(C.a.Item,{children:"nav 1"},"1"),Object(n.jsx)(C.a.Item,{children:"nav 2"},"2"),Object(n.jsx)(C.a.Item,{children:"nav 3"},"3")]})]})},S=a(237),B=a(146),T=a(76),I=a(48),L=a(247),P=a(32),D=b.a.Content,W=S.a.Title;var z=function(){var e=Object(P.g)(),t=Object(c.useState)([]),a=Object(d.a)(t,2),s=a[0],r=a[1],o=Object(c.useState)(!0),u=Object(d.a)(o,2),h=u[0],O=u[1],x=Object(c.useState)(!1),f=Object(d.a)(x,2),p=f[0],v=f[1],y=Object(c.useState)(""),C=Object(d.a)(y,2),N=C[0],S=C[1];return Object(c.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://retrospective-server-1712914.herokuapp.com/boards");case 2:return e.next=4,e.sent.json();case 4:t=e.sent,r(t),O(!1);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(n.jsxs)(b.a,{className:"layout",children:[Object(n.jsx)(k,{}),Object(n.jsxs)(D,{className:"body",children:[Object(n.jsx)(W,{level:"1",children:"My boards"}),Object(n.jsxs)(T.a,{gutter:[16,16],align:"middle",justify:"center",children:[Object(n.jsx)(I.a,{className:"gutter-row",children:Object(n.jsx)(m.a,{type:"dashed",id:"addBoardBtn",shape:"round ",onClick:function(){return v(!0)},children:Object(n.jsx)(L.a,{style:{fontSize:30}},"newBoard")})}),s.map((function(t){return Object(n.jsx)(I.a,{className:"gutter-row",onClick:function(){return a=t._id,void e.push("/board/"+a);var a},children:Object(n.jsx)(g,{board:t,loading:"false",onConfirm:function(){return e=t._id,void fetch("https://retrospective-server-1712914.herokuapp.com/boards/delete",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:e})}).then((function(e){return e.json()})).then((function(t){if(t.ok){var a=s.slice(),n=s.findIndex((function(t){return t._id===e}));n>=0&&(a.splice(n,1),r(a)),B.a.success({message:"Board successfully deleted!",duration:1.5,placement:"bottomLeft"})}else B.a.error({message:"Board deletion failed!",duration:1.5,placement:"bottomLeft"})}));var e}},t._id)})})),Object(n.jsx)(I.a,{className:"gutter-row",children:Object(n.jsx)(j.a,{style:{width:300},className:h?"":"hidden",loading:h})}),Object(n.jsx)(I.a,{className:"gutter-row",children:Object(n.jsx)(j.a,{style:{width:300},className:h?"":"hidden",loading:h})}),Object(n.jsx)(I.a,{className:"gutter-row",children:Object(n.jsx)(j.a,{style:{width:300},className:h?"":"hidden",loading:h})}),Object(n.jsx)(I.a,{className:"gutter-row",children:Object(n.jsx)(j.a,{style:{width:300},className:h?"":"hidden",loading:h})}),Object(n.jsx)(I.a,{className:"gutter-row",children:Object(n.jsx)(j.a,{style:{width:300},className:h?"":"hidden",loading:h})})]}),Object(n.jsx)(w,{isModalOpened:p,onCancel:function(){v(!1),S("")},onConfirm:function(){N?(fetch("https://retrospective-server-1712914.herokuapp.com/boards/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:N,created:new Date})}).then((function(e){return e.json()})).then((function(e){if(e)if(e._id){var t=s.slice();t.unshift(e),r(t),B.a.success({message:"Board creation successful!",duration:1.5,placement:"bottomLeft"})}else B.a.error({message:"Board creation failed!",duration:1.5,placement:"bottomLeft"})})),v(!1),S("")):v(!1)},onChange:function(){var e=document.querySelector("#newBoardName").value;S(e)},newBoardName:N})]})]})},E=(a(230),a(141)),_=a(248),F=a(245),M=(b.a.Header,b.a.Footer,b.a.Content),A=S.a.Title,J=(S.a.Text,S.a.Paragraph,v.a.TextArea);var R=function(){var e=function(e,t){switch(e){case"wentWell":document.querySelector("#wentWellInput").className=t;break;default:return}};return Object(n.jsxs)(b.a,{className:"layout",children:[Object(n.jsx)(k,{}),Object(n.jsxs)(M,{className:"body",children:[Object(n.jsxs)(T.a,{align:"middle",gutter:[24],children:[Object(n.jsx)(I.a,{children:Object(n.jsx)(_.a,{style:{fontSize:20}})}),Object(n.jsx)(I.a,{children:Object(n.jsx)(A,{editable:!0,level:1,children:"Board 1"})})]}),Object(n.jsx)(E.a,{children:Object(n.jsxs)(T.a,{gutter:[16,16],justify:"space-between",style:{textAlign:"center"},children:[Object(n.jsxs)(I.a,{span:7,children:[Object(n.jsx)(A,{level:3,children:"Went Well"}),Object(n.jsx)(y.a,{className:"addIcons",style:{color:"#009688"},onClick:function(){e("wentWell","")}}),Object(n.jsxs)("div",{id:"wentWellInput",className:"hidden",children:[Object(n.jsx)(J,{className:"textarea",bordered:"false",rows:3,autoSize:{minRows:3,maxRows:5}}),Object(n.jsxs)(T.a,{gutter:[24],justify:"center",children:[Object(n.jsx)(I.a,{className:"gutter-row",children:Object(n.jsx)(m.a,{type:"dashed",shape:"round",style:{backgroundColor:"transparent"},icon:Object(n.jsx)(y.a,{style:{color:"#009688"}}),children:"Add"})}),Object(n.jsx)(I.a,{className:"gutter-row",children:Object(n.jsx)(m.a,{type:"text",icon:Object(n.jsx)(F.a,{style:{color:"#e91e63"}}),onClick:function(){e("wentWell","hidden")},children:"Cancel"})})]})]})]}),Object(n.jsxs)(I.a,{span:7,children:[Object(n.jsx)(A,{level:3,children:"To Improve"}),Object(n.jsx)(y.a,{className:"addIcons",style:{color:"#e91e63"}}),Object(n.jsx)(J,{rows:3})]}),Object(n.jsxs)(I.a,{span:7,children:[Object(n.jsx)(A,{level:3,children:"Action Items"}),Object(n.jsx)(y.a,{className:"addIcons",style:{color:"#9c27b0"}}),Object(n.jsx)(J,{rows:3})]})]})})]})]})};a(233);var q=function(){return Object(n.jsx)("div",{children:Object(n.jsxs)(P.d,{children:[Object(n.jsx)(P.b,{path:"/dashboard",children:Object(n.jsx)(z,{})}),Object(n.jsx)(P.b,{path:"/board/:id",children:Object(n.jsx)(R,{})}),Object(n.jsx)(P.b,{path:"/",children:Object(n.jsx)(P.a,{to:"/dashboard"})})]})})},H=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,249)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))},K=a(77);r.a.render(Object(n.jsx)(K.a,{basename:"/Retrospective-Client",children:Object(n.jsx)(q,{})}),document.getElementById("root")),H()}},[[234,1,2]]]);
//# sourceMappingURL=main.6f18ffe1.chunk.js.map