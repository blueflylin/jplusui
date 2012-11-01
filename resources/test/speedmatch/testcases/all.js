﻿

var options = {
	html: 'demo.html',
	time: 1000
};

var framewroks = {
	'jQuery': {
		js: '../../../libs/jquery/assets/scripts/jquery.js',
		init:  function(window){
			window.el = window.$("#header");
			window.fn = fn;
		}
	},
	'mootools': {
		js: '../../../libs/mootools/assets/scripts/mootools.js',
		init:  function(window){
			window.el = window.$("header");
			window.fn = fn;
		}
	},
	'jplus': {
		js: [
			'../../../system/core/assets/scripts/base.js',
			'../../../system/dom/assets/scripts/base.js'
		],
		init:  function(window){
			window.el = window.Dom.get("header");
			window.fn = fn;
		}
	}
};

var cases = {
	'文档载入': '-',
	'加载时运行':{
		jplus: 'Dom.ready(fn)',
		mootools: 'document.addEvent("domready", fn)',
		jQuery: '$(document).ready(fn)'
	},
	'节点': '-',
	'获取一个节点':{
		jplus: 'Dom.query("#header")',
		jQuery: '$("#header")',
		mootools: '$("#header")'
	},
	'事件 - 添加':{
		jplus: 'el.on("click", function(e){})',
		mootools: 'el.addEvent("click", function(e){})',
		jQuery: 'el.click(function(e){})'
	},
	'事件 - 触发':{
		jplus: 'el.trigger("click")',
		mootools: 'el.fireEvent("click")',
		jQuery: 'el.click()'
	},
	'事件 - 删除':{
		jplus: 'el.un("click")',
		mootools: 'el.removeEvent("click")',
		jQuery: 'el.unbind("click")'
	},
	'事件 - 单一':{
		jplus: 'el.once("click", function(e){})',
		mootools: '-',
		jQuery: 'el.one("click", function(e){})'
	},
	'属性 - 获取':{
		jplus: 'el.getAttr("name")',
		mootools: 'el.getProperty("name")',
		jQuery: 'el.attr("name")'
	},
	'属性 - 设置':{
		jplus: 'el.setAttr("name", "1")',
		mootools: 'el.setProperty("name", "1")',
		jQuery: 'el.attr("name", "1")'
	},
	'样式 - 取得':{
		jplus: 'el.getStyle("background-color")',
		mootools: 'el.getStyle("background-color")',
		jQuery: 'el.css("background-color")'
	},
	'样式 - 设置':{
		jplus: 'el.setStyle("background-color", "green")',
		mootools: 'el.setStyle("background-color", "green")',
		jQuery: 'el.css("background-color", "green")'
	},
	'文本 - 取得': {
		jplus: 'el.getText()',
		mootools: 'el.get("text")',
		jQuery: 'el.text()'
	},
	'文本 - 设置': {
		jplus: 'el.setText("green")',
		mootools: 'el.set("text", "green")',
		jQuery: 'el.text("green")'
	},
	'类名 - 添加':{
		jplus: 'el.addClass("g")',
		mootools: 'el.addClass("g")',
		jQuery: 'el.addClass("g")'
	},
	'类名 - 删除类':{
		jplus: 'el.removeClass("g")',
		mootools: 'el.removeClass("g")',
		jQuery: 'el.removeClass("g")'
	},
	'类名 - 切换': {
		jplus: 'el.toggleClass("g")',
		mootools: 'el.toggleClass("g")',
		jQuery: 'el.toggleClass("g")'
	},
	'节点 - 插入':{
		jplus: 'el.append("<br>")',
		mootools: 'new Element("<br>").inject(el)',
		jQuery: 'el.append("<br>")'
	},
	'位置 - 计算':{
		jplus: 'el.getPosition()',
		mootools: 'el.getPosition()',
		jQuery: 'el.position()'
	},
	'位置 - 设置':{
		jplus: 'el.setPosition(3,4)',
		mootools: '-',
		jQuery: 'el.position(3,4)'
	},
	'工具函数': '-',
	'Object - 拷贝': {
		jplus: 'Object.extend({a:1}, {b:2})',
		mootools: 'Object.append({a:1}, {b:2})',
		jQuery: '$.extend({a:1}, {b:2})'
	},
	'Object - 遍历':{
		jplus: 'Object.each({a:1}, fn)',
		mootools: 'Object.each({a:1}, fn)',
		jQuery: '$.each({a:1}, function(i, n){fn(n)})'
	},
	'Object - 无成员判断':{
		jplus: '-',
		mootools: '-',
		jQuery: '$.isEmptyObject({})'
	},
	'Array - 遍历':{
		jplus: '[2,3].forEach(fn)',
		mootools: '[2,3].forEach(fn)',
		jQuery: '$.each([2,3], function(i, n){fn(n)})'
	},
	'Array - 数组判断':{
		jplus: 'Object.isArray([])',
		mootools: '-',
		jQuery: '$.isArray([])'
	},
	'Array - 生成':{
		jplus: 'Array.create([2,3])',
		mootools: 'Array.from([2,3])',
		jQuery: '$.makeArray([2,3])'
	},
	'Array - 过滤':{
		jplus: '[2,3].filter(function(v){return v > 2;})',
		mootools: '[2,3].filter(function(v){return v > 2;})',
		jQuery: '$.grep([2,3], function(v){return v > 2;})'
	},
	'Array - 匹配':{
		jplus: 'Object.map([2,3], function(v){return v * v;})',
		mootools: '[2,3].map(function(v){return v * v;})',
		jQuery: '$.map([2,3], function(v){return v * v;})'
	},
	'Array - 查找':{
		jplus: '[2,3].indexOf(3)',
		mootools: '[2,3].indexOf(3)',
		jQuery: '$.inArray(3, [2,3])'
	},
	'Array - 删除重复':{
		jplus: 'var a = new Array();a.push(2,3,2,4,5);a.unique()',
		mootools: '-',
		jQuery: '$.unique([2,3,2,4,5])'
	},
	'Function - 空':{
		jplus: 'Function.empty()',
		mootools: 'Function.from ()()',
		jQuery: '$.noop()'
	},
	'Function - 作用域绑定':{
		jplus: 'fn.bind(this)',
		mootools: 'Function.from().bind(this)',
		jQuery: '$.proxy(fn, this)'
	},
	'Function - 函数判断':{
		jplus: 'Object.isFunction(function(){})',
		mootools: 'typeOf(function(){}) == "function"',
		jQuery: '$.isFunction(function(){})'
	},
	'String - trim':{
		jplus: '" s ".trim()',
		mootools: '" s ".trim()',
		jQuery: '$.trim(" s ")'
	},
	'CSS 选择器': '-',
	'#id': {
		jplus: 'Dom.query("#id")',
		mootools: '$$("#id")',
		jQuery: '$("#id")'
	},
	'div': {
		jplus: 'Dom.query("div")',
		mootools: '$$("div")',
		jQuery: '$("div")'
	},
	'.class': {
		jplus: 'Dom.query(".class")',
		mootools: '$$(".class")',
		jQuery: '$(".class")'
	},
	'div.class': {
		jplus: 'Dom.query("div.class")',
		mootools: '$$("div.class")',
		jQuery: '$("div.class")'
	},
	'div#id.class': {
		jplus: 'Dom.query("div#id.class")',
		mootools: '$$("div#id.class")',
		jQuery: '$("div#id.class")'
	},
	'div > div': {
		jplus: 'Dom.query("div > div")',
		mootools: '$$("div > div")',
		jQuery: '$("div > div")'
	},
	'div:first-child': {
		jplus: 'Dom.query("div:first-child")',
		mootools: '$$("div:first-child")',
		jQuery: '$("div:first-child")'
	}

};




function fn(){

}


initSpeedMatch(framewroks, cases, options   );




