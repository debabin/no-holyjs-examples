import{q as ye,c as Nt,s as wt,j as n,B as L,S as oe,G as bt,t as Ct,_ as St,u as H,w as At,v as we,x as Le,y as It,z as Tt,M as Et,E as $e,F as ze,H as ve,I as je,J as Qe,K as Ze,L as et,U as tt,N as nt,Q as Pe,V as Oe,W as Ft,Y as pe,Z as _,$ as Ie,r as Ne,a0 as Te,a1 as G,a2 as K,a3 as B,a4 as W,a5 as be,a6 as q,a7 as Y,d as V,a8 as _e,a9 as kt,aa as Ge,ab as Ot,ac as de,ad as Rt,ae as Pt,af as Vt,a as Ke,ag as We,ah as _t,ai as Mt,aj as Ut,ak as Dt,al as Bt,am as Lt,an as $t,ao as qe,o as zt,p as Gt}from"./index-DTzUy4Zk.js";import{S as he}from"./skeleton-D7J2UpL5.js";const J={PAGE:{AUTH:"page-auth",INDEX:"page-index"},FORM:{CONFIRMATION_FORM:"form-confirmationForm"},BUTTON:{SIGN_IN:"button-signIn",SIGN_UP:"button-signUp",SIGN_OUT:"button-signOut",CREATE_NEW_ACCOUNT:"button-createNewAccount",CONFIRM:"button-confirm",CONTINUE:"button-continue",BACK:"button-back"},INPUT:{EMAIL:"input-email",FIRST_NAME:"input-firstName",LAST_NAME:"input-lastName",LOGIN:"input-login",PASSWORD:"input-password",PASSWORD_CONFIRMATION:"input-passwordConfirmation",OTP:"input-otp",PHONE:"input-phone"},SELECT:{COUNTRY:"select-country"},RADIO_BUTTON:{PHONE:"radio-button-phone",EMAIL:"radio-button-email"},CHECKBOX:{TERMS:"checkbox-terms"}},Me=({params:e,config:t})=>ye.post("otp/email",e,t),rt=({params:e,config:t})=>ye.post("otp/phone",e,t),Kt=({params:e,config:t})=>ye.post("signin/login",e,t),Wt=({params:e,config:t})=>ye.post("signup",e,t),qt=({params:e,config:t})=>ye.post("twoFactorAuthentication",e,t);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=Nt("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]),Yt=()=>({functions:{onGoogleClick:()=>{var r,a;((a=(r=window==null?void 0:window.google)==null?void 0:r.accounts)==null?void 0:a.oauth2.initTokenClient({client_id:"330577919686-606uq677jeq7no7dhrrkarnroecm23n5.apps.googleusercontent.com",scope:"openid profile email",callback:s=>{wt.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${s.access_token}`,{headers:{Authorization:`Bearer ${s.access_token}`,Accept:"application/json"}}).then(o=>{console.log("@",o),document.cookie=`googleAccessToken=${s.access_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`}).catch(o=>console.log(o))}})).requestAccessToken()}}}),Ue=({loading:e})=>{const{functions:t}=Yt();return n.jsxs("div",{className:"flex flex-col gap-6",children:[n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"absolute inset-0 flex items-center",children:n.jsx("span",{className:"w-full border-t"})}),n.jsx("div",{className:"relative flex justify-center text-xs uppercase",children:n.jsx("span",{className:"bg-background px-2 text-muted-foreground",children:"Or continue with"})})]}),n.jsxs("div",{className:"flex flex-col gap-2",children:[n.jsxs(L,{disabled:e,type:"button",variant:"outline",children:[e?n.jsx(oe,{className:"mr-2 h-4 w-4 animate-spin"}):n.jsx(bt,{className:"mr-2 h-4 w-4"}),"GitHub"]}),n.jsxs(L,{disabled:e,type:"button",variant:"outline",onClick:t.onGoogleClick,children:[e?n.jsx(oe,{className:"mr-2 h-4 w-4 animate-spin"}):n.jsx(Ct,{className:"mr-2 h-4 w-4"}),"Google"]})]})]})},Xt=()=>n.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[n.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[n.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Login to your account"}),n.jsx("p",{className:"text-sm text-muted-foreground",children:"Enter your email and password"})]}),n.jsxs("div",{children:[n.jsxs("div",{className:"flex flex-col gap-4",children:[n.jsx(he,{className:"h-10 w-full"}),n.jsx(he,{className:"h-10 w-full"}),n.jsx(he,{className:"h-10 w-full"})]}),n.jsx("div",{className:"flex justify-center py-3",children:n.jsx(he,{className:"h-4 w-[200px]"})}),n.jsx(Ue,{loading:!0}),n.jsxs("p",{className:"mt-4 flex flex-col gap-2 px-8",children:[n.jsx(he,{className:"h-3 w-full"}),n.jsx(he,{className:"h-3 w-full"})]})]})]});function M(e,t,r){if(!e.s){if(r instanceof De){if(!r.s)return void(r.o=M.bind(null,e,t));1&t&&(t=r.s),r=r.v}if(r&&r.then)return void r.then(M.bind(null,e,t),M.bind(null,e,2));e.s=t,e.v=r;const a=e.o;a&&a(e)}}const De=function(){function e(){}return e.prototype.then=function(t,r){const a=new e,s=this.s;if(s){const o=1&s?t:r;if(o){try{M(a,1,o(this.v))}catch(i){M(a,2,i)}return a}return this}return this.o=function(o){try{const i=o.v;1&o.s?M(a,1,t?t(i):i):r?M(a,1,r(i)):M(a,2,i)}catch(i){M(a,2,i)}},a},e}();function ge(e){return e instanceof De&&1&e.s}const Jt=(e={})=>{const{name:t=St("timerAtom"),interval:r=1e3,delayMultiplier:a=1e3,progressPrecision:s=2,resetProgress:o=!0}=typeof e=="string"?{name:e}:e,i=H(0,`${t}Atom`),c=H(0,`${t}.progressAtom`),d=H(!1,`${t}.pauseAtom`),p=H(r,`${t}.intervalAtom`).pipe(At({setSeconds:(m,h)=>1e3*h})),y=H(0,`${t}._versionAtom`),I=we((m,h,x=0)=>{h*=a,h=Math.min(Et,h),Le(h<m.get(p),"delay less than interval"),Le(h<x,"passed more than delay");const F=y(m,P=>P+1),S=Date.now();let T=h+S-x,k=h-x,te=$e,ie=0;i(m,k),c(m,x/h),d(m,!1);const E=It(d,(P,fe)=>{if(ze(m.cause)===ze(P.cause)){const O=Date.now();m.schedule(()=>{fe?ie=O:(T+=O-ie,te(),te=$e,ie=0)})}});return m.schedule(function(){try{let P,fe;return Promise.resolve(function(O,X,Q){for(var $;;){var A=O();if(ge(A)&&(A=A.v),!A)return w;if(A.then){$=0;break}var w=Q();if(w&&w.then){if(!ge(w)){$=1;break}w=w.s}var U}var D=new De,le=M.bind(null,D,2);return($===0?A.then(z):$===1?w.then(ne):U.then(ce)).then(void 0,le),D;function ne(ue){w=ue;do{if(X&&(U=X())&&U.then&&ge(U),!(A=O())||ge(A)&&!A.v)return void M(D,1,w);if(A.then)return void A.then(z).then(void 0,le);ge(w=Q())&&(w=w.v)}while(!w||!w.then);w.then(ne).then(void 0,le)}function z(ue){ue?(w=Q())&&w.then?w.then(ne).then(void 0,le):ne(w):M(D,1,w)}function ce(){(A=O())?A.then?A.then(z).then(void 0,le):z(A):M(D,1,w)}}(function(){return!(fe||P)&&1},void 0,function(){if(k=T-Date.now(),k<=0)return void(fe=1);const O=m.get(p),X=k<O?k:k%O||O;return Promise.resolve(m.schedule(()=>Tt(X))).then(function(){function Q(){F===m.get(y)?m.get(()=>{k=i(m,Math.max(0,T-Date.now()));const A=m.get(p),w=Math.ceil(h/A),U=Math.ceil(k/A);c(m,+(1-U/w).toFixed(s))}):P=1}const $=function(){if(ie)return Promise.resolve(new Promise(A=>te=A)).then(function(){})}();return $&&$.then?$.then(Q):Q()})}))}catch(P){return Promise.reject(P)}}).finally(()=>{E(),F===m.get(y)&&N(m)})},`${t}.startTimer`),g=we(m=>{y(m,h=>h+1),N(m),o&&c(m,0)},`${t}.stopTimer`),N=we(m=>{i(m,0)},`${t}.endTimer`),f=we(m=>d(m,h=>!h),`${t}.pause`);return Object.assign({},i,{progressAtom:c,endTimer:N,intervalAtom:p,startTimer:I,stopTimer:g,pauseAtom:d,pause:f})},se=H({value:"signIn"},"stageAtom"),ee=H({type:"email",resource:"",retryDelay:0},"otpAtom").pipe(ve((e,t)=>({countdown:Jt({name:`${t}.countdown`,interval:1e3,delayMultiplier:1e3,progressPrecision:2,resetProgress:!0})})),ve((e,t)=>({resend:je(async r=>{try{const a=r.get(e),o=await(a.type==="email"?Me:rt)({params:{[a.type]:a.resource}});o.data.retryDelay&&(e.countdown.startTimer(r,o.data.retryDelay/1e3),e(r,{...a,retryDelay:o.data.retryDelay}),se(r,{value:"confirmation"}))}catch(a){console.error(a)}},`${t}.otpResend`)}))),at=je(async(e,t)=>{try{const{resource:r,values:a}=t;if(r==="email"){const o=await Me({params:{email:a.login}});if(!o.data.retryDelay)return;ee(e,{type:"email",resource:a.login,retryDelay:o.data.retryDelay}),ee.countdown.startTimer(e,o.data.retryDelay/1e3),se(e,{value:"confirmation"});return}const s=await Kt({params:{[r]:a.login,...r==="login"&&{password:a.password}}});if("needConfirmation"in s.data&&s.data.needConfirmation&&r==="login"){se(e,{value:"selectConfirmation"});return}"profile"in s.data&&(Qe(e,s.data.token),Ze.dataAtom(e,s.data.profile),et(e,{isAuthenticated:!0}),tt.success("Sign in is successful 👍",{cancel:{label:"Close"},description:"We are very glad to see you, have fun"}),nt.navigate({to:"/",replace:!0}))}catch(r){console.error(r)}},"signInSubmit").pipe(ve((e,t)=>({loadingAtom:H(r=>r.spy(e.pendingAtom)>0,`${t}.loading`)}))),ot=je(async(e,t)=>{try{const{values:r,selectedResource:a}=t,o=await(a==="email"?Me:rt)({params:{[a]:r.resource}});o.data.retryDelay&&(ee(e,{type:a,resource:r.resource,retryDelay:o.data.retryDelay}),ee.countdown.startTimer(e,o.data.retryDelay/1e3),se(e,{value:"confirmation"}))}catch(r){console.error(r)}},"selectConfirmationSubmit").pipe(ve((e,t)=>({loadingAtom:H(r=>r.spy(e.pendingAtom)>0,`${t}.loading`)}))),He=je(async(e,t)=>{const{values:r}=t,a=await qt({params:{otp:r.otp,source:e.get(ee).resource}});"profile"in a.data&&(Qe(e,a.data.token),Ze.dataAtom(e,a.data.profile),et(e,{isAuthenticated:!0}),nt.navigate({to:"/",replace:!0}))},"confirmationSubmit").pipe(ve((e,t)=>({loadingAtom:H(r=>r.spy(e.pendingAtom)>0,`${t}.loading`)}))),st=je(async(e,t)=>{try{const{values:{passwordConfirmation:r,...a}}=t;await Wt({params:a}),tt.success("Your account has been created 👍",{cancel:{label:"Close"},description:"We are very glad to see you, have fun"}),se(e,{value:"signIn"})}catch(r){console.error(r)}},"signUpSubmit").pipe(ve((e,t)=>({loadingAtom:H(r=>r.spy(e.pendingAtom)>0,`${t}.loading`)}))),Qt=(e,t)=>{if(t==="email"){const[r,a]=e.split("@");return`${r.substring(0,Math.ceil(r.length/2))+"*".repeat(Math.floor(r.length/2))}@${a}`}if(t==="phone"){const r=e.substring(0,e.length-10),a=e.substring(e.length-10);return r+"*".repeat(5)+a.substring(5)}},Ye=(e,t,r)=>{if(e&&"reportValidity"in e){const a=Pe(r,t);e.setCustomValidity(a&&a.message||""),e.reportValidity()}},it=(e,t)=>{for(const r in t.fields){const a=t.fields[r];a&&a.ref&&"reportValidity"in a.ref?Ye(a.ref,r,e):a.refs&&a.refs.forEach(s=>Ye(s,r,e))}},Zt=(e,t)=>{t.shouldUseNativeValidation&&it(e,t);const r={};for(const a in e){const s=Pe(t.fields,a),o=Object.assign(e[a]||{},{ref:s&&s.ref});if(en(t.names||Object.keys(e),a)){const i=Object.assign({},Pe(r,a));Oe(i,"root",o),Oe(r,a,i)}else Oe(r,a,o)}return r},en=(e,t)=>e.some(r=>r.startsWith(t+"."));var tn=function(e,t){for(var r={};e.length;){var a=e[0],s=a.code,o=a.message,i=a.path.join(".");if(!r[i])if("unionErrors"in a){var c=a.unionErrors[0].errors[0];r[i]={message:c.message,type:c.code}}else r[i]={message:o,type:s};if("unionErrors"in a&&a.unionErrors.forEach(function(y){return y.errors.forEach(function(I){return e.push(I)})}),t){var d=r[i].types,p=d&&d[a.code];r[i]=Ft(i,t,r,s,p?[].concat(p,a.message):a.message)}e.shift()}return r},Ee=function(e,t,r){return r===void 0&&(r={}),function(a,s,o){try{return Promise.resolve(function(i,c){try{var d=Promise.resolve(e[r.mode==="sync"?"parse":"parseAsync"](a,t)).then(function(p){return o.shouldUseNativeValidation&&it({},o),{errors:{},values:r.raw?a:p}})}catch(p){return c(p)}return d&&d.then?d.then(void 0,c):d}(0,function(i){if(function(c){return Array.isArray(c==null?void 0:c.errors)}(i))return{values:{},errors:Zt(tn(i.errors,!o.shouldUseNativeValidation&&o.criteriaMode==="all"),o)};throw i}))}catch(i){return Promise.reject(i)}}};const nn=pe({otp:_().min(6)}),rn=()=>({form:Ie({resolver:Ee(nn),reValidateMode:"onSubmit"})}),an=Ne(({ctx:e})=>{const t=e.spy(He.loadingAtom)||e.spy(ee.resend.pendingAtom)>0,r=Number((e.spy(ee.countdown)/1e3).toFixed(0)),a=e.spy(ee),{form:s}=rn(),o=s.handleSubmit(async c=>{try{await He(e,{values:c})}catch(d){s.setError("otp",{message:d.response.data.message})}}),i=()=>ee.resend(e);return n.jsxs("div",{id:J.FORM.CONFIRMATION_FORM,className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[n.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[n.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Two factor authentication"}),n.jsxs("p",{className:"text-sm text-muted-foreground",children:["We sent you a code to your ",a.type," ",Qt(a.resource,a.type)]})]}),n.jsx("div",{className:"grid gap-2",children:n.jsx(Te,{...s,children:n.jsxs("form",{className:"space-y-4",onSubmit:o,children:[n.jsx(G,{render:({field:c})=>n.jsxs(K,{children:[n.jsx(B,{className:"sr-only",htmlFor:"otp",children:"Password"}),n.jsx(W,{children:n.jsx(be,{disabled:t,id:"otp",maxLength:6,autoCapitalize:"none",autoComplete:"otp",autoCorrect:"off",placeholder:"your otp code",...c})}),n.jsx(q,{})]}),name:"otp",control:s.control}),n.jsxs("div",{className:"flex flex-col gap-2",children:[n.jsxs(L,{className:"w-full",disabled:t,type:"submit",children:[t&&n.jsx(oe,{className:"mr-2 h-4 w-4 animate-spin"}),"Confirm"]}),!!r&&n.jsx("div",{children:n.jsxs("p",{className:"text-center text-sm text-muted-foreground",children:["try again after ",r," seconds"]})}),!r&&n.jsxs(L,{className:"w-full",disabled:t,type:"button",variant:"outline",onClick:i,children:[t&&n.jsx(oe,{className:"mr-2 h-4 w-4 animate-spin"}),"Send otp"]})]})]})})})]})},"ConfirmationForm");function lt(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(e);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(e,a[s])&&(r[a[s]]=e[a[s]]);return r}var Ce;(function(e){e.event="event",e.props="prop"})(Ce||(Ce={}));function me(){}function on(e){var t,r=void 0;return function(){for(var a=[],s=arguments.length;s--;)a[s]=arguments[s];return t&&a.length===t.length&&a.every(function(o,i){return o===t[i]})||(t=a,r=e.apply(void 0,a)),r}}function xe(e){return!!(e||"").match(/\d/)}function Se(e){return e==null}function sn(e){return typeof e=="number"&&isNaN(e)}function ln(e){return Se(e)||sn(e)||typeof e=="number"&&!isFinite(e)}function cn(e){var t=V.useRef(e);t.current=e;var r=V.useRef(function(){for(var a=[],s=arguments.length;s--;)a[s]=arguments[s];return t.current.apply(t,a)});return r.current}function Xe(e,t){return Array(t+1).join(e)}function un(e){var t=e+"",r=t[0]==="-"?"-":"";r&&(t=t.substring(1));var a=t.split(/[eE]/g),s=a[0],o=a[1];if(o=Number(o),!o)return r+s;s=s.replace(".","");var i=1+o,c=s.length;return i<0?s="0."+Xe("0",Math.abs(i))+s:i>=c?s=s+Xe("0",i-c):s=(s.substring(0,i)||"0")+"."+s.substring(i),r+s}function Ve(e,t){if(e.value=e.value,e!==null){if(e.createTextRange){var r=e.createTextRange();return r.move("character",t),r.select(),!0}return e.selectionStart||e.selectionStart===0?(e.focus(),e.setSelectionRange(t,t),!0):(e.focus(),!1)}}var mn=on(function(e,t){for(var r=0,a=0,s=e.length,o=t.length;e[r]===t[r]&&r<s;)r++;for(;e[s-1-a]===t[o-1-a]&&o-a>r&&s-a>r;)a++;return{from:{start:r,end:s-a},to:{start:r,end:o-a}}}),dn=function(e,t){var r=Math.min(e.selectionStart,t);return{from:{start:r,end:e.selectionEnd},to:{start:r,end:t}}};function fn(e,t,r){return Math.min(Math.max(e,t),r)}function Re(e){return Math.max(e.selectionStart,e.selectionEnd)}function hn(){return typeof navigator<"u"&&!(navigator.platform&&/iPhone|iPod/.test(navigator.platform))}function vn(e){return{from:{start:0,end:0},to:{start:0,end:e.length},lastValue:""}}function ct(e,t){return e===void 0&&(e=" "),typeof e=="string"?e:e[t]||" "}function pn(e){var t=e.currentValue,r=e.formattedValue,a=e.currentValueIndex,s=e.formattedValueIndex;return t[a]===r[s]}function gn(e,t,r,a,s,o,i){i===void 0&&(i=pn);var c=s.findIndex(function(T){return T}),d=e.slice(0,c);!t&&!r.startsWith(d)&&(t=d,r=d+r,a=a+d.length);for(var p=r.length,y=e.length,I={},g=new Array(p),N=0;N<p;N++){g[N]=-1;for(var f=0,m=y;f<m;f++){var h=i({currentValue:r,lastValue:t,formattedValue:e,currentValueIndex:N,formattedValueIndex:f});if(h&&I[f]!==!0){g[N]=f,I[f]=!0;break}}}for(var x=a;x<p&&(g[x]===-1||!o(r[x]));)x++;var F=x===p||g[x]===-1?y:g[x];for(x=a-1;x>0&&g[x]===-1;)x--;var S=x===-1||g[x]===-1?0:g[x]+1;return S>F?F:a-S<F-a?S:F}function Ae(e,t,r,a){var s=e.length;if(t=fn(t,0,s),a==="left"){for(;t>=0&&!r[t];)t--;t===-1&&(t=r.indexOf(!0))}else{for(;t<=s&&!r[t];)t++;t>s&&(t=r.lastIndexOf(!0))}return t===-1&&(t=s),t}function xn(e){for(var t=Array.from({length:e.length+1}).map(function(){return!0}),r=0,a=t.length;r<a;r++)t[r]=!!(xe(e[r])||xe(e[r-1]));return t}function yn(e,t,r,a,s,o){o===void 0&&(o=me);var i=cn(function(f,m){var h,x;return ln(f)?(x="",h=""):typeof f=="number"||m?(x=typeof f=="number"?un(f):f,h=a(x)):(x=s(f,void 0),h=a(x)),{formattedValue:h,numAsString:x}}),c=V.useState(function(){return i(Se(e)?t:e,r)}),d=c[0],p=c[1],y=function(f,m){f.formattedValue!==d.formattedValue&&p({formattedValue:f.formattedValue,numAsString:f.value}),o(f,m)},I=e,g=r;Se(e)&&(I=d.numAsString,g=!0);var N=i(I,g);return V.useMemo(function(){p(N)},[N.formattedValue]),[d,y]}function jn(e){return e.replace(/[^0-9]/g,"")}function Nn(e){return e}function wn(e){var t=e.type;t===void 0&&(t="text");var r=e.displayType;r===void 0&&(r="input");var a=e.customInput,s=e.renderText,o=e.getInputRef,i=e.format;i===void 0&&(i=Nn);var c=e.removeFormatting;c===void 0&&(c=jn);var d=e.defaultValue,p=e.valueIsNumericString,y=e.onValueChange,I=e.isAllowed,g=e.onChange;g===void 0&&(g=me);var N=e.onKeyDown;N===void 0&&(N=me);var f=e.onMouseUp;f===void 0&&(f=me);var m=e.onFocus;m===void 0&&(m=me);var h=e.onBlur;h===void 0&&(h=me);var x=e.value,F=e.getCaretBoundary;F===void 0&&(F=xn);var S=e.isValidInputCharacter;S===void 0&&(S=xe);var T=e.isCharacterSame,k=lt(e,["type","displayType","customInput","renderText","getInputRef","format","removeFormatting","defaultValue","valueIsNumericString","onValueChange","isAllowed","onChange","onKeyDown","onMouseUp","onFocus","onBlur","value","getCaretBoundary","isValidInputCharacter","isCharacterSame"]),te=yn(x,d,!!p,i,c,y),ie=te[0],E=ie.formattedValue,P=ie.numAsString,fe=te[1],O=V.useRef(),X=V.useRef({formattedValue:E,numAsString:P}),Q=function(l,u){X.current={formattedValue:l.formattedValue,numAsString:l.value},fe(l,u)},$=V.useState(!1),A=$[0],w=$[1],U=V.useRef(null),D=V.useRef({setCaretTimeout:null,focusTimeout:null});V.useEffect(function(){return w(!0),function(){clearTimeout(D.current.setCaretTimeout),clearTimeout(D.current.focusTimeout)}},[]);var le=i,ne=function(l,u){var v=parseFloat(u);return{formattedValue:l,value:u,floatValue:isNaN(v)?void 0:v}},z=function(l,u,v){l.selectionStart===0&&l.selectionEnd===l.value.length||(Ve(l,u),D.current.setCaretTimeout=setTimeout(function(){l.value===v&&l.selectionStart!==u&&Ve(l,u)},0))},ce=function(l,u,v){return Ae(l,u,F(l),v)},ue=function(l,u,v){var b=F(u),R=gn(u,E,l,v,b,S,T);return R=Ae(u,R,b),R},ut=function(l){var u=l.formattedValue;u===void 0&&(u="");var v=l.input,b=l.source,R=l.event,C=l.numAsString,j;if(v){var Z=l.inputValue||v.value,re=Re(v);v.value=u,j=ue(Z,u,re),j!==void 0&&z(v,j,u)}u!==E&&Q(ne(u,C),{event:R,source:b})};V.useEffect(function(){var l=X.current,u=l.formattedValue,v=l.numAsString;(E!==u||P!==v)&&Q(ne(E,P),{event:void 0,source:Ce.props})},[E,P]);var mt=U.current?Re(U.current):void 0,dt=typeof window<"u"?V.useLayoutEffect:V.useEffect;dt(function(){var l=U.current;if(E!==X.current.formattedValue&&l){var u=ue(X.current.formattedValue,E,mt);l.value=E,z(l,u,E)}},[E]);var ft=function(l,u,v){var b=u.target,R=O.current?dn(O.current,b.selectionEnd):mn(E,l),C=Object.assign(Object.assign({},R),{lastValue:E}),j=c(l,C),Z=le(j);if(j=c(Z,void 0),I&&!I(ne(Z,j))){var re=u.target,ae=Re(re),ke=ue(l,E,ae);return re.value=E,z(re,ke,E),!1}return ut({formattedValue:Z,numAsString:j,inputValue:l,event:u,source:v,input:u.target}),!0},Fe=function(l,u){u===void 0&&(u=0);var v=l.selectionStart,b=l.selectionEnd;O.current={selectionStart:v,selectionEnd:b+u}},ht=function(l){var u=l.target,v=u.value,b=ft(v,l,Ce.event);b&&g(l),O.current=void 0},vt=function(l){var u=l.target,v=l.key,b=u.selectionStart,R=u.selectionEnd,C=u.value;C===void 0&&(C="");var j;v==="ArrowLeft"||v==="Backspace"?j=Math.max(b-1,0):v==="ArrowRight"?j=Math.min(b+1,C.length):v==="Delete"&&(j=b);var Z=0;v==="Delete"&&b===R&&(Z=1);var re=v==="ArrowLeft"||v==="ArrowRight";if(j===void 0||b!==R&&!re){N(l),Fe(u,Z);return}var ae=j;if(re){var ke=v==="ArrowLeft"?"left":"right";ae=ce(C,j,ke),ae!==j&&l.preventDefault()}else v==="Delete"&&!S(C[j])?ae=ce(C,j,"right"):v==="Backspace"&&!S(C[j])&&(ae=ce(C,j,"left"));ae!==j&&z(u,ae,C),N(l),Fe(u,Z)},pt=function(l){var u=l.target,v=function(){var b=u.selectionStart,R=u.selectionEnd,C=u.value;if(C===void 0&&(C=""),b===R){var j=ce(C,b);j!==b&&z(u,j,C)}};v(),requestAnimationFrame(function(){v()}),f(l),Fe(u)},gt=function(l){l.persist&&l.persist();var u=l.target,v=l.currentTarget;U.current=u,D.current.focusTimeout=setTimeout(function(){var b=u.selectionStart,R=u.selectionEnd,C=u.value;C===void 0&&(C="");var j=ce(C,b);j!==b&&!(b===0&&R===C.length)&&z(u,j,C),m(Object.assign(Object.assign({},l),{currentTarget:v}))},0)},xt=function(l){U.current=null,clearTimeout(D.current.focusTimeout),clearTimeout(D.current.setCaretTimeout),h(l)},yt=A&&hn()?"numeric":void 0,Be=Object.assign({inputMode:yt},k,{type:t,value:E,onChange:ht,onKeyDown:vt,onMouseUp:pt,onFocus:gt,onBlur:xt});if(r==="text")return s?Y.createElement(Y.Fragment,null,s(E,k)||null):Y.createElement("span",Object.assign({},k,{ref:o}),E);if(a){var jt=a;return Y.createElement(jt,Object.assign({},Be,{ref:o}))}return Y.createElement("input",Object.assign({},Be,{ref:o}))}function bn(e,t){var r=t.format,a=t.allowEmptyFormatting,s=t.mask,o=t.patternChar;if(o===void 0&&(o="#"),e===""&&!a)return"";for(var i=0,c=r.split(""),d=0,p=r.length;d<p;d++)r[d]===o&&(c[d]=e[i]||ct(s,i),i+=1);return c.join("")}function Cn(e,t,r){t===void 0&&(t=vn(e));var a=r.format,s=r.patternChar;s===void 0&&(s="#");var o=t.from,i=t.to,c=t.lastValue;c===void 0&&(c="");var d=function(h){return a[h]===s},p=function(h,x){for(var F="",S=0;S<h.length;S++)d(x+S)&&xe(h[S])&&(F+=h[S]);return F},y=function(h){return h.replace(/[^0-9]/g,"")};if(!a.match(/\d/))return y(e);if((c===""||o.end-o.start===c.length)&&e.length===a.length){for(var I="",g=0;g<e.length;g++)if(d(g))xe(e[g])&&(I+=e[g]);else if(e[g]!==a[g])return y(e);return I}var N=c.substring(0,o.start),f=e.substring(i.start,i.end),m=c.substring(o.end);return""+p(N,0)+y(f)+p(m,o.end)}function Sn(e,t){var r=t.format,a=t.mask,s=t.patternChar;s===void 0&&(s="#");var o=Array.from({length:e.length+1}).map(function(){return!0}),i=0,c=-1,d={};r.split("").forEach(function(g,N){var f=void 0;g===s&&(i++,f=ct(a,i-1),c===-1&&e[N]===f&&(c=N)),d[N]=f});for(var p=function(g){return r[g]===s&&e[g]!==d[g]},y=0,I=o.length;y<I;y++)o[y]=y===c||p(y)||p(y-1);return o[r.indexOf(s)]=!0,o}function An(e){var t=e.mask;if(t){var r=t==="string"?t:t.toString();if(r.match(/\d/g))throw new Error("Mask "+t+" should not contain numeric character;")}}function In(e,t){return e===""?!0:!(t!=null&&t.match(/\d/))&&typeof e=="string"&&(!!e.match(/^\d+$/)||e==="")}function Tn(e){e.mask,e.allowEmptyFormatting;var t=e.format,r=e.inputMode;r===void 0&&(r="numeric");var a=e.onKeyDown;a===void 0&&(a=me);var s=e.patternChar;s===void 0&&(s="#");var o=e.value,i=e.defaultValue,c=e.valueIsNumericString,d=lt(e,["mask","allowEmptyFormatting","format","inputMode","onKeyDown","patternChar","value","defaultValue","valueIsNumericString"]);An(e);var p=function(f){return Sn(f,e)},y=function(f){var m=f.key,h=f.target,x=h.selectionStart,F=h.selectionEnd,S=h.value;if(x!==F){a(f);return}var T=x;if(m==="Backspace"||m==="Delete"){var k="right";if(m==="Backspace"){for(;T>0&&t[T-1]!==s;)T--;k="left"}else{for(var te=t.length;T<te&&t[T]!==s;)T++;k="right"}T=Ae(S,T,p(S),k)}else t[T]!==s&&m!=="ArrowLeft"&&m!=="ArrowRight"&&(T=Ae(S,T+1,p(S),"right"));T!==x&&Ve(h,T),a(f)},I=Se(o)?i:o,g=c??In(I,t),N=Object.assign(Object.assign({},e),{valueIsNumericString:g});return Object.assign(Object.assign({},d),{value:o,defaultValue:i,valueIsNumericString:g,inputMode:r,format:function(f){return bn(f,N)},removeFormatting:function(f,m){return Cn(f,m,N)},getCaretBoundary:p,onKeyDown:y})}function En(e){var t=Tn(e);return Y.createElement(wn,Object.assign({},t))}const Fn=pe({resource:_().email()}),kn=pe({resource:_()}),On=()=>{const e=_e(),[t,r]=Y.useState("select"),[a,s]=Y.useState("phone"),[o,i]=Y.useState(!1),c=()=>r("form"),d=Ie({resolver:Ee(a==="email"?Fn:kn)}),p=()=>{d.reset(),r("select")},y=d.handleSubmit(I=>ot(e,{values:I,selectedResource:a}));return{form:d,state:{termsChecked:o,selectedResource:a,selectConfirmationFormStage:t},functions:{setTermsChecked:i,setSelectedResource:s,onSelectContinue:c,onFormBack:p,onSubmit:y}}},Rn=Ne(({ctx:e})=>{const t=e.spy(ot.loadingAtom),{state:r,functions:a,form:s}=On();return n.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[r.selectConfirmationFormStage==="select"&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[n.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Choose resource for otp code"}),n.jsx("p",{className:"text-sm text-muted-foreground",children:"We sent you a code to your resource"})]}),n.jsxs(kt,{className:"flex flex-col space-y-2",defaultValue:r.selectedResource,onValueChange:o=>a.setSelectedResource(o),children:[n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(Ge,{id:"email",value:"email"}),n.jsx(B,{htmlFor:"email",children:"email"})]}),n.jsxs("div",{className:"flex items-center space-x-2",children:[n.jsx(Ge,{id:"phone",value:"phone"}),n.jsx(B,{htmlFor:"phone",children:"phone"})]})]}),n.jsxs("div",{className:"items-top flex space-x-2",children:[n.jsx(Ot,{checked:r.termsChecked,id:"terms",onCheckedChange:o=>a.setTermsChecked(o)}),n.jsxs("div",{className:"grid gap-1.5 leading-none",children:[n.jsx("label",{className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",htmlFor:"terms",children:"Accept terms and conditions"}),n.jsxs("p",{className:"text-sm text-muted-foreground",children:["You agree to our"," ",n.jsx("a",{href:"/terms",className:"underline underline-offset-4 hover:text-primary",children:"Terms of Service"})," ","and"," ",n.jsx("a",{href:"/privacy",className:"underline underline-offset-4 hover:text-primary",children:"Privacy Policy"}),"."]})]})]}),n.jsx(L,{className:"w-full",disabled:!r.termsChecked,onClick:a.onSelectContinue,children:"Continue"})]}),r.selectConfirmationFormStage==="form"&&n.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[n.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[n.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Two factor authentication"}),n.jsx("p",{className:"text-sm text-muted-foreground",children:"We sent you a code to your email"})]}),n.jsx("div",{className:"grid gap-2",children:n.jsx(Te,{...s,children:n.jsxs("form",{className:"space-y-4",onSubmit:o=>{o.preventDefault(),a.onSubmit()},children:[n.jsx(G,{render:({field:o})=>n.jsxs(K,{children:[n.jsx(B,{className:"sr-only",htmlFor:"otp",children:r.selectedResource==="email"?"Email":"Phone"}),n.jsx(W,{children:n.jsxs(n.Fragment,{children:[r.selectedResource==="email"&&n.jsx(de,{id:"resource",placeholder:"write email",...o}),r.selectedResource==="phone"&&n.jsx(En,{allowEmptyFormatting:!0,customInput:de,format:"+7 ### ### ####",...o})]})}),n.jsx(q,{})]}),name:"resource",control:s.control}),n.jsxs(L,{className:"w-full",disabled:t,type:"submit",children:[t&&n.jsx(oe,{className:"mr-2 h-4 w-4 animate-spin"}),"Confirm"]}),n.jsxs(L,{className:"w-full",disabled:t,type:"button",variant:"outline",onClick:a.onFormBack,children:[t&&n.jsx(oe,{className:"mr-2 h-4 w-4 animate-spin"}),"Back"]})]})})})]})]})},"SelectConfirmationForm"),Pn=pe({login:_().email({message:"Invalid email address"})}),Vn=pe({login:_().optional(),password:_()}),_n=()=>{const e=_e(),[t,r]=Y.useState("login"),a=Ie({resolver:Ee(t==="email"?Pn:Vn)}),s=Rt({control:a.control,name:"login"});Y.useEffect(()=>{const d=_().email().safeParse(s);r(d.success?"email":"login")},[s]);const o=a.handleSubmit(c=>at(e,{values:c,resource:t}));return{state:{isEmail:t==="email"},form:a,functions:{onSubmit:o,goToSignUp:()=>se(e,{value:"signUp"})}}},Mn=Ne(({ctx:e})=>{const t=e.spy(at.loadingAtom),{form:r,functions:a,state:s}=_n();return n.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[n.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[n.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Login to your account"}),n.jsx("p",{className:"text-sm text-muted-foreground",children:"Enter your email and password"})]}),n.jsxs("div",{children:[n.jsx(Te,{...r,children:n.jsxs("form",{className:"space-y-4",onSubmit:o=>{o.preventDefault(),a.onSubmit()},children:[n.jsx(G,{render:({field:o})=>n.jsxs(K,{children:[n.jsx(B,{className:"sr-only",htmlFor:"login",children:s.isEmail?"email":"login"}),n.jsx(W,{children:n.jsx(de,{disabled:t,autoCapitalize:"none",autoCorrect:"off",placeholder:"write login or email",...o})}),n.jsx(q,{})]}),name:"login",control:r.control}),!s.isEmail&&n.jsx(G,{render:({field:o})=>n.jsxs(K,{children:[n.jsx(B,{className:"sr-only",htmlFor:"password",children:"Password"}),n.jsx(W,{children:n.jsx(be,{disabled:t,autoCapitalize:"none",autoComplete:"password",autoCorrect:"off",placeholder:"your very secret password",...o})}),n.jsx(q,{})]}),name:"password",control:r.control}),n.jsxs(L,{className:"w-full",disabled:t,type:"submit",children:[t&&n.jsx(oe,{className:"mr-2 h-4 w-4 animate-spin"}),"Sign in"]})]})}),n.jsx("div",{className:"flex justify-center",children:n.jsx(L,{disabled:t,variant:"link",onClick:a.goToSignUp,children:n.jsx("span",{className:"bg-background px-2 text-muted-foreground",children:"create new account"})})}),n.jsx(Ue,{loading:t}),n.jsxs("p",{className:"mt-4 px-8 text-center text-sm text-muted-foreground",children:["By clicking continue, you agree to our"," ",n.jsx("a",{href:"/terms",className:"underline underline-offset-4 hover:text-primary",children:"Terms of Service"})," ","and"," ",n.jsx("a",{href:"/privacy",className:"underline underline-offset-4 hover:text-primary",children:"Privacy Policy"})]})]})]})},"SignInForm"),Un=pe({email:_().email({message:"Invalid email address"}),login:_(),password:_().min(6,{message:"Password must be at least 6 characters long"}),passwordConfirmation:_(),firstName:_().optional(),lastName:_().optional()}),Je=[{id:1,label:"Russia",code:"ru"},{id:3,label:"Belarus",code:"by"},{id:4,label:"Kazakhstan",code:"kz"},{id:5,label:"Uzbekistan",code:"uz"}],Dn=()=>{const e=_e(),t=Ie({defaultValues:{country:Je[0]},resolver:Ee(Un)}),r=()=>se(e,{value:"signIn"}),a=t.handleSubmit(o=>st(e,{values:o}));return{state:{isPasswordsEqual:t.watch("password")===t.watch("passwordConfirmation"),countries:Je},form:t,functions:{onSubmit:a,goToSignIn:r}}},Bn=Ne(({ctx:e})=>{const t=e.spy(st.loadingAtom),{form:r,state:a,functions:s}=Dn();return n.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[n.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[n.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Create an account"}),n.jsx("p",{className:"text-sm text-muted-foreground",children:"Enter your email below to create your account"})]}),n.jsxs("div",{className:"grid gap-2",children:[n.jsx(Te,{...r,children:n.jsxs("form",{className:"space-y-6",onSubmit:async o=>{o.preventDefault(),await s.onSubmit()},children:[n.jsx(G,{render:({field:o})=>n.jsxs(K,{id:J.INPUT.EMAIL,children:[n.jsx(B,{className:"sr-only",htmlFor:"email",children:"Email"}),n.jsx(W,{children:n.jsx(de,{disabled:t,autoCapitalize:"none",autoComplete:"email",autoCorrect:"off",placeholder:"email@example.com",...o})}),n.jsx(q,{})]}),name:"email",control:r.control}),n.jsx(G,{render:({field:o})=>n.jsxs(K,{id:J.INPUT.LOGIN,children:[n.jsx(B,{className:"sr-only",htmlFor:"login",children:"Login"}),n.jsx(W,{children:n.jsx(de,{disabled:t,autoCapitalize:"none",autoCorrect:"off",placeholder:"your login",...o})}),n.jsx(q,{})]}),name:"login",control:r.control}),n.jsx(G,{render:({field:o})=>n.jsxs(K,{id:J.INPUT.FIRST_NAME,children:[n.jsx(B,{className:"sr-only",htmlFor:"firstName",children:"First name"}),n.jsx(W,{children:n.jsx(de,{disabled:t,autoCapitalize:"none",autoComplete:"firstName",autoCorrect:"off",placeholder:"your first perfect name",...o})}),n.jsx(q,{})]}),name:"firstName",control:r.control}),n.jsx(G,{render:({field:o})=>n.jsxs(K,{id:J.INPUT.LAST_NAME,children:[n.jsx(B,{className:"sr-only",htmlFor:"lastName",children:"Last name"}),n.jsx(W,{children:n.jsx(de,{disabled:t,autoCapitalize:"none",autoComplete:"lastName",autoCorrect:"off",placeholder:"your second amazing name",...o})}),n.jsx(q,{})]}),name:"lastName",control:r.control}),n.jsx(G,{render:({field:o})=>n.jsxs(K,{className:"flex flex-col",children:[n.jsxs(Pt,{children:[n.jsx(Vt,{asChild:!0,children:n.jsx(W,{children:n.jsxs(L,{className:Ke("w-full justify-between",!o.value&&"text-muted-foreground"),id:J.SELECT.COUNTRY,variant:"outline",role:"combobox",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(We,{className:"size-4",code:o.value.code}),a.countries.find(i=>i.id===o.value.id).label]}),n.jsx(Ht,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"})]})})}),n.jsx(_t,{className:"w-[280px] p-0",children:n.jsxs(Mt,{children:[n.jsx(Ut,{placeholder:"Search country..."}),n.jsx(Dt,{children:"No country found."}),n.jsx(Bt,{children:a.countries.map(i=>{var c;return n.jsxs(Lt,{className:"flex items-center gap-2",value:i.label,onSelect:()=>{r.setValue("country",i)},children:[n.jsx($t,{className:Ke("mr-2 h-4 w-4",i.id===((c=o.value)==null?void 0:c.id)?"opacity-100":"opacity-0")}),n.jsx(We,{className:"size-4",code:i.code}),n.jsx("span",{id:`${J.SELECT.COUNTRY}-${i.code}`,children:i.label})]},i.id)})})]})})]}),n.jsx(q,{})]}),name:"country",control:r.control}),n.jsx(G,{render:({field:o})=>n.jsxs(K,{id:J.INPUT.PASSWORD,children:[n.jsx(B,{className:"sr-only",htmlFor:"password",children:"Password"}),n.jsx(W,{children:n.jsx(be,{disabled:t,autoCapitalize:"none",autoComplete:"password",autoCorrect:"off",placeholder:"your very secret password",...o})}),n.jsx(q,{})]}),name:"password",control:r.control}),n.jsx(G,{render:({field:o})=>n.jsxs(K,{id:J.INPUT.PASSWORD_CONFIRMATION,children:[n.jsx(B,{className:"sr-only",htmlFor:"passwordConfirmation",children:"Confirm password"}),n.jsx(W,{children:n.jsx(be,{disabled:t,autoCapitalize:"none",autoComplete:"passwordConfirmation",autoCorrect:"off",placeholder:"confirm your password dude",...o})}),a.isPasswordsEqual&&!!o.value&&n.jsx(qe,{children:"passwords are equal 🔥"}),!a.isPasswordsEqual&&n.jsx(qe,{children:"confirm your password"}),n.jsx(q,{})]}),name:"passwordConfirmation",control:r.control}),n.jsxs(L,{className:"w-full",disabled:t,id:J.BUTTON.SIGN_UP,children:[t&&n.jsx(oe,{className:"mr-2 h-4 w-4 animate-spin"}),"Sign up"]})]})}),n.jsx("div",{className:"flex justify-center ",children:n.jsx(L,{disabled:t,variant:"link",onClick:s.goToSignIn,children:n.jsx("span",{className:"bg-background px-2 text-muted-foreground",children:"have account already"})})}),n.jsx(Ue,{loading:t})]})]})},"SignUpForm"),Ln={signIn:n.jsx(Mn,{}),signUp:n.jsx(Bn,{}),selectConfirmation:n.jsx(Rn,{}),confirmation:n.jsx(an,{})},$n=Ne(({ctx:e})=>Ln[e.spy(se).value],"AuthPage"),Kn=zt(Gt.AUTH)({component:$n,pendingComponent:Xt});export{Kn as Route};