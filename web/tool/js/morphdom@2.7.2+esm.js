/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/morphdom@2.7.2/dist/morphdom-esm.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var e;var t="http://www.w3.org/1999/xhtml",n="undefined"==typeof document?void 0:document,r=!!n&&"content"in n.createElement("template"),i=!!n&&n.createRange&&"createContextualFragment"in n.createRange();function a(t){return t=t.trim(),r?function(e){var t=n.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(t):i?function(t){return e||(e=n.createRange()).selectNode(n.body),e.createContextualFragment(t).childNodes[0]}(t):function(e){var t=n.createElement("body");return t.innerHTML=e,t.childNodes[0]}(t)}function o(e,t){var n,r,i=e.nodeName,a=t.nodeName;return i===a||(n=i.charCodeAt(0),r=a.charCodeAt(0),n<=90&&r>=97?i===a.toUpperCase():r<=90&&n>=97&&a===i.toUpperCase())}function d(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var l={OPTION:function(e,t){var n=e.parentNode;if(n){var r=n.nodeName.toUpperCase();"OPTGROUP"===r&&(r=(n=n.parentNode)&&n.nodeName.toUpperCase()),"SELECT"!==r||n.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}d(e,t,"selected")},INPUT:function(e,t){d(e,t,"checked"),d(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var r=e.firstChild;if(r){var i=r.nodeValue;if(i==n||!n&&i==e.placeholder)return;r.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n,r,i=-1,a=0,o=e.firstChild;o;)if("OPTGROUP"===(r=o.nodeName&&o.nodeName.toUpperCase()))o=(n=o).firstChild;else{if("OPTION"===r){if(o.hasAttribute("selected")){i=a;break}a++}!(o=o.nextSibling)&&n&&(o=n.nextSibling,n=null)}e.selectedIndex=i}}};function u(){}function f(e){if(e)return e.getAttribute&&e.getAttribute("id")||e.id}var c=function(e){return function(r,i,d){if(d||(d={}),"string"==typeof i)if("#document"===r.nodeName||"HTML"===r.nodeName||"BODY"===r.nodeName){var c=i;(i=n.createElement("html")).innerHTML=c}else i=a(i);else 11===i.nodeType&&(i=i.firstElementChild);var s=d.getNodeKey||f,v=d.onBeforeNodeAdded||u,m=d.onNodeAdded||u,p=d.onBeforeElUpdated||u,h=d.onElUpdated||u,N=d.onBeforeNodeDiscarded||u,b=d.onNodeDiscarded||u,A=d.onBeforeElChildrenUpdated||u,C=d.skipFromChildren||u,T=d.addChild||function(e,t){return e.appendChild(t)},g=!0===d.childrenOnly,E=Object.create(null),S=[];function x(e){S.push(e)}function y(e,t){if(1===e.nodeType)for(var n=e.firstChild;n;){var r=void 0;t&&(r=s(n))?x(r):(b(n),n.firstChild&&y(n,t)),n=n.nextSibling}}function U(e,t,n){!1!==N(e)&&(t&&t.removeChild(e),b(e),y(e,n))}function O(e){m(e);for(var t=e.firstChild;t;){var n=t.nextSibling,r=s(t);if(r){var i=E[r];i&&o(t,i)?(t.parentNode.replaceChild(i,t),R(i,t)):O(t)}else O(t);t=n}}function R(t,r,i){var a=s(r);if(a&&delete E[a],!i){if(!1===p(t,r))return;if(e(t,r),h(t),!1===A(t,r))return}"TEXTAREA"!==t.nodeName?function(e,t){var r,i,a,d,u,f=C(e,t),c=t.firstChild,m=e.firstChild;e:for(;c;){for(d=c.nextSibling,r=s(c);!f&&m;){if(a=m.nextSibling,c.isSameNode&&c.isSameNode(m)){c=d,m=a;continue e}i=s(m);var p=m.nodeType,h=void 0;if(p===c.nodeType&&(1===p?(r?r!==i&&((u=E[r])?a===u?h=!1:(e.insertBefore(u,m),i?x(i):U(m,e,!0),i=s(m=u)):h=!1):i&&(h=!1),(h=!1!==h&&o(m,c))&&R(m,c)):3!==p&&8!=p||(h=!0,m.nodeValue!==c.nodeValue&&(m.nodeValue=c.nodeValue))),h){c=d,m=a;continue e}i?x(i):U(m,e,!0),m=a}if(r&&(u=E[r])&&o(u,c))f||T(e,u),R(u,c);else{var N=v(c);!1!==N&&(N&&(c=N),c.actualize&&(c=c.actualize(e.ownerDocument||n)),T(e,c),O(c))}c=d,m=a}!function(e,t,n){for(;t;){var r=t.nextSibling;(n=s(t))?x(n):U(t,e,!0),t=r}}(e,m,i);var b=l[e.nodeName];b&&b(e,t)}(t,r):l.TEXTAREA(t,r)}!function e(t){if(1===t.nodeType||11===t.nodeType)for(var n=t.firstChild;n;){var r=s(n);r&&(E[r]=n),e(n),n=n.nextSibling}}(r);var V,I,P=r,w=P.nodeType,B=i.nodeType;if(!g)if(1===w)1===B?o(r,i)||(b(r),P=function(e,t){for(var n=e.firstChild;n;){var r=n.nextSibling;t.appendChild(n),n=r}return t}(r,(V=i.nodeName,(I=i.namespaceURI)&&I!==t?n.createElementNS(I,V):n.createElement(V)))):P=i;else if(3===w||8===w){if(B===w)return P.nodeValue!==i.nodeValue&&(P.nodeValue=i.nodeValue),P;P=i}if(P===i)b(r);else{if(i.isSameNode&&i.isSameNode(P))return;if(R(P,i,g),S)for(var L=0,D=S.length;L<D;L++){var z=E[S[L]];z&&U(z,z.parentNode,!1)}}return!g&&P!==r&&r.parentNode&&(P.actualize&&(P=P.actualize(r.ownerDocument||n)),r.parentNode.replaceChild(P,r)),P}}((function(e,t){var n,r,i,a,o=t.attributes;if(11!==t.nodeType&&11!==e.nodeType){for(var d=o.length-1;d>=0;d--)r=(n=o[d]).name,i=n.namespaceURI,a=n.value,i?(r=n.localName||r,e.getAttributeNS(i,r)!==a&&("xmlns"===n.prefix&&(r=n.name),e.setAttributeNS(i,r,a))):e.getAttribute(r)!==a&&e.setAttribute(r,a);for(var l=e.attributes,u=l.length-1;u>=0;u--)r=(n=l[u]).name,(i=n.namespaceURI)?(r=n.localName||r,t.hasAttributeNS(i,r)||e.removeAttributeNS(i,r)):t.hasAttribute(r)||e.removeAttribute(r)}}));export{c as default};
//# sourceMappingURL=/sm/38c8996503197428db03db7e910b73c2e1d325a9198e884cf8127210791ae32d.map