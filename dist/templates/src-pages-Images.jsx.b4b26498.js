webpackJsonp([2],{55:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(1),l=function(e){return e&&e.__esModule?e:{default:e}}(s),u=n(27),c=5e3,f=function(e){function t(){var e,n,r,o;a(this,t);for(var s=arguments.length,l=Array(s),u=0;u<s;u++)l[u]=arguments[u];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.intervalRef=void 0,r.state={marginTop:0,imgWidth:0,imgHeight:0,visibleIndex:0,fadeClassName:"",lastChangeTimestamp:0},r.autoNextImage=function(){r.intervalRef=setInterval(function(){Date.now()-r.state.lastChangeTimestamp>=c&&r.nextImage()},c)},r.nextIndex=function(){var e=r.props.images,t=r.state.visibleIndex;return t<e.length-1?t+1:0},r.nextImage=function(){r.props.images.length>1&&r.setVisibleIndex(r.nextIndex())},r.prevIndex=function(){var e=r.props.images,t=r.state.visibleIndex;return t>0?t-1:e.length-1},r.prevImage=function(){r.props.images.length>1&&r.setVisibleIndex(r.prevIndex())},r.setVisibleIndex=function(e){r.setState({fadeClassName:"fadeOut"}),setTimeout(function(){r.setState({visibleIndex:e,fadeClassName:"opacity-0 fadeIn",lastChangeTimestamp:Date.now()})},1e3)},o=n,i(r,o)}return r(t,e),o(t,[{key:"render",value:function(){var e=this.props.images,t=this.state,n=t.marginTop,a=t.imgHeight,i=t.imgWidth,r=t.visibleIndex,o=t.fadeClassName,s=e.length>1?"cursor-pointer":"cursor-auto",u=e[r],c=e[this.nextIndex()],f=e[this.prevIndex()];return l.default.createElement("div",{className:m.container,style:{marginTop:n,height:a+70}},l.default.createElement("div",{className:o},l.default.createElement("div",{className:m.imageContainer},l.default.createElement("img",{className:s,style:{maxWidth:i,maxHeight:a},src:u.src+"?w=800&h=800",alt:u.legend,onClick:this.nextImage}),l.default.createElement("p",null,u.legend))),l.default.createElement("img",{style:{display:"none"},src:c.src+"?w=800&h=800",alt:""}),l.default.createElement("img",{style:{display:"none"},src:f.src+"?w=800&h=800",alt:""}))}},{key:"componentDidMount",value:function(){if("undefined"!=typeof document){var e=window.innerHeight-70-70,t=Math.min(e,800),n=Math.floor((e-t)/2),a=window.innerWidth,i=Math.min(a,800);this.setState({marginTop:n,imgHeight:t,imgWidth:i})}clearInterval(this.intervalRef),this.autoNextImage()}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalRef)}}]),t}(l.default.Component);t.default=(0,u.withSiteData)((0,u.withRouteData)(f));var m={container:"mx-2 flex justify-end items-center",imageContainer:"text-center text-sm font-light"}}});