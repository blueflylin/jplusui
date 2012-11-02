/*********************************************************
 * This file is created by a tool at 2012/10/30 21:31
 *********************************************************
 * Contains: 
 *     Controls.Core.IToolTip
 *     System.Dom.Base
 *     Controls.Core.Base
 *     Controls.Core.ContainerControl
 *     Controls.Container.Panel
 *     System.Dom.Align
 *     Controls.Core.IDropDownOwner
 *     Controls.Core.IInput
 *     Controls.Form.Picker
 *     Controls.Core.ListControl
 *     Controls.Form.ComboBox
 *     Controls.Form.ListBox
 *     Controls.Suggest.Suggest
 *     System.Utils.Deferrable
 *     System.Fx.Base
 *     System.Fx.Tween
 *     System.Fx.Animate
 *     Controls.Core.ICollapsable
 *     Controls.Core.ContentControl
 *     Controls.Core.TreeControl
 *     Controls.Nav.TreeView
 *     System.Fx.Marquee
 *     Controls.Composite.Carousel
 *     Controls.Button.Button
 *     Controls.Button.MenuButton
 *     Controls.Button.SplitButton
 *     System.Ajax.Base
 *     System.Ajax.Script
 *     System.Ajax.Jsonp
 ********************************************************/


/*********************************************************
 * Controls.Core.IToolTip
 ********************************************************/
/**
	 */
/*********************************************************
 * System.Dom.Base
 ********************************************************/
/**
 * @author xuld
 */
 
 
// Core - 核心部分
// Parse - 节点解析部分
// Traversing - 节点转移部分
// Manipulation - 节点处理部分
// Style - CSS部分
// Attribute - 属性部分
// Event - 事件部分
// DomReady - 加载部分
// Dimension - 尺寸部分 
// Offset - 定位部分

(function(window) {
	
	assert(!window.Dom || window.$ !== window.Dom.get, "重复引入 System.Dom.Base 模块。");
	
	// 变量简写

	/**
	 * document 简写。
	 * @type Document
	 */
	var document = window.document,
	
		/**
		 * Object 简写。
		 * @type Object
		 */
		Object = window.Object,
	
		/**
		 * Object.extend 简写。
		 * @type Function
		 */
		extend = Object.extend,
	
		/**
		 * 数组原型。
		 * @type Object
		 */
		ap = Array.prototype,
	
		/**
		 * Object.map 缩写。
		 * @type Object
		 */
		map = Object.map,
	
		/**
		 * 指示当前浏览器是否为标签浏览器。
		 */
		isStd = navigator.isStd,
	
		// DOM 
	
		/**
		 * 提供对单一原生 HTML 节点的封装操作。
		 * @class
		 * @remark 
		 * @see DomList
		 * @see Dom.get
		 * @see Dom.query
		 * @remark
		 * 所有 DOM 方法都是依赖于此类进行的。比如如下 HTML 代码:
		 * <pre>
		 * &lt;div id="myDivId"&gt;内容&lt;/div&gt;
		 * </pre>
		 * 现在如果要操作这个节点，必须获取这个节点对应的 **Dom** 对象实例。
		 * 最常用的创建 **Dom** 对象实例的方法是 {@link Dom.get}。如:
		 * <pre>
		 * var myDiv = Dom.get("myDivId");
		 * 
		 * myDiv.addClass("cssClass");
		 * </pre>
		 * 其中，myDiv就是一个 **Dom** 对象。然后通过 **Dom** 对象提供的方法可以方便地操作这个节点。<br>
		 * myDiv.node 属性就是这个 Dom 对象对应的原生 HTML 节点。即:
		 * <pre>
		 * Dom.get("myDivId").node === document.getElementById("myDivId");
		 * </pre>
		 * 
		 * **Dom** 类仅实现了对一个节点的操作，如果需要同时处理多个节点，可以使用 {@link DomList} 类。
		 * 	{@link DomList} 类的方法和 **Dom** 类的方法基本一致。
		 */
		Dom = Class({
			
			/**
			 * 获取当 Dom 对象实际对应的 HTML 节点实例。
			 * @type Node
			 * @protected
			 */
			node: null,
			
			/**
			 * 获取当前类对应的数据字段。
			 * @protected override
			 * @return {Object} 一个可存储数据的对象。
			 * @remark
			 * 此函数会在原生节点上创建一个 $data 属性以存储数据。
			 */
			dataField: function(){
				
				// 将数据绑定在原生节点上。
				// 这在  IE 6/7 存在内存泄露问题。
				// 由于 IE 6/7 即将退出市场。此处忽略。
				return this.node.$data || (this.node.$data = {});
			},
		
			/**
			 * 使用一个原生节点初始化 Dom 对象的新实例。
			 * @param {Node} node 封装的元素。
			 */
			constructor: function(node) {
				assert.isNode(node, "Dom#constructor(node): {node} 必须是 DOM 节点。");
				this.node = node;

				/// TODO: clear
				this.dom = node;
				/// TODO: clear
			},
		
			/**
			 * 将当前 Dom 对象插入到指定父 Dom 对象指定位置。
			 * @param {Node} parentNode 要添加的父节点。
			 * @param {Node} refNode=null 如果指定了此值，则当前节点将添加到此节点之前。
			 * @protected virtual
			 */
			attach: function(parentNode, refNode) {
				assert(parentNode && parentNode.nodeType, 'Dom#attach(parentNode, refNode): {parentNode} 必须是 DOM 节点。', parentNode);
				assert(refNode === null || refNode.nodeType, 'Dom#attach(parentNode, refNode): {refNode} 必须是 null 或 DOM 节点 。', refNode);
				parentNode.insertBefore(this.node, refNode);
			},
		
			/**
			 * 将当前 Dom 对象从指定的父 Dom 对象移除。
			 * @param {Node} parentNode 用于移除的父节点。
			 * @protected virtual
			 */
			detach: function(parentNode) {
				assert(parentNode && parentNode.removeChild, 'Dom#detach(parentNode): {parentNode} 必须是 DOM 节点 Dom 对象。', parent);
				
				// 仅当是直接父节点时删除。
				if(this.node.parentNode === parentNode)
					parentNode.removeChild(this.node);
			},
		
			/**
			 * 在当前 Dom 对象下插入一个子 Dom 对象到指定位置。
			 * @param {Dom} childControl 要插入 Dom 对象。
			 * @param {Dom} refControl=null 如果指定了此值，则插入到 Dom 对象之前。
			 * @protected virtual
			 */
			insertBefore: function(childControl, refControl) {
				assert(childControl && childControl.attach, 'Dom#insertBefore(childControl, refControl): {childControl} 必须 Dom 对象。', childControl);
				childControl.attach(this.node, refControl && refControl.node || null);
				return childControl;
			},
		
			/**
			 * 删除当 Dom 对象的指定 Dom 对象。
			 * @param {Dom} childControl 要删除 Dom 对象。
			 * @protected virtual
			 */
			removeChild: function(childControl) {
				assert(childControl && childControl.detach, 'Dom#removeChild(childControl): {childControl} 必须 Dom 对象。', childControl);
				
				childControl.detach(this.node);
				return childControl;
			},
			
			/**
			 * 判断当前节点是否和指定节点相等。
			 * @param {Dom} childControl 要判断的节点。
			 * @return {Boolean} 如果节点相同，则返回 true，否则返回 false 。
			 */
			equals: function(childControl){
				return this.node === childControl || (childControl && this.node === childControl.node);
			}
			
		}),
	
		/**
		 * 表示原生节点的集合。用于批量操作节点。
		 * @class
		 * @extends Array
		 * @see Dom
		 * @see Dom.query
		 * @remark
		 * **DomList** 是对元素列表的包装。  **DomList** 允许快速操作多个节点。 
		 * {@link Dom} 的所有方法对 **DomList** 都有效。
		 * 要查询 DomList 的方法，可以转到 {@link Dom} 类。
		 * 
		 * **DomList** 是一个伪数组，每个元素都是一个原生的 HTML 节点。
		 */
		DomList = Class({
	
			/**
			 * 获取当前集合的节点个数。
			 * @type {Number}
			 * @property
			 */
			length: 0,

			/**
			 * 使用包含节点的数组初始化 DomList 类的新实例。
			 * @param {Array/DomList} [doms] 用于初始化当前集合的节点集合。
			 * @constructor
			 */
			constructor: function(doms) {
				if (doms) {
					var dom;
					
					// 将参数的 doms 拷贝到当前集合。
					while (dom = doms[this.length]) {
						this[this.length++] = Dom.getNode(dom);
					}
				}
			},
	
			/**
			 * 获取当前集合中指定索引对应的 Dom 对象。
			 * @param {Number} index 要获取的元素索引。如果 *index* 小于 0， 则表示获取倒数 *index* 位置的元素。
			 * @return {Object} 指定位置所在的元素。如果指定索引的值不存在，则返回 undefined。
			 * @remark
			 * 使用 arr.item(-1) 可获取最后一个元素的值。
			 * @see Array#see
			 * @example 
			 * <pre>
		     * [0, 1, 2, 3].item(0);  // 0
		     * [0, 1, 2, 3].item(-1); // 3
		     * [0, 1, 2, 3].item(5);  // undefined
		     * </pre>
			 */
			item: function(index){
				var elem = this[index < 0 ? this.length + index : index];
				return elem ? new Dom(elem) : null;
			},
			
			/**
			 * 对当前集合的每个节点的 Dom 封装调用其指定属性名的函数，并将返回值放入新的数组返回。
			 * @param {String} fnName 要调用的函数名。
			 * @param {Array} args=[] 调用时的参数数组。
			 * @return {Array} 返回包含执行结果的数组。
			 * @see Array#see
			 */
			invoke: function(fnName, args) {
				args = args || [];
				var r = [];
				assert(dp[fnName] && dp[fnName].apply, "DomList#invoke(fnName): {fnName} 不是 Dom 对象的方法。", fnName);
				this.forEach(function(value) {
					value = new Dom(value);
					r.push(value[fnName].apply(value, args));
				});
				return r;
			},
			
			///TODO: clear
			
			concat: function(){
				assert.deprected('DomList#concat 已过时，请改用 DomList#add');
				return this.add.apply(this, arguments);
			},
			
			///TODO: clear
			
			/**
			 * 将参数节点添加到当前集合。
			 * @param {Node/NodeList/Array/DomList} ... 要增加的节点。
			 * @return this
			 */
			add: function() {
				for (var args = arguments, i = 0, value; i < args.length; i++) {
					value = args[i], j = -1;
					if(value){
						if(typeof value.length !== 'number')
							value = [value];
							
						while(++j < value.length)
							this.include(Dom.getNode(value[j]));
					}
				}
	
				return this;
			},

			/**
			 * 使用指定的 CSS 选择器或函数过滤当前集合，并返回满足要求的元素的新 DomList 对象。
			 * @param {String/Function} expression 用于过滤的 CSS 选择器或自定义函数，具体格式参考 {@link Array#filter}。
			 * @return {DomList} 满足要求的元素的新 DomList 对象。
			 */
			filter: function(expression) {
				return new DomList(ap.filter.call(this, typeof expression === 'string' ? function(elem){
					return Dom.match(elem, expression);
				} : expression));
			},
			
			/**
			 * 为每个元素绑定事件。
			 * @remark 见 {@link JPlus.Base#on}
			 */
			on: createDomListMthod('on'),

			/**
			 * 为每个元素删除绑定事件。
			 * @remark 见 {@link JPlus.Base#un}
			 */
			un: createDomListMthod('un'),

			/**
			 * 触发每个元素事件。
			 * @remark 见 {@link JPlus.Base#trigger}
			 */
			trigger: function(type, e) {
				return this.invoke('trigger', [type, e]).indexOf(false) < 0;
			}
			
		}),
	
		/**
		 * 表示一个点。包含 x 坐标和 y 坐标。
		 * @class Point
		 */
		Point = Class({
			
			/**
			 * @field {Number} x X 坐标。
			 */
			
			/**
			 * @field {Number} y Y 坐标。
			 */
	
			/**
			 * 初始化 Point 的新实例。
			 * @param {Number} x X 坐标。
			 * @param {Number} y Y 坐标。
			 * @constructor
			 */
			constructor: function(x, y) {
				this.x = x;
				this.y = y;
			},
			
			/**
			 * 将当前值加上 *p*。
			 * @param {Point} p 值。
			 * @return {Point} this
			 */
			add: function(p) {
				assert(p && 'x' in p && 'y' in p, "Point#add(p): {p} 必须有 'x' 和 'y' 属性。", p);
				return new Point(this.x + p.x, this.y + p.y);
			},

			/**
			 * 将当前值减去 *p*。
			 * @param {Point} JPlus 值。
			 * @return {Point} this
			 */
			sub: function(p) {
				assert(p && 'x' in p && 'y' in p, "Point#sub(p): {p} 必须有 'x' 和 'y' 属性。", p);
				return new Point(this.x - p.x, this.y - p.y);
			}
		}),
		
		/**
		 * DOM 事件。
		 */
		DomEvent = Class({

			/**
			 * 构造函数。
			 * @param {Object} target 事件对象的目标。
			 * @param {String} type 事件对象的类型。
			 * @param {Object} [e] 事件对象的属性。
			 * @constructor
			 */
			constructor: function(target, type) {
				assert.notNull(target, "Dom.Event#constructor(target, type): {target} ~");

				this.target = target;
				this.type = type;
			},
			
			/**
			 * 阻止事件的冒泡。
			 * @remark 默认情况下，事件会向父元素冒泡。使用此函数阻止事件冒泡。
			 */
			stopPropagation: function() {
				this.cancelBubble = true;
			},
			
			/**
			 * 取消默认事件发生。
			 * @remark 有些事件会有默认行为，如点击链接之后执行跳转，使用此函数阻止这些默认行为。
			 */
			preventDefault: function() {
				this.returnValue = false;
			},
			
			/// TODO: clear
			
			/**
			 * 停止默认事件和冒泡。
			 * @remark 此函数可以完全撤销事件。 事件处理函数中 return false 和调用 stop() 是不同的， return
			 *         false 只会阻止当前事件其它函数执行， 而 stop() 只阻止事件冒泡和默认事件，不阻止当前事件其它函数。
			 */
			stop: function() {
				assert.deprected('Dom.Event#stop() 已过时，请改用 return false 实现阻止事件。');
				this.stopPropagation();
				this.preventDefault();
			},
			
			/// TODO: clear
			
			/**
			 * 获取当前发生事件 Dom 对象。
			 * @return {Dom} 发生事件 Dom 对象。
			 */
			getTarget: function() {
				return new Dom(this.orignalType && this.currentTarget || (this.target.nodeType === 3 ? this.target.parentNode: this.target));
			}
		}),
		
		// 系统使用的变量
		
		/**
		 * Dom.prototype
		 */
		dp = Dom.prototype,
		
		/**
		 * DomEvent.prototype
		 */
		ep = DomEvent.prototype,
		
		/**
		 * 一个返回 true 的函数。
		 */
		returnTrue = Function.from(true),

		/**
		 * 用于测试的元素。
		 * @type Element
		 */
		div = document.createElement('DIV'),
	
		/**
		 * 函数 Dom.parseNode使用的新元素缓存。
		 * @type Object
		 */
		cache = {},
		
		/**
		 * 默认事件。
		 * @type Object
		 */
		defaultEvent = {
			
			/**
			 * 阻止事件的函数。 
			 * @param {Event} e 事件参数。
			 */
			stopEvent: function(e){
				e.stopPropagation();
				e.preventDefault();
			},

			/**
			 * 发送处理指定的事件。
			 * @param {Dom} dom 事件所有者。
			 * @param {Event} eventName 事件名。
			 * @param {Function} eventListener 事件监听器。
			 * @return {Event} e 事件参数。
			 */
			dispatch: function (dom, eventName, eventListener, e) {
				dom = dom.node;
				
				var event = e;
				
				if(!e || !e.type){
					e = new Dom.Event(dom, eventName);
					
					if(event) {
						
						// IE 8- 在处理原生事件时肯能出现错误。
						try{
							extend(e, event);
						}catch(ex){
							
						}
						
					}
				}

				return eventListener(e) && (!dom[eventName = 'on' + eventName] || dom[eventName](e) !== false);
			},

			/**
			 * 添加绑定事件。
			 * @param {Dom} ctrl 事件所有者。
			 * @param {String} type 类型。
			 * @param {Function} fn 函数。
			 */
			add: div.addEventListener ? function (dom, type, fn) {
				dom.node.addEventListener(type, fn, false);
			} : function (dom, type, fn) {
				dom.node.attachEvent('on' + type, fn);
			},

			/**
			 * 删除事件。
			 * @param {Object} elem 对象。
			 * @param {String} type 类型。
			 * @param {Function} fn 函数。
			 */
			remove: div.removeEventListener ? function (dom, type, fn) {
				dom.node.removeEventListener(type, fn, false);
			} : function (dom, type, fn) {
				dom.node.detachEvent('on' + type, fn);
			}

		},
		
		/**
		 * 鼠标事件。 
		 * @type Object
		 */
		mouseEvent = defaultEvent,
		
		/**
		 * 键盘事件。 
		 * @type Object
		 */
		keyEvent = defaultEvent,
		
		// 正则

		/**
		 * 处理 <div/> 格式标签的正则表达式。
		 * @type RegExp
		 */
		rXhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		
		/// #if CompactMode
		
		/**
		 * 透明度的正则表达式。
		 * @type RegExp IE8 使用滤镜支持透明度，这个表达式用于获取滤镜内的表示透明度部分的子字符串。
		 */
		rOpacity = /opacity=([^)]*)/,
		
		/// #endif
		
		/**
		 * 是否属性的正则表达式。
		 * @type RegExp
		 */
		rStyle = /-(\w)|float/g,
		
		/**
		 * 判断 body 节点的正则表达式。
		 * @type RegExp
		 */
		rBody = /^(?:BODY|HTML|#document)$/i,

		/**
		 * 判断选择框的正则表达式。
		 * @type RegExp
		 */
		rCheckBox = /^(?:checkbox|radio)$/,
		
		// attr
		
		/**
		 * 默认用于获取和设置属性的函数。
		 */
		defaultHook = {
			getProp: function(elem, name) {
				return name in elem ? elem[name] : null;
			},
			setProp: function(elem, name, value) {
				if ('238'.indexOf(elem.nodeType) === -1){
					elem[name] = value;
				}
			},
			
			get: function(elem, name) {
				return elem.getAttribute ? elem.getAttribute(name) : this.getProp(elem, name);
			},
			set: function(elem, name, value) {
				if (elem.setAttribute) {

					// 如果设置值为 null, 表示删除属性。
					if (value === null) {
						elem.removeAttribute(name);
					} else {
						elem.setAttribute(name, value);
					}
				} else {
					this.setProp(elem, name, value);
				}
			}
		},
		
		/**
		 * 获取和设置优先使用 prop 而不是 attr 的特殊属性的函数。
		 */
		propHook = {
			get: function(elem, name, type) {
				return type || !(name in elem) ? defaultHook.get(elem, name) : elem[name];
			},
			set: function(elem, name, value) {
				if (name in elem) {
					elem[name] = value;
				} else {
					defaultHook.set(elem, name, value);
				}
			}
		},

		/**
		 * 获取和设置返回类型是 boolean 的特殊属性的函数。
		 */
		boolHook = {
		    get: function (elem, name, type) {
		        var value = name in elem ? elem[name] : defaultHook.get(elem, name);
			    return type ? value ? name.toLowerCase() : null : !!value;
			},
			set: function(elem, name, value) {
				elem[name] = value;
			}
		},
		
		/**
		 * 获取和设置 FORM 专有属性的函数。
		 */
		formHook = {
			get: function(elem, name, type){
				var value = defaultHook.get(elem, name);
				if(!type && !value) {
					
					// elem[name] 被覆盖成 DOM 节点，创建空的 FORM 获取默认值。
					if(elem[name].nodeType){
						elem = Dom.createNode('form');
					}
					value = elem[name];
				}
				return value;
			},	
			set: defaultHook.set
		},
		
		// 修复用的 JSON 对象
		
		/**
		 * 在 Dom.parseNode 和 setHtml 中对 HTML 字符串进行包装用的字符串。
		 * @type Object 部分元素只能属于特定父元素， parseFix 列出这些元素，并使它们正确地添加到父元素中。 IE678
		 *       会忽视第一个标签，所以额外添加一个 div 标签，以保证此类浏览器正常运行。
		 */
		parseFix = {
			$default: isStd ? [1, '', '']: [2, '$<div>', '</div>'],
			option: [2, '<select multiple="multiple">', '</select>'],
			legend: [2, '<fieldset>', '</fieldset>'],
			thead: [2, '<table>', '</table>'],
			tr: [3, '<table><tbody>', '</tbody></table>'],
			td: [4, '<table><tbody><tr>', '</tr></tbody></table>'],
			col: [3, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
			area: [2, '<map>', '</map>']
		},
		
		/**
		 * 特殊属性的设置方式。
		 */
		styleFix = {
			height: function(value) {
				this.node.style.height = value > 0 ? value + 'px' : value <= 0 ? '0px' : value;
				return this;
			},
			width: function(value) {
				this.node.style.width = value > 0 ? value + 'px' : value <= 0 ? '0px' : value;
				return this;
			}
		},
		
		/**
		 * 别名属性的列表。
		 * @type Object
		 */
		propFix = {
			innerText: 'innerText' in div ? 'innerText' : 'textContent'
		},
		
		/**
		 * 特殊属性的列表。
		 * @type Object
		 */
		attrFix = {

			maxLength: {
				get: propHook.get,
				set: function(elem, name, value) {
					if (value || value === 0) {
						elem[name] = value;
					} else {
						defaultHook.set(elem, name, null);
					}
				}
			},

			selected: {
				get: function(elem, name, type) {

					// Webkit、IE 误报 Selected 属性。
					// 通过调用 parentNode 属性修复。
					var parent = elem.parentNode;
					
					// 激活 select, 更新 option 的 select 状态。
					if (parent) {
						parent.selectedIndex;
						
						// 同理，处理 optgroup 
						if (parent.parentNode) {
							parent.parentNode.selectedIndex;
						}
					}
					
					// type  0 => boolean , 1 => "selected",  2 => defaultSelected => "selected"
					return name in elem ? type ? (type === 1 ? elem[name] : elem.defaultSelected) ? name : null : elem[name] : defaultHook.get(elem, name);
					
				},
				set : boolHook.set
			},
			
			checked: {
				get: function(elem, name, type) {
					// type  0 => boolean , 1 => "checked",  2 => defaultChecked => "checked"
					return name in elem ? type ? (type === 1 ? elem[name] : elem.defaultChecked) ? name : null : elem[name] : defaultHook.get(elem, name);
				},
				set: boolHook.set
			},
			
			value: {
				get: function(elem, name, type) {
					// type  0/1 => "value",  2 => defaultValue => "value"
					return name in elem ? type !== 2 ? elem[name] : elem.defaultValue : defaultHook.get(elem, name);
				},
				set: propHook.set
			},

			tabIndex: {
				get: function(elem, name, type) {
					// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					var value = elem.getAttributeNode(name);
					value = value && value.specified && value.value || null;
					return type ? value : +value;
				},
				set: propHook.set
			}

		},
		
		/**
		 * 字符串字段。
		 * @type Object
		 */
		textFix = {},
		
		/// #if CompactMode
		 
		/**
		 * 获取元素的实际的样式属性。
		 * @param {Element} elem 需要获取属性的节点。
		 * @param {String} name 需要获取的CSS属性名字。
		 * @return {String} 返回样式字符串，肯能是 undefined、 auto 或空字符串。
		 */
		getStyle = window.getComputedStyle ? function(elem, name) {
	
			// getComputedStyle为标准浏览器获取样式。
			assert.isElement(elem, "Dom.getStyle(elem, name): {elem} ~");
	
			// 获取真实的样式owerDocument返回elem所属的文档对象
			// 调用getComputeStyle的方式为(elem,null)
			var computedStyle = elem.ownerDocument.defaultView.getComputedStyle(elem, null);
	
			// 返回 , 在 火狐如果存在 IFrame， 则 computedStyle == null
			// http://drupal.org/node/182569
			return computedStyle ? computedStyle[name]: null;
	
		}: function(elem, name) {
	
			assert.isElement(elem, "Dom.getStyle(elem, name): {elem} ~");
	
			// 特殊样式保存在 styleFix 。
			if( name in styleFix) {
				switch (name) {
					case 'height':
						return elem.offsetHeight === 0 ? 'auto': elem.offsetHeight -  Dom.calc(elem, 'by+py') + 'px';
					case 'width':
						return elem.offsetWidth === 0 ? 'auto': elem.offsetWidth -  Dom.calc(elem, 'bx+px') + 'px';
					case 'opacity':
						return rOpacity.test(styleString(elem, 'filter')) ? parseInt(RegExp.$1) / 100 + '': '1';
				}
			}
			// currentStyle：IE的样式获取方法,runtimeStyle是获取运行时期的样式。
			// currentStyle是运行时期样式与style属性覆盖之后的样式
			var r = elem.currentStyle;
	
			if(!r)
				return "";
			r = r[name];
	
			// 来自 jQuery
			// 如果返回值不是一个带px的 数字。 转换为像素单位
			if(/^-?\d/.test(r) && !/^-?\d+(?:px)?$/i.test(r)) {
	
				// 保存初始值
				var style = elem.style, left = style.left, rsLeft = elem.runtimeStyle.left;
	
				// 放入值来计算
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = name === "fontSize" ? "1em": (r || 0);
				r = style.pixelLeft + "px";
	
				// 回到初始值
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
	
			}
	
			return r;
		},
		
		/// #else
		
		/// getStyle = function (elem, name) {
		///
		/// 	// 获取样式
		/// 	var computedStyle = elem.ownerDocument.defaultView.getComputedStyle(elem, null);
		///
		/// 	// 返回
		/// 	return computedStyle ? computedStyle[ name ]: null;
		///
		/// },
		/// #endif

		/**
		 * float 属性的名字。
		 * @type String
		 */
		styleFloat = 'cssFloat' in div.style ? 'cssFloat': 'styleFloat',
		
		// IE：styleFloat Other：cssFloat
		
		/**
		 * 浏览器使用的真实的 DOMContentLoaded 事件名字。
		 * @type String
		 */
		domReady,

		t;
	
	// 变量初始化。

	// 初始化 parseFix。
	parseFix.optgroup = parseFix.option;
	parseFix.tbody = parseFix.tfoot = parseFix.colgroup = parseFix.caption = parseFix.thead;
	parseFix.th = parseFix.td;

	// 初始化 attrFix。
	map("enctype encoding action method target", formHook, attrFix);

	// 初始化 attrFix。
	map("defaultChecked defaultSelected readOnly disabled autofocus autoplay async controls hidden loop open required scoped compact noWrap isMap declare noshade multiple noresize defer useMap", boolHook, attrFix);

	// 初始化 propFix。
	map("readOnly tabIndex defaultChecked defaultSelected accessKey useMap contentEditable maxLength", function(value) {
		propFix[value.toLowerCase()] = value;
	});

	// 初始化 attrFix。
	map("innerHTML innerText textContent tagName nodeName nodeType nodeValue defaultValue selectedIndex cellPadding cellSpacing rowSpan colSpan frameBorder", function(value) {
		propFix[value.toLowerCase()] = value;
		attrFix[value] = propHook;
	});
	
	// 初始化 textFix。
	textFix.INPUT = textFix.SELECT = textFix.TEXTAREA = 'value';
	textFix['#text'] = textFix['#comment'] = 'nodeValue';
	
	/// #region Dom
	
	/**
	 * @class Dom
	 */
	extend(Dom, {
		
		/**
		 * 根据一个 *id* 或原生节点获取一个 {@link Dom} 类的实例。
		 * @param {String/Node/Dom/DomList} id 要获取元素的 id 或用于包装成 Dom 对象的任何元素，如是原生的 DOM 节点、原生的 DOM 节点列表数组或已包装过的 Dom 对象。。
	 	 * @return {Dom} 此函数返回是一个 Dom 类型的变量。通过这个变量可以调用所有文档中介绍的 DOM 操作函数。如果无法找到指定的节点，则返回 null 。此函数可简写为 $。
	 	 * @static
	 	 * @example
	 	 * 找到 id 为 a 的元素。
	 	 * #####HTML:
	 	 * <pre lang="htm" format="none">
	 	 * &lt;p id="a"&gt;once&lt;/p&gt; &lt;div&gt;&lt;p&gt;two&lt;/p&gt;&lt;/div&gt; &lt;p&gt;three&lt;/p&gt;
	 	 * </pre>
	 	 * #####JavaScript:
	 	 * <pre>Dom.get("a");</pre>
	 	 * #####结果:
	 	 * <pre>{&lt;p id="a"&gt;once&lt;/p&gt;}</pre>
	 	 * 
	 	 * <br>
	 	 * 返回 id 为 a1 的 DOM 对象
	 	 * #####HTML:
	 	 * <pre lang="htm" format="none">&lt;p id="a1"&gt;&lt;/p&gt; &lt;p id="a2"&gt;&lt;/p&gt; </pre>
	 	 *
	 	 * #####JavaScript:
	 	 * <pre>Dom.get(document.getElecmentById('a1')) // 等效于 Dom.get('a1')</pre>
	 	 * <pre>Dom.get(['a1', 'a2']); // 等效于 Dom.get('a1')</pre>
	 	 * <pre>Dom.get(Dom.get('a1')); // 等效于 Dom.get('a1')</pre>
	 	 * 
	 	 * #####结果:
	 	 * <pre>{&lt;p id="a1"&gt;&lt;/p&gt;}</pre>
		 */
		get: function(id) {
			return typeof id === "string" ?
				(id = document.getElementById(id)) && new Dom(id) :
				id ? 
					id.nodeType || id.setTimeout ? 
						new Dom(id) :
						id.node ? 
							new Dom(id.node) :
							Dom.get(id[0]) : 
					null;
		},
		
		/**
		 * 执行一个 CSS 选择器，返回第一个元素对应的 {@link Dom} 对象。
		 * @param {String/NodeList/DomList/Array/Dom} 用来查找的 CSS 选择器或原生的 DOM 节点。
		 * @return {Element} 如果没有对应的节点则返回一个空的 DomList 对象。
	 	 * @static
	 	 * @see DomList
	 	 * @example
	 	 * 找到第一个 p 元素。
	 	 * #####HTML:
	 	 * <pre lang="htm" format="none">
	 	 * &lt;p&gt;one&lt;/p&gt; &lt;div&gt;&lt;p&gt;two&lt;/p&gt;&lt;/div&gt; &lt;p&gt;three&lt;/p&gt;
	 	 * </pre>
	 	 * 
	 	 * #####Javascript:
	 	 * <pre>
	 	 * Dom.find("p");
	 	 * </pre>
	 	 * 
	 	 * #####结果:
	 	 * <pre lang="htm" format="none">
	 	 * {  &lt;p&gt;one&lt;/p&gt;  }
	 	 * </pre>
	 	 * 
	 	 * <br>
	 	 * 找到第一个 p 元素，并且这些元素都必须是 div 元素的子元素。
	 	 * #####HTML:
	 	 * <pre lang="htm" format="none">
	 	 * &lt;p&gt;one&lt;/p&gt; &lt;div&gt;&lt;p&gt;two&lt;/p&gt;&lt;/div&gt; &lt;p&gt;three&lt;/p&gt;</pre>
	 	 * 
	 	 * #####Javascript:
	 	 * <pre>
	 	 * Dom.find("div &gt; p");
	 	 * </pre>
	 	 * 
	 	 * #####结果:
	 	 * <pre lang="htm" format="none">
	 	 * { &lt;p&gt;two&lt;/p&gt; }
	 	 * </pre>
		 */
		find: function(selector){
			return typeof selector === "string" ?
				document.find(selector) :
				Dom.get(selector);
		},
		
		/**
		 * 执行一个 CSS 选择器，返回一个新的 {@link DomList} 对象。
		 * @param {String/NodeList/DomList/Array/Dom} 用来查找的 CSS 选择器或原生的 DOM 节点列表。
		 * @return {Element} 如果没有对应的节点则返回一个空的 DomList 对象。
	 	 * @static
	 	 * @see DomList
	 	 * @example
	 	 * 找到所有 p 元素。
	 	 * #####HTML:
	 	 * <pre lang="htm" format="none">
	 	 * &lt;p&gt;one&lt;/p&gt; &lt;div&gt;&lt;p&gt;two&lt;/p&gt;&lt;/div&gt; &lt;p&gt;three&lt;/p&gt;
	 	 * </pre>
	 	 * 
	 	 * #####Javascript:
	 	 * <pre>
	 	 * Dom.query("p");
	 	 * </pre>
	 	 * 
	 	 * #####结果:
	 	 * <pre lang="htm" format="none">
	 	 * [  &lt;p&gt;one&lt;/p&gt; ,&lt;p&gt;two&lt;/p&gt;, &lt;p&gt;three&lt;/p&gt;  ]
	 	 * </pre>
	 	 * 
	 	 * <br>
	 	 * 找到所有 p 元素，并且这些元素都必须是 div 元素的子元素。
	 	 * #####HTML:
	 	 * <pre lang="htm" format="none">
	 	 * &lt;p&gt;one&lt;/p&gt; &lt;div&gt;&lt;p&gt;two&lt;/p&gt;&lt;/div&gt; &lt;p&gt;three&lt;/p&gt;</pre>
	 	 * 
	 	 * #####Javascript:
	 	 * <pre>
	 	 * Dom.query("div &gt; p");
	 	 * </pre>
	 	 * 
	 	 * #####结果:
	 	 * <pre lang="htm" format="none">
	 	 * [ &lt;p&gt;two&lt;/p&gt; ]
	 	 * </pre>
         * 
	 	 * <br>
         * 查找所有的单选按钮(即: type 值为 radio 的 input 元素)。
         * <pre>Dom.query("input[type=radio]");</pre>
		 */
		query: function(selector) {
			return selector ? 
				typeof selector === 'string' ? 
					document.query(selector) :
					selector.nodeType || selector.setTimeout ?
						new DomList([selector]) :
						typeof selector.length === 'number' ? 
							selector instanceof DomList ?
								selector :
								new DomList(selector) :
							new DomList([Dom.getNode(selector)]) :
				new DomList;
		},
		
		/**
		 * 根据提供的原始 HTML 标记字符串，解析并动态创建一个节点，并返回这个节点的 Dom 对象包装对象。
		 * @param {String/Node} html 用于动态创建DOM元素的HTML字符串。
		 * @param {Document} ownerDocument=document 创建DOM元素所在的文档。
		 * @param {Boolean} cachable=true 指示是否缓存节点。
		 * @return {Dom} Dom 对象。
	 	 * @static
	 	 * @remark
	 	 * 可以传递一个手写的 HTML 字符串，或者由某些模板引擎或插件创建的字符串，也可以是通过 AJAX 加载过来的字符串。但是在你创建 input 元素的时会有限制，可以参考第二个示例。当然这个字符串可以包含斜杠 (比如一个图像地址)，还有反斜杠。当创建单个元素时，请使用闭合标签或 XHTML 格式。
	 	 * 在这个函数的内部，是通过临时创建一个元素，并将这个元素的 innerHTML 属性设置为给定的标记字符串，来实现标记到 DOM 元素转换的。所以，这个函数既有灵活性，也有局限性。
	 	 * 
	 	 * @example
	 	 * 动态创建一个 div 元素（以及其中的所有内容），并将它追加到 body 元素中。
	 	 * #####JavaScript:
	 	 * <pre>Dom.parse("&lt;div&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;/div&gt;").appendTo(document.body);</pre>
	 	 * #####结果:
	 	 * <pre lang="htm" format="none">[&lt;div&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;/div&gt;]</pre>
	 	 * 
	 	 * 创建一个 &lt;input&gt; 元素必须同时设定 type 属性。因为微软规定 &lt;input&gt; 元素的 type 只能写一次。
	 	 * #####JavaScript:
	 	 * <pre>
	 	 * // 在 IE 中无效:
	 	 * Dom.parse("&lt;input&gt;").setAttr("type", "checkbox");
	 	 * // 在 IE 中有效:
	 	 * Dom.parse("&lt;input type='checkbox'&gt;");
	 	 * </pre>        
		 */
		parse: function(html, context, cachable) {

			assert.notNull(html, 'Dom.parse(html, context, cachable): {html} ~');

			return html.node ? html: new Dom(Dom.parseNode(html, context, cachable));
		},

		/**
		 * 创建一个指定标签的节点，并返回这个节点的 Dom 对象包装对象。
		 * @param {String} tagName 要创建的节点标签名。
		 * @param {String} className 用于新节点的 CSS 类名。
	 	 * @static
	 	 * @example
	 	 * 动态创建一个 div 元素（以及其中的所有内容），并将它追加到 body 元素中。在这个函数的内部，是通过临时创建一个元素，并将这个元素的 innerHTML 属性设置为给定的标记字符串，来实现标记到 DOM 元素转换的。所以，这个函数既有灵活性，也有局限性。
	 	 * #####JavaScript:
	 	 * <pre>Dom.create("div", "cls").appendTo(document.body);</pre>
	 	 *
	 	 * 创建一个 div 元素同时设定 class 属性。
	 	 * #####JavaScript:
	 	 * <pre>Dom.create("div", "className");</pre>
	 	 * #####结果:
	 	 * <pre lang="htm" format="none">{&lt;div class="className"&gt;&lt;/div&gt;}</pre>
		 */
		create: function(tagName, className) {
			return new Dom(Dom.createNode(tagName, className || ''));
		},
		
		/**
		 * 根据一个 id 获取元素。如果传入的id不是字符串，则直接返回参数。
		 * @param {String/Node/Dom} id 要获取元素的 id 或元素本身。
	 	 * @return {Node} 元素。
	 	 * @static
		 */
		getNode: function (id) {
			return id ? 
					id.nodeType || id.setTimeout ?
						id :
						id.node || (typeof id === "string" ? 
							document.getElementById(id) :
							Dom.getNode(id[0])
						) :
						null;
		},
		
		/**
		 * 创建一个节点。
		 * @param {String} tagName 创建的节点的标签名。
		 * @param {String} className 创建的节点的类名。
	 	 * @static
		 */
		createNode: function(tagName, className) {
			assert.isString(tagName, 'Dom.create(tagName, className): {tagName} ~');
			var div = document.createElement(tagName);
			div.className = className;
			return div;
		},
		
		/**
		 * 解析一个 html 字符串，返回相应的原生节点。
		 * @param {String/Element} html 要解析的 HTML 字符串。如果解析的字符串是一个 HTML 字符串，则此函数会忽略字符串前后的空格。
		 * @param {Element} context=document 生成节点使用的文档中的任何节点。
		 * @param {Boolean} cachable=true 指示是否缓存节点。这会加速下次的解析速度。
		 * @return {Element/TextNode/DocumentFragment} 如果 HTML 是纯文本，返回 TextNode。如果 HTML 包含多个节点，返回 DocumentFragment 。否则返回 Element。
	 	 * @static
		 */
		parseNode: function(html, context, cachable) {

			// 不是 html，直接返回。
			if( typeof html === 'string') {

				var srcHTML = html;

				// 查找是否存在缓存。
				html = cache[srcHTML];
				context = context && context.ownerDocument || document;

				assert(context.createElement, 'Dom.parseNode(html, context, cachable): {context} 必须是 DOM 节点。', context);

				if(html && html.ownerDocument === context) {

					// 复制并返回节点的副本。
					html = html.cloneNode(true);

				} else {

					// 测试查找 HTML 标签。
					var tag = /<([\w:]+)/.exec(srcHTML);
					cachable = cachable !== false;

					if(tag) {

						assert.isString(srcHTML, 'Dom.parseNode(html, context, cachable): {html} ~');
						html = context.createElement("div");

						var wrap = parseFix[tag[1].toLowerCase()] || parseFix.$default;

						// IE8- 会过滤字符串前的空格。
						// 为了保证全部浏览器统一行为，此处删除全部首尾空格。

						html.innerHTML = wrap[1] + srcHTML.trim().replace(rXhtmlTag, "<$1></$2>") + wrap[2];

						// UE67: 如果节点未添加到文档。需要重置 checkbox 的 checked 属性。
						if (navigator.isQuirks) {
							each(html.getElementsByTagName('INPUT'), function(elem) {
								if(rCheckBox.test(elem.type)) {
									elem.checked = elem.defaultChecked;
								}
							});
						}

						// 转到正确的深度。
						// IE 肯能无法正确完成位置标签的处理。
						for( tag = wrap[0]; tag--; )
							html = html.lastChild;

						assert.isNode(html, "Dom.parseNode(html, context, cachable): 无法根据 {html} 创建节点。", srcHTML);

						// 如果解析包含了多个节点。
						if (html.previousSibling) {
							wrap = html.parentNode;

							assert(context.createDocumentFragment, 'Dom.parseNode(html, context, cachable): {context} 必须是 DOM 节点。', context);
							html = context.createDocumentFragment();
							while (wrap.firstChild) {
								html.appendChild(wrap.firstChild);
							}
						} else {

							// 删除用于创建节点的父 DIV 标签。
							html.parentNode.removeChild(html);
						}

						// 一般使用最后的节点， 如果存在最后的节点，使用父节点。
						// 如果有多节点，则复制到片段对象。
						cachable = cachable && !/<(?:script|object|embed|option|style)/i.test(srcHTML);

					} else {

						// 创建文本节点。
						html = context.createTextNode(srcHTML);
					}

					if(cachable) {
						cache[srcHTML] = html.cloneNode(true);
					}

				}

			}

			return html;

		},
		
		/**
		 * 判断一个元素是否符合一个选择器。
		 * @param {Node} elem 一个 HTML 节点。
		 * @param {String} selector 一个 CSS 选择器。
		 * @return {Boolean} 如果指定的元素匹配输入的选择器，则返回 true， 否则返回 false 。
	 	 * @static
		 */
		match: function (elem, selector) {
			assert.isString(selector, "Dom#find(selector): selector ~。");
			
			if(elem.nodeType !== 1)
				return false;
				
			if(!elem.parentNode){
				var div = document.createElement('div');
				div.appendChild(elem);
				try{
					return match(elem, selector);
				} finally {
					div.removeChild(elem);
				}
			}
			return match(elem, selector);
		},
		
		/// TODO: clear
		
		hasChild: function(elem, child){
			assert.deprected("Dom.hasChild 已过时，请改用 Dom.has");
			return Dom.has(elem, child);
		},
		
		/// TODO: clear

		/**
		 * 判断指定节点之后有无存在子节点。
		 * @param {Element} elem 节点。
		 * @param {Element} child 子节点。
		 * @return {Boolean} 如果确实存在子节点，则返回 true ， 否则返回 false 。
	 	 * @static
		 */
		has: div.compareDocumentPosition ? function(elem, child) {
			assert.isNode(elem, "Dom.has(elem, child): {elem} ~");
			assert.isNode(child, "Dom.has(elem, child): {child} ~");
			return !!(child && (elem.compareDocumentPosition(child) & 16));
		}: function(elem, child) {
			assert.isNode(elem, "Dom.has(elem, child): {elem} ~");
			assert.isNode(child, "Dom.has(elem, child): {child} ~");
			if (child) {
			    while (child = child.parentNode)
			        if (elem === child)
			            return true;
			}

			return false;
		},
		
		/**
		 * 获取一个元素对应的文本。
		 * @param {Element} elem 元素。
		 * @return {String} 值。对普通节点返回 text 属性。
	 	 * @static
		 */
		getText: function(elem) {
			assert.isNode(elem, "Dom.getText(elem, name): {elem} ~");
			return elem[textFix[elem.nodeName] || propFix.innerText] || '';
		},

		/**
		 * 获取元素的属性值。
		 * @param {Node} elem 元素。
		 * @param {String} name 要获取的属性名称。
		 * @return {String} 返回属性值。如果元素没有相应属性，则返回 null 。
	 	 * @static
		 */
		getAttr: function(elem, name, type) {
			
			assert.isNode(elem, "Dom.getAttr(elem, name): {elem} ~");
			
			name = propFix[name] || name;
			
			var hook = attrFix[name];
			
			// 如果存在钩子，使用钩子获取属性。
			// 最后使用 defaultHook 获取。
			return hook ? hook.get(elem, name, type) : defaultHook.get(elem, name.toLowerCase(), type);

		},
		
		/**
		 * 判断一个节点是否隐藏。
		 * @method isHidden
		 * @return {Boolean} 隐藏返回 true 。
	 	 * @static
		 */
		
		/**
		 * 检查是否含指定类名。
		 * @param {Element} elem 要测试的元素。
		 * @param {String} className 类名。
		 * @return {Boolean} 如果存在返回 true。
	 	 * @static
		 */
		hasClass: function(elem, className) {
			assert.isNode(elem, "Dom.hasClass(elem, className): {elem} ~");
			assert(className && (!className.indexOf || !/[\s\r\n]/.test(className)), "Dom.hasClass(elem, className): {className} 不能空，且不允许有空格和换行。如果需要判断 2 个 class 同时存在，可以调用两次本函数： if(hasClass('A') && hasClass('B')) ...");
			return (" " + elem.className + " ").indexOf(" " + className + " ") >= 0;
		},

		/**
		 * 存储事件对象的信息。
		 */
		$event: {},
		
		/**
		 * 特殊属性集合。
		 * @type Object 特殊的属性，在节点复制时不会被复制，因此需要额外复制这些属性内容。
	 	 * @static
		 */
		cloneFix: {
			INPUT: function(srcElem, destElem) {
				
				if (rCheckBox.test(srcElem.type)) {

					// IE6 必须同时设置 defaultChecked 属性。
					destElem.defaultChecked = destElem.checked = srcElem.checked;

					// IE67 无法复制 value 属性。
					if (destElem.value !== srcElem.value) {
						destElem.value = srcElem.value;
					}
				} else {
					destElem.value = srcElem.value;
				}
			},
			TEXTAREA: 'value',
			OPTION: 'selected',
			OBJECT: function(destElem, srcElem) {
				if (destElem.parentNode) {
					destElem.outerHTML = srcElem.outerHTML;
					
					if(srcElem.innerHTML && !destElem.innerHTML)
						destElem.innerHTML = srcElem.innerHTML;
				}
			}
		},
		
		/**
		 * 特殊属性集合。
		 * @property
		 * @type Object
		 * @static
		 * @private
		 */
		attrFix: attrFix,

		/**
		 * 特殊属性集合。
		 * @property
		 * @type Object
		 * @static
		 * @private
		 */
		propFix: propFix,
		
		/**
		 * 获取文本时应使用的属性值。
		 * @private
	 	 * @static
		 */
		textFix: textFix,
		
		/**
		 * 特殊的样式集合。
		 * @property
		 * @type Object
		 * @private
	 	 * @static
		 */
		styleFix: styleFix,
	
		/**
		 * 用于查找所有支持的伪类的函数集合。
		 * @private
	 	 * @static
		 */
		pseudos: {
			
			target : function (elem) {
				var nameOrId = elem.id || elem.name;
				if(!nameOrId) return false;
				var doc = getDocument(elem).defaultView;
				return nameOrId === (doc.defaultView || doc.parentWindow).location.hash.slice(1)
			},

			/**
			 * 判断一个节点是否有元素节点或文本节点。
			 * @param {Element} elem 要测试的元素。
			 * @return {Boolean} 如果存在子节点，则返回 true，否则返回 false 。
			 */
			empty: Dom.isEmpty = function(elem) {
				for( elem = elem.firstChild; elem; elem = elem.nextSibling )
					if( elem.nodeType === 1 || elem.nodeType === 3 ) 
						return false;
				return true;
			},
			
			contains: function( elem, args){ 
				return Dom.getText(elem).indexOf(args) >= 0;
			},
			
			/**
			 * 判断一个节点是否不可见。
			 * @return {Boolean} 如果元素不可见，则返回 true 。
			 */
			hidden: Dom.isHidden = function(elem) {
				return (elem.style.display || getStyle(elem, 'display')) === 'none';
			},
			visible: function( elem ){ return !Dom.isHidden(elem); },
			
			not: function(elem, args){ return !match(elem, args); },
			has: function(elem, args){ return query(args, new Dom(elem)).length > 0; },
			
			selected: function(elem) { return attrFix.selected.get(elem, 'selected', 1); },
			checked: function(elem){ return elem.checked; },
			enabled: function(elem){ return elem.disabled === false; },
			disabled: function(elem){ return elem.disabled === true; },
			
			input: function(elem){ return /^(input|select|textarea|button)$/i.test(elem.nodeName); },
			
			"nth-child": function(args, oldResult, result){
				var t = Dom.pseudos;
				if(t[args]){
					t[args](null, oldResult, result);	
				} else if(args = oldResult[args - 1])
					result.push(args);
			},
			"first-child": function (args, oldResult, result) {
				if(args = oldResult[0])
					result.push(args);
			},
			"last-child": function (args, oldResult, result) {
				if(args = oldResult[oldResult.length - 1])
					result.push(args);
			},
			"only-child": function(elem){ 
				var p = new Dom(elem.parentNode).first(elem.nodeName);
				return p && p.next(); 
			},
			odd: function(args, oldResult, result){
				var index = 0, elem, t;
				while(elem = oldResult[index++]) {
					if(args){
						result.push(elem);	
					}
				}
			},
			even: function(args, oldResult, result){
				return Dom.pseudos.odd(!args, oldResult, result);
			}
			
		},

		/**
		 * 显示元素的样式。
		 * @static
		 * @type Object
		 */
		displayFix: {
			position: "absolute",
			visibility: "visible",
			display: "block"
		},
		
		/**
		 * 不需要单位的 css 属性。
		 * @static
		 * @type Object
		 */
		styleNumbers: map('fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom', returnTrue, {}),

		/**
		 * 默认最大的 z-index 。
		 * @property zIndex
		 * @type Number
		 * @private
		 * @static
		 */
		
		/**
		 * 获取 window 对象的 Dom 对象封装示例。
	 	 * @static
		 */
		window: new Dom(window),
		
		/**
		 * 获取 document 对象的 Dom 对象封装示例。
	 	 * @static
		 */
		document: new Dom(document),

		/**
		 * 获取元素的计算样式。
		 * @param {Element} elem 元素。
		 * @param {String} name  要访问的属性名称。
		 * @return {String} 样式。
	 	 * @static
	 	 * 访问元素的样式属性。
		 * @example
		 * 取得第一个段落的color样式属性的值。
		 * #####JavaScript:
		 * <pre>Dom.getStyle(document.getElementById("id"), "color");</pre>
		 */
		getStyle: getStyle,

		/**
		 * 读取样式字符串。
		 * @param {Element} elem 元素。
		 * @param {String} name 属性名。必须使用骆驼规则的名字。
		 * @return {String} 字符串。
	 	 * @static
		 */
		styleString: styleString,

		/**
		 * 读取样式数字。
		 * @param {Element} elem 元素。
		 * @param {String} name 属性名。必须使用骆驼规则的名字。
		 * @return {String} 字符串。
		 * @static
		 */
		styleNumber: styleNumber,
		
		/**
		 * 获取一个标签的默认 display 属性。
		 * @param {Element} elem 元素。
		 */
		defaultDisplay: function(elem){
			var displays = Dom.displays || (Dom.displays = {}),
				tagName = elem.tagName,
				display = displays[tagName],
				iframe,
				iframeDoc;
				
			if(!display) {
				
				elem = document.createElement(tagName);
				document.body.appendChild(elem);
				display = getStyle(elem, 'display');
				document.body.removeChild(elem);

				// 如果简单的测试方式失败。使用 IFrame 测试。
				if ( display === "none" || display === "" ) {
					iframe = document.body.appendChild(Dom.emptyIframe || (Dom.emptyIframe = Object.extend(document.createElement("iframe"), {
						frameBorder: 0,
						width: 0,
						height: 0
					})));
					
					// Create a cacheable copy of the iframe document on first call.
					// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
					// document to it; WebKit & Firefox won't allow reusing the iframe document.
					iframeDoc =  ( iframe.contentWindow || iframe.contentDocument ).document;
					frameDoc.write("<!doctype html><html><body>");
					iframeDoc.close();

					elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );
					display = getStyle(elem, 'display');
					document.body.removeChild( iframe );
				}
				
				displays[tagName] = display;
			}
		
			return display;
		},

		/**
		 * 通过设置 display 属性来显示元素。
		 * @param {Element} elem 元素。
	 	 * @static
		 */
		show: function(elem) {
			assert.isElement(elem, "Dom.show(elem): {elem} ~");

			// 普通元素 设置为 空， 因为我们不知道这个元素本来的 display 是 inline 还是 block
			elem.style.display = '';

			// 如果元素的 display 仍然为 none , 说明通过 CSS 实现的隐藏。这里默认将元素恢复为 block。
			if(getStyle(elem, 'display') === 'none')
				elem.style.display = elem.style.$display || Dom.defaultDisplay(elem);
		},
		
		/**
		 * 通过设置 display 属性来隐藏元素。
		 * @param {Element} elem 元素。
	 	 * @static
		 */
		hide: function(elem) {
			assert.isElement(elem, "Dom.hide(elem): {elem} ~");
			var currentDisplay = styleString(elem, 'display');
			if(currentDisplay !== 'none') {
				elem.style.$display = currentDisplay;
				elem.style.display = 'none';
			}
		},
		
		/**
		 * 根据不同的内容进行计算。
		 * @param {Element} elem 元素。
		 * @param {String} type 要计算的值。一个 type 是一个 js 表达式，它有一些内置的变量来表示元素的相关计算值。预定义的变量有：
		 *
		 *		- ml: marginLeft (同理有 r=right, t=top, b=bottom，x=left+right,y=top+bottom 下同)
		 *		- bl: borderLeftWidth
		 *		- pl: paddingLeft
		 *		- sx: bl + pl + height (同理有 y)
		 *		- css 样式: 如 height, left
		 *
		 * @return {Number} 计算值。
	 	 * @static
		 */
		calc: (function() {

			/**
			 * 样式表。
			 * @static
			 * @type Object
			 */
			var cache = {},

				init, 
				
				tpl;

			if(window.getComputedStyle) {
				init = 'var c=e.ownerDocument.defaultView.getComputedStyle(e,null);return ';
				tpl = '(parseFloat(c["#"])||0)';
			} else {
				init = 'return ';
				tpl = '(parseFloat(Dom.getStyle(e, "#"))||0)';
			}

			/**
			 * 翻译 type。
			 * @param {String} type 输入字符串。
			 * @return {String} 处理后的字符串。
			 */
			function format(type) {

				// 如果长度为 2，则处理为简写。
				if (type.length === 2) {
					var t = type.charAt(0),
						d = type.charAt(1),
						ns1 = {
							m: 'margin#',
							b: 'border#Width',
							p: 'padding#'
						},
						ns2 = {
							t: 'Top',
							r: 'Right',
							b: 'Bottom',
							l: 'Left'
						};
					if (t in ns1) {
						t = ns1[t];
						if (d == 'x') {
							type = '(' + t.replace('#', ns2.l) + '+' + t.replace('#', ns2.r) + ')';
						} else if (d == 'y') {
							type = '(' + t.replace('#', ns2.t) + '+' + t.replace('#', ns2.b) + ')';
						} else {
							type = t.replace('#', ns2[d]);
						}
					} else if (t == 's') {
						return d == 'x' ? 'e.offsetWidth' : 'e.offsetHeight';
					}
				} else if (type == 'width' || type == 'height') {
					return 'Dom.styleNumber(e,"' + type + '")';
				} else if (type.length < 2) {
					return type;
				}

				return tpl.replace('#', type);
			}

			return function(elem, type) {
				assert.isElement(elem, "Dom.calc(elem, type): {elem} ~");
				assert.isString(type, "Dom.calc(elem, type): {type} ~");
				return (cache[type] || (cache[type] = new Function("e", init + type.replace(/\w+/g, format))))(elem);
			}
		})(),

		/**
		 * 设置一个元素可拖动。
		 * @param {Element} elem 要设置的节点。
	 	 * @static
		 */
		movable: function(elem) {
			assert.isElement(elem, "Dom.movable(elem): 参数 elem ~");
			if(!/^(?:abs|fix)/.test(styleString(elem, "position")))
				elem.style.position = "relative";
		},
		
		/**
		 * 获取元素的文档。
		 * @param {Element} elem 元素。
		 * @return {Document} 文档。
	 	 * @static
		 */
		getDocument: getDocument,
	
		/**
		 * 将一个成员附加到 Dom 对象和相关类。
		 * @param {Object} obj 要附加的对象。
		 * @param {Number} listType = 1 说明如何复制到 DomList 实例。
		 * @return this
		 * @static
		 * 对 Element 扩展，内部对 Element DomList document 皆扩展。
		 *         这是由于不同的函数需用不同的方法扩展，必须指明扩展类型。 所谓的扩展，即一个类所需要的函数。 DOM 方法
		 *         有 以下种 1, 其它 setText - 执行结果返回 this， 返回 this 。(默认) 2
		 *         getText - 执行结果是数据，返回结果数组。 3 getElementById - 执行结果是DOM
		 *         或 ElementList，返回 DomList 包装。 4 hasClass -
		 *         只要有一个返回等于 true 的值， 就返回这个值。 参数 copyIf 仅内部使用。
		 */
		implement: function(members, listType, copyIf) {
		
			var classes = [DomList, Dom], i;
		
			for(var fnName in members){
				i = classes.length;
				while(i--) {
					if(!copyIf || !classes[i].prototype[fnName]) {
						classes[i].prototype[fnName] = i ? members[fnName] : createDomListMthod(fnName, listType);
					}
				}
			}
		
			return this;

		},
	
		/**
		 * 若不存在，则将一个对象附加到 Element 对象。
		 * @static
		 * @param {Object} obj 要附加的对象。
		 * @param {Number} listType = 1 说明如何复制到 DomList 实例。
		 * @param {Number} docType 说明如何复制到 Document 实例。
		 * @return this
		 */
		implementIf: function(obj, listType) {
			return this.implement(obj, listType, true);
		},
	
		//// TODO: clear it
		define: function(ctrl, target, setters, getters) {
			assert.deprected("Dom.define(ctrl, target, setters, getters) 已过时，请使用 MyClass.defineMethods(target, methods)");

			return ctrl.defineMethods(target, (setters + " " +  getters).trim());
		},
		//// TODO: clear it

		/**
		 * 表示事件的参数。
		 * @class Dom.Event
		 */
		Event: DomEvent

	})
	
	.implement({

		/**
		 * 将当前 Dom 对象添加到其它节点或 Dom 对象中。
		 * @param {Node/String} parent=document.body 节点 Dom 对象或节点的 id 字符串。
		 * @return this
		 * @remark
		 * this.appendTo(parent) 相当于 parent.append(this) 。
		 * @example
		 * 把所有段落追加到ID值为foo的元素中。
		 * #####HTML:
		 * <pre lang="htm" format="none">
		 * &lt;p&gt;I would like to say: &lt;/p&gt;&lt;div id="foo"&gt;&lt;/div&gt;
		 * </pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").appendTo("foo");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">
		 * &lt;div id="foo"&gt;&lt;p&gt;I would like to say: &lt;/p&gt;&lt;/div&gt;
		 * </pre>
		 *
		 * 创建一个新的div节点并添加到 document.body 中。
		 * <pre>
		 * Dom.create("div").appendTo();
		 * </pre>
		 */
		appendTo: function(parent) {

			// parent 肯能为 true
			parent ? (parent.append ? parent : Dom.get(parent)).append(this) : this.attach(document.body, null);

			return this;

		},

		/**
		 * 移除当前 Dom 对象或其子对象。
		 * @param {Dom} [child] 如果指定了子对象，则删除此对象。
		 * @return this
		 * @see #dispose
		 * @remark
		 * 这个方法不会彻底移除 Dom 对象，而只是暂时将其从 Dom 树分离。
		 * 如果需要彻底删除 Dom 对象，使用 {@link #dispose}方法。
		 * @example
		 * 从DOM中把所有段落删除。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt; how are &lt;p&gt;you?&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").remove();</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">how are</pre>
		 *
		 * 从DOM中把带有hello类的段落删除
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p class="hello"&gt;Hello&lt;/p&gt; how are &lt;p&gt;you?&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").remove(".hello");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">how are &lt;p&gt;you?&lt;/p&gt;</pre>
		 */
		remove: function(child) {
			assert(!arguments.length || child, 'Dom#remove(child): {child} 不是合法的节点', child);

			return arguments.length ?
				typeof child === 'string' ?
					this.query(child).remove() :
					this.removeChild(child) :
				(child = this.parentControl || this.parent()) ?
					child.removeChild(this) :
					this;
		},

		/**
	 	 * 删除一个节点的所有子节点。
		 * @return this
		 * @example
		 * 把所有段落的子元素（包括文本节点）删除。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello, &lt;span&gt;Person&lt;/span&gt; &lt;a href="#"&gt;and person&lt;/a&gt;&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").empty();</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">&lt;p&gt;&lt;/p&gt;</pre>
		 */
		empty: function() {
			var elem = this.node;
			//if (elem.nodeType == 1)
			//	each(elem.getElementsByTagName("*"), clean);
			while (elem = this.last(true))
				this.removeChild(elem);
			return this;
		},

		/**
		 * 彻底删除当前 DOM 对象。释放占用的所有资源。
		 * @see #remove
		 * @remark 这个方法会同时删除节点绑定的事件以及所有的数据。
		 * @example
		 * 从DOM中把所有段落删除。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;dispose&lt;/p&gt; how are &lt;p&gt;you?&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").dispose();</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">how are</pre>
		 *
		 * 从DOM中把带有hello类的段落删除。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p class="hello"&gt;Hello&lt;/p&gt; how are &lt;p&gt;you?&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").dispose(".hello");</pre>
		 */
		dispose: function() {
			var elem = this.node;
			if (elem.nodeType == 1) {
				each(elem.getElementsByTagName("*"), clean);
				clean(elem);
			}

			return this.remove();
		},

		/**
		 * 设置一个样式属性的值。
		 * @param {String} name CSS 属性名或 CSS 字符串。
		 * @param {String/Number} [value] CSS属性值， 数字如果不加单位，则会自动添加像素单位。
		 * @return this
		 * @example
		 * 将所有段落的字体颜色设为红色并且背景为蓝色。
		 * <pre>Dom.query("p").setStyle('color', "#ff0011");</pre>
		 */
		setStyle: function(name, value) {

			// 获取样式
			var me = this;

			assert.isString(name, "Dom#setStyle(name, value): {name} ~");
			assert.isElement(me.node, "Dom#setStyle(name, value): 当前 dom 不支持样式");

			// 设置通用的属性。
			if (arguments.length == 1) {
				me.node.style.cssText += ';' + name;

				// 特殊的属性值。
			} else if (name in styleFix) {

				// setHeight setWidth setOpacity
				return styleFix[name].call(me, value);

			} else {
				name = name.replace(rStyle, formatStyle);

				assert(value || !isNaN(value), "Dom#setStyle(name, value): {value} 不是正确的属性值。", value);

				// 如果值是函数，运行。
				if (typeof value === "number" && !(name in Dom.styleNumbers))
					value += "px";

			}

			// 指定值。
			me.node.style[name] = value;

			return me;

		},

		/**
		 * 向用户显示当前 Dom 对象。
		 * @param {String} [type] 显示时使用的特效方式。
		 * @param {Number} duration=300 效果执行时间。
		 * @param {Function} [callBack] 效果执行完的回调函数。
		 * @param {String} [link] 当效果正在执行时的处理方式。
		 *
		 * - "**wait**"(默认): 等待上个效果执行完成。
		 * - "**ignore**": 忽略新的效果。
		 * - "**stop**": 正常中止上一个效果，然后执行新的效果。
		 * - "**abort**": 强制中止上一个效果，然后执行新的效果。
		 * @return this
		 * @remark 此函数是通过设置 css的 display 属性实现的。
		 */
		show: function() {
			Dom.show(this.node);
			return this;
		},

		/**
		 * 向用户隐藏当前 Dom 对象。
		 * @param {String} [type] 显示时使用的特效方式。
		 * @param {Number} duration=300 效果执行时间。
		 * @param {Function} [callBack] 效果执行完的回调函数。
		 * @param {String} [link] 当效果正在执行时的处理方式。
		 *
		 * - "**wait**"(默认): 等待上个效果执行完成。
		 * - "**ignore**": 忽略新的效果。
		 * - "**stop**": 正常中止上一个效果，然后执行新的效果。
		 * - "**abort**": 强制中止上一个效果，然后执行新的效果。
		 * @return this
		 * @remark 此函数是通过设置 css的 display = none 实现的。
		 */
		hide: function(duration, callback) {
			Dom.hide(this.node);
			return this;
		},

		/**
		 * 切换当前 Dom 对象的显示状态。
		 * @param {String} [type] 显示时使用的特效方式。
		 * @param {Number} duration=300 效果执行时间。
		 * @param {Function} [callBack] 效果执行完的回调函数。
		 * @param {String} [value] 强制设置 toggle 效果。
		 * @param {String} [link] 当效果正在执行时的处理方式。
		 *
		 * - "**wait**"(默认): 等待上个效果执行完成。
		 * - "**ignore**": 忽略新的效果。
		 * - "**stop**": 正常中止上一个效果，然后执行新的效果。
		 * - "**abort**": 强制中止上一个效果，然后执行新的效果。
		 * @return this
		 * @remark 此函数是通过设置 css的 display 属性实现的。
		 */
		toggle: function() {
			var args = arguments,
				flag = args[args.length - 1];
			return this[(typeof flag === 'boolean' ? flag : Dom.isHidden(this.node)) ? 'show' : 'hide'].apply(this, args);
		},

		/**
		 * 设置当前 Dom 对象不可选。
		 * @param {Boolean} value=true 如果为 true，表示不可选，否则表示可选。
		 * @return this
		 */
		unselectable: 'unselectable' in div ? function(value) {
			assert.isElement(this.node, "Dom#unselectable(value): 当前 dom 不支持此操作");
			this.node.unselectable = value !== false ? 'on' : '';
			return this;
		} : 'onselectstart' in div ? function(value) {
			assert.isElement(this.node, "Dom#unselectable(value): 当前 dom 不支持此操作");
			this.node.onselectstart = value !== false ? Function.from(false) : null;
			return this;
		} : function(value) {
			assert.isElement(this.node, "Dom#unselectable(value): 当前 dom 不支持此操作");
			this.node.style.MozUserSelect = value !== false ? 'none' : '';
			return this;
		},

		/**
		 * 设置或删除一个 HTML 属性值。
		 * @param {String} name 要设置的属性名称。
		 * @param {String} value 要设置的属性值。当设置为 null 时，删除此属性。
		 * @return this
		 * @example
		 * 为所有图像设置src属性。
		 * #####HTML:
		 * <pre lang="htm" format="none">
		 * &lt;img/&gt;
		 * &lt;img/&gt;
		 * </pre>
		 * #####JavaScript:
		 * <pre>Dom.query("img").setAttr("src","test.jpg");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;img src= "test.jpg" /&gt; , &lt;img src= "test.jpg" /&gt; ]</pre>
		 *
		 * 将文档中图像的src属性删除
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;img src="test.jpg"/&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("img").setAttr("src");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;img /&gt; ]</pre>
		 */
		setAttr: function(name, value) {

			//assert(name !== 'type' || elem.tagName !== "INPUT" || !elem.parentNode, "Dom#setAttr(name, type): 无法修改INPUT元素的 type 属性。");

			var elem = this.node;
			
			name = propFix[name] || name;
			
			var hook = attrFix[name];
			
			if(!hook) {
				hook = defaultHook;
				name = name.toLowerCase();
			}
			
			hook.set(elem, name, value);

			return this;

		},

		/**
		 * 快速设置当前 Dom 对象的样式、属性或事件。
		 * @param {String/Object} name 属性名。可以是一个 css 属性名或 html 属性名。如果属性名是on开头的，则被认为是绑定事件。 - 或 - 属性值，表示 属性名/属性值 的 JSON 对象。
		 * @param {Object} [value] 属性值。
		 * @return this
		 * @remark
		 * 此函数相当于调用 setStyle 或 setAttr 。数字将自动转化为像素值。
		 * @example
		 * 将所有段落字体设为红色、设置 class 属性、绑定 click 事件。
		 * <pre>
		 * Dom.query("p").set("color","red").set("class","cls-red").set("onclick", function(){alert('clicked')});
		 * </pre>
		 *
		 * - 或 -
		 *
		 * <pre>
		 * Dom.query("p").set({
		 * 		"color":"red",
		 * 		"class":"cls-red",
		 * 		"onclick": function(){alert('clicked')}
		 * });
		 * </pre>
		 */
		set: function(options, value) {
			var me = this,
				key,
				setter;

			// .set(key, value)
			if (typeof options === 'string') {
				key = options;
				options = {};
				options[key] = value;
			}

			for (key in options) {
				value = options[key];
				
				// .setStyle(css, value)
				if (me.node.style && (key in me.node.style || rStyle.test(key)))
					me.setStyle(key, value);

				// .setKey(value)
				else if (Object.isFunction(me[setter = 'set' + key.capitalize()]))
					me[setter](value);

				// 如果是当前对象的成员。
				else if (key in me) {

					setter = me[key];

					// .key(value)
					if (Object.isFunction(setter))
						me[key](value);

					// .key.set(value)
					else if (setter && setter.set)
						setter.set(value);

					// .key = value
					else
						me[key] = value;
					
				// .on(event, value)
				} else if (/^on(\w+)/.test(key))
					me.on(RegExp.$1, value);

				// .setAttr(attr, value);
				else
					me.setAttr(key, value);

			}

			return me;

		},

		/**
		 * 为当前 Dom 对象添加指定的 Css 类名。
		 * @param {String} className 一个或多个要添加到元素中的CSS类名，用空格分开。
		 * @return this
		 * @example
		 * 为匹配的元素加上 'selected' 类。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").addClass("selected");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;p class="selected"&gt;Hello&lt;/p&gt; ]</pre>
		 *
		 * 为匹配的元素加上 selected highlight 类。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").addClass("selected highlight");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;p class="selected highlight"&gt;Hello&lt;/p&gt; ]</pre>
		 */
		addClass: function(className) {
			assert.isString(className, "Dom#addClass(className): {className} ~");

			var elem = this.node, classList = className.split(/\s+/), newClass, i;

			// 加速为不存在 class 的元素设置 class 。
			if (!elem.className && classList.length <= 1) {
				elem.className = className;

			} else {
				newClass = " " + elem.className + " ";

				for (i = 0; i < classList.length; i++) {
					if (newClass.indexOf(" " + classList[i] + " ") < 0) {
						newClass += classList[i] + " ";
					}
				}
				elem.className = newClass.trim();
			}

			return this;

		},

		/**
		 * 从当前 Dom 对象中删除全部或者指定的类。
		 * @param {String} [className] 一个或多个要删除的CSS类名，用空格分开。如果不提供此参数，将清空 className 。
		 * @return this
		 * @example
		 * 从匹配的元素中删除 'selected' 类
		 * #####HTML:
		 * <pre lang="htm" format="none">
		 * &lt;p class="selected first"&gt;Hello&lt;/p&gt;
		 * </pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").removeClass("selected");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">
		 * [ &lt;p class="first"&gt;Hello&lt;/p&gt; ]
		 * </pre>
		 */
		removeClass: function(className) {
			assert(!className || className.split, "Dom#removeClass(className): {className} ~");

			var elem = this.node, classList, newClass = "", i;

			if (className) {
				classList = className.split(/\s+/);
				newClass = " " + elem.className + " ";
				for (i = classList.length; i--;) {
					newClass = newClass.replace(" " + classList[i] + " ", " ");
				}
				newClass = newClass.trim();

			}

			elem.className = newClass;

			return this;

		},

		/**
		 * 如果存在（不存在）就删除（添加）一个类。
		 * @param {String} className CSS类名。
		 * @param {Boolean} [toggle] 自定义切换的方式。如果为 true， 则加上类名，否则删除。
		 * @return this
		 * @see #addClass
		 * @see #removeClass
		 * @example
		 * 为匹配的元素切换 'selected' 类
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p class="selected"&gt;Hello Again&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").toggleClass("selected");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;p class="selected"&gt;Hello&lt;/p&gt;, &lt;p&gt;Hello Again&lt;/p&gt; ]</pre>
		 */
		toggleClass: function(className, state) {
			return this[(state == undefined ? this.hasClass(className) : !state) ? 'removeClass' : 'addClass'](className);
		},

		/**
		 * 设置当前 Dom 对象的文本内容。对于输入框则设置其输入的值。
		 * @param {String} 用于设置元素内容的文本。
		 * @return this
		 * @see #setHtml
		 * @remark 与 {@link #setHtml} 类似, 但将编码 HTML (将 "&lt;" 和 "&gt;" 替换成相应的HTML实体)。
		 * @example
		 * 设定文本框的值。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;input type="text"/&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("input").setText("hello world!");</pre>
		 */
		setText: function(value) {
			this.node[textFix[this.node.nodeName] || propFix.innerText] = value;
			return this;
		},

		/**
		 * 设置当前 Dom 对象的 Html 内容。
		 * @param {String} value 用于设定HTML内容的值。
		 * @return this
		 * @example
		 * 设置一个节点的内部 html
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;div id="a"&gt;&lt;p/&gt;&lt;/div&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.get("a").setHtml("&lt;a/&gt;");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">&lt;div id="a"&gt;&lt;a/&gt;&lt;/div&gt;</pre>
		 */
		setHtml: function(value) {

			// 如果存在 <script> 或 <style> ，则不能使用 innerHTML 实现。
			if (/<(?:script|style)/i.test(value)) {
				this.empty().append(value);
				return this;
			}

			var elem = this.node,
				map = parseFix.$default;

			assert(elem.nodeType === 1, "Dom#setHtml(value): {elem} 不是元素节点(nodeType === 1), 无法执行 setHtml。", elem);

			try {

				// 对每个子元素清空内存。
				// each(elem.getElementsByTagName("*"), clean);

				// 内部执行 innerHTML 。
				elem.innerHTML = (map[1] + value + map[2]).replace(rXhtmlTag, "<$1></$2>");

				// 如果 innerHTML 出现错误，则直接使用节点方式操作。
			} catch (e) {
				this.empty().append(value);
				return this;
			}

			// IE6 需要包装节点，此处解除包装的节点。
			if (map[0] > 1) {
				value = elem.lastChild;
				elem.removeChild(elem.firstChild);
				elem.removeChild(value);
				while (value.firstChild)
					elem.appendChild(value.firstChild);
			}

			return this;
		},

		/**
		 * 设置当前 Dom 对象的显示大小。
		 * @param {Number/Point} x 要设置的宽或一个包含 x、y 属性的对象。如果不设置，使用 null 。
		 * @param {Number} y 要设置的高。如果不设置，使用 null 。
		 * @return this
		 * @remark
		 * 设置元素实际占用大小（包括内边距和边框，但不包括滚动区域之外的大小）。
		 *
		 * 此方法对可见和隐藏元素均有效。
		 * @example
		 * 设置 id=myP 的段落的大小。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p id="myP"&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.get("myP").setSize({x:200,y:100});</pre>
		 */
		setSize: function(x, y) {
			var me = this,
				p = formatPoint(x, y);

			if (p.x != null) me.setWidth(p.x - Dom.calc(me.node, 'bx+px'));

			if (p.y != null) me.setHeight(p.y - Dom.calc(me.node, 'by+py'));

			return me;
		},

		/**
		 * 获取当前 Dom 对象设置CSS宽度(width)属性的值（不带滚动条）。
		 * @param {Number} value 设置的宽度值。
		 * @return this
		 * @example
		 * 将所有段落的宽设为 20。
		 * <pre>Dom.query("p").setWidth(20);</pre>
		 */
		setWidth: styleFix.width,

		/**
		 * 获取当前 Dom 对象设置CSS高度(hidth)属性的值（不带滚动条）。
		 * @param {Number} value 设置的高度值。
		 * @return this
		 * @example
		 * 将所有段落的高设为 20。
		 * <pre>Dom.query("p").setHeight(20);</pre>
		 */
		setHeight: styleFix.height,

		/**
		 * 设置当前 Dom 对象相对父元素的偏移。
		 * @param {Point} offsetPoint 要设置的 x, y 对象。
		 * @return this
		 * @remark
		 * 此函数仅改变 CSS 中 left 和 top 的值。
		 * 如果当前对象的 position 是static，则此函数无效。
		 * 可以通过 {@link #setPosition} 强制修改 position, 或先调用 {@link Dom.movable} 来更改 position 。
		 *
		 * @example
		 * 设置第一段的偏移。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>
		 * Dom.query("p:first").setOffset({ x: 10, y: 30 });
		 * </pre>
		 * #####结果:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;left: 15, top: 15&lt;/p&gt;</pre>
		 */
		setOffset: function(offsetPoint) {

			assert(Object.isObject(offsetPoint), "Dom#setOffset(offsetPoint): {offsetPoint} 必须有 'x' 和 'y' 属性。", offsetPoint);
			var style = this.node.style;

			if (offsetPoint.y != null)
				style.top = offsetPoint.y + 'px';

			if (offsetPoint.x != null)
				style.left = offsetPoint.x + 'px';
			return this;
		},

		/**
		 * 设置当前 Dom 对象的绝对位置。
		 * @param {Number/Point} x 要设置的水平坐标或一个包含 x、y 属性的对象。如果不设置，使用 null 。
		 * @param {Number} y 要设置的垂直坐标。如果不设置，使用 null 。
		 * @return this
		 * @remark
		 * 如果对象原先的position样式属性是static的话，会被改成relative来实现重定位。
		 * @example
		 * 设置第二段的位置。
		 * #####HTML:
		 * <pre lang="htm" format="none">
		 * &lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;
		 * </pre>
		 * #####JavaScript:
		 * <pre>
		 * Dom.query("p:last").setPosition({ x: 10, y: 30 });
		 * </pre>
		 */
		setPosition: function(x, y) {
			var me = this,
				offset = me.getOffset().sub(me.getPosition()),
				offsetPoint = formatPoint(x, y);

			if (offsetPoint.y != null) offset.y += offsetPoint.y;
			else offset.y = null;

			if (offsetPoint.x != null) offset.x += offsetPoint.x;
			else offset.x = null;

			Dom.movable(me.node);

			return me.setOffset(offset);
		},

		/**
		 * 设置当前 Dom 对象的滚动条位置。
		 * @param {Number/Point} x 要设置的水平坐标或一个包含 x、y 属性的对象。如果不设置，使用 null 。
		 * @param {Number} y 要设置的垂直坐标。如果不设置，使用 null 。
		 * @return this
		 */
		setScroll: function(x, y) {
			var elem = this.node,
				offsetPoint = formatPoint(x, y);
				
			if(elem.nodeType !== 9){
				if (offsetPoint.x != null) elem.scrollLeft = offsetPoint.x;
				if (offsetPoint.y != null) elem.scrollTop = offsetPoint.y;
			} else {
				if(offsetPoint.x == null)
					offsetPoint.x = this.getScroll().x;
				if(offsetPoint.y == null)
					offsetPoint.y = this.getScroll().y;
				(elem.defaultView || elem.parentWindow).scrollTo(offsetPoint.x, offsetPoint.y);
			}
			
			return this;
			
		},
		
		/**
		 * 批量为当前 DOM 节点绑定事件。 
		 * @since 3.2
		 */
		bind: function(eventAndSelector, handler){
			
			var eventName, selector;
			
			if(Object.isObject(eventAndSelector)){
				for(eventName in eventAndSelector) {
					this.on(eventName, eventAndSelector[eventName]);
				}
			} else {
				
				eventName = (/^\w+/.match(eventAndSelector) || [''])[0];
					
				assert(eventName, "Dom#bind(eventAndSelector, handler): {eventAndSelector} 中不存在事件信息。正确的 eventAndSelector 格式： click.selector")
				
				if(selector = eventAndSelector.substr(eventName.length)){
					this.delegate(eventName, delegateEventName, handler);
				} else {
					this.on(eventName, handler);
				}
				
			}
			
			return this;
		},
		
		/**
		 * 模拟提交表单。
		 */
		submit: function(){
			
			// 当手动调用 submit 的时候，不会触发 submit 事件，因此手动模拟  #8
			
			var e = new Dom.Event(this.node, 'submit');
			this.trigger('submit', e);
			if(e.returnValue !== false){
				this.node.submit();
			}
			return this;
		},

		/**
		 * 通过当前 Dom 对象代理执行子节点的事件。
		 * @param {String} selector 筛选子节点的选择器。
		 * @param {String} type 绑定的事件名。
		 * @param {Function} fn 绑定的事件监听器。
		 * @remark
		 * 这个函数会监听子节点的事件冒泡，并使用 CSS 选择器筛选子节点。
		 *
		 * 这个方法是对 (@link #on} 的补充，比如有如下 HTML 代码:
		 * <pre lang="htm">
		 * &amp;lt;body&amp;gt;
		 * &amp;lt;div class=&quot;clickme&quot;&amp;gt;Click here&amp;lt;/div&amp;gt;
		 * &amp;lt;/body&amp;gt;
		 * </pre>
		 *
		 * 可以给这个元素绑定一个简单的click事件：
		 * <pre>
		 * Dom.query('.clickme').bind('click', function() {
		 * 	alert("Bound handler called.");
		 * });
		 * </pre>
		 *
		 * 使用 {@link #on} 时，函数会绑定一个事件处理函数，而以后再添加的对象则不会有。
		 * 而如果让父元素代理执行事件，则可以监听到动态增加的元素。比如:
		 *
		 * <pre>
		 * document.delegate('.clickme', 'click', function() {
		 * 	alert("Bound handler called.");
		 * });
		 * </pre>
		 *
		 * 这时，无论是原先存在的，还是后来动态创建的节点，只要匹配了　.clickme ，就可以成功触发事件。
		 */
		delegate: function(selector, eventName, handler) {

			assert.isString(selector, "Dom#delegate(selector, eventName, handler): {selector}  ~");
			assert.isString(eventName, "Dom#delegate(selector, eventName, handler): {eventName}  ~");
			assert.isFunction(handler, "Dom#delegate(selector, eventName, handler): {handler}  ~");

			var delegateEventName = 'delegate:' + eventName,
				delegateEvent,
				eventInfo = Dom.$event[eventName],
				initEvent,
				data = this.dataField();

			if (eventInfo && eventInfo.delegate) {
				eventName = eventInfo.delegate;
				initEvent = eventInfo.initEvent;
			}
			
			data = data.$event || (data.$event = {});
			delegateEvent = data[delegateEventName];
			
			if(!delegateEvent){
				data[delegateEventName] = delegateEvent = function(e) {
					
					// 获取原始的目标对象。
					var target = e.getTarget(),
					
						// 所有委托的函数信息。
						delegateHandlers = arguments.callee.handlers,
						
						actucalHandlers = [],
						
						i,
						
						handlerInfo,
						
						delegateTarget;
						
					for(i = 0; i < delegateHandlers.length; i++){
					
						handlerInfo = delegateHandlers[i];
						
						if((delegateTarget = target.closest(handlerInfo[1])) && (!initEvent || initEvent.call(delegateTarget, e) !== false)){
							actucalHandlers.push([handlerInfo[0], delegateTarget]);
						}
					}
					
					for(i = 0; i < actucalHandlers.length; i++) {
					
						handlerInfo = actucalHandlers[i];
						
						if(handlerInfo[0].call(handlerInfo[1], e) === false) {
							e.stopPropagation();
							e.preventDefault();
							break;
						}
					}
				
				};
				
				this.on(eventName, delegateEvent);
				
				delegateEvent.handlers = [];
			}
			
			delegateEvent.handlers.push([handler, selector]);
			
			return this;

		}

	})

	.implement({
		
		/**
		 * 获取当前 Dom 对象指定属性的样式。
		 * @param {String} name 需要读取的样式名。允许使用 css 原名字或其骆驼规则。
		 * @return {String} 返回样式对应的值。如果此样式未设置过，返回其默认值。 
		 * @example
		 * 取得 id=myP 的段落的color样式属性的值。
		 * <pre>Dom.get("myP").getStyle("color");</pre>
		 */
		getStyle: function(name) {
		
			var elem = this.node;
		
			assert.isString(name, "Dom#getStyle(name): {name} ~");
			assert(elem.style, "Dom#getStyle(name): 当 Dom 对象对应的节点不是元素，无法使用样式。");
		
			return elem.style[name = name.replace(rStyle, formatStyle)] || getStyle(elem, name);
		
		},
		
		/**
		 * 获取当前 Dom 对象的 HTML 属性值。
		 * @param {String} name 要获取的属性名称。
		 * @return {String} 返回属性值。如果元素没有相应属性，则返回 null 。
	 	 * @example
	 	 * 返回文档中 id="img" 的图像的src属性值。
	 	 * #####HTML:
	 	 * <pre lang="htm" format="none">&lt;img id="img" src="test.jpg"/&gt;</pre>
	 	 * #####JavaScript:
	 	 * <pre>Dom.get("img").getAttr("src");</pre>
	 	 * #####结果:
	 	 * <pre lang="htm" format="none">test.jpg</pre>
		 */
		getAttr: function(name, type) {
			return Dom.getAttr(this.node, name, type);
		},
	
		/**
		 * 取得当前 Dom 对象内容。对于输入框则获取其输入的值。
		 * @return {String} 文本内容。对普通节点返回 textContent 属性, 对输入框返回 value 属性， 对普通节点返回 nodeValue 属性。
		 * @remark 
		 * 结果是由所有匹配元素包含的文本内容组合起来的文本。这个方法对HTML和XML文档都有效。
		 * @example
		 * 获取文本框中的值。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;input type="text" value="some text"/&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("input").getText();</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">["some text"]</pre>
		 */
		getText: function() {
			return Dom.getText(this.node);
		},
	
		/**
		 * 取得当前 Dom 对象的html内容。
		 * @return {String} HTML 字符串。
		 * @example
		 * 获取 id="a" 的节点的内部 html。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;div id="a"&gt;&lt;p/&gt;&lt;/div&gt;</pre>
		 * #####JavaScript:
		 * <pre>$Dom.query("a").getHtml();</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">"&lt;p/&gt;"</pre>
		 */
		getHtml: function() {
			assert(this.node.nodeType === 1, "Dom#getHtml(): 仅当 dom.nodeType === 1 时才能使用此函数。"); 
			return this.node.innerHTML;
		},
	
		/**
		 * 获取当前 Dom 对象的可视区域大小。包括 border 大小。
		 * @return {Point} 位置。
		 * @remark
		 * 此方法对可见和隐藏元素均有效。
		 * 
		 * 获取元素实际占用大小（包括内边距和边框）。
		 * @example
		 * 获取第一段落实际大小。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p:first").getSize();</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">{x=200,y=100}</pre>
		 */
		getSize: function() {
			var elem = this.node,
				x,
				y;
				
			if(elem.nodeType !== 9){
				x = elem.offsetWidth;
				y = elem.offsetHeight;
			} else {
				elem = elem.documentElement;
				x = elem.clientWidth;
				y = elem.clientHeight;
			}
		
			return new Point(x, y);
		},
	
		/**
		 * 获取当前 Dom 对象的CSS width值。（不带滚动条）。
		 * @return {Number} 获取的值。
		 * 取得元素当前计算的宽度值（px）。
		 * @example
		 * 获取第一段的宽。
		 * <pre>Dom.query("p").item(0).getWidth();</pre>
		 * 
		 * 获取当前HTML文档宽度。
		 * <pre>document.getWidth();</pre>
		 */
		getWidth: function() {
			return styleNumber(this.node, 'width');
		},
	
		/**
		 * 获取当前 Dom 对象的CSS height值。（不带滚动条）。
		 * @return {Number} 获取的值。
		 * 取得元素当前计算的高度值（px）。
		 * @example
		 * 获取第一段的高。
		 * <pre>Dom.query("p").item(0).getHeight();</pre>
		 * 
		 * 获取当前HTML文档高度。
		 * <pre>document.getHeight();</pre>
		 */
		getHeight: function() {
			return styleNumber(this.node, 'height');
		},
	
		/**
		 * 获取当前 Dom 对象的滚动区域大小。
		 * @return {Point} 返回的对象包含两个整型属性：x 和 y。
		 * @remark
		 * getScrollSize 获取的值总是大于或的关于 getSize 的值。
		 * 
		 * 此方法对可见和隐藏元素均有效。
		 */
		getScrollSize: function() {
			var elem = this.node,
				x,
				y;
				
			if(elem.nodeType !== 9) {
				x = elem.scrollWidth;
				y = elem.scrollHeight;
			} else {
				var body = elem.body;
				elem = elem.documentElement;
				x = Math.max(elem.scrollWidth, body.scrollWidth, elem.clientWidth);
				y = Math.max(elem.scrollHeight, body.scrollHeight, elem.clientHeight);
			}
		
			return new Point(x, y);
		},
		
		/**
		 * 获取当前 Dom 对象的相对位置。
		 * @return {Point} 返回的对象包含两个整型属性：x 和 y。
		 * @remark
		 * 此方法只对可见元素有效。
		 * 
		 * 获取匹配元素相对父元素的偏移。
		 * @example
		 * 获取第一段的偏移
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
		 * #####JavaScript:<pre>
		 * var p = Dom.query("p").item(0);
		 * var offset = p.getOffset();
		 * trace( "left: " + offset.x + ", top: " + offset.y );
		 * </pre>
		 * #####结果:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;left: 15, top: 15&lt;/p&gt;</pre>
		 */
		getOffset: function() {
			// 如果设置过 left top ，这是非常轻松的事。
			var elem = this.node, left = elem.style.left, top = elem.style.top;
		
			// 如果未设置过。
			if(!left || !top) {
		
				// 绝对定位需要返回绝对位置。
				if(styleString(elem, "position") === 'absolute') {
					top = this.offsetParent();
					left = this.getPosition();
					if(!rBody.test(top.node.nodeName))
						left = left.sub(top.getPosition());
					left.x -= styleNumber(elem, 'marginLeft') + styleNumber(top.node, 'borderLeftWidth');
					left.y -= styleNumber(elem, 'marginTop') + styleNumber(top.node, 'borderTopWidth');
		
					return left;
				}
		
				// 非绝对的只需检查 css 的style。
				left = getStyle(elem, 'left');
				top = getStyle(elem, 'top');
			}
		
			// 碰到 auto ， 空 变为 0 。
			return new Point(parseFloat(left) || 0, parseFloat(top) || 0);
		},
	
		/**
		 * 获取当前 Dom 对象的绝对位置。
		 * @return {Point} 返回的对象包含两个整型属性：x 和 y。
		 * @remark
		 * 此方法只对可见元素有效。
		 * @example
		 * 获取第二段的偏移
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>
		 * var p = Dom.query("p").item(1);
		 * var position = p.getPosition();
		 * trace( "left: " + position.x + ", top: " + position.y );
		 * </pre>
		 * #####结果:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;left: 0, top: 35&lt;/p&gt;</pre>
		 */
		getPosition: function() {
			
			// 对于 document，返回 scroll 。
			if(this.node.nodeType === 9){
				return this.getScroll();
			}
		
			var elem = this.node, 
				bound = elem.getBoundingClientRect(),
				doc = getDocument(elem),
				html = doc.documentElement,
				htmlScroll = doc.getScroll();
			return new Point(bound.left + htmlScroll.x - html.clientLeft, bound.top + htmlScroll.y - html.clientTop);
		},
	
		/**
		 * 获取当前 Dom 对象的滚动条的位置。
		 * @return {Point} 返回的对象包含两个整型属性：x 和 y。
		 * @remark
		 * 此方法对可见和隐藏元素均有效。
		 *
		 * @example
		 * 获取第一段相对滚动条顶部的偏移。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;2nd Paragraph&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>
		 * var p = Dom.query("p").item(0);
		 * trace( "scrollTop:" + p.getScroll() );
		 * </pre>
		 * #####结果:
		 * <pre lang="htm" format="none">
		 * &lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;scrollTop: 0&lt;/p&gt;
		 * </pre>
		 */
		getScroll: function() {
			var elem = this.node,
				win,
				x,
				y;
			if(elem.nodeType !== 9){
				x = elem.scrollLeft;
				y = elem.scrollTop;
			} else if('pageXOffset' in (win = elem.defaultView || elem.parentWindow)) {
				x = win.pageXOffset;
				y = win.pageYOffset;
			} else {
				elem = elem.documentElement;
				x = elem.scrollLeft;
				y = elem.scrollTop;
			}
			
			return new Point(x, y);
		},

		/**
		 * 获取当前 Dom 对象的在原节点的位置。
		 * @param {Boolean} args=true 如果 args 为 true ，则计算文本节点。
		 * @return {Number} 位置。从 0 开始。
		 */
		index: function(args) {
			var i = 0, elem = this.node;
			while (elem = elem.previousSibling)
				if (elem.nodeType === 1 || args === true)
					i++;
			return i;
		},

		/**
		 * 获取当前 Dom 对象的指定位置的直接子节点。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。如果 args 是小于 0 的数字，则从末尾开始计算。
		 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
		 * @example
		 * 获取第1个子节点。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;p&gt;&lt;span&gt;Hello&lt;/span&gt;&lt;/p&gt;&lt;span&gt;Hello Again&lt;/span&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.find("span").child(1)</pre>
		 */
		child: function(args) {
			return ~args >= 0 ? this.last(~args) : this.first(args);
		},

		/**
		 * 获取当前 Dom 对象的父节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在 Dom 对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
		 * @example
		 * 找到每个span元素的所有祖先元素。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;p&gt;&lt;span&gt;Hello&lt;/span&gt;&lt;/p&gt;&lt;span&gt;Hello Again&lt;/span&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.find("span").parent()</pre>
		 */
		parent: createTreeWalker('parentNode'),

		/**
		 * 编辑当前 Dom 对象及父节点对象，找到第一个满足指定 CSS 选择器或函数的节点。
		 * @param {String/Function} [filter] 用于判断的元素的 CSS 选择器 或者 用于筛选元素的过滤函数。
		 * @param {Dom/String} [context=document] 只在指定的节点内搜索此元素。
		 * @return {Dom} 如果当前节点满足要求，则返回当前节点，否则返回一个匹配的父节点对象。如果不存在，则返回 null 。
		 * @remark
		 * closest 和 parent 最大区别就是 closest 会测试当前的元素。
		 */
		closest: function(selector, context) {
			selector = typeof selector === 'function' ? selector(this, this.node) : this.match(selector) ? this : this.parent(selector);
			return selector && (!context || Dom.get(context).has(selector)) ? selector : null;
		},

		/**
		 * 获取当前 Dom 对象的第一个子节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
		 * @example
		 * 获取匹配的第二个元素
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt; This is just a test.&lt;/p&gt; &lt;p&gt; So is this&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").first(1)</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;p&gt; So is this&lt;/p&gt; ]</pre>
		 */
		first: createTreeWalker('nextSibling', 'firstChild'),

		/**
		 * 获取当前 Dom 对象的最后一个子节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
		 * @example
		 * 获取匹配的第二个元素
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt; This is just a test.&lt;/p&gt; &lt;p&gt; So is this&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").getChild(1)</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;p&gt; So is this&lt;/p&gt; ]</pre>
		 */
		last: createTreeWalker('previousSibling', 'lastChild'),

		/**
		 * 获取当前 Dom 对象的下一个相邻节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
		 * @example
		 * 找到每个段落的后面紧邻的同辈元素。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;Hello Again&lt;/p&gt;&lt;div&gt;&lt;span&gt;And Again&lt;/span&gt;&lt;/div&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").getNext()</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;p&gt;Hello Again&lt;/p&gt;, &lt;div&gt;&lt;span&gt;And Again&lt;/span&gt;&lt;/div&gt; ]</pre>
		 */
		next: createTreeWalker('nextSibling'),

		/**
		 * 获取当前 Dom 对象的上一个相邻的节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
		 * @example
		 * 找到每个段落紧邻的前一个同辈元素。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;div&gt;&lt;span&gt;Hello Again&lt;/span&gt;&lt;/div&gt;&lt;p&gt;And Again&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").getPrevious()</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;div&gt;&lt;span&gt;Hello Again&lt;/span&gt;&lt;/div&gt; ]</pre>
		 *
		 * 找到每个段落紧邻的前一个同辈元素中类名为selected的元素。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;div&gt;&lt;span&gt;Hello&lt;/span&gt;&lt;/div&gt;&lt;p class="selected"&gt;Hello Again&lt;/p&gt;&lt;p&gt;And Again&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").getPrevious("div")</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;p class="selected"&gt;Hello Again&lt;/p&gt; ]</pre>
		 */
		prev: createTreeWalker('previousSibling'),

		/**
		 * 获取当前 Dom 对象的全部直接子节点。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {NodeList} 返回满足要求的节点的列表。
		 * @example
		 *
		 * 查找DIV中的每个子元素。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;div&gt;&lt;span&gt;Hello Again&lt;/span&gt;&lt;/div&gt;&lt;p&gt;And Again&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("div").getChildren()</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;span&gt;Hello Again&lt;/span&gt; ]</pre>
		 *
		 * 在每个div中查找 div。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;div&gt;&lt;span&gt;Hello&lt;/span&gt;&lt;p class="selected"&gt;Hello Again&lt;/p&gt;&lt;p&gt;And Again&lt;/p&gt;&lt;/div&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("div").getChildren("div")</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;p class="selected"&gt;Hello Again&lt;/p&gt; ]</pre>
		 */
		children: createTreeDir('nextSibling', 'firstChild'),

		/**
		 * 获取当前 Dom 对象以后的全部相邻节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {DomList} 返回一个 DomList 对象。
		 */
		nextAll: createTreeDir('nextSibling'),

		/**
		 * 获取当前 Dom 对象以前的全部相邻节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {DomList} 返回一个 DomList 对象。
		 */
		prevAll: createTreeDir('previousSibling'),

		/**
		 * 获取当前 Dom 对象以上的全部相邻节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {DomList} 返回一个 DomList 对象。
		 */
		parentAll: createTreeDir('parentNode'),

		/**
		 * 获取当前 Dom 对象的全部兄弟节点对象。
		 * @param {Integer/String/Function/Boolean} [filter] 用于查找子元素的 CSS 选择器 或者 元素在Control对象中的索引 或者 用于筛选元素的过滤函数 或者 true 则同时接收包含文本节点的所有节点。
		 * @return {DomList} 返回一个 DomList 对象。
		 */
		siblings: function(args) {
			return this.prevAll(args).add(this.nextAll(args));
		},

		/**
		 * 获取用于让当前 Dom 对象定位的父对象。
		 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
		 */
		offsetParent: function() {
			var me = this.node;
			while ((me = me.offsetParent) && !rBody.test(me.nodeName) && styleString(me, "position") === "static");
			return new Dom(me || getDocument(this.node).body);
		}

	}, 2)

	.implement({

		/**
		 * 获取当前节点内的全部子节点。
		 * @param {String} args="*" 要查找的节点的标签名。 * 表示返回全部节点。
		 * @return {DomList} 返回一个 DomList 对象。
		 */
		getElements: function(args) {

			var getElementsByTagName = 'getElementsByTagName';
			var elem = this[getElementsByTagName] ? this : this.node;
			args = args || "*";

			if (elem[getElementsByTagName]) {
				return elem[getElementsByTagName](args);
			}

			getElementsByTagName = 'querySelectorAll';
			if (elem[getElementsByTagName]) {
				return elem[getElementsByTagName](args);
			}

			return [];
		},
		
		/**
		 * 搜索所有与指定表达式匹配的元素。
		 * @param {String} 用于查找的表达式。
		 * @return {NodeList} 返回满足要求的节点的列表。
		 * @example
		 * 从所有的段落开始，进一步搜索下面的span元素。与Dom.query("p span")相同。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;&lt;span&gt;Hello&lt;/span&gt;, how are you?&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").query("span")</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;span&gt;Hello&lt;/span&gt; ]</pre>
		 */
		query: function(selector){
			assert.isString(selector, "Dom#find(selector): selector ~。");
			assert(selector, "Dom#find(selector): {selector} 不能为空。", selector);
			var elem = this.node, result;
			
			if(elem.nodeType !== 1) {
				return document.query.call(this, selector)
			}
			
			try{ 
				var oldId = elem.id, displayId = oldId;
				if(!oldId){
					elem.id = displayId = '__SELECTOR__';
					oldId = 0;
				}
				result = elem.querySelectorAll('#' + displayId +' ' + selector);
			} catch(e) {
				result = query(selector, this);
			} finally {
				if(oldId === 0){
					elem.removeAttribute('id');
				}
			}
			
			
			
			return new DomList(result);
		},
	
		/**
		 * 创建并返回当前 Dom 对象的副本。
		 * @param {Boolean} deep=true 是否复制子元素。
		 * @param {Boolean} cloneDataAndEvent=false 是否复制数据和事件。
		 * @param {Boolean} keepId=false 是否复制 id 。
		 * @return {Dom} 新 Dom 对象。
		 *
		 * @example
		 * 克隆所有b元素（并选中这些克隆的副本），然后将它们前置到所有段落中。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;b&gt;Hello&lt;/b&gt;&lt;p&gt;, how are you?&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("b").clone().prependTo("p");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">&lt;b&gt;Hello&lt;/b&gt;&lt;p&gt;&lt;b&gt;Hello&lt;/b&gt;, how are you?&lt;/p&gt;</pre>
		 */
		clone: function(deep, cloneDataAndEvent, keepId) {
		
			var elem = this.node,
				clone = elem.cloneNode(deep = deep !== false);
			
			if(elem.nodeType === 1){
				if (deep) {
					for (var elemChild = elem.getElementsByTagName('*'), cloneChild = clone.getElementsByTagName('*'), i = 0; cloneChild[i]; i++)
						cleanClone(elemChild[i], cloneChild[i], cloneDataAndEvent, keepId);
				}
			
				cleanClone(elem, clone, cloneDataAndEvent, keepId);
			}
		
			return new this.constructor(clone);
		}
	 
	}, 3)

	.implement({

		/**
		 * 搜索所有与指定CSS表达式匹配的第一个元素。
		 * @param {String} selecter 用于查找的表达式。
		 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
		 * @example
		 * 从所有的段落开始，进一步搜索下面的span元素。与Dom.find("p span")相同。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;&lt;span&gt;Hello&lt;/span&gt;, how are you?&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").find("span")</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">[ &lt;span&gt;Hello&lt;/span&gt; ]</pre>
		 */
		find: function(selector) {
			assert.isString(selector, "Dom#find(selector): selector ~");
			var elem = this.node, result;
			if (elem.nodeType !== 1) {
				return document.find.call(this, selector)
			}

			try {
				var oldId = elem.id, displayId = oldId;
				if (!oldId) {
					elem.id = displayId = '__SELECTOR__';
					oldId = 0;
				}
				result = elem.querySelector('#' + displayId + ' ' + selector);
			} catch (e) {
				result = query(selector, this)[0];
			} finally {
				if (oldId === 0) {
					elem.removeAttribute('id');
				}
			}

			return result ? new Dom(result) : null;
		},

		/**
		 * 检查当前 Dom 对象是否含有某个特定的类。
		 * @param {String} className 要判断的类名。只允许一个类名。
		 * @return {Boolean} 如果存在则返回 true。
		 * @example
		 * 隐藏包含有某个类的元素。
		 * #####HTML:
		 * <pre lang="htm" format="none">
		 * &lt;div class="protected"&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;
		 * </pre>
		 * #####JavaScript:
		 * <pre>Dom.query("div").on('click', function(){
		 * 	if ( this.hasClass("protected") )
		 * 		this.hide();
		 * });
		 * </pre>
		 */
		hasClass: function(className) {
			return Dom.hasClass(this.node, className);
		},
		
		/**
		 * 检查当前 Dom 对象是否符合指定的表达式。
		 * @param {String} String
		 * @return {Boolean} 如果匹配表达式就返回 true，否则返回  false 。
		 * @example
		 * 由于input元素的父元素是一个表单元素，所以返回true。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;form&gt;&lt;input type="checkbox" /&gt;&lt;/form&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("input[type='checkbox']").match("input")</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">true</pre>
		 */
		match: function (selector) {
			return Dom.match(this.node, selector);
		},
		
		/**
		 * 判断当前元素是否是隐藏的。
		 * @return {Boolean} 当前元素已经隐藏返回 true，否则返回  false 。
		 */
		isHidden: function(){
			return Dom.isHidden(this.node);
		},
		
		/// TODO: clear
		
		hasChild: function(dom, allowSelf){
			assert.deprected("Dom#hasChild 已过时，请改用 Dom#has");
			return this.has(dom, allowSelf);
		},
		
		/// TODO: clear
		
		/**
		 * 判断一个节点是否有子节点。
		 * @param {Dom} dom 子节点。
		 * @param {Boolean} allowSelf=false 如果为 true，则当当前节点等于指定的节点时也返回 true 。
		 * @return {Boolean} 存在子节点则返回true 。
		 */
		has: function(dom, allowSelf){
			if(typeof dom === "string")
				return (allowSelf && this.match(dom)) || !!this.find(dom);
				
			dom = Dom.getNode(dom);
			
			return (allowSelf && this.node === dom) || Dom.has(this.node, dom);
		}
		
	}, 4);
	
	/// #endregion

	Object.each({

		/**
		 * 插入一个HTML 到末尾。
		 * @param {String/Node/Dom} html 要插入的内容。
		 * @return {Dom} 返回插入的新节点对象。
		 */
		append: function(ctrl, dom) {
			return ctrl.insertBefore(dom, null);
		},

		/**
		 * 插入一个HTML 到顶部。
		 * @param {String/Node/Dom} html 要插入的内容。
		 * @return {Dom} 返回插入的新节点对象。
		 */
		prepend: function(ctrl, dom) {
			return ctrl.insertBefore(dom, ctrl.first(true));
		},

		/**
		 * 插入一个HTML 到前面。
		 * @param {String/Node/Dom} html 要插入的内容。
		 * @return {Dom} 返回插入的新节点对象。
		 */
		before: function(ctrl, dom) {
			var p = ctrl.parentControl || ctrl.parent();
			return p ? p.insertBefore(dom, ctrl) : null;
		},

		/**
		 * 插入一个HTML 到后面。
		 * @param {String/Node/Dom} html 要插入的内容。
		 * @return {Dom} 返回插入的新节点对象。
		 */
		after: function(ctrl, dom) {
			var p = ctrl.parentControl || ctrl.parent();
			return p ? p.insertBefore(dom, ctrl.next(true)) : null;
		},

		/**
		 * 将一个节点用另一个节点替换。
		 * @param {String/Node/Dom} html 用于将匹配元素替换掉的内容。
		 * @return {Element} 替换之后的新元素。
		 * 将所有匹配的元素替换成指定的HTML或DOM元素。
		 * @example
		 * 把所有的段落标记替换成加粗的标记。
		 * #####HTML:
		 * <pre lang="htm" format="none">&lt;p&gt;Hello&lt;/p&gt;&lt;p&gt;cruel&lt;/p&gt;&lt;p&gt;World&lt;/p&gt;</pre>
		 * #####JavaScript:
		 * <pre>Dom.query("p").replaceWith("&lt;b&gt;Paragraph. &lt;/b&gt;");</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">&lt;b&gt;Paragraph. &lt;/b&gt;&lt;b&gt;Paragraph. &lt;/b&gt;&lt;b&gt;Paragraph. &lt;/b&gt;</pre>
		 *
		 * 用第一段替换第三段，可以发现他是移动到目标位置来替换，而不是复制一份来替换。
		 * #####HTML:<pre lang="htm" format="none">
		 * &lt;div class=&quot;container&quot;&gt;
		 * &lt;div class=&quot;inner first&quot;&gt;Hello&lt;/div&gt;
		 * &lt;div class=&quot;inner second&quot;&gt;And&lt;/div&gt;
		 * &lt;div class=&quot;inner third&quot;&gt;Goodbye&lt;/div&gt;
		 * &lt;/div&gt;
		 * </pre>
		 * #####JavaScript:
		 * <pre>Dom.find('.third').replaceWith(Dom.find('.first'));</pre>
		 * #####结果:
		 * <pre lang="htm" format="none">
		 * &lt;div class=&quot;container&quot;&gt;
		 * &lt;div class=&quot;inner second&quot;&gt;And&lt;/div&gt;
		 * &lt;div class=&quot;inner first&quot;&gt;Hello&lt;/div&gt;
		 * &lt;/div&gt;
		 * </pre>
		 */
		replaceWith: function(ctrl, dom) {
			var parent;
			if (parent = (ctrl.parentControl || ctrl.parent())) {
				dom = parent.insertBefore(dom, ctrl);
				parent.removeChild(ctrl);
			}
			return dom;
		}

	}, function(value, key) {
		dp[key] = function(html) {
			html = Dom.parse(html, this);

			var scripts,
				i = 0,
				script,
				r = value(this, html);

			if (html.node.tagName === 'SCRIPT') {
				scripts = [html.node];
			} else {
				scripts = html.getElements('SCRIPT');
			}

			// 如果存在脚本，则一一执行。
			while (script = scripts[i++]) {
				if (!script.type || /\/(java|ecma)script/i.test(script.type)) {

					if (script.src) {
						assert(window.Ajax && Ajax.send, "必须载入 System.Request.Script 模块以支持动态执行 <script src=''>");
						Ajax.send({
							url: script.src,
							type: "GET",
							dataType: 'script',
							async: false
						});
						//    script.parentNode.removeChild(script);
					} else {
						window.execScript(script.text || script.textContent || script.innerHTML || "");
					}

				}
			}

			return r;
		};

		DomList.prototype[key] = function(html) {
			var r;
			if (typeof html === 'string') {
				r = new DomList(this.invoke(key, [html]));
			} else {
				r = new DomList;
				html = Dom.get(html);
				this.forEach(function(value) {
					var cloned = html.clone();
					Dom.get(value)[key](cloned);
					r.push(cloned.node);
				});
			}
			return r;
		};

	});
	
	// Dom 函数。
	Dom.defineMethods('node', 'scrollIntoView focus blur select click reset', 1);
	
	/// #region document
	
	/**
	 * 获取当 Dom 对象实际对应的 HTML 节点实例。
	 * @type Node
	 * @protected
	 */
	document.node = document;
	
	/**
	 * 搜索所有与指定CSS表达式匹配的第一个元素。
	 * @param {String} selecter 用于查找的表达式。
	 * @return {Dom} 返回一个节点对象。如果不存在，则返回 null 。
	 * @example
	 * 从所有的段落开始，进一步搜索下面的span元素。与Dom.find("p span")相同。
	 * #####HTML:
	 * <pre lang="htm" format="none">&lt;p&gt;&lt;span&gt;Hello&lt;/span&gt;, how are you?&lt;/p&gt;</pre>
	 * #####JavaScript:
	 * <pre>Dom.query("p").find("span")</pre>
	 * #####结果:
	 * <pre lang="htm" format="none">[ &lt;span&gt;Hello&lt;/span&gt; ]</pre>
	 */
	document.find = function(selector){
		assert.isString(selector, "Dom#find(selector): selector ~");
		var result;
		try{
			result = this.querySelector(selector);
		} catch(e) {
			result = query(selector, this)[0];
		}
		return result ? new Dom(result) : null;
	};
	
	/**
	 * 执行选择器。
	 * @method
	 * @param {String} selecter 选择器。 如 h2 .cls attr=value 。
	 * @return {Element/undefined} 节点。
	 */
	document.query = function(selector){
		assert.isString(selector, "Dom#find(selector): selector ~。");
		var result;
		try{
			result = this.querySelectorAll(selector);
		} catch(e) {
			result = query(selector, this);
		}
		return new DomList(result);
	};
	
	// 拷贝 DOM Event 到 document 。
	t = document.constructor;
	if(t){
		t.$event = Dom.$event;
		t.base = Dom.base;
	} else {
		document.constructor = Dom;
	}

	// document 函数。
	map('on un trigger once delegate dataField getElements getPosition getSize getScroll setScroll getScrollSize first last parent child children has', function (fnName) {
		document[fnName] = dp[fnName];
	});
	
	/// #endregion

	/// #region DomList
	
	// DomList 函数。
	map("slice splice reverse unique shift pop unshift push include indexOf each forEach", function (fnName, index) {
		DomList.prototype[fnName] = index < 4 ? function() {
			return new DomList(ap[fnName].apply(this, arguments));
		} : ap[fnName];
	});
	
	/// #endregion

	/// #region Event

	map("$default mousewheel blur focus scroll change select submit resize error load unload touchstart touchmove touchend hashchange", defaultEvent, Dom.$event);
	
	/// #if CompactMode

	if(isStd) {

	/// #endif

		domReady = 'DOMContentLoaded';
		t = Event.prototype;
		
		/// TODO: clear
		t.stop = ep.stop;
		
		/// TODO: clear
		t.getTarget = ep.getTarget;
		
	/// #if CompactMode
	
	} else {

		domReady = 'readystatechange';
		
		defaultEvent.initEvent = function (e) {
			e.target = e.srcElement;
		
		/// TODO: clear
			e.stop = ep.stop;
		
		/// TODO: clear
			e.getTarget = ep.getTarget;
			e.stopPropagation = ep.stopPropagation;
			e.preventDefault = ep.preventDefault;
		};
		
		mouseEvent = {
			initEvent: function (e) {
			    if (!e.getTarget) {
			        defaultEvent.initEvent(e);
					var node = getDocument(e.target).node;
					e.relatedTarget = e.fromElement === e.srcElement ? e.toElement: e.fromElement;
					e.pageX = e.clientX + node.scrollLeft;
					e.pageY = e.clientY + node.scrollTop;
					e.layerX = e.x;
					e.layerY = e.y;
					// 1 ： 单击 2 ： 中键点击 3 ： 右击
					e.which = e.button & 1 ? 1: e.button & 2 ? 3: e.button & 4 ? 2: 0;

				}
			}
		};
		
		keyEvent = {
			initEvent: function (e) {
				defaultEvent.initEvent(e);
				e.which = e.keyCode;
			}
		};

		Dom.cloneFix.SCRIPT = 'text';

		styleFix.opacity = function(value){
			var elem = this.node, style = elem.style;

			assert(!+value || (value <= 1 && value >= 0), 'Dom#setStyle("opacity", value): {value} 必须在 0~1 间。', value);
			assert.isElement(elem, "Dom#setStyle(name, value): 当前 dom 不支持样式");

			if (value)
				value *= 100;
			value = value || value === 0 ? 'opacity=' + value : '';

			// 获取真实的滤镜。
			elem = styleString(elem, 'filter');

			assert(!/alpha\([^)]*\)/i.test(elem) || rOpacity.test(elem), 'Dom#setOpacity(value): 当前元素的 {filter} CSS属性存在不属于 alpha 的 opacity， 将导致 setOpacity 不能正常工作。', elem);

			// 当元素未布局，IE会设置失败，强制使生效。
			style.zoom = 1;

			// 设置值。
			style.filter = rOpacity.test(elem) ? elem.replace(rOpacity, value) : (elem + ' alpha(' + value + ')');

			return this;

		};

		defaultHook.get = function(elem, name) {

			if (!elem.getAttributeNode) {
				return defaultHook.getProp(elem, name);
			}

			// 获取属性节点，避免 IE 返回属性。
			name = elem.getAttributeNode(name);

			// 如果不存在节点， name 为 null ，如果不存在节点值， 返回 null。
			return name ? name.value || (name.specified ? "" : null) : null;

		};

		defaultHook.set = formHook.set = function(elem, name, value) {

			if (elem.getAttributeNode) {

				// 获取原始的属性节点。
				var node = elem.getAttributeNode(name);

				// 如果 value === null 表示删除节点。
				if (value === null) {

					// 仅本来存在属性时删除节点。
					if (node) {
						node.nodeValue = '';
						elem.removeAttributeNode(node);
					}

					// 本来存在属性值，则设置属性值。
				} else if (node) {
					node.nodeValue = value;
				} else {
					elem.setAttribute(name, value);
				}

			} else {
				defaultHook.setProp(elem, name, value);
			}
		};

		// IE678 无法获取 style 属性，改用 style.cssText 获取。
		attrFix.style = {
			get: function(elem, name) {
				return elem.style.cssText.toLowerCase() || null;
			},
			set: function(elem, name, value) {
				elem.style.cssText = value || '';
			}
		};

		if (navigator.isQuirks) {
			
			// IE 6/7 获取 Button 的value会返回文本。
			attrFix.value = {
				
				_get: attrFix.value.get,
				
				get: function(elem, name, type) {
					return elem.tagName === 'BUTTON' ? defaultHook.get(elem, name) : this._get(elem, name, type);
				},
				
				set: function(elem, name, value) {
					if(elem.tagName === 'BUTTON') {
						defaultHook.set(elem, name, value);
					} else {
						elem.value = value || '';
					}
				}
			};

			// IE 6/7 会自动添加值到下列属性。
			attrFix.href = attrFix.src = attrFix.useMap = attrFix.width = attrFix.height = {

				get: function(elem, name) {
					return elem.getAttribute(name, 2);
				},

				set: function(elem, name, value) {
					elem.setAttribute(name, value);
				}
			};

			// IE 6/7 在设置 contenteditable 为空时报错。
			attrFix.contentEditable = {

				get: function(elem, name) {

					// 获取属性节点，避免 IE 返回属性。
					name = elem.getAttributeNode(name);

					// 如果不存在节点， name 为 null ，如果不存在节点值， 返回 null。
					return name && name.specified ? name.value : null;

				},

				set: function(elem, name, value) {
					if (value === null) {
						elem.removeAttributeNode(elem.getAttributeNode(name));
					} else {
						defaultHook.set(elem, name, value || "false");
					}
				}
			};
	
			try {
	
				// 修复IE6 因 css 改变背景图出现的闪烁。
				document.execCommand("BackgroundImageCache", false, true);
			} catch(e) {
	
			}

		}

	}
	
	Dom.addEvents("click dblclick mousedown mouseup mouseover mouseenter mousemove mouseleave mouseout contextmenu selectstart selectend", mouseEvent);
	
	Dom.addEvents("keydown keypress keyup", keyEvent);

	if(div.onfocusin === undefined) {

		Dom.addEvents('focusin focusout', {
			fix: function(elem, type, fnName) {
				var base = type === 'focusin' ? 'focus' : 'blur';
				var doc = elem.node.ownerDocument || elem.node;
				doc[fnName](base, this.handler, true);
			},
			handler: function(e) {
				var type = e.orignalType = e.type === 'focus' ? 'focusin' : 'focusout';

				var p = e.getTarget();

				while (p) {
					if (!p.trigger(type, e)) {
						return;
					}
					p = p.parent();
				}

				document.trigger(type, e);
			},
			add: function(elem, type, fn) {
				this.fix(elem, type, 'addEventListener');
			},
			remove: function() {
				this.fix(elem, type, 'removeEventListener');
			}
		});

	}

	if(div.onmousewheel === undefined) {
		Dom.addEvents('mousewheel', {
			base: 'DOMMouseScroll'
		});
	}
	
	// Firefox 会在右击时触发 document.onclick 。
	if(navigator.isFirefox) {
		Dom.addEvents('click', {
			initEvent: function(e){
				return e.which === undefined || e.which === 1;
			}
		});
	}
	
	Object.each({
		'mouseenter': 'mouseover',
		'mouseleave': 'mouseout'
	}, function(fix, event) {
		Dom.addEvents(event, {
			initEvent: function (e) {
				
				// 如果浏览器原生支持 mouseenter/mouseleave, 不作操作。
				if(e.type !== event) {
					
					var relatedTarget = e.relatedTarget;
		
					// 修正 getTarget 返回值。
					e.orignalType = event;
					return this.node !== relatedTarget && !Dom.has(this.node, relatedTarget);
					
				}
			},
			base: div.onmouseenter === null ? null : fix,
			delegate: fix
		});
	});
	
	Dom.addEvents('focus', {
			delegate: 'focusin'
		}).addEvents('blur', {
			delegate: 'focusout'
		});
	
	/// #endregion

	/// #region DomReady

	/**
	 * 设置在页面加载(不包含图片)完成时执行函数。
	 * @param {Functon} fn 当DOM加载完成后要执行的函数。
	 * @member Dom.ready
	 * @remark
	 * 允许你绑定一个在DOM文档载入完成后执行的函数。需要把页面中所有需要在 DOM 加载完成时执行的Dom.ready()操作符都包装到其中来。
	 * 
        @example
          当DOM加载完成后，执行其中的函数。
          #####JavaScript:<pre>Dom.ready(function(){
  // 文档就绪
});</pre>
        
	 */

	/**
	 * 设置在页面加载(包含图片)完成时执行函数。
	 * @param {Functon} fn 执行的函数。
	 * @member Dom.load
	 * @remark
	 * 允许你绑定一个在DOM文档载入完成后执行的函数。需要把页面中所有需要在 DOM 加载完成时执行的Dom.load()操作符都包装到其中来。
        @example
          当DOM加载完成后，执行其中的函数。
          #####JavaScript:<pre>Dom.load(function(){
  // 文档和引用的资源文件加载完成
});</pre>
        
	 */

	// 避免使用了默认的 DOM 事件处理。
	Dom.$event.domready = Dom.$event.domload = {};

	map('ready load', function(readyOrLoad, isLoad) {

		var isReadyOrIsLoad = isLoad ? 'isLoaded': 'isReady';
		
		readyOrLoad = 'dom' + readyOrLoad;

		// 设置 ready load
		return function (fn, scope) {
			
			// 忽略参数不是函数的调用。
			var isFn = Object.isFunction(fn);

			// 如果已载入，则直接执行参数。
			if(Dom[isReadyOrIsLoad]) {

				if (isFn)
					fn.call(scope);

				// 如果参数是函数。
			} else if (isFn) {

				document.on(readyOrLoad, fn, scope);

				// 触发事件。
				// 如果存在 JS 之后的 CSS 文件， 肯能导致 document.body 为空，此时延时执行 DomReady
			} else if (document.body) {

				// 如果 isReady, 则删除
				if(isLoad) {

					// 使用系统文档完成事件。
					isFn = Dom.window;
					fn = readyOrLoad;

					// 确保 ready 触发。
					Dom.ready();

				} else {
					isFn = document;
					fn = domReady;
				}

				defaultEvent.remove(isFn, fn, arguments.callee);

				// 先设置为已经执行。
				Dom[isReadyOrIsLoad] = true;

				// 触发事件。
				if (document.trigger(readyOrLoad, fn)) {

					// 删除事件。
					document.un(readyOrLoad);

				}
				
			} else {
				setTimeout(arguments.callee, 1);
			}

			return document;
		};

	}, Dom);
	
	// 如果readyState 不是 complete, 说明文档正在加载。
	if(document.readyState !== "complete") {

		// 使用系统文档完成事件。
		defaultEvent.add(document, domReady, Dom.ready);

		defaultEvent.add(Dom.window, 'load', Dom.load, false);

		/// #if CompactMode
		
		// 只对 IE 检查。
		if(!isStd) {

			// 来自 jQuery
			// 如果是 IE 且不是框架
			var topLevel = false;

			try {
				topLevel = window.frameElement == null && document.documentElement;
			} catch(e) {
			}

			if(topLevel && topLevel.doScroll) {

				/**
				 * 为 IE 检查状态。
				 * @private
				 */
				(function doScrollCheck() {
					if(Dom.isReady) {
						return;
					}

					try {
						// Use the trick by Diego Perini
						// http://javascript.nwbox.com/IEContentLoaded/
						topLevel.doScroll("left");
					} catch(e) {
						return setTimeout(doScrollCheck, 50);
					}

					Dom.ready();
				})();
			}
		}

		/// #endif
	} else {
		setTimeout(Dom.load, 1);
	}
	
	/// #endregion

	/// #region Export
	
	div = null;
	
	// 导出函数。
	window.Dom = Dom;
	window.DomList = DomList;
	window.Point = Point;
	window.$ = window.$ || Dom.get;
	window.$$ = window.$$ || Dom.query;
	
	/// #endregion

	/**
	 * @class
	 */

	/**
	 * 创建 DomList 的方法。 
	 * @param {NodeList} fnName 对应的 Dom 对象的函数名。
	 * @param {Integer} listType=0 函数类型。
	 */
	function createDomListMthod(fnName, listType){
		return !listType ? function () {
			// 为每个 Dom 对象调用 fnName 。
			var i = 0, len = this.length, target;
			while(i < len) {
				target = new Dom(this[i++]);
				target[fnName].apply(target, arguments);
			}
			return this;
		} : listType === 2 ? function() {
			// 返回第一个元素的对应值 。
			if(this.length) {
				var target = new Dom(this[0]);
				return target[fnName].apply(target, arguments);
			}
		} : listType === 3 ? function() {
			// 将返回的每个节点放入新的 DomList 中。
			var r = new DomList;
			return r.add.apply(r, this.invoke(fnName, arguments));
		} : function() {
			// 只要有一个返回非 false，就返回这个值。
			var i = 0, r, target;
			while (i < this.length && !r) {
				target = new Dom(this[i++]);
				r = target[fnName].apply(target, arguments);
			}
			return r;
		};
	}
	
	/**
	 * 遍历 NodeList 对象。 
	 * @param {NodeList} nodelist 要遍历的 NodeList。
	 * @param {Function} fn 遍历的函数。
	 */
	function each(nodelist, fn) {
		var i = 0, node;
		while( node = nodelist[i++]){
			fn(node);
		}
	}

	/**
	 * 获取元素的文档。
	 * @param {Node} node 元素。
	 * @return {Document} 文档。
	 */
	function getDocument(node) {
		assert.isNode(node, 'Dom.getDocument(node): {node} ~', node);
		return node.ownerDocument || node.document || node;
	}

	/**
	 * 返回简单的遍历函数。
	 * @param {String} next 获取下一个成员使用的名字。
	 * @param {String} first=next 获取第一个成员使用的名字。
	 * @return {Function} 遍历函数。
	 */
	function createTreeWalker(next, first) {
		first = first || next;
		return function(args) {
			var node = this.node[first];
			
			// 如果存在 args 编译为函数。
			if(args){
				args = getFilter(args);
			}
			
			while(node) {
				if(args ? args.call(this, node) : node.nodeType === 1)
					return new Dom(node);
				node = node[next];
			}
			
			return null;
		};
	}

	/**
	 * 返回简单的遍历函数。
	 * @param {String} next 获取下一个成员使用的名字。
	 * @param {String} first=next 获取第一个成员使用的名字。
	 * @return {Function} 遍历函数。
	 */
	function createTreeDir(next, first) {
		first = first || next;
		return function(args) {
			var node = this.node[first],
				r = new DomList;

			// 如果存在 args 编译为函数。
			if (args) {
				args = getFilter(args);
			}

			while (node) {
				if (args ? args.call(this, node) : node.nodeType === 1)
					r.push(node);
				node = node[next];
			}

			return r;
		}
	}
	
	/**
	 * 获取一个选择器。
	 * @param {Number/Function/String/Boolean} args 参数。
	 * @return {Funtion} 函数。
	 */
	function getFilter(args) {
		
		// 如果存在 args，则根据不同的类型返回不同的检查函数。
		switch (typeof args) {
			
			// 数字返回一个计数器函数。
			case 'number':
				return function(elem) {
					return elem.nodeType === 1 && --args < 0;
				};
				
				// 字符串，表示选择器。
			case 'string':
				if(/^(?:[-\w:]|[^\x00-\xa0]|\\.)+$/.test(args)) {
					args = args.toUpperCase();
					return function(elem) {
						return elem.nodeType === 1 && elem.tagName === args;
					};
				}
				return args === '*' ? null : function(elem) {
					return elem.nodeType === 1 && Dom.match(elem, args);
				};
				
				// 布尔类型，而且是 true, 返回 Function.from(true)，  表示不过滤。
			case 'boolean':
				args = returnTrue;
				break;
			
		}

		assert.isFunction(args, "Dom#xxxAll(args): {args} 必须是一个 null、函数、数字或字符串。", args);
		
		return args;
	}
	
	/**
	 * 删除由于拷贝导致的杂项。
	 * @param {Element} srcElem 源元素。
	 * @param {Element} destElem 目的元素。
	 * @param {Boolean} cloneDataAndEvent=true 是否复制数据。
	 * @param {Boolean} keepId=false 是否留下ID。
	 */
	function cleanClone(srcElem, destElem, cloneDataAndEvent, keepId) {

		// 删除重复的 ID 属性。
		if(!keepId && destElem.removeAttribute)
			destElem.removeAttribute('id');

		/// #if CompactMode
		
		if(destElem.clearAttributes) {

			// IE 会复制 自定义事件， 清楚它。
			destElem.clearAttributes();
			destElem.mergeAttributes(srcElem);
			destElem.$data = null;

			if(srcElem.options) {
				each(srcElem.options, function(value) {
					destElem.options.seleced = value.seleced;
				});
			}
		}

		/// #endif

		if (cloneDataAndEvent !== false && (cloneDataAndEvent = srcElem.$data)) {

			destElem.$data = cloneDataAndEvent = extend({}, cloneDataAndEvent);
			
			// event 作为系统内部对象。事件的拷贝必须重新进行 on 绑定。
			var event = cloneDataAndEvent.$event, dest;

			if (event) {
				cloneDataAndEvent.$event = null;
				dest = new Dom(destElem);
				for (cloneDataAndEvent in event)

					// 对每种事件。
					event[cloneDataAndEvent].handlers.forEach(function(handler) {

						// 如果源数据的 target 是 src， 则改 dest 。
						dest.on(cloneDataAndEvent, handler[0], handler[1].node === srcElem ? dest : handler[1]);
					});
			}
			
		}
		
		// 特殊属性复制。
		if (keepId = Dom.cloneFix[srcElem.tagName]) {
			if (typeof keepId === 'string') {
				destElem[keepId] = srcElem[keepId];
			} else {
				keepId(destElem, srcElem);
			}
		}
	}

	/**
	 * 清除节点的引用。
	 * @param {Element} elem 要清除的元素。
	 */
	function clean(elem) {

		// 删除自定义属性。
		if(elem.clearAttributes)
			elem.clearAttributes();

		// 删除事件。
		new Dom(elem).un();

		// 删除句柄，以删除双重的引用。
		elem.$data = null;

	}

	/**
	 * 到骆驼模式。
	 * @param {String} all 全部匹配的内容。
	 * @param {String} match 匹配的内容。
	 * @return {String} 返回的内容。
	 */
	function formatStyle(all, match) {
		return match ? match.toUpperCase(): styleFloat;
	}

	/**
	 * 读取样式字符串。
	 * @param {Element} elem 元素。
	 * @param {String} name 属性名。
	 * @return {String} 字符串。
	 */
	function styleString(elem, name) {
		assert.isElement(elem, "Dom.styleString(elem, name): {elem} ~");
		return elem.style[name] || getStyle(elem, name);
	}

	/**
	 * 读取样式数字。
	 * @param {Object} elem 元素。
	 * @param {Object} name 属性名。
	 * @return {Number} 数字。
	 */
	function styleNumber(elem, name) {
		assert.isElement(elem, "Dom.styleNumber(elem, name): {elem} ~");
		var value = parseFloat(elem.style[name]);
		if(!value && value !== 0) {
			value = parseFloat(getStyle(elem, name));

			if(!value && value !== 0) {
				if( name in styleFix) {
					
					var styles = {};
					for(var style in Dom.displayFix) {
						styles[style] = elem.style[style];
					}
					
					extend(elem.style, Dom.displayFix);
					value = parseFloat(getStyle(elem, name)) || 0;
					extend(elem.style, styles);
				} else {
					value = 0;
				}
			}
		}

		return value;
	}

	/**
	 * 转换参数为标准点。
	 * @param {Number} x X坐标。
	 * @param {Number} y Y坐标。
	 * @return {Object} {x:v, y:v}
	 */
	function formatPoint(x, y) {
		return x && typeof x === 'object' ? x: {
			x: x,
			y: y
		};
	}
	
	/**
	 * 判断指定选择器是否符合指定的节点。 
	 * @param {Node} node 判断的节点。
	 * @param {String} selector 选择器表达式。
	 */
	function match(node, selector){
		var r, i = 0;
		try{
			r = node.parentNode.querySelectorAll(selector);
		} catch(e){
			return query(selector, new Dom(node.parentNode)).indexOf(node) >= 0 || query(selector, Dom.document).indexOf(node) >= 0;
		}
		while(r[i])
			if(r[i++] === node)
				return true;
		
		return false;
	}

	/// #region Selector
	
	/**
	 * 使用指定的选择器代码对指定的结果集进行一次查找。
	 * @param {String} selector 选择器表达式。
	 * @param {DomList/Dom} result 上级结果集，将对此结果集进行查找。
	 * @return {DomList} 返回新的结果集。
	 */
	function query(selector, result) {

		var prevResult = result,
			rBackslash = /\\/g, 
			m, 
			key, 
			value, 
			lastSelector, 
			filterData;
		
		selector = selector.trim();

		// 解析分很多步进行，每次解析  selector 的一部分，直到解析完整个 selector 。
		while(selector) {
			
			// 保存本次处理前的选择器。
			// 用于在本次处理后检验 selector 是否有变化。
			// 如果没变化，说明 selector 不能被正确处理，即 selector 包含非法字符。
			lastSelector = selector;
			
			// 解析的第一步: 解析简单选择器
			
			// ‘*’ ‘tagName’ ‘.className’ ‘#id’
			if( m = /^(^|[#.])((?:[-\w\*]|[^\x00-\xa0]|\\.)+)/.exec(selector)) {
				
				// 测试是否可以加速处理。
				if(!m[1] || (result[m[1] === '#' ? 'getElementById' : 'getElementsByClassName'])) {
					selector = RegExp.rightContext;
					switch(m[1]) {
						
						// ‘#id’
						case '#':
							result = result.getElementById(m[2]);
							result = result ? [result] : null;
							break;
							
							// ‘.className’
						case '.':
							result = result.getElementsByClassName(m[2]);
							break;
							
							// ‘*’ ‘tagName’
						default:
							result = result.getElements(m[2].replace(rBackslash, ""));
							break;
								
					}
		
					// 如果仅仅为简单的 #id .className tagName 直接返回。
					if (!selector) {
						return new DomList(result);
					}
							
				// 无法加速，等待第四步进行过滤。
				} else {
					result = result.getElements();
				}
			
				// 解析的第二步: 解析父子关系操作符(比如子节点筛选)
			
				// ‘a>b’ ‘a+b’ ‘a~b’ ‘a b’ ‘a *’
			} else if(m = /^\s*([\s>+~<])\s*(\*|(?:[-\w*]|[^\x00-\xa0]|\\.)*)/.exec(selector)) {
				selector = RegExp.rightContext;
				
				var value = m[2].replace(rBackslash, "");
				
				switch(m[1]){
					case ' ':
						result = result.getElements(value);
						break;
						
					case '>':
						result = result.children(value);
						break;
						
					case '+':
						result = result.next(value);
						break;
						
					case '~':
						result = result.nextAll(value);
						break;
						
					case '<':
						result = result.parentAll( value);
						break;
						
					default:
						throwError(m[1]);
				}
				
				// ‘a>b’: m = ['>', 'b']
				// ‘a>.b’: m = ['>', '']
				// result 始终实现了  Dom 接口，所以保证有 Dom.combinators 内的方法。

				// 解析的第三步: 解析剩余的选择器:获取所有子节点。第四步再一一筛选。
			} else {
				result = result.getElements();
			}
		
			// 强制转 DomList 以继续处理。
			if(!(result instanceof DomList)){
				result = new DomList(result);
			}
			
			// 解析的第四步: 筛选以上三步返回的结果。
	
			// ‘#id’ ‘.className’ ‘:filter’ ‘[attr’
			while(m = /^([#\.:]|\[\s*)((?:[-\w]|[^\x00-\xa0]|\\.)+)/.exec(selector)) {
				selector = RegExp.rightContext;
				value = m[2].replace(rBackslash, "");
				
				// ‘#id’: m = ['#','id']
				
				// 筛选的第一步: 分析筛选器。
	
				switch (m[1]) {
	
					// ‘#id’
					case "#":
						filterData = ["id", "=", value];
						break;
	
						// ‘.className’
					case ".":
						filterData = ["class", "~=", value];
						break;
	
						// ‘:filter’
					case ":":
						filterData = Dom.pseudos[value] || throwError(value);
						args = undefined;
	
						// ‘selector:nth-child(2)’
						if( m = /^\(\s*("([^"]*)"|'([^']*)'|[^\(\)]*(\([^\(\)]*\))?)\s*\)/.exec(selector)) {
							selector = RegExp.rightContext;
							args = m[3] || m[2] || m[1];
						}
						
						
						break;
	
						// ‘[attr’
					default:
						filterData = [value.toLowerCase()];
						
						// ‘selector[attr]’ ‘selector[attr=value]’ ‘selector[attr='value']’  ‘selector[attr="value"]’    ‘selector[attr_=value]’
						if( m = /^\s*(?:(\S?=)\s*(?:(['"])(.*?)\2|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/.exec(selector)) {
							selector = RegExp.rightContext;
							if(m[1]) {
								filterData[1] = m[1];
								filterData[2] = m[3] || m[4];
								filterData[2] = filterData[2] ? filterData[2].replace(/\\([0-9a-fA-F]{2,2})/g, function (x, y) {
									return String.fromCharCode(parseInt(y, 16));
								} 
								).replace(rBackslash, "") : "";
							}
						}
						break;
				}
		
				var args, 
					oldResult = result,
					i = 0,
					elem;
				
				// 筛选的第二步: 生成新的集合，并放入满足的节点。
				
				result = new DomList();
				if(filterData.call) {
					
					// 仅有 2 个参数则传入 oldResult 和 result
					if(filterData.length === 3){
						filterData(args, oldResult, result);
					} else {
						while(elem = oldResult[i++]) {
							if(filterData(elem, args))
								result.push(elem);
						}
					}
				} else {
					while(elem = oldResult[i++]){
						var actucalVal = Dom.getAttr(elem, filterData[0], 1),
							expectedVal = filterData[2],
							tmpResult;
						switch(filterData[1]){
							case undefined:
								tmpResult = actucalVal != null;
								break;
							case '=':
								tmpResult = actucalVal === expectedVal;
								break;
							case '~=':
								tmpResult = (' ' + actucalVal + ' ').indexOf(' ' + expectedVal + ' ') >= 0;
								break;
							case '!=':
								tmpResult = actucalVal !== expectedVal;
								break;
							case '|=':
								tmpResult = ('-' + actucalVal + '-').indexOf('-' + expectedVal + '-') >= 0;
								break;
							case '^=':
								tmpResult = actucalVal && actucalVal.indexOf(expectedVal) === 0;
								break;
							case '$=':
								tmpResult = actucalVal && actucalVal.substr(actucalVal.length - expectedVal.length) === expectedVal;
								break;
							case '*=':
								tmpResult = actucalVal && actucalVal.indexOf(expectedVal) >= 0;
								break;
							default:
								throw 'Not Support Operator : "' + filterData[1] + '"'
						}
						
						if(tmpResult){
							result.push(elem);	
						}
					}
				}
			}
			
			// 最后解析 , 如果存在，则继续。

			if( m = /^\s*,\s*/.exec(selector)) {
				selector = RegExp.rightContext;
				return result.add(query(selector, prevResult));
			}


			if(lastSelector.length === selector.length){
				throwError(selector);
			}
		}
		
		return result;
	}
		
	/**
	 * 抛出选择器语法错误。 
 	 * @param {String} message 提示。
	 */
	function throwError(message) {
		throw new SyntaxError('An invalid or illegal string was specified : "' + message + '"!');
	}

	/// #endregion
	
})(this);

/*********************************************************
 * Controls.Core.Base
 ********************************************************/
/**
 * @author  xuld
 */




/**
 * 所有控件基类。
 * @class Control
 * @abstract
 * 控件的周期：
 * constructor - 创建控件对应的 Javascript 类。不建议重写构造函数，除非你知道你在做什么。
 * create - 创建本身的 dom 节点。 可重写 - 默认使用 this.tpl 创建。
 * init - 初始化控件本身。 可重写 - 默认为无操作。
 * attach - 渲染控件到文档。不建议重写，如果你希望额外操作渲染事件，则重写。
 * detach - 删除控件。不建议重写，如果一个控件用到多个 dom 内容需重写。
 */
var Control = Dom.extend({

	/**
	 * 存储当前控件的默认模板字符串。
	 * @getter {String} tpl
	 * @protected
	 * @virtual
	 */

	/**
	 * 当被子类重写时，生成当前控件。
	 * @param {Object} options 选项。
	 * @protected
	 * @virtual
	 */
	create: function () {

		assert.isString(this.tpl, "Control#create: 无法获取或创建当前控件所关联的 DOM 节点。请为控件定义 tpl 属性或重写 create 函数。");

		// 转为对 tpl解析。
		return Dom.parseNode(this.tpl.replace(/x-control/g, 'x-' + this.xtype));
	},

	/**
	 * 当被子类重写时，渲染控件。
	 * @method
	 * @param {Object} options 配置。
	 * @protected virtual
	 */
	init: Function.empty,

	/**
	 * 初始化一个新的控件。
	 * @param {String/Element/Control/Object} [options] 对象的 id 或对象或各个配置。
	 */
	constructor: function (options) {

		// 这是所有控件共用的构造函数。
		var me = this,

			// 临时的配置对象。
			opt = {},

			// 当前实际的节点。
			node;

		// 如果存在配置。
		if (options) {

			// 如果 options 是纯配置。
			if (options.constructor === Object) {
				
				Object.extend(opt, options);
				
				if(opt.node) {
					node = opt.node;
					delete opt.node;
				} else if(opt.selector) {
					node = Dom.find(opt.selector);
					delete opt.selector;
				} else if(opt.dom) {
					node = opt.dom;
					delete opt.dom;
				}
					
				if(node){
					node = Dom.getNode(node);
				}
				
			} else {
				node = Dom.getNode(options);
			}

		}

		// 如果 dom 的确存在，使用已存在的， 否则使用 create(opt)生成节点。
		me.node = node || me.create(opt);

		assert.isNode(me.node, "Dom#constructor(options): Dom 对象的 {node} 不是节点。", me.node);

		// 调用 init 初始化控件。
		me.init(opt);

		//// 如果指定的节点已经在 DOM 树上，且重写了 attach 方法，则调用之。
		//if (me.node.parentNode && me.attach !== Control.prototype.attach) {
		//	me.attach(me.node.parentNode, me.node.nextSibling);
		//}

		// 复制各个选项。
		me.set(opt);
	},

	/**
	 * xtype 。
	 * @virtual
	 */
	xtype: "control"

});
/*********************************************************
 * Controls.Core.ContainerControl
 ********************************************************/
/**
 * @author  xuld
 */

/**
 * 所有容器控件的基类。
 * @abstract class 
 * @extends Control
 */
var ContainerControl = Control.extend({
	
	// 基本属性
	
	tpl: '<div class="x-control">\
			<div class="x-control-body"></div>\
		</div>',
		
	headerTpl: '<div class="x-control-header"><h4></h4></div>',
	
	/**
	 * 获取当前容器的标题部分。
	 * @return {Control}
	 */
	header: function(){
		return this.find('.x-' + this.xtype + '-header');
	},
	
	/**
	 * 获取当前容器的内容部分。
	 * @getter {Control}
	 */
	body: function(){
		return this.find('.x-' + this.xtype + '-body') || this;
	},
	
	// 基本操作
	
	/**
	 * 获取当前容器显示的标题。
	 * @param {Boolean} valueAsText 是否编码 *value* 中的 HTML 字符串。
	 */
	getTitle: function(valueAsText){
		
		// 获取 header 。
		var header = this.header();
		
		// 如果存在 header， 最后一个节点即  title 标签 。
		return header ? (header.last() || header)[valueAsText ? 'getText' : 'getHtml']() : null;
	},
	
	/**
	 * 设置当前容器显示的标题。
	 * @param {String} value 要设置的标题。
	 * @param {Boolean} valueAsText 是否编码 *value* 中的 HTML 字符串。
	 */
	setTitle: function(value, valueAsText){
		
		// 获取 header 。
		var header = this.header(), title;
		
		if(value === null){
			header && header.remove();
		} else {
			
            // 如果不存在标题，则创建一个。
			if(!header){
				header = this.prepend(this.headerTpl.replace(/control/g, this.xtype));
			}
			
			// 获取或创建 title 。
			title = header.last() || header;
			
			// 设置内容。
			title[valueAsText ? 'setText' : 'setHtml'](value);
			
		}
		return this;
	},
	
	/**
	 * 获取当前容器显示的内容。
	 * @param {Boolean} valueAsText 是否编码 *value* 中的 HTML 字符串。
	 */
	getContent: function(valueAsText){
		
		// 获取 body 。
		// 获取 content 。
		var body = this.body(), content = body.last();
		
		// 如果存在多个 content，使用 body 作为 content。
		if (!content || content.prev()) {
			content = body;
		}
		
		// 获取实际的内容。
		return content[valueAsText ? 'getText' : 'getHtml']();
		
	},
	
	/**
	 * 设置当前容器显示的内容。
	 * @param {String} value 要设置的标题。
	 * @param {Boolean} valueAsText 是否编码 *value* 中的 HTML 字符串。
	 */
	setContent: function(value, valueAsText){
		
		// 获取 body 。
		var body = this.body(), 
			contentClass = 'x-' + this.xtype + '-content', 
			
			// 获取 content 。
			content = body.find(contentClass);

	    // 如果不存在 content，则创建一个。
		if (!content) {
		    body.setHtml('<div class="' + contentClass + '"></div>');
		    content = body.first();
		}
		
		// 设置文本内容。
		content[valueAsText ? 'setText' : 'setHtml'](value);
		return this;
		
	},
	
	getText: function(){
		return this.getContent(true);
	},
	
	setText: function(value){
		return this.setContent(value, true);
	},
	
	getHtml: function(){
		return this.getContent(false);
	},
	
	setHtml: function(value){
		return this.setContent(value, false);
	}

});
/*********************************************************
 * Controls.Container.Panel
 ********************************************************/
/**
/*********************************************************
 * System.Dom.Align
 ********************************************************/
/**
 * @author xuld 
 */


/**
 * 为控件提供按控件定位的方法。
 * @interface
 */
Dom.implement((function(){
	
	var aligners = {
			
			xc: function (opt) {
				opt.x = opt.tp.x + (opt.ts.x - opt.s.x) / 2 + opt.ox;
			},
			
			ol: function(opt, r){
				opt.x = opt.tp.x - opt.s.x - opt.ox;
				
				if(r > 0 && opt.x <= opt.dp.x) {
					aligners.or(opt, --r);
				}
			},
			
			or: function(opt, r){
				opt.x = opt.tp.x + opt.ts.x + opt.ox;
				
				if(r > 0 && opt.x + opt.s.x >= opt.dp.x + opt.ds.x) {
					aligners.ol(opt, --r);
				}
			},
			
			il: function (opt, r) {
				opt.x = opt.tp.x + opt.ox;
				
				if(r > 0 && opt.x + opt.s.x >= opt.dp.x + opt.ds.x) {
					aligners.ir(opt, --r);
				}
			},
			
			ir: function (opt, r) {
				opt.x = opt.tp.x + opt.ts.x - opt.s.x - opt.ox;
				
				if(r > 0 && opt.x <= opt.dp.x) {
					aligners.il(opt, --r);
				}
			},
			
			yc: function (opt) {
				opt.y = opt.tp.y + (opt.ts.y - opt.s.y) / 2 + opt.oy;
			},
			
			ot: function(opt, r){
				opt.y = opt.tp.y - opt.s.y - opt.oy;
				
				if(r > 0 && opt.y <= opt.dp.y) {
					aligners.ob(opt, --r);
				}
			},
			
			ob: function(opt, r){
				opt.y = opt.tp.y + opt.ts.y + opt.oy;
				
				if(r > 0 && opt.y + opt.s.y >= opt.dp.y + opt.ds.y) {
					aligners.ot(opt, --r);
				}
			},
			
			it: function (opt, r) {
				opt.y = opt.tp.y + opt.oy;
				
				if(r > 0 && opt.y + opt.s.y >= opt.dp.y + opt.ds.y) {
					aligners.ib(opt, --r);
				}
			},
			
			ib: function (opt, r) {
				opt.y = opt.tp.y + opt.ts.y - opt.s.y - opt.oy;
				
				if(r > 0 && opt.y <= opt.dp.y) {
					aligners.it(opt, --r);
				}
			}
			
		},
		
		setter = Object.map({
			bl: 'il ob',
			rt: 'or it',
			rb: 'or ib',
			lt: 'ol it',
			lb: 'ol ib',
			br: 'ir ob',
			tr: 'ir ot',
			tl: 'il ot',
			rc: 'or yc',
			bc: 'xc ob',
			tc: 'xc ot',
			lc: 'ol yc',
			cc: 'xc yc',
			
			'~lb': 'il ib',
			'~rt': 'ir it',
			'~rb': 'ir ib',
			'~lt': 'il it',
			'~rc': 'ir yc',
			'~bc': 'xc ib',
			'~tc': 'xc it',
			'~lc': 'il yc',
			
			'^lb': 'ol ob',
			'^rt': 'or ot',
			'^rb': 'or ob',
			'^lt': 'ol ot'
			
		}, function(value){
			value = value.split(' ');
			value[0] = aligners[value[0]];
			value[1] = aligners[value[1]];
			return value;
		}, {});
			
		/*
		 *      tl   tc   tr
		 *      ------------
		 *   lt |          | rt
		 *      |          |
		 *   lc |    cc    | rc
		 *      |          |
		 *   lb |          | rb
		 *      ------------
		 *      bl   bc   br
		 */
	
	return {
		
		/**
		 * 基于某个控件，设置当前控件的位置。改函数让控件显示都目标的右侧。
		 * @param {Controls} ctrl 目标的控件。
		 * @param {String} align 设置的位置。如 lt rt 。完整的说明见备注。
		 * @param {Number} offsetX 偏移的X大小。
		 * @param {Number} offsetY 偏移的y大小。
		 * @param {Boolean} enableReset 如果元素超出屏幕范围，是否自动更新节点位置。
		 * @memberOf Control
		 */
		align: function(ctrl, position, offsetX, offsetY, enableReset) {
					
			assert(!position || position in setter, "Control.prototype.align(ctrl, position,  offsetX, offsetY): {position} 必须是 l r c 和 t b c 的组合。如 lt", position);
			
			ctrl = ctrl instanceof Dom ? ctrl : Dom.get(ctrl);
			position = setter[position] || setter.lb;
			
			var opt = {
				s: this.getSize(),
				ts: ctrl.getSize(),
				tp: ctrl.getPosition(),
				ds: document.getSize(),
				dp: document.getPosition(),
				ox: offsetX,
				oy: offsetY
			}, r = enableReset === false ? 0 : 2;
			
			position[0](opt, r);
			position[1](opt, r);
			
			return this.setPosition(opt);
		}
		
	};
	
})());


/*********************************************************
 * Controls.Core.IDropDownOwner
 ********************************************************/
/**
 * @author xuld
 */

/**
 * 所有支持下拉菜单的组件实现的接口。
 * @interface IDropDownOwner
 */
var IDropDownOwner = {
	
	/**
	 * 获取或设置当前实际的下拉菜单。
	 * @protected
	 * @type {Control}
	 */
	dropDown: null,
	
	/**
	 * 下拉菜单的宽度。
	 * @config {String}
	 * @defaultValue -1
	 * @return 如果值为 'auto', 则和父容器有同样的宽度。如果设为 -1， 表示不处理宽度。
	 */
	dropDownWidth: -1,
	
	onDropDownShow: function(){
		this.trigger('dropdownshow');
	},
	
	onDropDownHide: function(){
		this.trigger('dropdownhide');
	},

	createDropDown: function (existDom) {
	    return existDom;
	},
	
	/**
	 * 获取当前控件的下拉菜单。
	 * @return {Control} 
	 */
	getDropDown: function () {
	    var dropDown = this.dropDown;

	    if (!dropDown) {
	        dropDown = this.next();
	        if (dropDown && !dropDown.hasClass('x-dropdown')) {
	            dropDown = null;
	        }

	        this.dropDown = this.createDropDown(dropDown);
	    }
	    
	    return this.dropDown;
	},
	
	attach: function(parentNode, refNode){
		if(this.dropDown && !this.dropDown.parent('body')) {
			this.dropDown.attach(parentNode, refNode);
		}
		Dom.prototype.attach.call(this, parentNode, refNode);
	},
	
	detach: function(parentNode){
		Dom.prototype.detach.call(this, parentNode);
		if(this.dropDown) {
			this.dropDown.detach(parentNode);
		}
	},

	setDropDown: function (dom) {

	    if (dom) {

	        // 修正下拉菜单为 Control 对象。
	        dom = dom instanceof Dom ? dom : Dom.get(dom);

	        // 设置下拉菜单。
	        this.dropDown = dom.addClass('x-dropdown').hide();

	        // 如果当前节点已经添加到 DOM 树，则同时添加 dom 。
	        if (!dom.parent('body')) {

                // 添加菜单到 DOM 树。
	            this.after(dom);

	            // IE6/7 无法自动在父节点无 z-index 时处理 z-index 。
	            if (navigator.isQuirks && dom.parent().getStyle('zIndex') === 0)
	                dom.parent().setStyle('zIndex', 1);
	        }
	    } else if (this.dropDown) {
	        this.dropDown.remove();
	        this.dropDown = null;
	    }
		
		return this;
	},
	
	dropDownHidden: function () {
	    return this.dropDown && Dom.isHidden(this.dropDown.node);
	},
	
	realignDropDown: function (offsetX, offsetY) {
		this.dropDown.align(this, 'bl', offsetX, offsetY);
		return this;
	},
	
	toggleDropDown: function (e) {

        // 如果是因为 DOM 事件而切换菜单，则测试是否为 disabled 状态。
	    if (e) {
	        if (this.getAttr('disabled') || this.getAttr('readonly')) {
	            return this;
	        }
	        this._dropDownTrigger = e.target;
	    }
		return this[this.dropDownHidden() ? 'showDropDown' : 'hideDropDown']();
	},
	
	showDropDown: function(){

	    var dropDown = this.dropDown;

	    if (this.dropDownHidden()) {
	        dropDown.show();
	        this.realignDropDown(0, -1);

	        var size = this.dropDownWidth;
	        if (size === 'auto') {
	            size = this.getSize().x;

	            // 不覆盖 min-width
	            if (size < Dom.styleNumber(dropDown.node, 'min-width'))
	                size = -1;
	        }

	        if (size >= 0) {
	            dropDown.setSize(size);
	        }

	        this.onDropDownShow();

	        document.on('mouseup', this.hideDropDown, this);
	    } else {
	        this.realignDropDown(0, -1);
	    }
		
		return this;
	},
	
	hideDropDown: function (e) {
		
		var dropDown = this.dropDown;
		
		if(dropDown && !this.dropDownHidden()){
			
			// 如果是来自事件的关闭，则检测是否需要关闭菜单。
			if(e){
				e = e.target;
				if([this._dropDownTrigger, dropDown.node, this.node].indexOf(e) >= 0 || Dom.has(dropDown.node, e) || Dom.has(this.node, e)) 
					return this;
			}
			
			this.onDropDownHide();
			dropDown.hide();
			document.un('mouseup', this.hideDropDown);
			
		}
		
		return this;
	}
	
};

/*********************************************************
 * Controls.Core.IInput
 ********************************************************/
/**
 * @author xuld
 */

/**
 * 所有表单输入控件实现的接口。
 * @interface IInput
 */
var IInput = {

    /**
	 * 获取或设置当前输入域的状态。
	 * @protected
	 */
    state: function (name, value) {
        return this.toggleClass('x-' + this.xtype + '-' + name, value);
    },

    /**
	 * 当设置文本时执行此函数。
	 */
    onChange: function () {
        this.trigger('change');
    },
	
	/**
	 * 获取或设置当前表单的实际域。
	 * @protected
	 * @type {Control}
	 */
	hiddenField: null,
	
	///**
	// * 创建用于在表单内保存当前输入值的隐藏域。
	// * @return {Dom} 隐藏输入域。
	// */
	//createHiddenField: function(){
	//    return Dom.parse('<input type="hidden">').appendTo(this).setAttr('name', Dom.getAttr(this.node, 'name'));
	//},
	
	/**
	 * 获取当前输入域实际用于提交数据的表单域。
	 * @return {Dom} 一个用于提交表单的数据域。
     * @remark 此函数会在当前控件内搜索可用于提交的表单域，如果找不到，则创建返回一个 hidden 表单域。
	 */
	input: function(){
		
		// 如果不存在隐藏域。
		if(!this.hiddenField) {
			
			// 如果 当前元素是表单元素，直接返回。
			if(/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(this.node.tagName)){
				return new Dom(this.node);
			}
			
			this.hiddenField = this.find("input,select,textarea") || Dom.parse('<input type="hidden">').appendTo(this).setAttr('name', Dom.getAttr(this.node, 'name'));
		}
		
		return this.hiddenField;
	},
	
	/**
	 * 获取当前控件所在的表单。
	 * @return {Dom} 表单。
	 */
	form: function () {
		return Dom.get(this.input().node.form);
	},
	
	/**
	 * 选中当前控件。
	 * @return this
	 */
	select: function(){
		Dom.prototype.select.apply(this.input(), arguments);
		return this;
	},
	
	setAttr: function (name, value) {
		var dom = this;
		if (/^(disabled|readonly|checked|selected|actived)$/i.test(name)) {
		    value = value !== false;
		    this.state(name.toLowerCase(), value);
		    dom = this.input();
		} else if(/^(value|name|form)$/i.test(name)) {
			dom = this.input();
		}
		
		Dom.prototype.setAttr.call(dom, name, value);
		return this;
	},
	
	getAttr: function (name, type) {
		return Dom.getAttr((/^(disabled|readonly|checked|selected|actived|value|name|form)$/i.test(name) ? this.input() : this).node, name, type);
	},
	
	getText: function(){
		return Dom.getText(this.input().node);
	},
	
	setText: function(value){
		var old = this.getText();
		Dom.prototype.setText.call(this.input(), value);
		if(old !== value)
			this.onChange();
			
		return this;
	}
	
};
/*********************************************************
 * Controls.Form.Picker
 ********************************************************/
/**
 * @author  xuld
 */

/**
 * 表示一个数据选择器。
 * @abstract class
 * @extends Control
 */
var Picker = Control.extend(IInput).implement(IDropDownOwner).implement({

    tpl: '<span class="x-picker">\
			<input type="text" class="x-textbox"/>\
		</span>',

    dropDownListTpl: '<span class="x-picker">\
			<a href="javascript:;" class="x-button">A</a>\
		</span>',

    menuButtonTpl: '<button class="x-button" type="button"><span class="x-button-menu"></span></button>',

    /**
	 * 当前控件是否为下拉列表。
	 */
    dropDownList: false,

    /**
	 * 下拉框的宽度。
	 */
    dropDownWidth: 'auto',

    /**
	 * @config dropDownList 是否允许用户输入自定义的文本值。
	 */

    create: function (options) {
        return Dom.parseNode(options.dropDownList ? this.dropDownListTpl : this.tpl);
    },

    /**
	 * 获取当前控件的按钮部分。
	 */
    button: function () {
        return this.find('button');
    },

    /**
	 * @protected
	 * @override
	 */
    init: function () {

        // 如果是 <input> 或 <a> 直接替换为 x-picker
        if (!this.first() && !this.hasClass('x-picker')) {
            var elem = this.node;

            // 创建 x-picker 组件。
            this.node = Dom.createNode('span', 'x-picker x-' + this.xtype);

            // 替换当前节点。
            if (elem.parentNode) {
                elem.parentNode.replaceChild(this.node, elem);
            }

            // 插入原始 <input> 节点。
            this.prepend(elem);
        }

        // 如果没有下拉菜单按钮，添加之。
        if (!this.button()) {
            this.append(this.menuButtonTpl);
        }

        // 初始化菜单。
        this.setDropDown(this.getDropDown());

        if (!this.hasOwnProperty('dropDownList') && this.first().node.tagName !== 'INPUT') {
            this.dropDownList = true;
        }

        // 设置菜单显示的事件。
        (this.dropDownList ? this : this.button()).on('click', this.toggleDropDown, this);

    },

    setWidth: function (value) {
        var first = this.first();
        if (value >= 0) {
            value -= this.getWidth() - first.getWidth();
        }
        first.setWidth(value);
        return this;
    },

    state: function (name, value) {
        value = value !== false;
        if (name == "disabled" || name == "readonly") {

            // 为按钮增加 disabled 样式。
            this.query('.x-button,button').setAttr("disabled", value).toggleClass("x-button-disabled", value);

            // 为文本框增加设置样式。
            this.input().setAttr(name, value).toggleClass("x-textbox-" + name, value);

        } else if (name == "actived") {
            this.query('.x-button,button').toggleClass("x-button-actived", value);
        } else {
            IInput.state.call(this, name, value);
        }

        return this;
    },

    // 下拉菜单

    onDropDownShow: function () {
        // 默认选择当前值。
        this.updateDropDown();
        this.state('actived', true);
        return IDropDownOwner.onDropDownShow.apply(this, arguments);
    },

    onDropDownHide: function () {
        this.state('actived', false);
        return IDropDownOwner.onDropDownHide.apply(this, arguments);
    },

    /**
	 * 将当前文本的值同步到下拉菜单。
	 * @protected virtual
	 */
    updateDropDown: Function.empty

})
.addEvents('change', {
    add: function (picker, type, fn) {
        Dom.$event.$default.add(picker.input(), type, fn);
    },
    remove: function (picker, type, fn) {
        Dom.$event.$default.remove(picker.input(), type, fn);
    }
});





/*********************************************************
 * Controls.Core.ListControl
 ********************************************************/
/**
 * @author  xuld
 */


/**
 * 表示所有管理多个有序列的子控件的控件基类。
 * @class ListControl
 * @extends ScrollableControl
 * ListControl 封装了使用  &lt;ul&gt; 创建列表控件一系列方法。
 */
var ListControl = Control.extend({
	
	/**
	 * 模板。
	 */
	tpl: '<ul class="x-control"/>',
	
	// 内部实现的项操作
		
	/**
	 * 当新控件被添加时执行。
	 * @param {Control} childControl 新添加的元素。
	 * @param {Control} refControl 元素被添加的位置。
	 * @protected override
	 */
	insertBefore: function(childControl, refControl) {
		
		// 如果 childControl 不是 <li>, 则包装一个 <li> 标签。
		if (childControl.node.tagName !== 'LI') {

			// 创建 <li>
			var li = Dom.create('LI');
			
			// 复制节点。
			li.append(childControl);
			
			// 赋值。
			childControl = li;
		}

		// 自动加上 clazz 。
		childControl.addClass('x-' + this.xtype + '-item');
		
		// 插入 DOM 树。
		childControl.attach(this.node, refControl && refControl.node || null);
			
		// 返回新创建的子控件。
		return childControl;
	},

	/**
	 * 当新控件被移除时执行。
	 * @param {Object} childControl 新添加的元素。
	 * @protected override
	 */
	removeChild: function(childControl) {
		
		// 如果 childControl 不是 <li>, 则退出 <li> 的包装。
		if (childControl.node.parentNode !== this.node) {
			
			// 获取包装的 <li>
			var li = childControl.parent();
			
			// 不存在 li 。
			if(!li) {
				return null;
			}
			
			// 删除节点。
			childControl.detach(li.node);
			
			// 赋值。
			childControl = li;
		}
		
		// 从 DOM 树删除。
		childControl.detach(this.node);
		
		// 返回被删除的子控件。
		return childControl;
	},
	
	/**
	 * 当被子类重写时，实现初始化 DOM 中已经存在的项。 
	 */
	init: function() {
		this.query('>li').addClass('x-' + this.xtype + '-item');
	},
	
	// 项操作

	/**
	 * 添加一个子节点到当前控件末尾。
	 * @param {Control} ... 要添加的子节点。
	 * @return {Control/this} 返回新添加的子控件。
	 */
	add: function() {
		var args = arguments;
		if (args.length === 1) {
			return this.append(args[0]);
		}

		Object.each(args, this.append, this);
		return this;
	},

	/**
	 * 在指定位置插入一个子节点。
	 * @param {Integer} index 添加的子控件的索引。
	 * @param {Control} childControl 要添加的子节点。
	 * @return {Control} 返回新添加的子控件。
	 */
	addAt: function(index, childControl) {
		return this.insertBefore(Dom.parse(childControl), this.child(index));
	},

	/**
	 * 删除指定索引的子节点。
	 * @param {Integer} index 删除的子控件的索引。
	 * @return {Control} 返回删除的子控件。如果删除失败（如索引超出范围）则返回 null 。
	 */
	removeAt: function(index) {
		var child = this.child(index);
		return child ? this.removeChild(child) : null;
	},
	
	/**
	 * 批量设置当前的项列表。
	 */
	set: function(items){
		if(Object.isArray(items)){
			this.empty();
			this.add.apply(this, items);
			return this;
		}
		
		return Dom.prototype.set.apply(this, arguments);
	},
	
	/**
	 * 获取指定索引的项。
	 * @param {Integer} container 要获取的容器控件。
	 * @return {Control} 指定容器控件包装的真实子控件。如果不存在相应的子控件，则返回自身。
	 */
	item: Dom.prototype.child,

	/**
	 * 获取某一项在列表中的位置。
	 */
	indexOf: function(item) {
		return item && item.parent && this.equals(item.parent()) ? item.index() : -1;
	},
	
    ///**
    //* 当当前控件在屏幕中显示不下时，由 align 函数触发执行此函数。
    //* @param {String} xOry 值为 "x" 或 "y"。
    //* @param {Integer} value 设置的最大值。
    //* @param {Boolean} isOverflowing 如果值为 true，表示发生了此事件，否则表示恢复此状态。
    //*/
    //onOverflow: function(xOry, value, isOverflowing){
	//    var data = this['overflow' + xOry];
	//    if(isOverflowing){
	//        if(!data){
	//    	    this['overflow' + xOry] = this[xOry === 'x' ? 'getWidth' : 'getHeight']();
	//        }
	//        this[xOry === 'x' ? 'setWidth' : 'setHeight'](value);
	//    } else if(data !== undefined){
	//        this[xOry === 'x' ? 'setWidth' : 'setHeight'](data);
	//        delete this['overflow' + xOry];
	//    }
    //},

	//getItemByText: function(value){
	//	for (var c = this.first(), child ; c; c = c.next()) {
	//		if (c.getText() === value) {
	//			child = c;
	//			break;
	//		}
	//	}
		
	//	return child;
	//},

	/**
	 * 设置某个事件发生之后，执行某个函数.
	 * @param {String} eventName 事件名。
	 * @param {String} funcName 执行的函数名。
	 */
	itemOn: function(eventName, fn, bind){
		var me = this;
		return this.on(eventName, function(e){
			for(var c = me.node.firstChild, target = e.target; c; c = c.nextSibling){
				if(c === target || Dom.has(c, target)){
					return fn.call(bind, new Dom(c), e);
				}
			}
		}, bind);
	}

});



/**
 * 为非 ListControl 对象扩展 ListControl 的6个方法: add addAt remove removeAt set item
 */
ListControl.aliasMethods = function(controlClass, targetProperty, removeChildProperty){
    controlClass.defineMethods(targetProperty, 'add addAt removeAt item');

    removeChildProperty = removeChildProperty || targetProperty;

    controlClass.prototype.set = function (items) {
        if (Object.isArray(items)) {

            // 尝试在代理的列表中删除项。
            var child = this[removeChildProperty];
            if (child)
                child.empty();

            // 通过 this.add 添加项。
            this.add.apply(this, items);

            return this;
        }

        return Dom.prototype.set.apply(this, arguments);
    };
	
	controlClass.prototype.removeChild = function(childControl){
		
		// 尝试在代理的列表中删除项。
		var child = this[removeChildProperty];
		if(child)
			childControl.remove(childControl);
		
		// 尝试在当前节点中正常删除。
		childControl.detach(this.node);
		
		return childControl;
	};
	
};
/*********************************************************
 * Controls.Form.ComboBox
 ********************************************************/
/**
 * @author xuld
 */

/**
 * 表示一个组合框。
 * @class
 * @extends Picker
 * @example <pre>
 * var comboBox = new ComboBox();
 * comboBox.add("aaa");
 * comboBox.add("bbb");
 * comboBox.setSelectedIndex(0);
 * </pre>
 */
var ComboBox = Picker.extend({
	
    xtype: 'combobox',
	
    autoResize: true,
	
    // 悬停选中
	
    _getHover: function(){
        return this._hoverItem;
    },
	
    _setHover: function(item){
        var clazz = 'x-' + this.dropDown.xtype + '-hover';
		
        if(this._hoverItem){
            this._hoverItem.removeClass(clazz);
        }
		
        this._hoverItem = item ? item.addClass(clazz) : null;
		
    },
	
    /**
	 * 移动当前选中项的位置。
	 */
    _moveHover: function(delta){
		
        // 如果菜单未显示。
        if(this.dropDownHidden()){
	    	
            // 显示菜单。
            this.showDropDown();
        } else {
	    	
            var item = this._hoverItem || this.selectedItem;
	    	
            if(item){
                item = item[delta > 0 ? 'next' : 'prev']();
            }
	    	
            if(!item){
                item = this.dropDown.item(delta > 0 ? 0 : -1);
            }
	    	
            this._setHover(item);
	    	
        }
    },
	
    onSelect: function(item){
        return this.trigger('select', item);
    },
	
    /**
	 * 处理键盘事件。
	 */
    onKeyDown: function(e){
        switch(e.keyCode) {
			
            // 上下
            case 40:
            case 38:
			
                // 阻止默认事件。
                e.preventDefault();
			    
                this._moveHover(e.keyCode === 40 ? 1 : -1);
			    
                break;
			    
                // 回车
            case 13:
            case 10:
                if(!this.dropDownHidden()){
                    var currentItem = this._getHover();
                    if(currentItem != null) {
                        this.selectItem(currentItem);
                        e.preventDefault();
                    }
                }
        }
    },
	
    /**
	 * 当用户单击某一项时执行。
	 */
    onItemClick: function(item, e){
	
        // 如果无法更改值，则直接忽略。
        if(!this.getAttr('disabled') && !this.getAttr('readonly')) {
				
            // 设置当前的选中项。
            this.selectItem(item);
			
        }

        return false;
		
    },
	
    /**
	 * 创建当前 Picker 的菜单。
	 * @return {Control} 下拉菜单。
	 * @protected virtual
	 */
    createDropDown: function(existDom){
        return new ComboBox.DropDownMenu(existDom);
    },
	
    /**
	 * 将当前文本的值同步到下拉菜单。
	 */
    updateDropDown: function(){
        this._setHover(this.getSelectedItem());
    },
	
    init: function (options) {
		
        // 1. 处理 <select>
        var selectNode;
		
        // 如果初始化的时候传入一个 <select> 则替换 <select>, 并拷贝相关数据。
        if(this.node.tagName === 'SELECT') {
			
            this.hiddenField = selectNode = new Dom(this.node);
			
            // 调用 create 重新生成 dom 。
            this.node = Dom.parseNode(this.dropDownListTpl);
			
            this.dropDownList = true;
			
        }
		
        // 2. 初始化文本框
		
        // 初始化文本框
        this.base('init');
		
        // 3. 初始化菜单
		
        // 绑定下拉菜单的点击事件
        this.dropDown
			.itemOn('mouseover', this._setHover, this)
			.itemOn('click', this.onItemClick, this);
		
        // 4. 绑定事件
		
        // 监听键盘事件。
        this.on('keydown', this.onKeyDown);
		
        // IE6 Hack: keydown 无法监听到回车。
        if(navigator.isIE6) {
            this.on('keypress', this.onKeyDown);	
        }
		
        // 4. 设置默认项
			
        if(selectNode) {
			
            // 让 listBox 拷贝 <select> 的成员。
            this.copyItemsFromSelect(selectNode);
			
            // 隐藏 <select> 为新的 dom。
            selectNode.hide();

            // 插入当前节点。
            selectNode.after(this);
        }
		
    },
	
    setText: function (value) {

        // 如果是 dropDownList 模式，则通过 setSelectedItem 来设置当前文本框的值。
        if (this.dropDownList) {

            // 设置 value 。
            this.input().node.value = value;

            // 根据 value 获得新决定的选中项设置选中项。
            return this.setSelectedItem(this.getSelectedItem());
        }

        // 设置内容。
        return IInput.setText.call(this, value);
            
    },
	
    /**
	 * 模拟鼠标选择某一个项。
	 */
    selectItem: function (item) {
        this.setSelectedItem(item);
        return this.hideDropDown();
    },

    getValueOfItem: function (item) {
        assert.notNull(item, "ComboBox#getValueOfItem(item): {item} ~", item);
        var option = item.dataField().option;
        return option ? option.value : (item.getAttr('data-value') || item.getText());
    },
	
    /**
	 * 获取当前选中的项。如果不存在选中的项，则返回 null 。
	 * @return {Control} 选中的项。
	 */
    getSelectedItem: function () {

        // 如果使用了表单模式，则优先查找 value 匹配的项。
        if (this.dropDownList) {

            // 获取 input 字段。
            var input = this.input(), value;

            // 如果隐藏域是 SELECT ，比较方便：
            if (input.node.tagName === 'SELECT') {
                value = this.hiddenField.getAttr('selectedIndex');
                return value >= 0 ? this.dropDown.item(value) : null;
            }

            value = input.node.value;

            return this.dropDown.child(function (dom) {
                return this.getValueOfItem(new Dom(dom)) === value;
            }.bind(this));
        }

        value = this.getText();
        return this.dropDown.child(function (dom) {
            return Dom.getText(dom) === value;
        });
    },
	
    /**
	 * 设置当前选中的项。
	 * @param {Control} item 选中的项。
	 * @return this
	 */
    setSelectedItem: function (item) {

        if (this.onSelect(item) !== false) {

            // 如果有隐藏域，则设置选择的索引。
            if (this.dropDownList) {

                var oldValue,
                    text,
                    newValue,
                    input = this.input();

                if (input.node.tagName === "SELECT") {

                    oldValue = input.getAttr('selectedIndex');

                    if (item) {
                        var option = item.dataField().option;
                        if (!option) {
                            item.dataField().option = option = new Option(item.getText(), this.getValueOfItem(item));
                            input.node.add(option);
                        }
                        option.selected = true;
                        text = Dom.getText(option);
                        newValue = input.node.selectedIndex;
                    } else {
                        input.node.selectedIndex = newValue = -1;
                        text = input.getAttr('placeholder');
                    }

                } else {
                    oldValue = input.node.value;
                    input.node.value = newValue = item ? this.getValueOfItem(item) : "";
                    text = item ? item.getText() : "";
                }

                // 无隐藏域，仅设置按钮的文本。
                this.first().setText(text);
                if (oldValue !== newValue)
                    this.onChange();

            // 如果未使用表单模式，则设置当前文本框。
            } else {

                // 获取 item 的文本并更新值。
                this.setText(item ? item.getText() : "");
            }

        }
        return this;
    },
	
    getSelectedIndex: function(){
        return this.dropDown.indexOf(this.getSelectedItem());
    },
	
    setSelectedIndex: function(value){
        return this.setSelectedItem(this.dropDown.item(value));
    },

    // select
	
    resizeToFitItems: function(){
        var dropDown = this.dropDown,
			oldWidth = dropDown.getStyle('width'),
			oldDisplay = dropDown.getStyle('display');
			
        dropDown.setStyle('display', 'inline-block');
        dropDown.setWidth('auto');
		
        this.first().setSize(dropDown.getWidth());
		
        dropDown.setStyle('width', oldWidth);
        dropDown.setStyle('display', oldDisplay);
        return this;
    },
	
    copyItemsFromSelect: function(select) {
		
        this.dropDown.empty();
		
        for(var node = select.node.firstChild; node; node = node.nextSibling) {
            if(node.tagName  === 'OPTION') {
                var item = this.dropDown.add(Dom.getText(node));
				
                item.dataField().option = node;
                if(node.selected){
                    this.setSelectedItem(item);
                }
            }
        }
		
        if(select.node.onclick)
            this.node.onclick = select.node.onclick;
		
        if(select.node.onchange)
            this.on('change', select.node.onchange);
		
        if(this.autoResize)
            this.setWidth(select.getWidth());
        
        if(select.getAttr('disabled')) {
            this.setAttr('disabled', true);
        }

        if (select.getAttr('readonly')) {
            this.setAttr('readonly', true);
        }
		
    }

}).addEvents('select');


ListControl.aliasMethods(ComboBox, 'dropDown');


ComboBox.DropDownMenu = ListControl.extend({
	
    xtype: "listbox"

});
/*********************************************************
 * Controls.Form.ListBox
 ********************************************************/
/**
 */
	 */
	 */
/*********************************************************
 * Controls.Suggest.Suggest
 ********************************************************/
/**
 * @author 
 */

/**
 * 用于提示框的组件。
 */
var Suggest = ComboBox.extend({
	
	dropDownWidth: 'auto',
	
	getSuggestItems: function(text){
		if(!this.items){
			this.items = [];
			this.dropDown.each(function(item){
				this.items.push(item.getText());
			}, this);
		}
		
		text = text.toLowerCase();
		return this.items.filter(function(value){
			return value.toLowerCase().indexOf(text) >= 0;
		});
	},
	
	setSuggestItems: function(value){
		this.dropDown.set(value);
		return this;
	},
	
	/**
	 * 向用户显示提示项。
	 */
	showSuggest: function(){
		var text = Dom.getText(this.node);
		var items = this.getSuggestItems(text);
		
		if(!items || !items.length || (items.length === 1 && items[0] === text))  {
			return this.hideDropDown();
		}
		
		this.dropDown.set(items);
		
		this.showDropDown();
		
		// 默认选择当前值。
		this._setHover(this.dropDown.item(0));
	},
	
	onKeyUp: function(e){
		switch(e.keyCode) {
			case 40:
			case 38:
			case 13:
			case 36:
			case 37:
			    return;
		}
		
		
		this.showSuggest();
	},
	
	// 重写 onDropDownShow 和 onDropDownHide
	
	setText: Dom.prototype.setText,
	
	getText: Dom.prototype.getText,
	
	onDropDownShow: IDropDownOwner.onDropDownShow,
	
	onDropDownHide: IDropDownOwner.onDropDownHide,
	
	updateText: function(item){
		this.setText(item.getText());
	},
	
	init: function(options){
		
		var suggest = this.createDropDown().addClass('x-suggest');
		
		// UI 上增加一个下拉框。
		this.setDropDown(suggest);
		
		// 绑定下拉菜单的点击事件
		this.dropDown
			.itemOn('mouseover', this._setHover, this)
			.itemOn('mousedown', this.onItemClick, this);

		this.on('keydown', this.onKeyDown);
		this.on('focus', this.showSuggest);
		this.on('blur', this.hideDropDown);
		this.on('keyup', this.onKeyUp);
		
		this.setAttr('autocomplete', 'off');
		
	}
	
});



/*********************************************************
 * System.Utils.Deferrable
 ********************************************************/
/**
 * @author xuld
 */

/**
 * �����첽ִ������ʱ��֤�����Ǵ��еġ�
 */
var Deferrable = Class({

    chain: function (deferrable, args) {
        var lastTask = [deferrable, args];

        if (this._firstTask) {
            this._lastTask[2] = lastTask;
        } else {
            this._firstTask = lastTask;
        }
        this._lastTask = lastTask;
    },

    progress: function () {

        var firstTask = this._firstTask;
        this.isRunning = false;

        if (firstTask) {
            this._firstTask = firstTask[2];

            firstTask[0].run(firstTask[1]);
        }

        return this;

    },

    /**
	 * ��������ͬʱ�������Ĵ���������
	 * wait - �ȴ��ϸ��������ɡ�
	 * ignore - ���Ե�ǰ������
	 * stop - �����ж��ϸ��������ϸ������Ļص�������ִ�У�Ȼ��ִ�е�ǰ������
	 * abort - �Ƿ�ֹͣ�ϸ��������ϸ������Ļص󱻺��ԣ�Ȼ��ִ�е�ǰ������
	 * replace - �滻�ϸ�����Ϊ�µĲ������ϸ������Ļص󽫱����ơ�
	 */
    defer: function (args, link) {

        var isRunning = this.isRunning;
        this.isRunning = true;

        if (!isRunning)
            return false;

        switch (link) {
            case undefined:
                break;
            case "abort":
            case "stop":
            case "skip":
                this[link]();
                this.isRunning = true;
                return false;
            case "replace":
                this.init(this.options = Object.extend(this.options, args));

                // fall through
            case "ignore":
                return true;
            default:
                assert(link === "wait", "Deferred#defer(args, link): ��Ա {link} ������ wait��abort��stop��ignore��replace ֮һ��", link);
        }

        this.chain(this, args);
        return true;
    },

    /**
	 * �õ�ǰ���еȴ�ָ���� deferred ȫ��ִ�����Ϻ�ִ�С�
	 */
    wait: function (deferred) {
        if (this.isRunning) {
            this.stop();
        }

        this.defer = deferred.defer.bind(deferred);
        this.progress = deferred.progress.bind(deferred);
        return this;
    },

    then: function (callback, args) {
        if (this.isRunning) {
            this.chain({
                owner: this,
                run: function (args) {
                    if (callback.call(this.owner, args) !== false)
                        this.owner.progress();
                }
            }, args);
        } else {
            callback.call(this, args);
        }
        return this;
    },

    delay: function (duration) {
        return this.run({ duration: duration });
    },

    pause: Function.empty,

    skip: function () {
        this.pause();
        this.progress();
        return this;
    },

    abort: function () {
        this.pause();
        this._firstTask = this._lastTask = null;
        this.isRunning = false;
        return this;
    },

    stop: function () {
        return this.abort();
    }

});

/*********************************************************
 * System.Fx.Base
 ********************************************************/
/**
 * @fileOverview 提供底层的 特效算法支持。
 * @author xuld
 */

/**
 * 特效算法基类。
 * @class Fx
 * @extends Deferrable
 * @abstract
 */
var Fx = (function() {
	
	
	/// #region interval
	
	var cache = {};
	
	/**
	 * 定时执行的函数。
	 */
	function interval(){
		var i = this.length;
		while(--i >= 0)
			this[i].step();
	}
	
	/// #endregion
		
	return Deferrable.extend({

		/**
		 * 当前 FX 对象的默认配置。
		 */
		options: {

			/**
			 * 特效执行毫秒数。
			 * @type {Number}
			 */
			duration: 300,

			/**
			 * 每秒的运行帧次。
			 * @type {Number}
			 */
			fps: 50,

			/**
			 * 用于实现渐变曲线的计算函数。函数的参数为：
			 *
			 * - @param {Object} p 转换前的数值，0-1 之间。
			 *
			 * 返回值是一个数字，表示转换后的值，0-1 之间。
			 * @field
			 * @type Function
			 * @remark
			 */
			transition: function(p) {
				return -(Math.cos(Math.PI * p) - 1) / 2;
			}

		},
		
		/**
		 * 当被子类重写时，实现生成当前变化所进行的初始状态。
		 * @param {Object} from 开始位置。
		 * @param {Object} to 结束位置。
		 * @return {Base} this
		 */
		init: Function.empty,
		
		/**
		 * @event step 当进度改变时触发。
		 * @param {Number} value 当前进度值。
		 */
		
		/**
		 * 根据指定变化量设置值。
		 * @param {Number} delta 变化量。 0 - 1 。
		 * @abstract
		 */
		set: Function.empty,
		
		/**
		 * 进入变换的下步。
		 */
		step: function() {
			var me = this,
				time = Date.now() - me.time,
				options = me.options;
			if (time < options.duration) {
				me.set(options.transition(time / options.duration));
			}  else {
				me.end(false);
			}
		},
		
		/**
		 * 开始运行特效。
		 * @param {Object} from 开始位置。
		 * @param {Object} to 结束位置。
		 * @param {Number} duration=-1 变化的时间。
		 * @param {Function} [onComplete] 停止回调。
		 * @param {String} link='wait' 变化串联的方法。 可以为 wait, 等待当前队列完成。 restart 柔和转换为目前渐变。 cancel 强制关掉已有渐变。 ignore 忽视当前的效果。
		 * @return {Base} this
		 */
		run: function (options, link) {
			var me = this, defaultOptions, duration;
			if (!me.defer(options, link)) {

				defaultOptions = me.options;

				// options
				me.options = options = Object.extend({
					transition: defaultOptions.transition,
					fps: defaultOptions.fps
				}, options);

				// duration
				duration = options.duration;
				assert(duration == undefined || duration === 0 || +duration, "Fx#run(options, link): {duration} 必须是数字。如果需要使用默认的时间，使用 -1 。",  duration);
				options.duration = duration !== -1 && duration != undefined ? duration < 0 ? -defaultOptions.duration / duration : duration : defaultOptions.duration;

				// start
				if (options.start && options.start.call(options.target, options, me) === false) {
					me.progress();
				} else {

					me.init(options);
					me.set(0);
					me.time = 0;
					me.resume();
				}
			}

			return me;
		},

		/**
		 * 让当前特效执行器等待指定时间。
		 */
		delay: function(timeout){
			return this.run({
				duration: timeout
			});
		},

		/**
		 * 由应用程序通知当前 Fx 对象特效执行完。
		 * @param {Boolean} isAbort 如果是强制中止则为 true, 否则是 false 。
		 */
		end: function(isAbort) {
			var me = this;
			me.pause();
			me.set(1);
			try {

				// 调用回调函数。
				if (me.options.complete) {
					me.options.complete.call(me.options.target, isAbort, me);
				}
			} finally {

				// 删除配置对象。恢复默认的配置对象。
				delete me.options;
				me.progress();
			}
			return me;
		},
		
		/**
		 * 中断当前效果。
		 */
		stop: function() {
			this.abort();
			this.end(true);
			return this;
		},
		
		/**
		 * 暂停当前效果。
		 */
		pause: function() {
			var me = this, fps, intervals;
			if (me.timer) {
				me.time = Date.now() - me.time;
				fps = me.options.fps;
				intervals = cache[fps];
				intervals.remove(me);
				if (intervals.length === 0) {
					clearInterval(me.timer);
					delete cache[fps];
				}
				me.timer = 0;
			}
			return me;
		},
		
		/**
		 * 恢复当前效果。
		 */
		resume: function() {
			var me = this, fps, intervals;
			if (!me.timer) {
				me.time = Date.now() - me.time;
				fps = me.options.fps;
				intervals = cache[fps];
				if (intervals) {
					intervals.push(me);
					me.timer = intervals[0].timer;
				} else {
					me.timer = setInterval(interval.bind(cache[fps] = [me]), Math.round(1000 / fps ));
				}
			}
			return me;
		}
		
	});
	

})();

/*********************************************************
 * System.Fx.Tween
 ********************************************************/
/**
	 */
	 */
/*********************************************************
 * System.Fx.Animate
 ********************************************************/
/**
 * @fileOverview 通过改变CSS实现的变换。
 * @author xuld
 */



(function(){
	
	var displayEffects = Fx.displayEffects = {
			opacity: Function.from({
				opacity: 0
			})
		},

		toggle = Dom.prototype.toggle,

		shift = Array.prototype.shift,
		
		height = 'height marginTop paddingTop marginBottom paddingBottom';

	function fixProp(options, elem, prop) {
		options.orignal[prop] = elem.style[prop];
		elem.style[prop] = Dom.styleNumber(elem, prop) + 'px';
	}

	Object.each({
		all: height + ' opacity width',
		height: height,
		width: 'width marginLeft paddingLeft marginRight paddingRight'
	}, function(value, key){
		value = Object.map(value, this, {});

		displayEffects[key] = function(options, elem, isShow) {

			// 修复 overflow 。
			options.orignal.overflow = elem.style.overflow;
			elem.style.overflow = 'hidden';

			// inline 元素不支持 修改 width 。
			if (Dom.styleString(elem, 'display') === 'inline') {
				options.orignal.display = elem.style.display;
				elem.style.display = 'inline-block';
			}

			// 如果是 width, 固定 height 。
			if (key === 'height') {
				fixProp(options, elem, 'width');
			} else if (key === 'width') {
				fixProp(options, elem, 'height');
			}
			
			return value;
		};
	}, Function.from(0));
	
	Object.map('left right top bottom', function(key, index) {
		key = 'margin' + key.capitalize();
		return function(options, elem, isShow) {

			// 将父元素的 overflow 设为 hidden 。
			elem.parentNode.style.overflow = 'hidden';

			var params = {},
				fromValue,
				toValue,
				key2,
				delta;
			
			if (index <= 1) {
				key2 = index === 0 ? 'marginRight' : 'marginLeft';
				fromValue = -elem.offsetWidth - Dom.styleNumber(elem, key2);
				toValue = Dom.styleNumber(elem, key);
				params[key] = isShow ? (fromValue + '-' + toValue) : (toValue + '-' + fromValue);

				fixProp(options, elem, 'width');
				delta = toValue - fromValue;
				toValue = Dom.styleNumber(elem, key2);
				fromValue = toValue + delta;
				params[key2] = isShow ? (fromValue + '-' + toValue) : (toValue + '-' + fromValue);

			} else {
				key2 = index === 2 ? 'marginBottom' : 'marginTop';
				fromValue = -elem.offsetHeight - Dom.styleNumber(elem, key2);
				toValue = Dom.styleNumber(elem, key);
				params[key] = isShow ? (fromValue + '-' + toValue) : (toValue + '-' + fromValue);
			}

			return params;
		
		};
		
	}, displayEffects);

	Dom.implement({
		
		/**
		 * 获取和当前节点有关的 param 实例。
		 * @return {Animate} 一个 param 的实例。
		 */
		fx: function() {
			var data = this.dataField();
			return data.$fx || (data.$fx = new Fx.Tween());
		}
		
	}, 2)
	
	.implement({
		
		/**
		 * 变化到某值。
		 * @param {String/Object} [name] 变化的名字或变化的末值或变化的初值。
		 * @param {Number} duration=-1 变化的时间。
		 * @param {Function} [oncomplete] 停止回调。
		 * @param {String} link='wait' 变化串联的方法。 可以为 wait, 等待当前队列完成。 rerun 柔和转换为目前渐变。 cancel 强制关掉已有渐变。 ignore 忽视当前的效果。
		 * @return this
		 */
		animate: function (params, duration, oncomplete, link) {
			assert.notNull(params, "Dom#animate(params, duration, oncomplete, link): {params} ~", params);
				
			if(params.params){
				link = params.link;
			} else {
				params = {
					params: params,
					duration: duration,
					complete: oncomplete
				};
			}
			
			params.target = this;

			assert(!params.duration || typeof params.duration === 'number', "Dom#animate(params, duration, oncomplete, link): {duration} 必须是数字。如果需要制定为默认时间，使用 -1 。", params.duration);
			assert(!params.oncomplete || Object.isFunction(params.oncomplete), "Dom#animate(params, duration, oncomplete, link): {oncomplete} 必须是函数", params.oncomplete);
			
			this.fx().run(params, link);
			
			return this;
		},
		
		/**
		 * 显示当前元素。
		 * @param {Number} duration=500 时间。
		 * @param {Function} [callback] 回调。
		 * @param {String} [type] 方式。
		 * @return {Element} this
		 */
		show: function() {
			var me = this,
				args = arguments,
				callback,
				effect;

			// 如果没有参数，直接隐藏。
			if (args.length === 0) {
				Dom.show(me.node);
			} else {

				// 如果第一个参数是字符串。则表示是显示类型。
				effect = typeof args[0] === 'string' ? shift.call(args) : 'opacity';
				assert(Fx.displayEffects[effect], "Dom#show(effect, duration, callback, link): 不支持 {effect} 。", effect);
				callback = args[1];

				me.fx().run({
					target: me,
					duration: args[0],
					start: function(options, fx) {

						var elem = this.node,
							t,
							params,
							param;

						// 如果元素本来就是显示状态，则不执行后续操作。
						if (!Dom.isHidden(elem)) {
							if (callback)
								callback.call(this, true, true);
							return false;
						}

						// 首先显示元素。
						Dom.show(elem);

						// 保存原有的值。
						options.orignal = {};

						// 新建一个新的 params 。
						options.params = params = {};

						// 获取指定特效实际用于展示的css字段。
						t = Fx.displayEffects[effect](options, elem, true);

						// 保存原有的css值。
						// 用于在hide的时候可以正常恢复。
						for (param in t) {
							options.orignal[param] = elem.style[param];
						}

						// 因为当前是显示元素，因此将值为 0 的项修复为当前值。
						for (param in t) {
							if (t[param] === 0) {

								// 设置变化的目标值。
								params[param] = Dom.styleNumber(elem, param);

								// 设置变化的初始值。
								elem.style[param] = 0;
							} else {
								params[param] = t[param];
							}
						}
					},
					complete: function(isAbort, fx) {

						// 拷贝回默认值。
						Object.extend(this.node.style, fx.options.orignal);

						if (callback)
							callback.call(this, false, isAbort);
					}
				}, args[2]);

			}
		
			return me;
		},
		
		/**
		 * 隐藏当前元素。
		 * @param {Number} duration=500 时间。
		 * @param {Function} [callback] 回调。
		 * @param {String} [type] 方式。
		 * @return {Element} this
		 */
		hide: function () {
			var me = this,
				args = arguments,
				callback,
				effect;
			
			// 如果没有参数，直接隐藏。
			if (args.length === 0) {
				Dom.hide(me.node);
			} else {

				// 如果第一个参数是字符串。则表示是显示类型。
				effect = typeof args[0] === 'string' ? shift.call(args) : 'opacity';
				assert(Fx.displayEffects[effect], "Dom#hide(effect, duration, callback, link): 不支持 {effect} 。", effect);
				callback = args[1];

				me.fx().run({
					target: me,
					duration: args[0],
					start: function(options, fx) {

						var elem = this.node,
							params,
							param;

						// 如果元素本来就是隐藏状态，则不执行后续操作。
						if (Dom.isHidden(elem)) {
							if (callback)
								callback.call(this, false, true);
							return false;
						}

						// 保存原有的值。
						options.orignal = {};

						// 获取指定特效实际用于展示的css字段。
						options.params = params = Fx.displayEffects[effect](options, elem, false);

						// 保存原有的css值。
						// 用于在show的时候可以正常恢复。
						for (param in params) {
							options.orignal[param] = elem.style[param];
						}
					},
					complete: function(isAbort, fx) {

						var elem = this.node;

						// 最后显示元素。
						Dom.hide(elem);

						// 恢复所有属性的默认值。
						Object.extend(elem.style, fx.options.orignal);

						// callback
						if (callback)
							callback.call(this, false, isAbort);
					}
				}, args[2]);

			}
			
			return this;
		},
	
		toggle: function(){
			var me = this;
			me.fx().then(function (args) {
				toggle.apply(me, args);
				return false;
			}, arguments);

			return me;
		}
	
	});
	
})();

/// TODO: clear

document.animate = function() {
	assert.deprected("document.animate 已过时，请改用 Dom.get(document).animate。");
	var doc = Dom.get(document);
	doc.animate.apply(doc, arguments);
	return this;
};

/// TODO: clear

/*********************************************************
 * Controls.Core.ICollapsable
 ********************************************************/
/**
/*********************************************************
 * Controls.Core.ContentControl
 ********************************************************/
/**

    /**
	 * 获取或设置当前输入域的状态。
	 * @protected
	 */
	state: function (name, value) {
	    return this.toggleClass('x-' + this.xtype + '-' + name, value);
	}
/*********************************************************
 * Controls.Core.TreeControl
 ********************************************************/
/**
/*********************************************************
 * Controls.Nav.TreeView
 ********************************************************/
/**
/*********************************************************
 * System.Fx.Marquee
 ********************************************************/


var Marquee = Class({
	
	/**
	 * 每次滚动的效果时间。
	 */
	duration:-1,
	
	/**
	 * 自动滚动的延时时间。
	 */
	delay: 3000,

	/**
	 * 移动的方向。
	 * @config
	 */
	direction: 'left',

	/**
	 * 每次移动的张数。
	 * @config
	 */
	delta: 1,

	/**
	 * 是否循环播放。
	 * @config
	 */
	loop: true,

	/**
	 * 是否保证平滑滚动。
	 * @config
	 */
	flow: true,
	
	_currentIndex: 0,
	
	/**
	 * 是否循环。
	 * @property {Boolean} loop
	 */
	
	_getWidthBefore: function(ctrl, xy){
		return ctrl && (ctrl = ctrl.prev()) ? Dom.calc(ctrl.node, xy) + this._getWidthBefore(ctrl, xy) : 0;
	},
	
	_getScrollByIndex: function (value) {
		return this._getWidthBefore(this.target.first(value), this._horizonal ? 'mx+sx' : 'my+sy');
	},
	
	_getTotalSize: function(){
		var size = 0;
		var xy = this._horizonal ? "mx+sx" : "my+sy";
		this.target.children().each(function (child) {
			size += Dom.calc(child, xy);
		});
		return size;
	},

	/**
	 * 内部实现移动到指定位置的效果。
	 */
	_animateToWithoutLoop: function (index, lt) {

		var me = this,
			oldIndex = me._fixIndex(me._currentIndex),
			obj;

		if (me.onChanging(index, oldIndex) !== false) {

			// 暂停自动播放，防止出现抢资源问题。
			me.pause();

			// 记录当前正在转向的目标索引。
			me._currentIndex = index;

			// 计算滚动坐标。

			obj = {};
			obj[me._horizonal ? 'marginLeft' : 'marginTop'] = -me._getScrollByIndex(index);
			me.target.animate(obj, me.duration, function () {

				// 滚动完成后触发事件。
				me.onChanged(index, oldIndex);

				// 如果本来正在自动播放中，这里恢复自动播放。
				if (me.step)
					me.resume();
			}, 'abort');
		}

	},

	/**
	 * 内部实现移动到指定位置的效果。
	 * @param {Number} index 滚动的目标索引。
	 * @param {Boolean} lt 回滚还是继续滚。
	 */
	_animateToWithLoop: function (index, lt) {

		var me = this,
			oldIndex = me._fixIndex(me._currentIndex);

		if (me.onChanging(index, oldIndex) !== false) {

			// 暂停自动播放，防止出现抢资源问题。
			me.pause();
			
			me.target.animate({
				params: {},
				duration: me.duration,
				complete: function () {
	
					// 效果结束。
					me._animatingTargetIndex = null;
	
					// 滚动完成后触发事件。
					me.onChanged(index, oldIndex);
	
					// 如果本来正在自动播放中，这里恢复自动播放。
					if (me.step)
						me.resume();
				},
				start: function (options) {
	
					// 实际所滚动的区域。
					var actualIndex = index + me.length,
							prop = me._horizonal ? 'marginLeft' : 'marginTop',
							from = Dom.styleNumber(me.target.node, prop),
							to = -me._getScrollByIndex(actualIndex);
	
					// 如果保证是平滑滚动，则修正错误的位置。
					if (me.flow) {
	
						// 如果是往上、左方向滚。
						if (lt) {
	
							// 确保 from > to
							if (from > to) {
								from -= me._size;
							}
	
						} else {
	
							// 确保 from < to
							if (from < to) {
								from += me._size;
							}
						}
	
					}
	
					options.params[prop] = from + '-' + to;
	
					// 记录当前正在转向的目标索引。
					me._currentIndex = index;
				},
				link: 'stop'
			});
		}
		return this;

	},

	_fixIndex: function (index) {
		return index = index >= 0 ? index % this.length : index + this.length;
	},
	
	onChanging: function (newIndex, oldIndex) {
		return !this.disabled && this.trigger('changing', {
			from: oldIndex,
			to: newIndex
		});
	},
	
	onChanged: function(newIndex, oldIndex){
		this.trigger('changed', {
			from: oldIndex,
			to: newIndex
		});
	},

	/**
	 * 更新节点状态。
	 */
	update: function () {
		var children = this.target.children(),
			size,
			xy = this._horizonal ? 'Width' : 'Height';
		
		if (!this.cloned) {

			// 设置大小。
			this.length = children.length;

			// 如果不需要滚动，自动设为 disabled 属性。
			this.disabled = this.target.parent()['get' + xy]() >= size;
			//  this.disabled = this.target.getScrollSize()[this._horizonal ? 'x' : 'y'] > size;

			if (!this.disabled && this.loop) {
				children.clone().appendTo(this.target);
				children.clone().appendTo(this.target);
				this.cloned = true;
			}
		}

		size = this._getTotalSize();
		this._size = this.cloned ? size / 3 : size;
		
		this.target['set' + xy](size);
		this.set(this._currentIndex);
	},

	pause: function () {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = 0;
		}

	},

	resume: function () {
		if (!this.timer) {
			this.timer = setTimeout(this.step, this.delay);
		}
	},

	constructor: function (dom, direction, loop, deferUpdate) {
		dom = Dom.get(dom);
		this.target = dom.find('ul') || dom;
		this.target.parent().setStyle('overflow', 'hidden');

		if (loop === false) {
			this.loop = false;
		}

		this.setDirection(direction || this.direction);

		this.update();

		// Chrome 无法直接获取图片大小。
		if (deferUpdate !== false && !Dom.isLoaded) {
			Dom.load(this.update.bind(this));
		}
	},
	
	/**
	 * 暂停滚动
	 * @method pause
	 */
	stop: function() {
		clearInterval(this.timer);
		this.timer = 0;
		this.step = null;
		return this;
	},

	setDirection: function (direction) {
		this.direction = direction;
		this._lt = /^[rb]/.test(direction);
		this._horizonal = /^[lr]/.test(direction);
	},
	
	/**
	 * (重新)开始滚动
	 * @method start
	 */
	start: function (delta) {
		var me = this.stop();
		delta = delta || me.delta;
		if (delta < 0) {
			me._lt = !me._lt;
			delta = -delta;
		}

		if (me._lt) {
			delta = -delta;
		}
		
		// 如果不延时。
		if (me.delay === 0) {
			
			me.moving = function(){
				
				var value = me._current - delta;

				if (value <= me._min) {
					value += me._unit;
				} else if (value >= me._max) {
					value -= me._unit;
				}

				me._current = value;
				
				me.target.node.style[me._prop] = value + 'px';
				
				me.timer = setTimeout(me.moving, me.duration);

			};

			me.step = function() {

				me._prop = me._horizonal ? 'marginLeft' : 'marginTop';
				me._current = Dom.styleNumber(me.target.node, me._prop);
				me._unit = me._getScrollByIndex(me.length + 1);

				if (me.loop) {
					me._min = -me._unit * 2;
					me._max = -me._unit;
				} else {
					me._min = -me._unit;
					me._max = 0;
				}
				me.moving();
			};

		} else {

			// 设置单步的执行函数。
			me.step = function() {
				var index = me._currentIndex + delta;
				index = me._fixIndex(index);
				me[me.loop ? '_animateToWithLoop' : '_animateToWithoutLoop'](index, me._lt);
				me.timer = setTimeout(me.step, me.delay);
			};

		}

		// 正式开始。
		me.resume();
		
		return me;
	},

	set: function (index) {
		var newIndex = index = this._fixIndex(index);
		if (this.loop) {
			index += this.length;
		}
		this.target.setStyle(this._horizonal ? 'marginLeft' : 'marginTop', -this._getScrollByIndex(index));
		this.onChanged(index, this._currentIndex);
		this._currentIndex = newIndex;
		return this;
	},

	moveTo: function (index, lt) {
		index = this._fixIndex(index);
		this[this.loop ? '_animateToWithLoop' : '_animateToWithoutLoop'](index, lt === undefined ? index < this._currentIndex : lt);
		return this;
	},

	moveBy: function (index) {
		return this.moveTo(this._currentIndex + index % this.length, index < 0);
	},

	prev: function () {
		return this.moveTo(this._currentIndex - 1, true);
	},

	next: function () {
		return this.moveTo(this._currentIndex + 1, false);
	}
	
});
/*********************************************************
 * Controls.Composite.Carousel
 ********************************************************/
/**
 * @author 
 */


var Carousel = Control.extend({
	
	onChange: function (e) {
		var ul = this.find('.x-carousel-header'), t;
		if (t = ul.first(e.from))
			t.removeClass('x-carousel-header-selected');
			
		if(t = ul.first(e.to))
			t.addClass('x-carousel-header-selected');
		
	},
	
	init: function (options) {
		var me = this;
		me.marquee = new Marquee(me, options.direction, options.loop, options.deferUpdate);
		if (options.duration != null)
			me.marquee.duration = options.duration;
		if (options.delay != null)
			me.marquee.delay = options.delay;
		me.marquee.on('changing', me.onChange, me);
		me.query('.x-carousel-header > li').setWidth(me.getWidth() / me.marquee.length).on(options.event || 'mouseover', function (e) {
			me.marquee.moveTo(this.index());
		});
		me.onChange({to: 0});
		
		me.marquee.start();
	}

}).defineMethods("marquee", "moveTo moveBy start stop");
/*********************************************************
 * Controls.Button.Button
 ********************************************************/
/**
 * @author  xuld
 */




var Button = ContentControl.extend({
	
	xtype: 'button',
	
	type: 'button',
	
	tpl: '<button class="x-control" type="button"></button>',
	
	create: function(options){
		return Dom.parseNode(this.tpl.replace(/x-control/g, 'x-' + this.xtype).replace('type="button"', 'type="' + (options.type || this.type) + '"'));
	},
	
}).implement(IInput);


/*********************************************************
 * Controls.Button.MenuButton
 ********************************************************/
/**

	state: function (name, value) {
	    return this.toggleClass('x-button-' + name, value);
	},
/*********************************************************
 * Controls.Button.SplitButton
 ********************************************************/
/**
	        this.query('.x-button').setAttr(name, value).toggleClass('x-button-disabled', value);
	        this.last('.x-button').toggleClass('x-button-actived', value !== false);
	    } else {
	        this.base('state');
/*********************************************************
 * System.Ajax.Base
 ********************************************************/
/**
/*********************************************************
 * System.Ajax.Script
 ********************************************************/
/**

		var code = Ajax.XHR.getResponse(xhr);
		window.execScript(code);
		return code;
	},
		if (!options.crossDomain) {
			return Ajax.XHR.send.call(this, options);
			options.cache = false;
			t,
			callback = options.callback = function(errorMessage, error) {
				var script = options.script;
				if (script && (error || !script.readyState || !/in/.test(script.readyState))) {

					// 删除 callback 避免再次执行。
					options.callback = Function.empty;

					// 删除全部绑定的函数。
					script.onerror = script.onload = script.onreadystatechange = null;

					// 删除当前脚本。
					script.parentNode.removeChild(script);

					try {

						if (error) {
							if (options.error)
								options.error.call(options.target, options.errorMessage, script);
						} else {
							if (options.success)
								options.success.call(options.target, options.response, script);
						}

						if (options.complete)
							options.complete.call(options.target, options, script);

					} finally {

						options.script = script = null;

						delete options.target.options;

						options.target.progress();
					}
				}
			};

		script.src = options.url;
		script.type = "text/javascript";
		script.async = "async";
		if (options.charset)
			script.charset = options.charset;
		
		// 预处理数据。
		if (options.start && options.start.call(options.target, options, xhr) === false)
			return callback(0, -3);

		script.onload = script.onreadystatechange = callback;

		script.onerror = function(e) {
			callback('Network Error', 2);
		};
		if (options.timeouts > 0) {
			setTimeout(function() {
				callback('Timeout', -2);
			}, options.timeouts);
		}

		t = document.getElementsByTagName("SCRIPT")[0];
		t.parentNode.insertBefore(script, t);
	return Ajax.send({
		url: url,
/*********************************************************
 * System.Ajax.Jsonp
 ********************************************************/
/**
 * AJAX 处理JSON-P数据。
 * @author xuld
 */

Ajax.transports.jsonp = {

	jsonp: 'callback',

	getResponse: function(xhr) {
		window.execScript(Ajax.XHR.getResponse(xhr));
		return this.response;
	},

	send: function(options) {

		if (options.jsonp === undefined) {
			options.jsonp = this.jsonp;
		}

		// callback=?
		var jsonpCallback = options.jsonpCallback || (options.jsonpCallback = 'jsonp' + Date.now() + JPlus.id++);

		// callback=jsonp123
		if (options.jsonp) {
			if (options.url.indexOf(options.jsonp + '=?') >= 0) {
				options.url = options.url.replace(options.jsonp + '=?', options.jsonp + '=' + jsonpCallback);
			} else {
				options.url = Ajax.concatUrl(options.url, options.jsonp + "=" + jsonpCallback);
			}
		}

		var oldMethod = window[jsonpCallback];

		window[jsonpCallback] = function(data) {

			// 回复初始的 jsonpCallback 函数。
			window[jsonpCallback] = oldMethod;

			// 保存 response 数据。
			options.response = data;

			// 通知 onStateChange 已完成请求。
			options.callback();
		};

		// 最后使用 Script 协议发送。
		Ajax.transports.script.send.call(this, options);
	}

};
	if (typeof data === 'function') {
		onsuccess = data;
		data = null;
	}

	return Ajax.send({
		url: url,
	});
};