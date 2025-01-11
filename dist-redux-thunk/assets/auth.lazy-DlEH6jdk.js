import{c as gt,p as pt,j as t,B as R,S as K,G as vt,q as xt,s as we,t as Ne,v as jt,w as re,x as oe,y as $,z as _e,E as Le,F as Be,H as ze,U as Ge,I as Z,J as T,m as he,u as Y,K as ge,L as pe,M as V,N as U,Q as A,V as P,W as ue,Y as M,Z as D,r as F,_ as yt,$ as Ae,a0 as St,a1 as H,a2 as Nt,a3 as Ct,a4 as wt,a as Re,a5 as Ve,a6 as bt,a7 as It,a8 as Et,a9 as kt,aa as Ot,ab as Ft,ac as Tt,ad as Ue,n as At,o as Rt}from"./index-CGJoN1Bo.js";import{S as Q}from"./skeleton-BDHLJT36.js";import{o as Ke,a as B,s as $e}from"./index-CNby-C5v.js";const L={PAGE:{AUTH:"page-auth",INDEX:"page-index"},FORM:{CONFIRMATION_FORM:"form-confirmationForm"},BUTTON:{SIGN_IN:"button-signIn",SIGN_UP:"button-signUp",SIGN_OUT:"button-signOut",CREATE_NEW_ACCOUNT:"button-createNewAccount",CONFIRM:"button-confirm",CONTINUE:"button-continue",BACK:"button-back"},INPUT:{EMAIL:"input-email",FIRST_NAME:"input-firstName",LAST_NAME:"input-lastName",LOGIN:"input-login",PASSWORD:"input-password",PASSWORD_CONFIRMATION:"input-passwordConfirmation",OTP:"input-otp",PHONE:"input-phone"},SELECT:{COUNTRY:"select-country"},RADIO_BUTTON:{PHONE:"radio-button-phone",EMAIL:"radio-button-email"},CHECKBOX:{TERMS:"checkbox-terms"}};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=gt("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]),Ie=e=>e.auth.otp,Ut=e=>e.auth.stage.value,Pt=e=>e.auth.otpCountdown,Mt=e=>e.api.postSignInLogin.status==="pending"||e.api.postOtpEmail.status==="pending",Dt=e=>e.api.postTwoFactorAuthentication.status==="pending",_t=e=>e.api.postOtpEmail.status==="pending"||e.api.postOtpPhone.status==="pending",Lt=e=>e.api.postSignUp.status==="pending",Bt=()=>({functions:{onGoogleClick:()=>{var r,a;((a=(r=window==null?void 0:window.google)==null?void 0:r.accounts)==null?void 0:a.oauth2.initTokenClient({client_id:"330577919686-606uq677jeq7no7dhrrkarnroecm23n5.apps.googleusercontent.com",scope:"openid profile email",callback:o=>{pt.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${o.access_token}`,{headers:{Authorization:`Bearer ${o.access_token}`,Accept:"application/json"}}).then(s=>{console.log("@",s),document.cookie=`googleAccessToken=${o.access_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`}).catch(s=>console.log(s))}})).requestAccessToken()}}}),Ee=({loading:e})=>{const{functions:n}=Bt();return t.jsxs("div",{className:"flex flex-col gap-6",children:[t.jsxs("div",{className:"relative",children:[t.jsx("div",{className:"absolute inset-0 flex items-center",children:t.jsx("span",{className:"w-full border-t"})}),t.jsx("div",{className:"relative flex justify-center text-xs uppercase",children:t.jsx("span",{className:"bg-background px-2 text-muted-foreground",children:"Or continue with"})})]}),t.jsxs("div",{className:"flex flex-col gap-2",children:[t.jsxs(R,{disabled:e,type:"button",variant:"outline",children:[e?t.jsx(K,{className:"mr-2 h-4 w-4 animate-spin"}):t.jsx(vt,{className:"mr-2 h-4 w-4"}),"GitHub"]}),t.jsxs(R,{disabled:e,type:"button",variant:"outline",onClick:n.onGoogleClick,children:[e?t.jsx(K,{className:"mr-2 h-4 w-4 animate-spin"}):t.jsx(xt,{className:"mr-2 h-4 w-4"}),"Google"]})]})]})},zt=()=>t.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[t.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[t.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Login to your account"}),t.jsx("p",{className:"text-sm text-muted-foreground",children:"Enter your email and password"})]}),t.jsxs("div",{children:[t.jsxs("div",{className:"flex flex-col gap-4",children:[t.jsx(Q,{className:"h-10 w-full"}),t.jsx(Q,{className:"h-10 w-full"}),t.jsx(Q,{className:"h-10 w-full"})]}),t.jsx("div",{className:"flex justify-center py-3",children:t.jsx(Q,{className:"h-4 w-[200px]"})}),t.jsx(Ee,{loading:!0}),t.jsxs("p",{className:"mt-4 flex flex-col gap-2 px-8",children:[t.jsx(Q,{className:"h-3 w-full"}),t.jsx(Q,{className:"h-3 w-full"})]})]})]}),Gt=(e,n)=>{if(n==="email"){const[r,a]=e.split("@");return`${r.substring(0,Math.ceil(r.length/2))+"*".repeat(Math.floor(r.length/2))}@${a}`}if(n==="phone"){const r=e.substring(0,e.length-10),a=e.substring(e.length-10);return r+"*".repeat(5)+a.substring(5)}},Pe=(e,n,r)=>{if(e&&"reportValidity"in e){const a=we(r,n);e.setCustomValidity(a&&a.message||""),e.reportValidity()}},We=(e,n)=>{for(const r in n.fields){const a=n.fields[r];a&&a.ref&&"reportValidity"in a.ref?Pe(a.ref,r,e):a.refs&&a.refs.forEach(o=>Pe(o,r,e))}},Kt=(e,n)=>{n.shouldUseNativeValidation&&We(e,n);const r={};for(const a in e){const o=we(n.fields,a),s=Object.assign(e[a]||{},{ref:o&&o.ref});if($t(n.names||Object.keys(e),a)){const i=Object.assign({},we(r,a));Ne(i,"root",s),Ne(r,a,i)}else Ne(r,a,s)}return r},$t=(e,n)=>e.some(r=>r.startsWith(n+"."));var Wt=function(e,n){for(var r={};e.length;){var a=e[0],o=a.code,s=a.message,i=a.path.join(".");if(!r[i])if("unionErrors"in a){var u=a.unionErrors[0].errors[0];r[i]={message:u.message,type:u.code}}else r[i]={message:s,type:o};if("unionErrors"in a&&a.unionErrors.forEach(function(y){return y.errors.forEach(function(w){return e.push(w)})}),n){var m=r[i].types,h=m&&m[a.code];r[i]=jt(i,n,r,o,h?[].concat(h,a.message):a.message)}e.shift()}return r},ve=function(e,n,r){return r===void 0&&(r={}),function(a,o,s){try{return Promise.resolve(function(i,u){try{var m=Promise.resolve(e[r.mode==="sync"?"parse":"parseAsync"](a,n)).then(function(h){return s.shouldUseNativeValidation&&We({},s),{errors:{},values:r.raw?a:h}})}catch(h){return u(h)}return m&&m.then?m.then(void 0,u):m}(0,function(i){if(function(u){return Array.isArray(u==null?void 0:u.errors)}(i))return{values:{},errors:Kt(Wt(i.errors,!s.shouldUseNativeValidation&&s.criteriaMode==="all"),s)};throw i}))}catch(i){return Promise.reject(i)}}};const qe=re("auth.onConfirmationSubmit"),qt=oe(qe.type,async(e,{dispatch:n,getState:r})=>{try{const a=r(),{values:o}=e,s=Ie(a),i=await $.endpoints.postTwoFactorAuthentication.initiate({params:{otp:o.otp,source:s.resource}});"profile"in i.data&&(localStorage.setItem(_e.ACCESS_TOKEN,i.data.token),n(Le.actions.setProfile(i.data.profile)),n(Be.actions.setSession(!0)),ze.navigate({to:"/",replace:!0}))}catch(a){return a}}),Ht={thunk:qt,action:qe},He=re("auth.onOtpResend"),Yt=oe(He.type,async(e,{dispatch:n,getState:r})=>{try{const a=r(),o=Ie(a),i=await(o.type==="email"?$.endpoints.postOtpEmail:$.endpoints.postOtpPhone).initiate({params:{[o.type]:o.resource}});i.data.retryDelay&&(Ke.startCountdown(i.data.retryDelay/1e3),n(B.setOtp({retryDelay:i.data.retryDelay})),n(B.setStage("confirmation")))}catch(a){console.error(a)}}),Xt={thunk:Yt,action:He},Ye=re("auth.onSelectConfirmationSubmit"),Jt=oe(Ye.type,async(e,{dispatch:n})=>{try{const{values:r,selectedResource:a}=e,s=await(a==="email"?$.endpoints.postOtpEmail:$.endpoints.postOtpPhone).initiate({params:{[a]:r.resource}});s.data.retryDelay&&(n(B.setOtp({type:a,resource:r.resource,retryDelay:s.data.retryDelay})),n(B.setStage("confirmation")))}catch(r){console.error(r)}}),Qt={thunk:Jt,action:Ye},Xe=re("auth.onSignInSubmit"),Zt=oe(Xe.type,async(e,{dispatch:n})=>{try{const{resource:r,values:a}=e;if(r==="email"){const s=await $.endpoints.postOtpEmail.initiate({params:{email:a.login}});if(!s.data.retryDelay)return;n(B.setOtp({type:"email",resource:a.login,retryDelay:s.data.retryDelay})),Ke.startCountdown(s.data.retryDelay/1e3),n(B.setStage("confirmation"));return}const o=await $.endpoints.postSignInLogin.initiate({params:{[r]:a.login,...r==="login"&&{password:a.password}}});if("needConfirmation"in o.data&&o.data.needConfirmation&&r==="login"){n(B.setStage("selectConfirmation"));return}"profile"in o.data&&(localStorage.setItem(_e.ACCESS_TOKEN,o.data.token),n(Le.actions.setProfile(o.data.profile)),n(Be.actions.setSession(!0)),Ge.success("Sign in is successful 👍",{cancel:{label:"Close"},description:"We are very glad to see you, have fun"}),ze.navigate({to:"/",replace:!0}))}catch(r){console.error(r)}}),en={thunk:Zt,action:Xe},Je=re("auth.onSignUpSubmit"),tn=oe(Je.type,async(e,{dispatch:n})=>{const{values:{passwordConfirmation:r,...a}}=e;await $.endpoints.postSignUp.initiate({params:a}),Ge.success("Your account has been created 👍",{cancel:{label:"Close"},description:"We are very glad to see you, have fun"}),n($e.actions.setStage("signIn"))}),nn={thunk:tn,action:Je},ne={onOtpResend:Xt,onSignInSubmit:en,onConfirmationSubmit:Ht,onSelectConfirmationSubmit:Qt,onSignUpSubmit:nn},an=Z({otp:T().min(6)}),rn=()=>{const e=he(),n=Y(Dt),r=Y(Ie),a=Y(Pt),o=ge({resolver:ve(an),reValidateMode:"onSubmit"}),s=()=>e(ne.onOtpResend.thunk()),i=o.handleSubmit(async m=>{const{payload:h}=await e(ne.onConfirmationSubmit.thunk({values:m}));h.response.data.message&&o.setError("otp",{message:h.response.data.message})}),u=()=>e(B.setStage("signUp"));return{state:{loading:n&&o.formState.isSubmitting,otp:r,seconds:a.seconds},form:o,functions:{onSubmit:i,goToSignUp:u,onOtpResend:s}}},on=()=>{const{form:e,state:n,functions:r}=rn();return t.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[t.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[t.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Two factor authentication"}),t.jsxs("p",{className:"text-sm text-muted-foreground",children:["We sent you a code to your ",n.otp.type," ",Gt(n.otp.resource,n.otp.type)]})]}),t.jsx("div",{className:"grid gap-2",children:t.jsx(pe,{...e,children:t.jsxs("form",{className:"space-y-4",onSubmit:a=>{a.preventDefault(),r.onSubmit()},children:[t.jsx(V,{render:({field:a})=>t.jsxs(U,{children:[t.jsx(A,{className:"sr-only",htmlFor:"otp",children:"Password"}),t.jsx(P,{children:t.jsx(ue,{disabled:n.loading,id:"otp",maxLength:6,autoCapitalize:"none",autoComplete:"otp",autoCorrect:"off",placeholder:"your otp code",...a})}),t.jsx(M,{})]}),name:"otp",control:e.control}),t.jsxs("div",{className:"flex flex-col gap-2",children:[t.jsxs(R,{className:"w-full",disabled:n.loading,type:"submit",children:[n.loading&&t.jsx(K,{className:"mr-2 h-4 w-4 animate-spin"}),"Confirm"]}),!!n.seconds&&t.jsx("div",{children:t.jsxs("p",{className:"text-center text-sm text-muted-foreground",children:["try again after ",n.seconds," seconds"]})}),!n.seconds&&t.jsxs(R,{className:"w-full",disabled:n.loading,type:"button",variant:"outline",onClick:r.onOtpResend,children:[n.loading&&t.jsx(K,{className:"mr-2 h-4 w-4 animate-spin"}),"Send otp"]})]})]})})})]})};function Qe(e,n){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(r[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(e);o<a.length;o++)n.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(r[a[o]]=e[a[o]]);return r}var de;(function(e){e.event="event",e.props="prop"})(de||(de={}));function q(){}function sn(e){var n,r=void 0;return function(){for(var a=[],o=arguments.length;o--;)a[o]=arguments[o];return n&&a.length===n.length&&a.every(function(s,i){return s===n[i]})||(n=a,r=e.apply(void 0,a)),r}}function ae(e){return!!(e||"").match(/\d/)}function me(e){return e==null}function ln(e){return typeof e=="number"&&isNaN(e)}function cn(e){return me(e)||ln(e)||typeof e=="number"&&!isFinite(e)}function un(e){var n=F.useRef(e);n.current=e;var r=F.useRef(function(){for(var a=[],o=arguments.length;o--;)a[o]=arguments[o];return n.current.apply(n,a)});return r.current}function Me(e,n){return Array(n+1).join(e)}function dn(e){var n=e+"",r=n[0]==="-"?"-":"";r&&(n=n.substring(1));var a=n.split(/[eE]/g),o=a[0],s=a[1];if(s=Number(s),!s)return r+o;o=o.replace(".","");var i=1+s,u=o.length;return i<0?o="0."+Me("0",Math.abs(i))+o:i>=u?o=o+Me("0",i-u):o=(o.substring(0,i)||"0")+"."+o.substring(i),r+o}function be(e,n){if(e.value=e.value,e!==null){if(e.createTextRange){var r=e.createTextRange();return r.move("character",n),r.select(),!0}return e.selectionStart||e.selectionStart===0?(e.focus(),e.setSelectionRange(n,n),!0):(e.focus(),!1)}}var mn=sn(function(e,n){for(var r=0,a=0,o=e.length,s=n.length;e[r]===n[r]&&r<o;)r++;for(;e[o-1-a]===n[s-1-a]&&s-a>r&&o-a>r;)a++;return{from:{start:r,end:o-a},to:{start:r,end:s-a}}}),fn=function(e,n){var r=Math.min(e.selectionStart,n);return{from:{start:r,end:e.selectionEnd},to:{start:r,end:n}}};function hn(e,n,r){return Math.min(Math.max(e,n),r)}function Ce(e){return Math.max(e.selectionStart,e.selectionEnd)}function gn(){return typeof navigator<"u"&&!(navigator.platform&&/iPhone|iPod/.test(navigator.platform))}function pn(e){return{from:{start:0,end:0},to:{start:0,end:e.length},lastValue:""}}function Ze(e,n){return e===void 0&&(e=" "),typeof e=="string"?e:e[n]||" "}function vn(e){var n=e.currentValue,r=e.formattedValue,a=e.currentValueIndex,o=e.formattedValueIndex;return n[a]===r[o]}function xn(e,n,r,a,o,s,i){i===void 0&&(i=vn);var u=o.findIndex(function(E){return E}),m=e.slice(0,u);!n&&!r.startsWith(m)&&(n=m,r=m+r,a=a+m.length);for(var h=r.length,y=e.length,w={},g=new Array(h),N=0;N<h;N++){g[N]=-1;for(var d=0,b=y;d<b;d++){var S=i({currentValue:r,lastValue:n,formattedValue:e,currentValueIndex:N,formattedValueIndex:d});if(S&&w[d]!==!0){g[N]=d,w[d]=!0;break}}}for(var p=a;p<h&&(g[p]===-1||!s(r[p]));)p++;var k=p===h||g[p]===-1?y:g[p];for(p=a-1;p>0&&g[p]===-1;)p--;var C=p===-1||g[p]===-1?0:g[p]+1;return C>k?k:a-C<k-a?C:k}function fe(e,n,r,a){var o=e.length;if(n=hn(n,0,o),a==="left"){for(;n>=0&&!r[n];)n--;n===-1&&(n=r.indexOf(!0))}else{for(;n<=o&&!r[n];)n++;n>o&&(n=r.lastIndexOf(!0))}return n===-1&&(n=o),n}function jn(e){for(var n=Array.from({length:e.length+1}).map(function(){return!0}),r=0,a=n.length;r<a;r++)n[r]=!!(ae(e[r])||ae(e[r-1]));return n}function yn(e,n,r,a,o,s){s===void 0&&(s=q);var i=un(function(d,b){var S,p;return cn(d)?(p="",S=""):typeof d=="number"||b?(p=typeof d=="number"?dn(d):d,S=a(p)):(p=o(d,void 0),S=a(p)),{formattedValue:S,numAsString:p}}),u=F.useState(function(){return i(me(e)?n:e,r)}),m=u[0],h=u[1],y=function(d,b){d.formattedValue!==m.formattedValue&&h({formattedValue:d.formattedValue,numAsString:d.value}),s(d,b)},w=e,g=r;me(e)&&(w=m.numAsString,g=!0);var N=i(w,g);return F.useMemo(function(){h(N)},[N.formattedValue]),[m,y]}function Sn(e){return e.replace(/[^0-9]/g,"")}function Nn(e){return e}function Cn(e){var n=e.type;n===void 0&&(n="text");var r=e.displayType;r===void 0&&(r="input");var a=e.customInput,o=e.renderText,s=e.getInputRef,i=e.format;i===void 0&&(i=Nn);var u=e.removeFormatting;u===void 0&&(u=Sn);var m=e.defaultValue,h=e.valueIsNumericString,y=e.onValueChange,w=e.isAllowed,g=e.onChange;g===void 0&&(g=q);var N=e.onKeyDown;N===void 0&&(N=q);var d=e.onMouseUp;d===void 0&&(d=q);var b=e.onFocus;b===void 0&&(b=q);var S=e.onBlur;S===void 0&&(S=q);var p=e.value,k=e.getCaretBoundary;k===void 0&&(k=jn);var C=e.isValidInputCharacter;C===void 0&&(C=ae);var E=e.isCharacterSame,W=Qe(e,["type","displayType","customInput","renderText","getInputRef","format","removeFormatting","defaultValue","valueIsNumericString","onValueChange","isAllowed","onChange","onKeyDown","onMouseUp","onFocus","onBlur","value","getCaretBoundary","isValidInputCharacter","isCharacterSame"]),se=yn(p,m,!!h,i,u,y),ke=se[0],I=ke.formattedValue,ie=ke.numAsString,et=se[1],le=F.useRef(),ce=F.useRef({formattedValue:I,numAsString:ie}),Oe=function(l,c){ce.current={formattedValue:l.formattedValue,numAsString:l.value},et(l,c)},Fe=F.useState(!1),tt=Fe[0],nt=Fe[1],ee=F.useRef(null),X=F.useRef({setCaretTimeout:null,focusTimeout:null});F.useEffect(function(){return nt(!0),function(){clearTimeout(X.current.setCaretTimeout),clearTimeout(X.current.focusTimeout)}},[]);var at=i,xe=function(l,c){var f=parseFloat(c);return{formattedValue:l,value:c,floatValue:isNaN(f)?void 0:f}},J=function(l,c,f){l.selectionStart===0&&l.selectionEnd===l.value.length||(be(l,c),X.current.setCaretTimeout=setTimeout(function(){l.value===f&&l.selectionStart!==c&&be(l,c)},0))},te=function(l,c,f){return fe(l,c,k(l),f)},je=function(l,c,f){var x=k(c),O=xn(c,I,l,f,x,C,E);return O=fe(c,O,x),O},rt=function(l){var c=l.formattedValue;c===void 0&&(c="");var f=l.input,x=l.source,O=l.event,j=l.numAsString,v;if(f){var _=l.inputValue||f.value,z=Ce(f);f.value=c,v=je(_,c,z),v!==void 0&&J(f,v,c)}c!==I&&Oe(xe(c,j),{event:O,source:x})};F.useEffect(function(){var l=ce.current,c=l.formattedValue,f=l.numAsString;(I!==c||ie!==f)&&Oe(xe(I,ie),{event:void 0,source:de.props})},[I,ie]);var ot=ee.current?Ce(ee.current):void 0,st=typeof window<"u"?F.useLayoutEffect:F.useEffect;st(function(){var l=ee.current;if(I!==ce.current.formattedValue&&l){var c=je(ce.current.formattedValue,I,ot);l.value=I,J(l,c,I)}},[I]);var it=function(l,c,f){var x=c.target,O=le.current?fn(le.current,x.selectionEnd):mn(I,l),j=Object.assign(Object.assign({},O),{lastValue:I}),v=u(l,j),_=at(v);if(v=u(_,void 0),w&&!w(xe(_,v))){var z=c.target,G=Ce(z),Se=je(l,I,G);return z.value=I,J(z,Se,I),!1}return rt({formattedValue:_,numAsString:v,inputValue:l,event:c,source:f,input:c.target}),!0},ye=function(l,c){c===void 0&&(c=0);var f=l.selectionStart,x=l.selectionEnd;le.current={selectionStart:f,selectionEnd:x+c}},lt=function(l){var c=l.target,f=c.value,x=it(f,l,de.event);x&&g(l),le.current=void 0},ct=function(l){var c=l.target,f=l.key,x=c.selectionStart,O=c.selectionEnd,j=c.value;j===void 0&&(j="");var v;f==="ArrowLeft"||f==="Backspace"?v=Math.max(x-1,0):f==="ArrowRight"?v=Math.min(x+1,j.length):f==="Delete"&&(v=x);var _=0;f==="Delete"&&x===O&&(_=1);var z=f==="ArrowLeft"||f==="ArrowRight";if(v===void 0||x!==O&&!z){N(l),ye(c,_);return}var G=v;if(z){var Se=f==="ArrowLeft"?"left":"right";G=te(j,v,Se),G!==v&&l.preventDefault()}else f==="Delete"&&!C(j[v])?G=te(j,v,"right"):f==="Backspace"&&!C(j[v])&&(G=te(j,v,"left"));G!==v&&J(c,G,j),N(l),ye(c,_)},ut=function(l){var c=l.target,f=function(){var x=c.selectionStart,O=c.selectionEnd,j=c.value;if(j===void 0&&(j=""),x===O){var v=te(j,x);v!==x&&J(c,v,j)}};f(),requestAnimationFrame(function(){f()}),d(l),ye(c)},dt=function(l){l.persist&&l.persist();var c=l.target,f=l.currentTarget;ee.current=c,X.current.focusTimeout=setTimeout(function(){var x=c.selectionStart,O=c.selectionEnd,j=c.value;j===void 0&&(j="");var v=te(j,x);v!==x&&!(x===0&&O===j.length)&&J(c,v,j),b(Object.assign(Object.assign({},l),{currentTarget:f}))},0)},mt=function(l){ee.current=null,clearTimeout(X.current.focusTimeout),clearTimeout(X.current.setCaretTimeout),S(l)},ft=tt&&gn()?"numeric":void 0,Te=Object.assign({inputMode:ft},W,{type:n,value:I,onChange:lt,onKeyDown:ct,onMouseUp:ut,onFocus:dt,onBlur:mt});if(r==="text")return o?D.createElement(D.Fragment,null,o(I,W)||null):D.createElement("span",Object.assign({},W,{ref:s}),I);if(a){var ht=a;return D.createElement(ht,Object.assign({},Te,{ref:s}))}return D.createElement("input",Object.assign({},Te,{ref:s}))}function wn(e,n){var r=n.format,a=n.allowEmptyFormatting,o=n.mask,s=n.patternChar;if(s===void 0&&(s="#"),e===""&&!a)return"";for(var i=0,u=r.split(""),m=0,h=r.length;m<h;m++)r[m]===s&&(u[m]=e[i]||Ze(o,i),i+=1);return u.join("")}function bn(e,n,r){n===void 0&&(n=pn(e));var a=r.format,o=r.patternChar;o===void 0&&(o="#");var s=n.from,i=n.to,u=n.lastValue;u===void 0&&(u="");var m=function(S){return a[S]===o},h=function(S,p){for(var k="",C=0;C<S.length;C++)m(p+C)&&ae(S[C])&&(k+=S[C]);return k},y=function(S){return S.replace(/[^0-9]/g,"")};if(!a.match(/\d/))return y(e);if((u===""||s.end-s.start===u.length)&&e.length===a.length){for(var w="",g=0;g<e.length;g++)if(m(g))ae(e[g])&&(w+=e[g]);else if(e[g]!==a[g])return y(e);return w}var N=u.substring(0,s.start),d=e.substring(i.start,i.end),b=u.substring(s.end);return""+h(N,0)+y(d)+h(b,s.end)}function In(e,n){var r=n.format,a=n.mask,o=n.patternChar;o===void 0&&(o="#");var s=Array.from({length:e.length+1}).map(function(){return!0}),i=0,u=-1,m={};r.split("").forEach(function(g,N){var d=void 0;g===o&&(i++,d=Ze(a,i-1),u===-1&&e[N]===d&&(u=N)),m[N]=d});for(var h=function(g){return r[g]===o&&e[g]!==m[g]},y=0,w=s.length;y<w;y++)s[y]=y===u||h(y)||h(y-1);return s[r.indexOf(o)]=!0,s}function En(e){var n=e.mask;if(n){var r=n==="string"?n:n.toString();if(r.match(/\d/g))throw new Error("Mask "+n+" should not contain numeric character;")}}function kn(e,n){return e===""?!0:!(n!=null&&n.match(/\d/))&&typeof e=="string"&&(!!e.match(/^\d+$/)||e==="")}function On(e){e.mask,e.allowEmptyFormatting;var n=e.format,r=e.inputMode;r===void 0&&(r="numeric");var a=e.onKeyDown;a===void 0&&(a=q);var o=e.patternChar;o===void 0&&(o="#");var s=e.value,i=e.defaultValue,u=e.valueIsNumericString,m=Qe(e,["mask","allowEmptyFormatting","format","inputMode","onKeyDown","patternChar","value","defaultValue","valueIsNumericString"]);En(e);var h=function(d){return In(d,e)},y=function(d){var b=d.key,S=d.target,p=S.selectionStart,k=S.selectionEnd,C=S.value;if(p!==k){a(d);return}var E=p;if(b==="Backspace"||b==="Delete"){var W="right";if(b==="Backspace"){for(;E>0&&n[E-1]!==o;)E--;W="left"}else{for(var se=n.length;E<se&&n[E]!==o;)E++;W="right"}E=fe(C,E,h(C),W)}else n[E]!==o&&b!=="ArrowLeft"&&b!=="ArrowRight"&&(E=fe(C,E+1,h(C),"right"));E!==p&&be(S,E),a(d)},w=me(s)?i:s,g=u??kn(w,n),N=Object.assign(Object.assign({},e),{valueIsNumericString:g});return Object.assign(Object.assign({},m),{value:s,defaultValue:i,valueIsNumericString:g,inputMode:r,format:function(d){return wn(d,N)},removeFormatting:function(d,b){return bn(d,b,N)},getCaretBoundary:h,onKeyDown:y})}function Fn(e){var n=On(e);return D.createElement(Cn,Object.assign({},n))}const Tn=Z({resource:T().email()}),An=Z({resource:T()}),Rn=()=>{const e=he(),n=Y(_t),[r,a]=D.useState("select"),[o,s]=D.useState("phone"),[i,u]=D.useState(!1),m=()=>a("form"),h=ge({resolver:ve(o==="email"?Tn:An)}),y=()=>{h.reset(),a("select")},w=h.handleSubmit(g=>e(ne.onSelectConfirmationSubmit.thunk({values:g,selectedResource:o})));return{form:h,state:{termsChecked:i,selectedResource:o,selectConfirmationFormStage:r,loading:n},functions:{setTermsChecked:u,setSelectedResource:s,onSelectContinue:m,onFormBack:y,onSubmit:w}}},Vn=()=>{const{state:e,functions:n,form:r}=Rn();return t.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[e.selectConfirmationFormStage==="select"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[t.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Choose resource for otp code"}),t.jsx("p",{className:"text-sm text-muted-foreground",children:"We sent you a code to your resource"})]}),t.jsxs(yt,{className:"flex flex-col space-y-2",defaultValue:e.selectedResource,onValueChange:a=>n.setSelectedResource(a),children:[t.jsxs("div",{className:"flex items-center space-x-2",children:[t.jsx(Ae,{id:"email",value:"email"}),t.jsx(A,{htmlFor:"email",children:"email"})]}),t.jsxs("div",{className:"flex items-center space-x-2",children:[t.jsx(Ae,{id:"phone",value:"phone"}),t.jsx(A,{htmlFor:"phone",children:"phone"})]})]}),t.jsxs("div",{className:"items-top flex space-x-2",children:[t.jsx(St,{checked:e.termsChecked,id:"terms",onCheckedChange:a=>n.setTermsChecked(a)}),t.jsxs("div",{className:"grid gap-1.5 leading-none",children:[t.jsx("label",{className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",htmlFor:"terms",children:"Accept terms and conditions"}),t.jsxs("p",{className:"text-sm text-muted-foreground",children:["You agree to our"," ",t.jsx("a",{href:"/terms",className:"underline underline-offset-4 hover:text-primary",children:"Terms of Service"})," ","and"," ",t.jsx("a",{href:"/privacy",className:"underline underline-offset-4 hover:text-primary",children:"Privacy Policy"}),"."]})]})]}),t.jsx(R,{className:"w-full",disabled:!e.termsChecked,onClick:n.onSelectContinue,children:"Continue"})]}),e.selectConfirmationFormStage==="form"&&t.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[t.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[t.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Two factor authentication"}),t.jsx("p",{className:"text-sm text-muted-foreground",children:"We sent you a code to your email"})]}),t.jsx("div",{className:"grid gap-2",children:t.jsx(pe,{...r,children:t.jsxs("form",{className:"space-y-4",onSubmit:a=>{a.preventDefault(),n.onSubmit()},children:[t.jsx(V,{render:({field:a})=>t.jsxs(U,{children:[t.jsx(A,{className:"sr-only",htmlFor:"otp",children:e.selectedResource==="email"?"Email":"Phone"}),t.jsx(P,{children:t.jsxs(t.Fragment,{children:[e.selectedResource==="email"&&t.jsx(H,{id:"resource",placeholder:"write email",...a}),e.selectedResource==="phone"&&t.jsx(Fn,{allowEmptyFormatting:!0,customInput:H,format:"+7 ### ### ####",...a})]})}),t.jsx(M,{})]}),name:"resource",control:r.control}),t.jsxs(R,{className:"w-full",disabled:e.loading,type:"submit",children:[e.loading&&t.jsx(K,{className:"mr-2 h-4 w-4 animate-spin"}),"Confirm"]}),t.jsxs(R,{className:"w-full",disabled:e.loading,type:"button",variant:"outline",onClick:n.onFormBack,children:[e.loading&&t.jsx(K,{className:"mr-2 h-4 w-4 animate-spin"}),"Back"]})]})})})]})]})},Un=Z({login:T().email({message:"Invalid email address"})}),Pn=Z({login:T().optional(),password:T()}),Mn=()=>{const e=he(),n=Y(Mt),[r,a]=D.useState("login"),o=ge({resolver:ve(r==="email"?Un:Pn)}),s=Nt({control:o.control,name:"login"});D.useEffect(()=>{const h=T().email().safeParse(s);a(h.success?"email":"login")},[s]);const i=o.handleSubmit(m=>e(ne.onSignInSubmit.thunk({values:m,resource:r})));return{state:{loading:n,isEmail:r==="email"},form:o,functions:{onSubmit:i,goToSignUp:()=>e(B.setStage("signUp"))}}},Dn=()=>{const{form:e,functions:n,state:r}=Mn();return t.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[t.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[t.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Login to your account"}),t.jsx("p",{className:"text-sm text-muted-foreground",children:"Enter your email and password"})]}),t.jsxs("div",{children:[t.jsx(pe,{...e,children:t.jsxs("form",{className:"space-y-4",onSubmit:a=>{a.preventDefault(),n.onSubmit()},children:[t.jsx(V,{render:({field:a})=>t.jsxs(U,{children:[t.jsx(A,{className:"sr-only",htmlFor:"login",children:r.isEmail?"email":"login"}),t.jsx(P,{children:t.jsx(H,{disabled:r.loading,autoCapitalize:"none",autoCorrect:"off",placeholder:"write login or email",...a})}),t.jsx(M,{})]}),name:"login",control:e.control}),!r.isEmail&&t.jsx(V,{render:({field:a})=>t.jsxs(U,{children:[t.jsx(A,{className:"sr-only",htmlFor:"password",children:"Password"}),t.jsx(P,{children:t.jsx(ue,{disabled:r.loading,autoCapitalize:"none",autoComplete:"password",autoCorrect:"off",placeholder:"your very secret password",...a})}),t.jsx(M,{})]}),name:"password",control:e.control}),t.jsxs(R,{className:"w-full",disabled:r.loading,type:"submit",children:[r.loading&&t.jsx(K,{className:"mr-2 h-4 w-4 animate-spin"}),"Sign in"]})]})}),t.jsx("div",{className:"flex justify-center",children:t.jsx(R,{disabled:r.loading,variant:"link",onClick:n.goToSignUp,children:t.jsx("span",{className:"bg-background px-2 text-muted-foreground",children:"create new account"})})}),t.jsx(Ee,{loading:r.loading}),t.jsxs("p",{className:"mt-4 px-8 text-center text-sm text-muted-foreground",children:["By clicking continue, you agree to our"," ",t.jsx("a",{href:"/terms",className:"underline underline-offset-4 hover:text-primary",children:"Terms of Service"})," ","and"," ",t.jsx("a",{href:"/privacy",className:"underline underline-offset-4 hover:text-primary",children:"Privacy Policy"})]})]})]})},_n=Z({email:T().email({message:"Invalid email address"}),login:T(),password:T().min(6,{message:"Password must be at least 6 characters long"}),passwordConfirmation:T(),firstName:T().optional(),lastName:T().optional()}),De=[{id:1,label:"Russia",code:"ru"},{id:3,label:"Belarus",code:"by"},{id:4,label:"Kazakhstan",code:"kz"},{id:5,label:"Uzbekistan",code:"uz"}],Ln=()=>{const e=he(),n=Y(Lt),r=ge({defaultValues:{country:De[0]},resolver:ve(_n)}),a=()=>e($e.actions.setStage("signIn")),o=r.handleSubmit(i=>e(ne.onSignUpSubmit.thunk({values:i}))),s=r.watch("password")===r.watch("passwordConfirmation");return{state:{loading:n,isPasswordsEqual:s,countries:De},form:r,functions:{onSubmit:o,goToSignIn:a}}},Bn=()=>{const{form:e,state:n,functions:r}=Ln();return t.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[t.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[t.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Create an account"}),t.jsx("p",{className:"text-sm text-muted-foreground",children:"Enter your email below to create your account"})]}),t.jsxs("div",{className:"grid gap-2",children:[t.jsx(pe,{...e,children:t.jsxs("form",{className:"space-y-6",onSubmit:async a=>{a.preventDefault(),await r.onSubmit()},children:[t.jsx(V,{render:({field:a})=>t.jsxs(U,{id:L.INPUT.EMAIL,children:[t.jsx(A,{className:"sr-only",htmlFor:"email",children:"Email"}),t.jsx(P,{children:t.jsx(H,{disabled:n.loading,autoCapitalize:"none",autoComplete:"email",autoCorrect:"off",placeholder:"email@example.com",...a})}),t.jsx(M,{})]}),name:"email",control:e.control}),t.jsx(V,{render:({field:a})=>t.jsxs(U,{id:L.INPUT.LOGIN,children:[t.jsx(A,{className:"sr-only",htmlFor:"login",children:"Login"}),t.jsx(P,{children:t.jsx(H,{disabled:n.loading,autoCapitalize:"none",autoCorrect:"off",placeholder:"your login",...a})}),t.jsx(M,{})]}),name:"login",control:e.control}),t.jsx(V,{render:({field:a})=>t.jsxs(U,{id:L.INPUT.FIRST_NAME,children:[t.jsx(A,{className:"sr-only",htmlFor:"firstName",children:"First name"}),t.jsx(P,{children:t.jsx(H,{disabled:n.loading,autoCapitalize:"none",autoComplete:"firstName",autoCorrect:"off",placeholder:"your first perfect name",...a})}),t.jsx(M,{})]}),name:"firstName",control:e.control}),t.jsx(V,{render:({field:a})=>t.jsxs(U,{id:L.INPUT.LAST_NAME,children:[t.jsx(A,{className:"sr-only",htmlFor:"lastName",children:"Last name"}),t.jsx(P,{children:t.jsx(H,{disabled:n.loading,autoCapitalize:"none",autoComplete:"lastName",autoCorrect:"off",placeholder:"your second amazing name",...a})}),t.jsx(M,{})]}),name:"lastName",control:e.control}),t.jsx(V,{render:({field:a})=>t.jsxs(U,{className:"flex flex-col",children:[t.jsxs(Ct,{children:[t.jsx(wt,{asChild:!0,children:t.jsx(P,{children:t.jsxs(R,{className:Re("w-full justify-between",!a.value&&"text-muted-foreground"),id:L.SELECT.COUNTRY,variant:"outline",role:"combobox",children:[t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx(Ve,{className:"size-4",code:a.value.code}),n.countries.find(o=>o.id===a.value.id).label]}),t.jsx(Vt,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})})}),t.jsx(bt,{className:"w-[280px] p-0",children:t.jsxs(It,{children:[t.jsx(Et,{placeholder:"Search country..."}),t.jsx(kt,{children:"No country found."}),t.jsx(Ot,{children:n.countries.map(o=>{var s;return t.jsxs(Ft,{className:"flex items-center gap-2",value:o.label,onSelect:()=>{e.setValue("country",o)},children:[t.jsx(Tt,{className:Re("mr-2 h-4 w-4",o.id===((s=a.value)==null?void 0:s.id)?"opacity-100":"opacity-0")}),t.jsx(Ve,{className:"size-4",code:o.code}),t.jsx("span",{id:`${L.SELECT.COUNTRY}-${o.code}`,children:o.label})]},o.id)})})]})})]}),t.jsx(M,{})]}),name:"country",control:e.control}),t.jsx(V,{render:({field:a})=>t.jsxs(U,{id:L.INPUT.PASSWORD,children:[t.jsx(A,{className:"sr-only",htmlFor:"password",children:"Password"}),t.jsx(P,{children:t.jsx(ue,{disabled:n.loading,autoCapitalize:"none",autoComplete:"password",autoCorrect:"off",placeholder:"your very secret password",...a})}),t.jsx(M,{})]}),name:"password",control:e.control}),t.jsx(V,{render:({field:a})=>t.jsxs(U,{id:L.INPUT.PASSWORD_CONFIRMATION,children:[t.jsx(A,{className:"sr-only",htmlFor:"passwordConfirmation",children:"Confirm password"}),t.jsx(P,{children:t.jsx(ue,{disabled:n.loading,autoCapitalize:"none",autoComplete:"passwordConfirmation",autoCorrect:"off",placeholder:"confirm your password dude",...a})}),n.isPasswordsEqual&&!!a.value&&t.jsx(Ue,{children:"passwords are equal 🔥"}),!n.isPasswordsEqual&&t.jsx(Ue,{children:"confirm your password"}),t.jsx(M,{})]}),name:"passwordConfirmation",control:e.control}),t.jsxs(R,{className:"w-full",disabled:n.loading,id:L.BUTTON.SIGN_UP,children:[n.loading&&t.jsx(K,{className:"mr-2 h-4 w-4 animate-spin"}),"Sign up"]})]})}),t.jsx("div",{className:"flex justify-center ",children:t.jsx(R,{disabled:n.loading,variant:"link",onClick:r.goToSignIn,children:t.jsx("span",{className:"bg-background px-2 text-muted-foreground",children:"have account already"})})}),t.jsx(Ee,{loading:n.loading})]})]})},zn={signIn:t.jsx(Dn,{}),signUp:t.jsx(Bn,{}),selectConfirmation:t.jsx(Vn,{}),confirmation:t.jsx(on,{})},Gn=()=>{const e=Y(Ut);return zn[e]},qn=At(Rt.AUTH)({component:Gn,pendingComponent:zt});export{qn as Route};
