/**
 * @fileOverview \u65e5\u5386\u547d\u540d\u7a7a\u95f4\u5165\u53e3
 * @ignore
 */define("bui/calendar",function(require){var e=require("bui/common"),t=e.namespace("Calendar");return e.mix(t,{Calendar:require("bui/calendar/calendar"),MonthPicker:require("bui/calendar/monthpicker"),DatePicker:require("bui/calendar/datepicker")}),t}),define("bui/calendar/monthpicker",function(require){function d(){return $.map(p,function(e,t){return{text:e,value:t}})}var e=require("bui/common"),t=e.Component,n=require("bui/overlay").Overlay,r=require("bui/list").SimpleList,i=require("bui/toolbar"),s=e.prefix,o="x-monthpicker-month",u="data-month",a="data-year",f="x-monthpicker-year",l="x-monthpicker-yearnav",c="x-monthpicker-selected",h="x-monthpicker-item",p=["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],v=r.extend({bindUI:function(){var e=this;e.get("el").delegate("a","click",function(e){e.preventDefault()}).delegate("."+o,"dblclick",function(){e.fire("dblclick")})}},{ATTRS:{itemTpl:{view:!0,value:'<li class="'+h+' x-monthpicker-month"><a href="#" hidefocus="on">{text}</a></li>'},itemCls:{value:h},items:{view:!0,value:d()},elCls:{view:!0,value:"x-monthpicker-months"}}},{xclass:"calendar-month-panel"}),m=r.extend({bindUI:function(){var e=this,t=e.get("el");t.delegate("a","click",function(e){e.preventDefault()}),t.delegate("."+f,"dblclick",function(){e.fire("dblclick")}),t.delegate(".x-icon","click",function(t){var n=$(t.currentTarget);n.hasClass(l+"-prev")?e._prevPage():n.hasClass(l+"-next")&&e._nextPage()}),e.on("itemselected",function(t){t.item&&e.setInternal("year",t.item.value)})},_prevPage:function(){var e=this,t=e.get("start"),n=e.get("yearCount");e.set("start",t-n)},_nextPage:function(){var e=this,t=e.get("start"),n=e.get("yearCount");e.set("start",t+n)},_uiSetStart:function(){var e=this;e._setYearsContent()},_uiSetYear:function(e){var t=this,n=t.findItemByField("value",e);n?t.setSelectedByField(e):t.set("start",e)},_setYearsContent:function(){var e=this,t=e.get("year"),n=e.get("start"),r=e.get("yearCount"),i=[];for(var s=n;s<n+r;s++){var o=s.toString();i.push({text:o,value:s})}e.set("items",i),e.setSelectedByField(t)}},{ATTRS:{items:{view:!0,value:[]},elCls:{view:!0,value:"x-monthpicker-years"},itemCls:{value:h},year:{},start:{value:(new Date).getFullYear()},yearCount:{value:10},itemTpl:{view:!0,value:'<li class="'+h+" "+f+'"><a href="#" hidefocus="on">{text}</a></li>'},tpl:{view:!0,value:'<div class="'+l+'">'+'<span class="'+l+'-prev x-icon x-icon-normal x-icon-small"><span class="icon icon-caret icon-caret-left"></span></span>'+'<span class="'+l+'-next x-icon x-icon-normal x-icon-small"><span class="icon icon-caret icon-caret-right"></span></span>'+"</div>"+"<ul></ul>"}}},{xclass:"calendar-year-panel"}),g=n.extend({initializer:function(){var e=this,t=e.get("children"),n=new v,r=new m,i=e._createFooter();t.push(n),t.push(r),t.push(i),e.set("yearPanel",r),e.set("monthPanel",n)},bindUI:function(){var e=this;e.get("monthPanel").on("itemselected",function(t){t.item&&e.setInternal("month",t.item.value)}).on("dblclick",function(){e._successCall()}),e.get("yearPanel").on("itemselected",function(t){t.item&&e.setInternal("year",t.item.value)}).on("dblclick",function(){e._successCall()})},_successCall:function(){var e=this,t=e.get("success");t&&t.call(e)},_createFooter:function(){var e=this;return new i.Bar({elCls:s+"clear x-monthpicker-footer",children:[{xclass:"bar-item-button",text:"\u786e\u5b9a",btnCls:"button button-small button-primary",handler:function(){e._successCall()}},{xclass:"bar-item-button",text:"\u53d6\u6d88",btnCls:"button button-small last",handler:function(){var t=e.get("cancel");t&&t.call(e)}}]})},_uiSetYear:function(e){this.get("yearPanel").set("year",e)},_uiSetMonth:function(e){this.get("monthPanel").setSelectedByField(e)}},{ATTRS:{footer:{},align:{value:{}},year:{},success:{value:function(){}},cancel:{value:function(){}},width:{value:180},month:{},yearPanel:{},monthPanel:{}}},{xclass:"monthpicker"});return g}),define("bui/calendar/header",function(require){var e=require("bui/common"),t=e.prefix,n=e.Component,r="year-text",i="month-text",s="x-datepicker-arrow",o="x-datepicker-prev",u="x-datepicker-next",a=n.Controller.extend({bindUI:function(){var e=this,t=e.get("el");t.delegate("."+s,"click",function(t){t.preventDefault();var n=$(t.currentTarget);n.hasClass(u)?e.nextMonth():n.hasClass(o)&&e.prevMonth()}),t.delegate(".x-datepicker-month","click",function(){e.fire("headerclick")})},setMonth:function(e,t){var n=this,r=n.get("year"),i=n.get("month");if(e!==r||t!==i)n.set("year",e),n.set("month",t),n.fire("monthchange",{year:e,month:t})},nextMonth:function(){var e=this,t=new Date(e.get("year"),e.get("month")+1);e.setMonth(t.getFullYear(),t.getMonth())},prevMonth:function(){var e=this,t=new Date(e.get("year"),e.get("month")-1);e.setMonth(t.getFullYear(),t.getMonth())},_uiSetYear:function(e){var t=this;t.get("el").find("."+r).text(e)},_uiSetMonth:function(e){var t=this;t.get("el").find("."+i).text(e+1)}},{ATTRS:{year:{sync:!1},month:{sync:!1,setter:function(e){this.set("monthText",e+1)}},monthText:{},tpl:{view:!0,value:'<div class="'+s+" "+o+'"><span class="icon icon-white icon-caret  icon-caret-left"></span></div>'+'<div class="x-datepicker-month">'+'<div class="month-text-container">'+'<span><span class="year-text">{year}</span>\u5e74 <span class="month-text">{monthText}</span>\u6708</span>'+'<span class="'+t+"caret "+t+'caret-down"></span>'+"</div>"+"</div>"+'<div class="'+s+" "+u+'"><span class="icon icon-white icon-caret  icon-caret-right"></span></div>'},elCls:{view:!0,value:"x-datepicker-header"},events:{value:{monthchange:!0}}}},{xclass:"calendar-header"});return a}),define("bui/calendar/panel",function(require){var e=require("bui/common"),t=e.Component,n=e.Date,r="x-datepicker-date",i="x-datepicker-today",s="x-datepicker-active",o="data-date",u="isoDate",a="x-datepicker-selected",f=6,l={deactive:"prevday",active:"active"},c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],h=t.View.extend({renderUI:function(){this.updatePanel()},updatePanel:function(){var e=this,t=e.get("el"),n=t.find("tbody"),r=e._getPanelInnerTpl();n.empty(),$(r).appendTo(n)},_getPanelInnerTpl:function(){var e=this,t=e._getFirstDate(),r=[];for(var i=0;i<f;i++){var s=n.addWeek(i,t);r.push(e._getWeekTpl(s))}return r.join("")},_getWeekTpl:function(t){var r=this,i=r.get("weekTpl"),s=[];for(var o=0;o<c.length;o++){var u=n.addDay(o,t);s.push(r._getDayTpl(u))}return e.substitute(i,{daysTpl:s.join("")})},_getDayTpl:function(t){var r=this,s=r.get("dayTpl"),o=t.getDay(),a=r._isToday(t)?i:"",f=c[o],h=t.getDate(),p=r._isCurrentMonth(t)?l.active:l.deactive;return e.substitute(s,{dayOfWeek:f,dateType:p,dateNumber:h,todayCls:a,date:n.format(t,u)})},_getFirstDate:function(e,t){var r=this,i=r._getMonthFirstDate(e,t),s=i.getDay();return n.addDay(s*-1,i)},_getMonthFirstDate:function(e,t){var n=this,e=e||n.get("year"),t=t||n.get("month");return new Date(e,t)},_isCurrentMonth:function(e){return e.getMonth()===this.get("month")},_isToday:function(e){var t=new Date;return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()},_clearSelectedDate:function(){var e=this;e.get("el").find("."+a).removeClass(a)},_findDateElement:function(e){var t=this,r=n.format(e,u),i=t.get("el").find("."+s),o=null;return r&&i.each(function(e,t){if($(t).attr("title")===r)return o=$(t),!1}),o},_setSelectedDate:function(e){var t=this,n=t._findDateElement(e);t._clearSelectedDate(),n&&n.addClass(a)}},{ATTRS:{}}),p=t.Controller.extend({initializer:function(){var e=this,t=new Date;e.get("year")||e.set("year",t.getFullYear()),e.get("month")||e.set("month",t.getMonth())},bindUI:function(){var e=this,t=e.get("el");t.delegate("."+r,"click",function(e){e.preventDefault()})},performActionInternal:function(e){var t=this,i=$(e.target).closest("."+r);if(i){var s=i.attr("title");s&&(s=n.parse(s),t.set("selected",s))}},setMonth:function(e,t){var n=this,r=n.get("year"),i=n.get("month");if(e!==r||t!==i)n.set("year",e),n.set("month",t),n.get("view").updatePanel()},_uiSetSelected:function(e,t){var r=this;t&&t.prevVal&&n.isDateEquals(e,t.prevVal)||(r.setMonth(e.getFullYear(),e.getMonth()),r.get("view")._setSelectedDate(e),r.fire("selectedchange",{date:e}))}},{ATTRS:{year:{view:!0},month:{view:!0},selected:{},focusable:{value:!0},dayTpl:{view:!0,value:'<td class="x-datepicker-date x-datepicker-{dateType} {todayCls} day-{dayOfWeek}" title="{date}"><a href="#" hidefocus="on" tabindex="1"><em><span>{dateNumber}</span></em></a></td>'},events:{value:{click:!1,selectedchange:!1}},weekTpl:{view:!0,value:"<tr>{daysTpl}</tr>"},tpl:{view:!0,value:'<table class="x-datepicker-inner" cellspacing="0"><thead><tr><th  title="Sunday"><span>\u65e5</span></th><th  title="Monday"><span>\u4e00</span></th><th  title="Tuesday"><span>\u4e8c</span></th><th  title="Wednesday"><span>\u4e09</span></th><th  title="Thursday"><span>\u56db</span></th><th  title="Friday"><span>\u4e94</span></th><th  title="Saturday"><span>\u516d</span></th></tr></thead><tbody class="x-datepicker-body"></tbody></table>'},xview:{value:h}}},{xclass:"calendar-panel",priority:0});return p}),define("bui/calendar/calendar",function(require){function d(){var e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function v(e){return e<10?"0"+e:e.toString()}function m(e){var t=[];for(var n=0;n<e;n++)t.push({text:v(n),value:v(n)});return t}function g(e,t){var n=e.get("el").find("."+t);return parseInt(n.val())}function y(t,n,r){var i=t.get("el").find("."+n);e.isNumber(r)&&(r=v(r)),i.val(r)}var e=require("bui/common"),t=e.prefix,n="x-datepicker-time",r="x-datepicker-hour",i="x-datepicker-minute",s="x-datepicker-second",o="x-timepicker",u=require("bui/list"),a=require("bui/calendar/monthpicker"),f=require("bui/calendar/header"),l=require("bui/calendar/panel"),c=require("bui/toolbar"),h=e.Component,p=e.Date,b=h.Controller.extend({initializer:function(){var e=this,t=e.get("children"),n=new f,r=new l,i=e.get("footer")||e._createFooter(),s=e.get("monthPicker")||e._createMonthPicker();t.push(n),t.push(r),t.push(i),t.push(s),e.set("header",n),e.set("panel",r),e.set("footer",i),e.set("monthPicker",s)},renderUI:function(){var e=this,t=e.get("children");if(e.get("showTime")){var n=e.get("timepicker")||e._initTimePicker();t.push(n),e.set("timepicker",n)}},bindUI:function(){var e=this,t=e.get("header"),n=e.get("panel");n.on("selectedchange",function(t){var n=t.date;p.isDateEquals(n,e.get("selectedDate"))||e.set("selectedDate",n)}),e.get("showTime")?e._initTimePickerEvent():n.on("click",function(){e.fire("accept")}),t.on("monthchange",function(t){e._setYearMonth(t.year,t.month)}),t.on("headerclick",function(){var n=e.get("monthPicker");n.set("year",t.get("year")),n.set("month",t.get("month")),n.show()})},_initTimePicker:function(){var e=this,t=new u.Picker({elCls:o,children:[{itemTpl:'<li><a href="#">{text}</a></li>'}],autoAlign:!1,align:{node:e.get("el"),points:["bl","bl"],offset:[0,-30]},trigger:e.get("el").find("."+n)});return t.render(),e._initTimePickerEvent(t),t},_initTimePickerEvent:function(e){var t=this,e=t.get("timepicker");if(!e)return;e.get("el").delegate("a","click",function(e){e.preventDefault()}),e.on("triggerchange",function(t){var n=t.curTrigger;n.hasClass(r)?e.get("list").set("items",m(24)):e.get("list").set("items",m(60))}),e.on("selectedchange",function(e){var n=e.curTrigger,s=e.value;n.hasClass(r)?t.setInternal("hour",s):n.hasClass(i)?t.setInternal("minute",s):t.setInternal("second",s)})},_setYearMonth:function(e,t){var n=this,r=n.get("selectedDate"),i=r.getDate();(e!==r.getFullYear()||t!==r.getMonth())&&n.set("selectedDate",new Date(e,t,i))},_createMonthPicker:function(){var e=this;return new a({effect:{effect:"slide",duration:300},visibleMode:"display",success:function(){var t=this;e._setYearMonth(t.get("year"),t.get("month")),t.hide()},cancel:function(){this.hide()}})},_createFooter:function(){var e=this,n=this.get("showTime"),r=[];return n?(r.push({content:e.get("timeTpl")}),r.push({xclass:"bar-item-button",text:"\u786e\u5b9a",btnCls:"button button-small button-primary",listeners:{click:function(){e.fire("accept")}}})):r.push({xclass:"bar-item-button",text:"\u4eca\u5929",btnCls:"button button-small",listeners:{click:function(){var t=d();e.set("selectedDate",t),e.fire("accept")}}}),new c.Bar({elCls:t+"calendar-footer",children:r})},_uiSetSelectedDate:function(e){var t=this,n=e.getFullYear(),r=e.getMonth();t.get("header").setMonth(n,r),t.get("panel").set("selected",e),t.fire("datechange",{date:e})},_uiSetHour:function(e){y(this,r,e)},_uiSetMinute:function(e){y(this,i,e)},_uiSetSecond:function(e){y(this,s,e)}},{ATTRS:{header:{},panel:{},monthPicker:{},timepicker:{},width:{value:180},events:{value:{click:!1,accept:!1,datechange:!1,monthchange:!1}},showTime:{value:!1},timeTpl:{value:'<input type="text" readonly class="'+n+" "+r+'" />:<input type="text" readonly class="'+n+" "+i+'" />:<input type="text" readonly class="'+n+" "+s+'" />'},selectedDate:{value:d()},hour:{value:(new Date).getHours()},minute:{value:(new Date).getMinutes()},second:{value:0}}},{xclass:"calendar",priority:0});return b}),define("bui/calendar/datepicker",function(require){var e=require("bui/common"),t=require("bui/overlay").Picker,n=require("bui/calendar/calendar"),r=e.Date,i=t.extend({initializer:function(){var e=this,t=e.get("children"),r=new n({showTime:e.get("showTime")});t.push(r),e.set("calendar",r)},setSelectedValue:function(e){var t=this,n=this.get("calendar"),i=r.parse(e);i=i||new Date((new Date).setSeconds(0)),n.set("selectedDate",r.getDate(i)),t.get("showTime")&&(n.set("hour",i.getHours()),n.set("minute",i.getMinutes()),n.set("second",i.getSeconds()))},getSelectedValue:function(){var e=this,t=e.get("calendar"),n=r.getDate(t.get("selectedDate"));return e.get("showTime")&&(n=r.addHour(t.get("hour"),n),n=r.addMinute(t.get("minute"),n),n=r.addSecond(t.get("second"),n)),n},getSelectedText:function(){return r.format(this.getSelectedValue(),this._getFormatType())},_getFormatType:function(){return this.get("showTime")?"yyyy-mm-dd HH:MM:ss":"yyyy-mm-dd"}},{ATTRS:{showTime:{value:!1},changeEvent:{value:"accept"},hideEvent:{value:"accept"},calendar:{}}},{xclass:"datepicker",priority:0});return i});