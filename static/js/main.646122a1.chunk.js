(this["webpackJsonpfinite-automata"]=this["webpackJsonpfinite-automata"]||[]).push([[0],{67:function(t,e,a){t.exports=a(81)},79:function(t,e,a){},81:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),s=a(20),r=a.n(s),l=a(11),o=a(12),c=a(18),h=a(19),u=a(93),p=a(92),f=a(64),m=function(t){Object(h.a)(a,t);var e=Object(c.a)(a);function a(){return Object(l.a)(this,a),e.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var t=this;return i.a.createElement(u.a,{bg:"primary",variant:"dark",fixed:"top"},i.a.createElement(u.a.Brand,{style:{color:"white"}},"FASIM"),i.a.createElement(u.a.Toggle,{style:{color:"white"},"aria-controls":"basic-navbar-nav"}),i.a.createElement(u.a.Collapse,{id:"basic-navbar-nav"},i.a.createElement(p.a,{className:"mr-auto"},i.a.createElement(f.a,null,i.a.createElement(f.a.Toggle,{variant:"transparent",id:"file-menu",style:{color:"white"}},"File"),i.a.createElement(f.a.Menu,{"aria-labelledby":"file-menu"},i.a.createElement(f.a.Item,{onClick:function(){t.props.newSketch()}},"New"),i.a.createElement(f.a.Item,null,"Import"),i.a.createElement(f.a.Item,null,"Export"),i.a.createElement(f.a.Divider,null),i.a.createElement(f.a.Item,null,"Exit"))),i.a.createElement(f.a,null,i.a.createElement(f.a.Toggle,{variant:"transparent",id:"help-menu",style:{color:"white"}},"Help"),i.a.createElement(f.a.Menu,null,i.a.createElement(f.a.Item,null,"Manual"),i.a.createElement(f.a.Item,null,"Contact"))))))}}]),a}(i.a.Component),d=a(10),g=a(63),y=a(86),v=a(59),E=a.n(v),x={showSettings:!1,selectedState:null},b="Curve",S="Line",w=function(){function t(e,a,n,i,s,r,o){Object(l.a)(this,t),this.index=a,this.p5=e,this.from=n,this.to=i,this.color=s,this.controlPoints=[],this.value=r,this.lineType=o}return Object(o.a)(t,[{key:"getControlPoints",value:function(t,e){var a=this.p5.createVector(this.from.x,this.from.y),n=this.p5.createVector(this.to.x-a.x,this.to.y-a.y);this.p5.translate(a.x,a.y),e.setMag(n.mag()/2),e.rotate(60),this.controlPoints[0]=e;var i=this.p5.createVector(e.x,e.y);i.setMag(25),e=t=n,this.p5.translate(t.x,t.y),e.setMag(n.mag()/2),e.rotate(120),this.controlPoints[1]=e;var s=this.p5.createVector(e.x,e.y);s.setMag(25),this.controlPoints[2]=i,this.controlPoints[3]=s}},{key:"drawValue",value:function(t,e){e.setMag(t/1.5),e.rotate(-20),this.p5.push(),this.p5.translate(e.x+this.from.x,e.y+this.from.y),this.p5.noStroke(),this.p5.fill(this.color),this.p5.text(this.value,0,0),this.p5.pop()}},{key:"drawBezierWithArrow",value:function(){var t=this.p5.createVector(this.from.x,this.from.y),e=this.p5.createVector(this.to.x-t.x,this.to.y-t.y);this.p5.push(),this.p5.stroke(this.color),this.p5.strokeWeight(2),this.p5.fill(this.color),this.getControlPoints(t,e),this.p5.pop();var a=this.controlPoints[0],n=this.controlPoints[1],i=this.controlPoints[2],s=this.controlPoints[3];this.p5.noFill(),this.p5.stroke(this.color),this.p5.strokeWeight(2),this.p5.bezier(i.x+this.from.x,i.y+this.from.y,a.x+this.from.x,a.y+this.from.y,n.x+this.to.x,n.y+this.to.y,s.x+this.to.x,s.y+this.to.y);var r=this.p5.dist(this.from.x,this.from.y,this.to.x,this.to.y),l=this.p5.createVector(a.x,a.y);this.drawValue(r,l),a.setMag(r/1.2),a.rotate(-33),n.setMag(25);var o=a.x+this.from.x,c=a.y+this.from.y;this.p5.push(),this.p5.translate(o,c,10);var h=n.x+this.to.x,u=n.y+this.to.y,p=this.p5.createVector(h-o,u-c);this.p5.fill(this.color),this.p5.translate(p.x,p.y),this.p5.rotate(180+p.heading()),this.p5.triangle(10,5,10,-5,0,0),this.p5.pop()}},{key:"drawLineWithArrow",value:function(){var t=this.p5.createVector(this.from.x,this.from.y),e=this.p5.createVector(this.to.x-t.x,this.to.y-t.y),a=this.p5.createVector(this.to.x-t.x,this.to.y-t.y);this.p5.push(),this.p5.stroke(this.color),this.p5.strokeWeight(2),this.p5.fill(this.color),this.p5.translate(t.x,t.y),e.setMag(e.mag()-25),a.setMag(a.mag()/2),a.rotate(-8),this.p5.push(),this.p5.noStroke(),this.p5.text(this.value,a.x,a.y),this.p5.pop(),this.p5.line(0,0,e.x,e.y),this.p5.rotate(e.heading()),this.p5.translate(e.mag()-10,0),this.p5.triangle(0,5,0,-5,10,0),this.p5.pop()}},{key:"drawSelfLoop",value:function(){var t=this.p5.createVector(this.from.x-25,this.from.y);this.p5.stroke(this.color),this.p5.noFill();var e=this.p5.createVector(-75+t.x,-25+t.y),a=this.p5.createVector(100+e.x,-75+e.y),n=this.p5.createVector(this.from.x,this.from.y-25);this.p5.bezier(t.x,t.y,e.x,e.y,a.x,a.y,n.x,n.y);var i=this.p5.createVector(-50+t.x,-50+t.y);this.p5.fill(this.color),this.p5.noStroke(),this.p5.text(this.value,i.x,i.y),this.p5.push(),this.p5.translate(a.x,a.y);var s=this.p5.createVector(0,75);this.p5.translate(s.x,s.y),this.p5.rotate(-s.heading()),this.p5.triangle(10,5,10,-5,0,0),this.p5.pop()}},{key:"show",value:function(){this.from.index===this.to.index?this.drawSelfLoop():this.lineType===b?this.drawBezierWithArrow():this.drawLineWithArrow()}}]),t}(),k="Initial",O="Final",j="",T=function(){function t(e,a,n,i,s,r,o){Object(l.a)(this,t),this.p5=e,this.index=r,this.stateType=o,this.dragging=!1,this.rollover=!1,this.connecting=!1,this.connected=!1,this.transitions=[],this.intersecting=!1,this.x=a,this.y=n,this.r=this.p5.int(i/2),this.name=s,this.offsetX=0,this.offsetY=0,this.fromTo=[]}return Object(o.a)(t,[{key:"setP5",value:function(t){this.p5=t}},{key:"over",value:function(){var t=this.p5.mouseX,e=this.p5.mouseY;this.p5.int(this.p5.dist(this.x,this.y,t,e))<this.r?this.rollover=!0:this.rollover=!1}},{key:"doubleClicked",value:function(){var t=this.p5.mouseX,e=this.p5.mouseY;this.p5.int(this.p5.dist(this.x,this.y,t,e))<this.r&&(this.connecting=!0)}},{key:"edgeIntersects",value:function(t){return this.p5.dist(this.x,this.y,t.x,t.y)<this.r+t.r?(this.intersecting=!0,!0):(this.intersecting=!1,!1)}},{key:"update",value:function(){var t=this.p5.mouseX,e=this.p5.mouseY;this.dragging&&(this.x=t+this.offsetX,this.y=e+this.offsetY)}},{key:"showTransitions",value:function(){this.transitions.forEach((function(t){t.show()}))}},{key:"connect",value:function(){var t=this.p5.mouseX,e=this.p5.mouseY;if(this.p5.strokeWeight(2),this.p5.stroke("#f18701"),this.connecting){var a=this.p5.createVector(this.x,this.y),n=this.p5.createVector(t-a.x,e-a.y);this.transitions.length&&this.showTransitions(),this.drawArrow(a,n,"#f18701",!0,!1)}else this.connected&&this.showTransitions()}},{key:"drawArrow",value:function(t,e,a,n,i){this.p5.push(),this.p5.stroke(a),this.p5.strokeWeight(2),this.p5.fill(a),this.p5.translate(t.x,t.y),i&&e.setMag(e.mag()-this.r),this.p5.line(0,0,e.x,e.y);n&&this.p5.rotate(e.heading()),this.p5.translate(e.mag()-10,0),this.p5.triangle(0,5,0,-5,10,0),this.p5.pop()}},{key:"show",value:function(){if(this.p5.strokeWeight(2),this.p5.stroke(0),this.p5.fill(255),this.rollover||this.dragging?this.p5.stroke("#f18701"):x.showSettings&&this.p5.stroke("#00916e"),this.stateType===j)this.p5.circle(this.x,this.y,2*this.r);else if(this.stateType===O)this.p5.circle(this.x,this.y,2*this.r),this.p5.circle(this.x,this.y,1.7*this.r);else if(this.stateType===k){this.p5.circle(this.x,this.y,2*this.r);var t=this.p5.createVector(this.x-3*this.r,this.y),e=this.p5.createVector(this.x-this.r-t.x,this.y-t.y);this.rollover||this.dragging?this.drawArrow(t,e,"#f18701",!1,!1):x.showSettings?this.drawArrow(t,e,"#00916e",!1,!1):this.drawArrow(t,e,0,!1,!1)}this.p5.textSize(.7*this.r),this.p5.textAlign(this.p5.CENTER,this.p5.CENTER),this.p5.noStroke(),this.rollover||this.dragging?this.p5.fill("#f18701"):x.showSettings?this.p5.fill("#00916e"):this.p5.fill(0),this.p5.text(this.name,this.x,this.y)}},{key:"getTopState",value:function(t){for(var e=[],a=0;a<t.length;a++)this.edgeIntersects(t[a])&&(e.push(a),e.push(this.index));return this.p5.max(e)}},{key:"pressed",value:function(t){var e=this;if(!x.showSettings)if(this.p5.mouseButton===this.p5.RIGHT){var a=this.p5.mouseX,n=this.p5.mouseY;if(this.p5.int(this.p5.dist(this.x,this.y,a,n))<this.r){var i=this.getTopState(t);x.showSettings=!0,i!==Number.NEGATIVE_INFINITY&&t[i].rollover?x.selectedState=t[i]:x.selectedState=this}else x.showSettings=!1,x.selectedState=null}else{x.showSettings=!1,x.selectedState=null;var s=this.p5.mouseX,r=this.p5.mouseY,l=this.p5.int(this.p5.dist(this.x,this.y,s,r));if(!this.dragging&&l<this.r){var o=this.getTopState(t);o!==Number.NEGATIVE_INFINITY&&t[o].rollover?(t[o].offsetX=t[o].x-s,t[o].offsetY=t[o].y-r,t[o].dragging=!0):(this.offsetX=this.x-s,this.offsetY=this.y-r,this.dragging=!0)}if(this.connecting)for(var c=function(a){var n=t[a];(l=e.p5.int(e.p5.dist(n.x,n.y,s,r)))<n.r?(0===e.fromTo.filter((function(t){return t.from===e.index&&t.to===n.index})).length&&(e.index===n.index?e.transitions.push(new w(e.p5,e.transitions.length,e,e,"#454ade","\u03b5",S)):e.transitions.push(new w(e.p5,e.transitions.length,e,n,"#454ade","\u03b5",S)),e.fromTo.push({from:e.index,to:n.index}),e.connected=!0),e.connecting=!1):e.connecting=!1},h=0;h<t.length;h++)c(h)}}},{key:"released",value:function(){this.dragging&&(this.dragging=!1)}}]),t}(),C=a(90),N=a(87),V=a(61),I=a(58),P=a(91),M=a(88),R=a(53),W=a(55),z=function(t){Object(h.a)(a,t);var e=Object(c.a)(a);function a(){var t;return Object(l.a)(this,a),(t=e.call(this)).changeLineType=t.changeLineType.bind(Object(d.a)(t)),t.changeValue=t.changeValue.bind(Object(d.a)(t)),t.deleteTransition=t.deleteTransition.bind(Object(d.a)(t)),t}return Object(o.a)(a,[{key:"changeLineType",value:function(t,e){x.selectedState.transitions[e].lineType=t===b?b:S,this.setState({})}},{key:"changeValue",value:function(t,e){0===t.length?x.selectedState.transitions[e].value="\u03b5":x.selectedState.transitions[e].value=t}},{key:"deleteTransition",value:function(t,e){var a=t.transitions.filter((function(t){return t.index===e})),n=t.transitions.indexOf(a[0]);t.transitions.splice(n,1),t.fromTo.splice(n,1),this.setState({})}},{key:"render",value:function(){var t=this;return i.a.createElement(C.a.Dialog,{style:{zIndex:9999}},i.a.createElement(C.a.Header,{className:"px-0"},i.a.createElement(y.a,null,i.a.createElement(N.a,null,i.a.createElement(V.a,{className:"text-left"},i.a.createElement(C.a.Title,null,this.props.title)),i.a.createElement(V.a,{className:"text-right"},i.a.createElement(I.a,{variant:"danger",onClick:function(){t.props.deleteState(x.selectedState.index)}},"Delete State"))))),i.a.createElement(C.a.Body,null,i.a.createElement(y.a,{fluid:!0},x.selectedState.transitions.length?i.a.createElement("div",null,i.a.createElement(N.a,null,i.a.createElement("h5",{className:"pb-2"},"Transitions")),i.a.createElement(N.a,null,i.a.createElement(V.a,{className:"text-left"},i.a.createElement("h6",null,"Description")),i.a.createElement(V.a,{className:"text-left"},i.a.createElement("h6",null,"Value")),i.a.createElement(V.a,{className:"text-left"},i.a.createElement("h6",null,"Line Type"))),x.selectedState.transitions.map((function(e){return i.a.createElement(N.a,{className:"mb-3",key:e.index},i.a.createElement(V.a,{className:"text-left my-auto"},i.a.createElement("h6",{className:"my-auto"},e.from.name+" to "+e.to.name)),i.a.createElement(V.a,{className:"text-left"},i.a.createElement(N.a,null,i.a.createElement(V.a,null,i.a.createElement(P.a.Control,{defaultValue:e.value,placeholder:"Value","aria-label":"Value","aria-describedby":"transition-value",onChange:function(a){t.changeValue(a.target.value,e.index)}})))),e.from.index===e.to.index?i.a.createElement(V.a,{className:"text-left"},i.a.createElement(N.a,null,i.a.createElement(V.a,{lg:"6"}),i.a.createElement(V.a,{lg:"6",className:"text-right"},i.a.createElement(I.a,{variant:"danger",onClick:function(){t.deleteTransition(x.selectedState,e.index)}},i.a.createElement(R.a,{icon:W.a}))))):i.a.createElement(V.a,{className:"text-left"},i.a.createElement(N.a,null,i.a.createElement(V.a,{lg:"6"},i.a.createElement(M.a,{variant:"dark",id:"line-type-dropdown",title:e.lineType},i.a.createElement(f.a.Item,{as:"button"},i.a.createElement("div",{onClick:function(a){t.changeLineType(a.target.textContent,e.index)}},"Curve")),i.a.createElement(f.a.Item,{as:"button"},i.a.createElement("div",{onClick:function(a){t.changeLineType(a.target.textContent,e.index)}},"Line")))),i.a.createElement(V.a,{lg:"6",className:"text-right"},i.a.createElement(I.a,{variant:"danger",onClick:function(){t.deleteTransition(e.index)}},i.a.createElement(R.a,{icon:W.a}))))))}))):i.a.createElement(N.a,null,i.a.createElement("p",null,"No settings available. Please create transitions.")))),i.a.createElement(C.a.Footer,null,i.a.createElement(I.a,{variant:"danger",onClick:this.props.toggleSettings},"Close")))}}]),a}(n.Component),A=function(){var t=Object(g.a)(Array(26)).map((function(t,e){return String.fromCharCode(e+65)}));return t.concat(t.map((function(t){return t.toLowerCase()})))}(),L=function(t){Object(h.a)(a,t);var e=Object(c.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).setup=function(t){var e=t.createCanvas(t.windowWidth,t.windowHeight);e.parent("sketch-holder"),e.position(0,0),t.angleMode(t.DEGREES),n.setState({p5:t})},n.draw=function(t){t.background(255),n.state.states.forEach((function(e){e.setP5(t),e.connect(),e.over(),e.update(),e.show()}))},n.mousePressed=function(t){n.state.states.forEach((function(t){t.pressed(n.state.states)}))},n.mouseReleased=function(t){n.state.states.forEach((function(t){t.released()})),n.setState({showSettingsModal:x.showSettings})},n.doubleClicked=function(t){n.state.states.forEach((function(t){t.doubleClicked()}))},n.windowResized=function(t){t.resizeCanvas(t.windowWidth,t.windowHeight)},n.sketch=function(t){t.setup=function(){return n.setup(t)},t.draw=function(){return n.draw(t)},t.windowResized=function(){return n.windowResized(t)},t.mousePressed=function(){return n.mousePressed(t)},t.mouseReleased=function(){return n.mouseReleased(t)},t.doubleClicked=function(){return n.doubleClicked(t)}},n.state={states:[],numStates:0,p5:null,showSettingsModal:!1,deletedCount:0},n.newSketch=n.newSketch.bind(Object(d.a)(n)),n.addState=n.addState.bind(Object(d.a)(n)),n.setup=n.setup.bind(Object(d.a)(n)),n.draw=n.draw.bind(Object(d.a)(n)),n.mousePressed=n.mousePressed.bind(Object(d.a)(n)),n.mouseReleased=n.mouseReleased.bind(Object(d.a)(n)),n.doubleClicked=n.doubleClicked.bind(Object(d.a)(n)),n.toggleSettings=n.toggleSettings.bind(Object(d.a)(n)),n.deleteState=n.deleteState.bind(Object(d.a)(n)),n}return Object(o.a)(a,[{key:"newSketch",value:function(){this.setState({states:[],numStates:0})}},{key:"addState",value:function(t){var e=this.state.states,a=this.state.p5,n=new T(a,a.width/2,a.height/2,50,A[this.state.numStates],this.state.numStates-this.state.deletedCount,t);e.push(n),this.setState({numStates:this.state.numStates+1,states:e})}},{key:"componentDidMount",value:function(){new E.a(this.sketch)}},{key:"toggleSettings",value:function(){this.setState({showSettingsModal:!this.state.showSettingsModal}),x.showSettings=!1}},{key:"deleteState",value:function(t){var e=this.state.states,a=e.filter((function(e){return e.index===t}))[0],n=e.filter((function(e){return e.index!==t}));n.forEach((function(t){for(var e=0;e<t.fromTo.length;e++)if(t.fromTo[e].to===a.index){t.transitions.splice(e,1),t.fromTo.splice(e,1);break}}));for(var i=a.index;i<n.length;i++)n[i].index-=1;this.setState({states:n,showSettingsModal:!this.state.showSettingsModal,deletedCount:this.state.deletedCount+1}),x.showSettings=!1}},{key:"render",value:function(){var t=this,e="";return this.state.showSettingsModal&&(e=x.selectedState.stateType+" State "+x.selectedState.name),i.a.createElement("div",null,i.a.createElement(y.a,{id:"sketch-holder"}),this.state.showSettingsModal?i.a.createElement(z,{ref:function(e){return t.settings=e},title:e,toggleSettings:this.toggleSettings,deleteState:this.deleteState}):null)}}]),a}(i.a.Component),F=a(94),H=a(89);function Y(){return(Y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}).apply(this,arguments)}function X(t,e){if(null==t)return{};var a,n,i=function(t,e){if(null==t)return{};var a,n,i={},s=Object.keys(t);for(n=0;n<s.length;n++)a=s[n],e.indexOf(a)>=0||(i[a]=t[a]);return i}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(n=0;n<s.length;n++)a=s[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}var B=i.a.createElement("g",{id:"State",transform:"translate(-397 -263)"},i.a.createElement("g",{id:"Ellipse_1","data-name":"Ellipse 1",transform:"translate(397 263)",fill:"none",stroke:"#000",strokeWidth:3},i.a.createElement("circle",{cx:68.5,cy:68.5,r:68.5,stroke:"none"}),i.a.createElement("circle",{cx:68.5,cy:68.5,r:67,fill:"none"})),i.a.createElement("text",{id:"S",transform:"translate(449 350)",fontSize:50,fontFamily:"HelveticaNeue, Helvetica Neue"},i.a.createElement("tspan",{x:0,y:0},"S"))),_=function(t){var e=t.svgRef,a=t.title,n=X(t,["svgRef","title"]);return i.a.createElement("svg",Y({viewBox:"0 0 137 137",ref:e},n),a?i.a.createElement("title",null,a):null,B)},D=i.a.forwardRef((function(t,e){return i.a.createElement(_,Y({svgRef:e},t))}));a.p;function G(){return(G=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}).apply(this,arguments)}function J(t,e){if(null==t)return{};var a,n,i=function(t,e){if(null==t)return{};var a,n,i={},s=Object.keys(t);for(n=0;n<s.length;n++)a=s[n],e.indexOf(a)>=0||(i[a]=t[a]);return i}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(n=0;n<s.length;n++)a=s[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}var Z=i.a.createElement("g",{id:"Initial_State","data-name":"Initial State",transform:"translate(-299 -508)"},i.a.createElement("g",{id:"Ellipse_2","data-name":"Ellipse 2",transform:"translate(397 508)",fill:"none",stroke:"#000",strokeWidth:3},i.a.createElement("circle",{cx:68.5,cy:68.5,r:68.5,stroke:"none"}),i.a.createElement("circle",{cx:68.5,cy:68.5,r:67,fill:"none"})),i.a.createElement("text",{id:"S",transform:"translate(449 595)",fontSize:50,fontFamily:"HelveticaNeue, Helvetica Neue"},i.a.createElement("tspan",{x:0,y:0},"S")),i.a.createElement("path",{id:"arrow",d:"M61.037,36.553V51.678L97.66,34.433,61.037,17.23V32.484H0v4.069H61.037Z",transform:"translate(299 543)",fillRule:"evenodd"})),q=function(t){var e=t.svgRef,a=t.title,n=J(t,["svgRef","title"]);return i.a.createElement("svg",G({viewBox:"0 0 235 137",ref:e},n),a?i.a.createElement("title",null,a):null,Z)},K=i.a.forwardRef((function(t,e){return i.a.createElement(q,G({svgRef:e},t))}));a.p;function Q(){return(Q=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}).apply(this,arguments)}function U(t,e){if(null==t)return{};var a,n,i=function(t,e){if(null==t)return{};var a,n,i={},s=Object.keys(t);for(n=0;n<s.length;n++)a=s[n],e.indexOf(a)>=0||(i[a]=t[a]);return i}(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(n=0;n<s.length;n++)a=s[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}var $=i.a.createElement("g",{id:"Final_State","data-name":"Final State",transform:"translate(-780 -263)"},i.a.createElement("g",{id:"Ellipse_3","data-name":"Ellipse 3",transform:"translate(780 263)",fill:"none",stroke:"#000",strokeWidth:3},i.a.createElement("circle",{cx:68.5,cy:68.5,r:68.5,stroke:"none"}),i.a.createElement("circle",{cx:68.5,cy:68.5,r:67,fill:"none"})),i.a.createElement("text",{id:"S",transform:"translate(832 350)",fontSize:50,fontFamily:"HelveticaNeue, Helvetica Neue"},i.a.createElement("tspan",{x:0,y:0},"S")),i.a.createElement("g",{id:"Ellipse_4","data-name":"Ellipse 4",transform:"translate(790 273)",fill:"none",stroke:"#000",strokeWidth:3},i.a.createElement("circle",{cx:58.5,cy:58.5,r:58.5,stroke:"none"}),i.a.createElement("circle",{cx:58.5,cy:58.5,r:57,fill:"none"}))),tt=function(t){var e=t.svgRef,a=t.title,n=U(t,["svgRef","title"]);return i.a.createElement("svg",Q({viewBox:"0 0 137 137",ref:e},n),a?i.a.createElement("title",null,a):null,$)},et=i.a.forwardRef((function(t,e){return i.a.createElement(tt,Q({svgRef:e},t))})),at=(a.p,function(t){Object(h.a)(a,t);var e=Object(c.a)(a);function a(){return Object(l.a)(this,a),e.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var t=this;return i.a.createElement(F.a,{bg:"white",text:"dark"},i.a.createElement(H.a,{vertical:!0},i.a.createElement(I.a,{variant:"white",className:"pb-3 pt-3",onClick:function(){t.props.addState(k)}},i.a.createElement(K,null)),i.a.createElement(I.a,{variant:"white",className:"pb-3 pt-3",onClick:function(){t.props.addState(j)}},i.a.createElement(D,null)),i.a.createElement(I.a,{variant:"white",className:"pb-3 pt-3",onClick:function(){t.props.addState(O)}},i.a.createElement(et,null))))}}]),a}(i.a.Component)),nt=function(t){Object(h.a)(a,t);var e=Object(c.a)(a);function a(){return Object(l.a)(this,a),e.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var t=this;return i.a.createElement("div",null,i.a.createElement(L,{ref:function(e){t.sketch=e}}),i.a.createElement(y.a,{fluid:!0,style:{padding:0}},i.a.createElement(N.a,null,i.a.createElement(V.a,null,i.a.createElement(m,{newSketch:function(){t.sketch.newSketch()}})))),i.a.createElement(y.a,{fluid:!0},i.a.createElement(N.a,null,i.a.createElement(V.a,{sm:"1",style:{zIndex:999,position:"absolute",top:80}},i.a.createElement(at,{addState:function(e){t.sketch.addState(e)}})))))}}]),a}(i.a.Component);a(79),a(80);r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(nt,null)),document.getElementById("root"))}},[[67,1,2]]]);
//# sourceMappingURL=main.646122a1.chunk.js.map