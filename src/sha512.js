/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 HMAC implementation as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2017
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/
(function(Q){function x(d,a,b){var f=0,c=[],C=0,m=!1,u=[],l=[],q=!1;b=b||{};var r=b.encoding||"UTF8";var k=b.numRounds||1;if(k!==parseInt(k,10)||1>k)throw Error("numRounds must a integer >= 1");if(d.lastIndexOf("SHA-",0))throw Error("Chosen SHA variant is not supported");var n=function(a,b){return I(a,b,d)};var y=function(a,b,f,e){if("SHA-384"===d||"SHA-512"===d){var c=(b+129>>>10<<5)+31;var g=32}else throw Error("Unexpected error in SHA-2 implementation");for(;a.length<=c;)a.push(0);a[b>>>5]|=128<<
24-b%32;b+=f;a[c]=b&4294967295;a[c-1]=b/4294967296|0;f=a.length;for(b=0;b<f;b+=g)e=I(a.slice(b,b+g),e,d);if("SHA-384"===d)a=[e[0].a,e[0].b,e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b];else if("SHA-512"===d)a=[e[0].a,e[0].b,e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b,e[6].a,e[6].b,e[7].a,e[7].b];else throw Error("Unexpected error in SHA-2 implementation");return a};var h=function(b){return b.slice()};if("SHA-384"===d){var v=1024;var p=384}else if("SHA-512"===
d)v=1024,p=512;else throw Error("Chosen SHA variant is not supported");var x=J(a,r);var t=A(d);this.setHMACKey=function(b,a,e){if(!0===m)throw Error("HMAC key already set");if(!0===q)throw Error("Cannot set HMAC key after calling update");r=(e||{}).encoding||"UTF8";a=J(a,r)(b);b=a.binLen;a=a.value;var c=v>>>3;e=c/4-1;if(c<b/8){for(a=y(a,b,0,A(d));a.length<=e;)a.push(0);a[e]&=4294967040}else if(c>b/8){for(;a.length<=e;)a.push(0);a[e]&=4294967040}for(b=0;b<=e;b+=1)u[b]=a[b]^909522486,l[b]=a[b]^1549556828;
t=n(u,t);f=v;m=!0};this.update=function(a){var b,e=0,d=v>>>5;var g=x(a,c,C);a=g.binLen;var m=g.value;g=a>>>5;for(b=0;b<g;b+=d)e+v<=a&&(t=n(m.slice(b,b+d),t),e+=v);f+=e;c=m.slice(e>>>5);C=a%v;q=!0};this.getHash=function(a,b){if(!0===m)throw Error("Cannot call getHash after setting HMAC key");var e=K(b);switch(a){case "HEX":a=function(a){return L(a,p,e)};break;case "B64":a=function(a){return M(a,p,e)};break;case "BYTES":a=function(a){return N(a,p)};break;case "ARRAYBUFFER":try{b=new ArrayBuffer(0)}catch(z){throw Error("ARRAYBUFFER not supported by this environment");
}a=function(a){return O(a,p)};break;default:throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");}var g=y(c.slice(),C,f,h(t));for(b=1;b<k;b+=1)g=y(g,p,0,A(d));return a(g)};this.getHMAC=function(a,b){if(!1===m)throw Error("Cannot call getHMAC without first setting HMAC key");var e=K(b);switch(a){case "HEX":a=function(a){return L(a,p,e)};break;case "B64":a=function(a){return M(a,p,e)};break;case "BYTES":a=function(a){return N(a,p)};break;case "ARRAYBUFFER":try{a=new ArrayBuffer(0)}catch(z){throw Error("ARRAYBUFFER not supported by this environment");
}a=function(a){return O(a,p)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");}b=y(c.slice(),C,f,h(t));var g=n(l,A(d));g=y(b,p,v,g);return a(g)}}function b(b,a){this.a=b;this.b=a}function L(b,a,f){var e="";a/=8;var d;for(d=0;d<a;d+=1){var c=b[d>>>2]>>>8*(3+d%4*-1);e+="0123456789abcdef".charAt(c>>>4&15)+"0123456789abcdef".charAt(c&15)}return f.outputUpper?e.toUpperCase():e}function M(b,a,f){var e="",d=a/8,c;for(c=0;c<d;c+=3){var m=c+1<d?b[c+1>>>2]:0;var u=c+2<d?b[c+
2>>>2]:0;u=(b[c>>>2]>>>8*(3+c%4*-1)&255)<<16|(m>>>8*(3+(c+1)%4*-1)&255)<<8|u>>>8*(3+(c+2)%4*-1)&255;for(m=0;4>m;m+=1)8*c+6*m<=a?e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(u>>>6*(3-m)&63):e+=f.b64Pad}return e}function N(b,a){var d="";a/=8;var e;for(e=0;e<a;e+=1){var c=b[e>>>2]>>>8*(3+e%4*-1)&255;d+=String.fromCharCode(c)}return d}function O(b,a){a/=8;var d,e=new ArrayBuffer(a);var c=new Uint8Array(e);for(d=0;d<a;d+=1)c[d]=b[d>>>2]>>>8*(3+d%4*-1)&255;return e}function K(b){var a=
{outputUpper:!1,b64Pad:"=",shakeLen:-1};b=b||{};a.outputUpper=b.outputUpper||!1;!0===b.hasOwnProperty("b64Pad")&&(a.b64Pad=b.b64Pad);b.hasOwnProperty("shakeLen");if("boolean"!==typeof a.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!==typeof a.b64Pad)throw Error("Invalid b64Pad formatting option");return a}function J(b,a){switch(a){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(b){case "HEX":b=
function(b,a,d){var e=b.length,c,f;if(e%2)throw Error("String of HEX type must be in byte increments");a=a||[0];d=d||0;var g=d>>>3;for(c=0;c<e;c+=2){var q=parseInt(b.substr(c,2),16);if(isNaN(q))throw Error("String of HEX type contains invalid characters");var r=(c>>>1)+g;for(f=r>>>2;a.length<=f;)a.push(0);a[f]|=q<<8*(3+r%4*-1)}return{value:a,binLen:4*e+d}};break;case "TEXT":b=function(b,e,d){var c=0,f,g,l;e=e||[0];d=d||0;var q=d>>>3;if("UTF8"===a){var r=3;for(f=0;f<b.length;f+=1){var k=b.charCodeAt(f);
var n=[];128>k?n.push(k):2048>k?(n.push(192|k>>>6),n.push(128|k&63)):55296>k||57344<=k?n.push(224|k>>>12,128|k>>>6&63,128|k&63):(f+=1,k=65536+((k&1023)<<10|b.charCodeAt(f)&1023),n.push(240|k>>>18,128|k>>>12&63,128|k>>>6&63,128|k&63));for(g=0;g<n.length;g+=1){var h=c+q;for(l=h>>>2;e.length<=l;)e.push(0);e[l]|=n[g]<<8*(r+h%4*-1);c+=1}}}else if("UTF16BE"===a||"UTF16LE"===a)for(r=2,n="UTF16LE"===a&&!0||"UTF16LE"!==a&&!1,f=0;f<b.length;f+=1){k=b.charCodeAt(f);!0===n&&(g=k&255,k=g<<8|k>>>8);h=c+q;for(l=
h>>>2;e.length<=l;)e.push(0);e[l]|=k<<8*(r+h%4*-1);c+=2}return{value:e,binLen:8*c+d}};break;case "B64":b=function(b,a,d){var e=0,c,f;if(-1===b.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");var g=b.indexOf("=");b=b.replace(/\=/g,"");if(-1!==g&&g<b.length)throw Error("Invalid '=' found in base-64 string");a=a||[0];d=d||0;var q=d>>>3;for(g=0;g<b.length;g+=4){var h=b.substr(g,4);for(c=f=0;c<h.length;c+=1){var k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(h[c]);
f|=k<<18-6*c}for(c=0;c<h.length-1;c+=1){var n=e+q;for(k=n>>>2;a.length<=k;)a.push(0);a[k]|=(f>>>16-8*c&255)<<8*(3+n%4*-1);e+=1}}return{value:a,binLen:8*e+d}};break;case "BYTES":b=function(b,a,d){var e;a=a||[0];d=d||0;var c=d>>>3;for(e=0;e<b.length;e+=1){var f=b.charCodeAt(e);var g=e+c;var h=g>>>2;a.length<=h&&a.push(0);a[h]|=f<<8*(3+g%4*-1)}return{value:a,binLen:8*b.length+d}};break;case "ARRAYBUFFER":try{b=new ArrayBuffer(0)}catch(f){throw Error("ARRAYBUFFER not supported by this environment");}b=
function(b,a,d){var e;a=a||[0];d=d||0;var c=d>>>3;var f=new Uint8Array(b);for(e=0;e<b.byteLength;e+=1){var g=e+c;var h=g>>>2;a.length<=h&&a.push(0);a[h]|=f[e]<<8*(3+g%4*-1)}return{value:a,binLen:8*b.byteLength+d}};break;default:throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");}return b}function h(d,a){d=new b(d.a,d.b);return 32>=a?new b(d.a>>>a|d.b<<32-a&4294967295,d.b>>>a|d.a<<32-a&4294967295):new b(d.b>>>a-32|d.a<<64-a&4294967295,d.a>>>a-32|d.b<<64-a&4294967295)}function P(d,
a){return 32>=a?new b(d.a>>>a,d.b>>>a|d.a<<32-a&4294967295):new b(0,d.a>>>a-32)}function R(d,a,c){return new b(d.a&a.a^~d.a&c.a,d.b&a.b^~d.b&c.b)}function S(d,a,c){return new b(d.a&a.a^d.a&c.a^a.a&c.a,d.b&a.b^d.b&c.b^a.b&c.b)}function T(d){var a=h(d,28),c=h(d,34);d=h(d,39);return new b(a.a^c.a^d.a,a.b^c.b^d.b)}function U(d){var a=h(d,14),c=h(d,18);d=h(d,41);return new b(a.a^c.a^d.a,a.b^c.b^d.b)}function V(d){var a=h(d,1),c=h(d,8);d=P(d,7);return new b(a.a^c.a^d.a,a.b^c.b^d.b)}function W(d){var a=
h(d,19),c=h(d,61);d=P(d,6);return new b(a.a^c.a^d.a,a.b^c.b^d.b)}function X(d,a){var c=(d.b&65535)+(a.b&65535);var e=(d.b>>>16)+(a.b>>>16)+(c>>>16);var g=(e&65535)<<16|c&65535;c=(d.a&65535)+(a.a&65535)+(e>>>16);e=(d.a>>>16)+(a.a>>>16)+(c>>>16);return new b((e&65535)<<16|c&65535,g)}function Y(c,a,f,e){var d=(c.b&65535)+(a.b&65535)+(f.b&65535)+(e.b&65535);var h=(c.b>>>16)+(a.b>>>16)+(f.b>>>16)+(e.b>>>16)+(d>>>16);var m=(h&65535)<<16|d&65535;d=(c.a&65535)+(a.a&65535)+(f.a&65535)+(e.a&65535)+(h>>>16);
h=(c.a>>>16)+(a.a>>>16)+(f.a>>>16)+(e.a>>>16)+(d>>>16);return new b((h&65535)<<16|d&65535,m)}function Z(c,a,f,e,g){var d=(c.b&65535)+(a.b&65535)+(f.b&65535)+(e.b&65535)+(g.b&65535);var h=(c.b>>>16)+(a.b>>>16)+(f.b>>>16)+(e.b>>>16)+(g.b>>>16)+(d>>>16);var u=(h&65535)<<16|d&65535;d=(c.a&65535)+(a.a&65535)+(f.a&65535)+(e.a&65535)+(g.a&65535)+(h>>>16);h=(c.a>>>16)+(a.a>>>16)+(f.a>>>16)+(e.a>>>16)+(g.a>>>16)+(d>>>16);return new b((h&65535)<<16|d&65535,u)}function A(c){if(c.lastIndexOf("SHA-",0))throw Error("No SHA variants supported");
var a=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428];var d=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];switch(c){case "SHA-224":c=a;break;case "SHA-256":c=d;break;case "SHA-384":c=[new b(3418070365,a[0]),new b(1654270250,a[1]),new b(2438529370,a[2]),new b(355462360,a[3]),new b(1731405415,a[4]),new b(41048885895,a[5]),new b(3675008525,a[6]),new b(1203062813,a[7])];break;case "SHA-512":c=[new b(d[0],4089235720),new b(d[1],
2227873595),new b(d[2],4271175723),new b(d[3],1595750129),new b(d[4],2917565137),new b(d[5],725511199),new b(d[6],4215389547),new b(d[7],327033209)];break;default:throw Error("Unknown SHA variant");}return c}function I(c,a,f){var d,g=[];if("SHA-384"===f||"SHA-512"===f){var h=80;var m=2;var u=b;var l=X;var q=Y;var r=Z;var k=V;var n=W;var y=T;var x=U;var v=S;var p=R;var A=aa}else throw Error("Unexpected error in SHA-2 implementation");f=a[0];var t=a[1];var D=a[2];var G=a[3];var B=a[4];var E=a[5];var z=
a[6];var H=a[7];for(d=0;d<h;d+=1){if(16>d){var w=d*m;var F=c.length<=w?0:c[w];w=c.length<=w+1?0:c[w+1];g[d]=new u(F,w)}else g[d]=q(n(g[d-2]),g[d-7],k(g[d-15]),g[d-16]);F=r(H,x(B),p(B,E,z),A[d],g[d]);w=l(y(f),v(f,t,D));H=z;z=E;E=B;B=l(G,F);G=D;D=t;t=f;f=l(F,w)}a[0]=l(f,a[0]);a[1]=l(t,a[1]);a[2]=l(D,a[2]);a[3]=l(G,a[3]);a[4]=l(B,a[4]);a[5]=l(E,a[5]);a[6]=l(z,a[6]);a[7]=l(H,a[7]);return a}var c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,
607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,
2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];var aa=[new b(c[0],3609767458),new b(c[1],602891725),new b(c[2],3964484399),new b(c[3],2173295548),new b(c[4],4081628472),new b(c[5],3053834265),new b(c[6],2937671579),new b(c[7],3664609560),new b(c[8],2734883394),new b(c[9],1164996542),new b(c[10],1323610764),new b(c[11],3590304994),new b(c[12],4068182383),new b(c[13],991336113),new b(c[14],633803317),new b(c[15],3479774868),new b(c[16],2666613458),new b(c[17],944711139),
new b(c[18],2341262773),new b(c[19],2007800933),new b(c[20],1495990901),new b(c[21],1856431235),new b(c[22],3175218132),new b(c[23],2198950837),new b(c[24],3999719339),new b(c[25],766784016),new b(c[26],2566594879),new b(c[27],3203337956),new b(c[28],1034457026),new b(c[29],2466948901),new b(c[30],3758326383),new b(c[31],168717936),new b(c[32],1188179964),new b(c[33],1546045734),new b(c[34],1522805485),new b(c[35],2643833823),new b(c[36],2343527390),new b(c[37],1014477480),new b(c[38],1206759142),
new b(c[39],344077627),new b(c[40],1290863460),new b(c[41],3158454273),new b(c[42],3505952657),new b(c[43],106217008),new b(c[44],3606008344),new b(c[45],1432725776),new b(c[46],1467031594),new b(c[47],851169720),new b(c[48],3100823752),new b(c[49],1363258195),new b(c[50],3750685593),new b(c[51],3785050280),new b(c[52],3318307427),new b(c[53],3812723403),new b(c[54],2003034995),new b(c[55],3602036899),new b(c[56],1575990012),new b(c[57],1125592928),new b(c[58],2716904306),new b(c[59],442776044),new b(c[60],
593698344),new b(c[61],3733110249),new b(c[62],2999351573),new b(c[63],3815920427),new b(3391569614,3928383900),new b(3515267271,566280711),new b(3940187606,3454069534),new b(4118630271,4000239992),new b(116418474,1914138554),new b(174292421,2731055270),new b(289380356,3203993006),new b(460393269,320620315),new b(685471733,587496836),new b(852142971,1086792851),new b(1017036298,365543100),new b(1126000580,2618297676),new b(1288033470,3409855158),new b(1501505948,4234509866),new b(1607167915,987167468),
new b(1816402316,1246189591)];"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(module.exports=x),exports=x):Q.jsSHA=x})(this);
