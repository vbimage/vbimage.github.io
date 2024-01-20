"use strict";(()=>{var I=class extends Error{constructor(){super(...arguments);this.name="SendError"}},ie=async(t,e)=>{let r=await fetch("https://rw.vestaboard.com/",{method:"POST",headers:{"Content-Type":"application/json","X-Vestaboard-Read-Write-Key":e},body:JSON.stringify(t)}).then(o=>o.json());if(r.status==="error")throw new I(r.message)};function p(t,e){let r=t.length;Array.isArray(t[0])||(t=[t]),Array.isArray(e[0])||(e=e.map(l=>[l]));let o=e[0].length,a=e[0].map((l,s)=>e.map(i=>i[s])),n=t.map(l=>a.map(s=>{let i=0;if(!Array.isArray(l)){for(let f of s)i+=l*f;return i}for(let f=0;f<l.length;f++)i+=l[f]*(s[f]||0);return i}));return r===1&&(n=n[0]),o===1?n.map(l=>l[0]):n}function N(t){return(Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1]||"").toLowerCase()}function le(t,e){t=+t,e=+e;let r=(Math.floor(t)+"").length;if(e>r)return+t.toFixed(e-r);{let o=10**(r-e);return Math.round(t/o)*o}}function Se(t,e,r){return isNaN(t)?e:isNaN(e)?t:t+(e-t)*r}function Ie(t,e,r){return(r-t)/(e-t)}function fe(t,e,r){return Se(e[0],e[1],Ie(t[0],t[1],r))}function de(t){return t.map(e=>e.split("|").map(r=>{r=r.trim();let o=r.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);if(o){let a=new String(o[1]);return a.range=[+o[2],+o[3]],a}return r}))}var z=class{add(e,r,o){if(typeof arguments[0]!="string"){for(var e in arguments[0])this.add(e,arguments[0][e],arguments[1]);return}(Array.isArray(e)?e:[e]).forEach(function(a){this[a]=this[a]||[],r&&this[a][o?"unshift":"push"](r)},this)}run(e,r){this[e]=this[e]||[],this[e].forEach(function(o){o.call(r&&r.context?r.context:r,r)})}},De=new z,D=De;var g={D50:[.3457/.3585,1,(1-.3457-.3585)/.3585],D65:[.3127/.329,1,(1-.3127-.329)/.329]};function A(t){return Array.isArray(t)?t:g[t]}function b(t,e,r,o={}){if(t=A(t),e=A(e),!t||!e)throw new TypeError(`Missing white point to convert ${t?"":"from"}${!t&&!e?"/":""}${e?"":"to"}`);if(t===e)return r;let a={W1:t,W2:e,XYZ:r,options:o};if(D.run("chromatic-adaptation-start",a),a.M||(a.W1===g.D65&&a.W2===g.D50?a.M=[[1.0479298208405488,.022946793341019088,-.05019222954313557],[.029627815688159344,.990434484573249,-.01707382502938514],[-.009243058152591178,.015055144896577895,.7518742899580008]]:a.W1===g.D50&&a.W2===g.D65&&(a.M=[[.9554734527042182,-.023098536874261423,.0632593086610217],[-.028369706963208136,1.0099954580058226,.021041398966943008],[.012314001688319899,-.020507696433477912,1.3303659366080753]])),D.run("chromatic-adaptation-end",a),a.M)return p(a.M,a.XYZ);throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.")}var Ge=75e-6,d=class t{constructor(e){this.id=e.id,this.name=e.name,this.base=e.base?t.get(e.base):null,this.aliases=e.aliases,this.base&&(this.fromBase=e.fromBase,this.toBase=e.toBase);let r=e.coords??this.base.coords;for(let a in r)"name"in r[a]||(r[a].name=a);this.coords=r;let o=e.white??this.base.white??"D65";this.white=A(o),this.formats=e.formats??{};for(let a in this.formats){let n=this.formats[a];n.type||="function",n.name||=a}e.cssId&&!this.formats.functions?.color?(this.formats.color={id:e.cssId},Object.defineProperty(this,"cssId",{value:e.cssId})):this.formats?.color&&!this.formats?.color.id&&(this.formats.color.id=this.id),this.referred=e.referred,Object.defineProperty(this,"path",{value:Ne(this).reverse(),writable:!1,enumerable:!0,configurable:!0}),D.run("colorspace-init-end",this)}inGamut(e,{epsilon:r=Ge}={}){if(this.isPolar)return e=this.toBase(e),this.base.inGamut(e,{epsilon:r});let o=Object.values(this.coords);return e.every((a,n)=>{let l=o[n];if(l.type!=="angle"&&l.range){if(Number.isNaN(a))return!0;let[s,i]=l.range;return(s===void 0||a>=s-r)&&(i===void 0||a<=i+r)}return!0})}get cssId(){return this.formats.functions?.color?.id||this.id}get isPolar(){for(let e in this.coords)if(this.coords[e].type==="angle")return!0;return!1}getFormat(e){if(typeof e=="object")return e=me(e,this),e;let r;return e==="default"?r=Object.values(this.formats)[0]:r=this.formats[e],r?(r=me(r,this),r):null}equals(e){return e?this===e||this.id===e.id:!1}to(e,r){if(arguments.length===1&&([e,r]=[e.space,e.coords]),e=t.get(e),this.equals(e))return r;r=r.map(s=>Number.isNaN(s)?0:s);let o=this.path,a=e.path,n,l;for(let s=0;s<o.length&&o[s].equals(a[s]);s++)n=o[s],l=s;if(!n)throw new Error(`Cannot convert between color spaces ${this} and ${e}: no connection space was found`);for(let s=o.length-1;s>l;s--)r=o[s].toBase(r);for(let s=l+1;s<a.length;s++)r=a[s].fromBase(r);return r}from(e,r){return arguments.length===1&&([e,r]=[e.space,e.coords]),e=t.get(e),e.to(this,r)}toString(){return`${this.name} (${this.id})`}getMinCoords(){let e=[];for(let r in this.coords){let o=this.coords[r],a=o.range||o.refRange;e.push(a?.min??0)}return e}static registry={};static get all(){return[...new Set(Object.values(t.registry))]}static register(e,r){if(arguments.length===1&&(r=arguments[0],e=r.id),r=this.get(r),this.registry[e]&&this.registry[e]!==r)throw new Error(`Duplicate color space registration: '${e}'`);if(this.registry[e]=r,arguments.length===1&&r.aliases)for(let o of r.aliases)this.register(o,r);return r}static get(e,...r){if(!e||e instanceof t)return e;if(N(e)==="string"){let a=t.registry[e.toLowerCase()];if(!a)throw new TypeError(`No color space found with id = "${e}"`);return a}if(r.length)return t.get(...r);throw new TypeError(`${e} is not a valid color space`)}static resolveCoord(e,r){let o=N(e),a,n;if(o==="string"?e.includes(".")?[a,n]=e.split("."):[a,n]=[,e]:Array.isArray(e)?[a,n]=e:(a=e.space,n=e.coordId),a=t.get(a),a||(a=r),!a)throw new TypeError(`Cannot resolve coordinate reference ${e}: No color space specified and relative references are not allowed here`);if(o=N(n),o==="number"||o==="string"&&n>=0){let i=Object.entries(a.coords)[n];if(i)return{space:a,id:i[0],index:n,...i[1]}}a=t.get(a);let l=n.toLowerCase(),s=0;for(let i in a.coords){let f=a.coords[i];if(i.toLowerCase()===l||f.name?.toLowerCase()===l)return{space:a,id:i,index:s,...f};s++}throw new TypeError(`No "${n}" coordinate found in ${a.name}. Its coordinates are: ${Object.keys(a.coords).join(", ")}`)}static DEFAULT_FORMAT={type:"functions",name:"color"}};function Ne(t){let e=[t];for(let r=t;r=r.base;)e.push(r);return e}function me(t,{coords:e}={}){if(t.coords&&!t.coordGrammar){t.type||="function",t.name||="color",t.coordGrammar=de(t.coords);let r=Object.entries(e).map(([o,a],n)=>{let l=t.coordGrammar[n][0],s=a.range||a.refRange,i=l.range,f="";return l=="<percentage>"?(i=[0,100],f="%"):l=="<angle>"&&(f="deg"),{fromRange:s,toRange:i,suffix:f}});t.serializeCoords=(o,a)=>o.map((n,l)=>{let{fromRange:s,toRange:i,suffix:f}=r[l];return s&&i&&(n=fe(s,i,n)),n=le(n,a),f&&(n+=f),n})}return t}var C=new d({id:"xyz-d65",name:"XYZ D65",coords:{x:{name:"X"},y:{name:"Y"},z:{name:"Z"}},white:"D65",formats:{color:{ids:["xyz-d65","xyz"]}},aliases:["xyz"]});var x=class extends d{constructor(e){e.coords||(e.coords={r:{range:[0,1],name:"Red"},g:{range:[0,1],name:"Green"},b:{range:[0,1],name:"Blue"}}),e.base||(e.base=C),e.toXYZ_M&&e.fromXYZ_M&&(e.toBase??=r=>{let o=p(e.toXYZ_M,r);return this.white!==this.base.white&&(o=b(this.white,this.base.white,o)),o},e.fromBase??=r=>(r=b(this.base.white,this.white,r),p(e.fromXYZ_M,r))),e.referred??="display",super(e)}};var ue=new d({id:"xyz-d50",name:"XYZ D50",white:"D50",base:C,fromBase:t=>b(C.white,"D50",t),toBase:t=>b("D50",C.white,t),formats:{color:{}}});var Ae=216/24389,he=24/116,O=24389/27,j=g.D50,y=new d({id:"lab",name:"Lab",coords:{l:{refRange:[0,100],name:"L"},a:{refRange:[-125,125]},b:{refRange:[-125,125]}},white:j,base:ue,fromBase(t){let r=t.map((o,a)=>o/j[a]).map(o=>o>Ae?Math.cbrt(o):(O*o+16)/116);return[116*r[1]-16,500*(r[0]-r[1]),200*(r[1]-r[2])]},toBase(t){let e=[];return e[1]=(t[0]+16)/116,e[0]=t[1]/500+e[1],e[2]=e[1]-t[2]/200,[e[0]>he?Math.pow(e[0],3):(116*e[0]-16)/O,t[0]>8?Math.pow((t[0]+16)/116,3):t[0]/O,e[2]>he?Math.pow(e[2],3):(116*e[2]-16)/O].map((o,a)=>o*j[a])},formats:{lab:{coords:["<number> | <percentage>","<number> | <percentage>[-1,1]","<number> | <percentage>[-1,1]"]}}});function ce(t){return(t%360+360)%360}var Y=new d({id:"lch",name:"LCH",coords:{l:{refRange:[0,100],name:"Lightness"},c:{refRange:[0,150],name:"Chroma"},h:{refRange:[0,360],type:"angle",name:"Hue"}},base:y,fromBase(t){let[e,r,o]=t,a,n=.02;return Math.abs(r)<n&&Math.abs(o)<n?a=NaN:a=Math.atan2(o,r)*180/Math.PI,[e,Math.sqrt(r**2+o**2),ce(a)]},toBase(t){let[e,r,o]=t;return r<0&&(r=0),isNaN(o)&&(o=0),[e,r*Math.cos(o*Math.PI/180),r*Math.sin(o*Math.PI/180)]},formats:{lch:{coords:["<number> | <percentage>","<number> | <percentage>","<number> | <angle>"]}}});var pe=25**7,P=Math.PI,ge=180/P,M=P/180;function _(t,e,{kL:r=1,kC:o=1,kH:a=1}={}){let[n,l,s]=y.from(t),i=Y.from(y,[n,l,s])[1],[f,c,m]=y.from(e),T=Y.from(y,[f,c,m])[1];i<0&&(i=0),T<0&&(T=0);let J=((i+T)/2)**7,Q=.5*(1-Math.sqrt(J/(J+pe))),$=(1+Q)*l,q=(1+Q)*c,k=Math.sqrt($**2+s**2),R=Math.sqrt(q**2+m**2),E=$===0&&s===0?0:Math.atan2(s,$),B=q===0&&m===0?0:Math.atan2(m,q);E<0&&(E+=2*P),B<0&&(B+=2*P),E*=ge,B*=ge;let ke=f-n,ee=R-k,w=B-E,L=E+B,te=Math.abs(w),v;k*R===0?v=0:te<=180?v=w:w>180?v=w-360:w<-180?v=w+360:console.log("the unthinkable has happened");let re=2*Math.sqrt(R*k)*Math.sin(v*M/2),Re=(n+f)/2,H=(k+R)/2,oe=Math.pow(H,7),h;k*R===0?h=L:te<=180?h=L/2:L<360?h=(L+360)/2:h=(L-360)/2;let ae=(Re-50)**2,Ee=1+.015*ae/Math.sqrt(20+ae),ne=1+.045*H,S=1;S-=.17*Math.cos((h-30)*M),S+=.24*Math.cos(2*h*M),S+=.32*Math.cos((3*h+6)*M),S-=.2*Math.cos((4*h-63)*M);let se=1+.015*H*S,Be=30*Math.exp(-1*((h-275)/25)**2),Le=2*Math.sqrt(oe/(oe+pe)),ve=-1*Math.sin(2*Be*M)*Le,G=(ke/(r*Ee))**2;return G+=(ee/(o*ne))**2,G+=(re/(a*se))**2,G+=ve*(ee/(o*ne))*(re/(a*se)),Math.sqrt(G)}var Oe=[[.41239079926595934,.357584339383878,.1804807884018343],[.21263900587151027,.715168678767756,.07219231536073371],[.01933081871559182,.11919477979462598,.9505321522496607]],Pe=[[3.2409699419045226,-1.537383177570094,-.4986107602930034],[-.9692436362808796,1.8759675015077202,.04155505740717559],[.05563007969699366,-.20397695888897652,1.0569715142428786]],be=new x({id:"srgb-linear",name:"Linear sRGB",white:"D65",toXYZ_M:Oe,fromXYZ_M:Pe,formats:{color:{}}});var X={aliceblue:[240/255,248/255,1],antiquewhite:[250/255,235/255,215/255],aqua:[0,1,1],aquamarine:[127/255,1,212/255],azure:[240/255,1,1],beige:[245/255,245/255,220/255],bisque:[1,228/255,196/255],black:[0,0,0],blanchedalmond:[1,235/255,205/255],blue:[0,0,1],blueviolet:[138/255,43/255,226/255],brown:[165/255,42/255,42/255],burlywood:[222/255,184/255,135/255],cadetblue:[95/255,158/255,160/255],chartreuse:[127/255,1,0],chocolate:[210/255,105/255,30/255],coral:[1,127/255,80/255],cornflowerblue:[100/255,149/255,237/255],cornsilk:[1,248/255,220/255],crimson:[220/255,20/255,60/255],cyan:[0,1,1],darkblue:[0,0,139/255],darkcyan:[0,139/255,139/255],darkgoldenrod:[184/255,134/255,11/255],darkgray:[169/255,169/255,169/255],darkgreen:[0,100/255,0],darkgrey:[169/255,169/255,169/255],darkkhaki:[189/255,183/255,107/255],darkmagenta:[139/255,0,139/255],darkolivegreen:[85/255,107/255,47/255],darkorange:[1,140/255,0],darkorchid:[153/255,50/255,204/255],darkred:[139/255,0,0],darksalmon:[233/255,150/255,122/255],darkseagreen:[143/255,188/255,143/255],darkslateblue:[72/255,61/255,139/255],darkslategray:[47/255,79/255,79/255],darkslategrey:[47/255,79/255,79/255],darkturquoise:[0,206/255,209/255],darkviolet:[148/255,0,211/255],deeppink:[1,20/255,147/255],deepskyblue:[0,191/255,1],dimgray:[105/255,105/255,105/255],dimgrey:[105/255,105/255,105/255],dodgerblue:[30/255,144/255,1],firebrick:[178/255,34/255,34/255],floralwhite:[1,250/255,240/255],forestgreen:[34/255,139/255,34/255],fuchsia:[1,0,1],gainsboro:[220/255,220/255,220/255],ghostwhite:[248/255,248/255,1],gold:[1,215/255,0],goldenrod:[218/255,165/255,32/255],gray:[128/255,128/255,128/255],green:[0,128/255,0],greenyellow:[173/255,1,47/255],grey:[128/255,128/255,128/255],honeydew:[240/255,1,240/255],hotpink:[1,105/255,180/255],indianred:[205/255,92/255,92/255],indigo:[75/255,0,130/255],ivory:[1,1,240/255],khaki:[240/255,230/255,140/255],lavender:[230/255,230/255,250/255],lavenderblush:[1,240/255,245/255],lawngreen:[124/255,252/255,0],lemonchiffon:[1,250/255,205/255],lightblue:[173/255,216/255,230/255],lightcoral:[240/255,128/255,128/255],lightcyan:[224/255,1,1],lightgoldenrodyellow:[250/255,250/255,210/255],lightgray:[211/255,211/255,211/255],lightgreen:[144/255,238/255,144/255],lightgrey:[211/255,211/255,211/255],lightpink:[1,182/255,193/255],lightsalmon:[1,160/255,122/255],lightseagreen:[32/255,178/255,170/255],lightskyblue:[135/255,206/255,250/255],lightslategray:[119/255,136/255,153/255],lightslategrey:[119/255,136/255,153/255],lightsteelblue:[176/255,196/255,222/255],lightyellow:[1,1,224/255],lime:[0,1,0],limegreen:[50/255,205/255,50/255],linen:[250/255,240/255,230/255],magenta:[1,0,1],maroon:[128/255,0,0],mediumaquamarine:[102/255,205/255,170/255],mediumblue:[0,0,205/255],mediumorchid:[186/255,85/255,211/255],mediumpurple:[147/255,112/255,219/255],mediumseagreen:[60/255,179/255,113/255],mediumslateblue:[123/255,104/255,238/255],mediumspringgreen:[0,250/255,154/255],mediumturquoise:[72/255,209/255,204/255],mediumvioletred:[199/255,21/255,133/255],midnightblue:[25/255,25/255,112/255],mintcream:[245/255,1,250/255],mistyrose:[1,228/255,225/255],moccasin:[1,228/255,181/255],navajowhite:[1,222/255,173/255],navy:[0,0,128/255],oldlace:[253/255,245/255,230/255],olive:[128/255,128/255,0],olivedrab:[107/255,142/255,35/255],orange:[1,165/255,0],orangered:[1,69/255,0],orchid:[218/255,112/255,214/255],palegoldenrod:[238/255,232/255,170/255],palegreen:[152/255,251/255,152/255],paleturquoise:[175/255,238/255,238/255],palevioletred:[219/255,112/255,147/255],papayawhip:[1,239/255,213/255],peachpuff:[1,218/255,185/255],peru:[205/255,133/255,63/255],pink:[1,192/255,203/255],plum:[221/255,160/255,221/255],powderblue:[176/255,224/255,230/255],purple:[128/255,0,128/255],rebeccapurple:[102/255,51/255,153/255],red:[1,0,0],rosybrown:[188/255,143/255,143/255],royalblue:[65/255,105/255,225/255],saddlebrown:[139/255,69/255,19/255],salmon:[250/255,128/255,114/255],sandybrown:[244/255,164/255,96/255],seagreen:[46/255,139/255,87/255],seashell:[1,245/255,238/255],sienna:[160/255,82/255,45/255],silver:[192/255,192/255,192/255],skyblue:[135/255,206/255,235/255],slateblue:[106/255,90/255,205/255],slategray:[112/255,128/255,144/255],slategrey:[112/255,128/255,144/255],snow:[1,250/255,250/255],springgreen:[0,1,127/255],steelblue:[70/255,130/255,180/255],tan:[210/255,180/255,140/255],teal:[0,128/255,128/255],thistle:[216/255,191/255,216/255],tomato:[1,99/255,71/255],turquoise:[64/255,224/255,208/255],violet:[238/255,130/255,238/255],wheat:[245/255,222/255,179/255],white:[1,1,1],whitesmoke:[245/255,245/255,245/255],yellow:[1,1,0],yellowgreen:[154/255,205/255,50/255]};var xe=Array(3).fill("<percentage> | <number>[0, 255]"),ye=Array(3).fill("<number>[0, 255]"),Z=new x({id:"srgb",name:"sRGB",base:be,fromBase:t=>t.map(e=>{let r=e<0?-1:1,o=e*r;return o>.0031308?r*(1.055*o**(1/2.4)-.055):12.92*e}),toBase:t=>t.map(e=>{let r=e<0?-1:1,o=e*r;return o<.04045?e/12.92:r*((o+.055)/1.055)**2.4}),formats:{rgb:{coords:xe},rgb_number:{name:"rgb",commas:!0,coords:ye,noAlpha:!0},color:{},rgba:{coords:xe,commas:!0,lastAlpha:!0},rgba_number:{name:"rgba",commas:!0,coords:ye},hex:{type:"custom",toGamut:!0,test:t=>/^#([a-f0-9]{3,4}){1,2}$/i.test(t),parse(t){t.length<=5&&(t=t.replace(/[a-f0-9]/gi,"$&$&"));let e=[];return t.replace(/[a-f0-9]{2}/gi,r=>{e.push(parseInt(r,16)/255)}),{spaceId:"srgb",coords:e.slice(0,3),alpha:e.slice(3)[0]}},serialize:(t,e,{collapse:r=!0}={})=>{e<1&&t.push(e),t=t.map(n=>Math.round(n*255));let o=r&&t.every(n=>n%17===0);return"#"+t.map(n=>o?(n/17).toString(16):n.toString(16).padStart(2,"0")).join("")}},keyword:{type:"custom",test:t=>/^[a-z]+$/i.test(t),parse(t){t=t.toLowerCase();let e={spaceId:"srgb",coords:null,alpha:1};if(t==="transparent"?(e.coords=X.black,e.alpha=0):e.coords=X[t],e.coords)return e}}}});d.register(Z);var u=(t,e,r)=>({space:d.get("sRGB"),coords:[t/255,e/255,r/255]}),we=(t,e)=>_(t,e),Ce=Object.freeze({Red:u(218,41,28),Orange:u(255,117,0),Yellow:u(255,184,28),Green:u(0,154,68),Blue:u(0,132,213),Violet:u(112,47,138),White:u(255,255,255),Black:u(0,0,0)}),Me=Object.freeze({Red:63,Orange:64,Yellow:65,Green:66,Blue:67,Violet:68,White:69,Black:70});var Te=document.getElementById("canvas"),V=Te.getContext("2d",{willReadFrequently:!0});if(V===null)throw alert("This tool requires browser support for HTML5 canvas."),new Error("Cannot get canvas context.");var W=document.getElementById("image");W.addEventListener("change",()=>{if(W.files===null)return;let t=new Image;t.src=URL.createObjectURL(W.files[0]),t.addEventListener("load",()=>{let a=t.naturalWidth,n=t.naturalHeight,l=22/a,s=10/n,i=Math.min(l,s),f=(22-a*i)/2,c=(10-n*i)/2,m=10/6;V.drawImage(t,0,0,a,n,Math.floor(f),Math.floor(c/m),Math.ceil(a*i),Math.ceil(n*i/m))})});var $e=document.getElementById("send");$e.addEventListener("click",()=>{let t=V.getImageData(0,0,22,6).data,e=[[]];for(let o=0;o<22*6*4;o+=4){let a=t[o],n=t[o+1],l=t[o+2],s=u(a,n,l),i=Object.entries(Ce).map(([c,m])=>[c,we(m,s)]).sort(([,c],[,m])=>c-m);e[e.length-1].length===22&&e.push([]);let f=i[0][0];e[e.length-1].push(Me[f])}let r=localStorage.getItem("key");if(r===null||r===""){alert("Missing API key. Please configure one in settings.");return}(async()=>{try{await ie(e,r)}catch(o){if(!(o instanceof SyntaxError))if(o instanceof I)alert(`Failed to send message: ${o.message}.`);else throw alert("Unexpected error. Please check console for details."),o}})()});var F=document.getElementById("toggle"),K=document.getElementById("settings"),U=document.getElementById("key");F.addEventListener("click",()=>{K.hidden?(F.textContent="Hide Settings",K.hidden=!1):(F.textContent="Settings",K.hidden=!0)});U.value=localStorage.getItem("key")??"";U.addEventListener("input",()=>{localStorage.setItem("key",U.value)});})();
/*! For license information please see index.js.LEGAL.txt */
//# sourceMappingURL=index.js.map
