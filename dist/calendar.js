"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_createClass=function(){function n(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,a){return e&&n(t.prototype,e),a&&n(t,a),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var addClasses=function(e,t){t.trim().split(/\s*,\s*|\s+/).forEach(function(t){return e.classList.add(t)})},TYPES={EVENT:{CLICK:"click"}},Calendar=function(){function a(t){if(_classCallCheck(this,a),!t.target||"object"!==_typeof(t.target))throw new Error("Missing calendar container");if(t.days&&7!==t.days.length)throw new Error("Invalid days array");var e=new Date;this.date={grid:{day:null,month:e.getMonth(),year:e.getFullYear()},selected:{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}},this.dom={container:null,header:{container:null,date:null},grid:null,button:{next:null,prev:null},currentDay:null},this.options=Object.assign({},{clasess:{calendar:"bw-calendar",header:{container:"bw-calendar__header",date:"bw-calendar__header-date"},grid:{container:"bw-calendar__grid",header:"bw-calendar__grid-header",headerDay:"bw-calendar__grid-header-day",currentMonth:"bw-calendar__day--current-month",day:"bw-calendar__day",dayContent:"bw-calendar__day-content",currentDay:"bw-calendar__day--current"},button:{next:"bw-calendar__button bw-calendar__button--next",prev:"bw-calendar__button bw-calendar__button--prev"}},days:["Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"]},t),this.initialize()}return _createClass(a,[{key:"initialize",value:function(){this.createElements(),this.createGrid(),this.attachEvents(),this.render(),this.onLoad()}},{key:"createElements",value:function(){this.dom.container=document.createElement("div"),addClasses(this.dom.container,this.options.clasess.calendar),this.dom.header.container=document.createElement("div"),addClasses(this.dom.header.container,this.options.clasess.header.container),this.dom.header.date=document.createElement("span"),this.dom.header.date.classList.add(this.options.clasess.header.date),this.updateHeader(),this.dom.grid=document.createElement("div"),addClasses(this.dom.grid,this.options.clasess.grid.container),this.dom.button.next=document.createElement("div"),this.dom.button.next.innerHTML=">",addClasses(this.dom.button.next,this.options.clasess.button.next),this.dom.button.prev=document.createElement("div"),this.dom.button.prev.innerHTML="<",addClasses(this.dom.button.prev,this.options.clasess.button.prev),this.dom.header.container.appendChild(this.dom.header.date),this.dom.header.container.appendChild(this.dom.button.prev),this.dom.header.container.appendChild(this.dom.button.next),this.dom.container.appendChild(this.dom.header.container),this.dom.container.appendChild(this.dom.grid)}},{key:"createMatrix",value:function(){var t=new Date(this.date.grid.year,this.date.grid.month+1,0).getDate(),e=new Date(this.date.grid.year,this.date.grid.month).getDay(),a=new Date(this.date.grid.year,this.date.grid.month,0).getDate();e||(e=7);for(var n=[],r=e-1,i=r+t,d=i+(7*Math.ceil(i/7)-i),s=0;s<d;s++){var o=s-r+1,h=this.date.grid,c=h.month,l=h.year,u=!0;s<r?(o=a-r+s+1,l=11===(c=0===c?11:this.date.grid.month-1)?l-1:l,u=!1):i<=s&&(o=s+1-r-t,l=0===(c=11===c?0:this.date.grid.month+1)?l+1:l,u=!1),n.push({day:o,month:c,year:l,current:u})}return n}},{key:"createGrid",value:function(){var s=this,t=this.createMatrix();this.dom.grid.innerHTML="";var a=document.createElement("div");a.classList.add(this.options.clasess.grid.header),this.options.days.forEach(function(t){var e=document.createElement("div");e.classList.add(s.options.clasess.grid.headerDay),e.innerHTML=t,a.appendChild(e)}),this.dom.grid.appendChild(a),t.forEach(function(t){var e=t.day,a=t.month,n=t.year,r=t.current,i=document.createElement("div"),d=document.createElement("div");d.classList.add(s.options.clasess.grid.dayContent),d.dataset.day=e,d.dataset.month=a,d.dataset.year=n,d.innerHTML=e,i.classList.add(s.options.clasess.grid.day),i.appendChild(d),r&&i.classList.add(s.options.clasess.grid.currentMonth),e===s.date.selected.day&&a===s.date.selected.month&&n===s.date.selected.year&&s.setCurrentDayElement(i),s.dom.grid.appendChild(i)})}},{key:"updateHeader",value:function(){var t=this.options.months[this.date.grid.month];this.dom.header.date.innerHTML="<span>"+t+" "+this.date.grid.year+"</span>"}},{key:"setCurrentDayElement",value:function(t){var e=this.options.clasess.grid.currentDay;this.dom.currentDay&&this.dom.currentDay.classList.remove(e),this.dom.currentDay=t,this.dom.currentDay.classList.add(e)}},{key:"onLoad",value:function(){var t=this.options.onLoad;console.log("%c# BlueWolf Calendar loaded! #","color: blue"),t&&"function"==typeof t&&t(this)}},{key:"onSelect",value:function(t,e){if(e.stopPropagation(),e.target&&e.target.classList.contains(this.options.clasess.grid.dayContent)){var a=e.target.dataset,n=a.day,r=a.month,i=a.year;this.date.selected={day:parseInt(n,10),month:parseInt(r,10),year:parseInt(i,10)},this.setCurrentDayElement(e.target.parentNode),t&&"function"==typeof t&&t(this)}}},{key:"prev",value:function(t){0!==this.date.grid.month?this.date.grid.month=this.date.grid.month-1:(this.date.grid.month=11,this.date.grid.year=this.date.grid.year-1),this.updateHeader(),this.createGrid(),t&&"function"==typeof t&&t(this)}},{key:"next",value:function(t){11!==this.date.grid.month?this.date.grid.month=this.date.grid.month+1:(this.date.grid.month=0,this.date.grid.year=this.date.grid.year+1),this.updateHeader(),this.createGrid(),t&&"function"==typeof t&&t(this)}},{key:"attachEvents",value:function(){this.dom.button.prev.addEventListener(TYPES.EVENT.CLICK,this.prev.bind(this,this.options.onGridChange)),this.dom.button.next.addEventListener(TYPES.EVENT.CLICK,this.next.bind(this,this.options.onGridChange)),this.dom.grid.addEventListener(TYPES.EVENT.CLICK,this.onSelect.bind(this,this.options.onSelect))}},{key:"render",value:function(){this.options.target.appendChild(this.dom.container)}}]),a}();