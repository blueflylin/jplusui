/**
 * @author xuld
 */


imports("Controls.Button.Menu");
using("System.Dom.Align");
using("Controls.Core.TreeControl");



/**
 * 表示菜单项。 
 */
var MenuItem = TreeControl.Item.extend({

	xtype: 'menuitem',

	createSubControl: function(treeControl){
		return new Menu(treeControl);
	},
	
	initSubControl: function(treeControl){
		treeControl.hide();
		treeControl.floating = false;
		this.addClass('x-menuitem-submenu');
		this.on('mouseup', this._cancelHideMenu);
	},
	
	uninitSubControl: function(treeControl){
		treeControl.floating = true;
		this.removeClass('x-menuitem-submenu');
		this.un('mouseup', this._cancelHideMenu);
	},

	onMouseOver: function() {
		this.hovering(true);
		if (this.subControl)
			this.showSubMenu();
		else if(this.parentControl)
			this.parentControl.hideSubMenu();
	},
	
	onMouseOut: function() {

		// 没子菜单，需要自取消激活。
		// 否则，由父菜单取消当前菜单的状态。
		// 因为如果有子菜单，必须在子菜单关闭后才能关闭激活。

		if (!this.subControl)
			this.hovering(false);

	},
	
	/**
	 *
	 */
	init: function() {
		this.unselectable();
		this.on('mouseover', this.onMouseOver);
		this.on('mouseout', this.onMouseOut);
	},
	
	_cancelHideMenu: function(e) {
		e.stopPropagation();
	},

	_hideTargetMenu: function(e) {
		var tg = e.relatedTarget;
		while (tg && !Dom.hasClass(tg, 'x-menu')) {
			tg = tg.parentNode;
		}

		if (tg) {
			new Dom(tg).dataField().control.hideSubMenu();
		}

	},

	getSubMenu: TreeControl.Item.prototype.getSubControl,
	
	setSubMenu: TreeControl.Item.prototype.setSubControl,

	showSubMenu: function(){

		// 使用父菜单打开本菜单，显示子菜单。
		this.parentControl && this.parentControl.showSubMenu(this);
		
		return this;
	},
	
	hideSubMenu: function(){

		// 使用父菜单打开本菜单，显示子菜单。
		this.parentControl && this.parentControl.hideSubMenu(this);
		
		return this;
	}

});

var MenuSeperator = MenuItem.extend({

	tpl: '<div class="x-menuseperator"></div>',

	init: Function.empty

});

var Menu = TreeControl.extend({

	xtype: 'menu',

	createTreeItem: function(childControl, parent) {

		// 如果是文本。
		if (childControl.node.nodeType === 3) {

			// - => MenuSeperator
			if (/^\s*-\s*$/.test(childControl.getText())) {

				// 删除文本节点。
				if (parent) {
					parent.remove(childControl);
				}

				childControl = new MenuSeperator;

				// 其它 => 添加到 MenuItem
			} else {

				// 保存原有 childControl 。
				var t = childControl;
				childControl = new MenuItem;
				childControl.append(t);
			}
			if (parent) {
				parent.prepend(childControl);
			}
		} else if(childControl.hasClass('x-menuseperator')){
			childControl = new MenuSeperator;
		} else {

			// 创建对应的 MenuItem 。
			childControl = new MenuItem(childControl);
		}

		return childControl;

	},

	init: function() {

		// 绑定节点和控件，方便发生事件后，根据事件源得到控件。
		this.dataField().control = this;

		// 根据已有的 DOM 结构初始化菜单。
		this.initItems();
	},

	onShow: function() {
		this.floating = true;
		document.once('mouseup', this.hide, this);
		this.trigger('show');
	},

	/**
	 * 关闭本菜单。
	 */
	onHide: function() {

		// 先关闭子菜单。
		this.hideSubMenu();
		this.trigger('hide');
	},

	show: function() {
		Dom.show(this.node);
		this.onShow();
		return this;
	},

	hide: function() {
		Dom.hide(this.node);
		this.onHide();
		return this;
	},
	
	/**
	 * 当前菜单依靠某个控件显示。
	 * @param {Control} ctrl 方向。
	 */
	showAt: function(x, y) {
		
		// 确保菜单已添加到文档内。
		if (!this.parent('body')) {
			this.appendTo();
		}

		// 显示节点。
		this.show();

		this.setPosition(x, y);

		return this;
	},

	/**
	 * 当前菜单依靠某个控件显示。
	 * @param {Control} ctrl 方向。
	 */
	showBy: function(ctrl, pos, offsetX, offsetY, enableReset) {

		// 确保菜单已添加到文档内。
		if (!this.parent('body')) {
			this.appendTo(ctrl.parent());
		}

		// 显示节点。
		this.show();

		this.align(ctrl, pos || 'rt', offsetX != null ? offsetX : -5, offsetY != null ? offsetY : -5, enableReset);

		return this;
	},

	/**
	 * 显示指定项的子菜单。
	 * @param {MenuItem} menuItem 子菜单项。
	 * @protected
	 */
	showSubMenu: function(menuItem) {

		// 如果不是右键的菜单，在打开子菜单后监听点击，并关闭此子菜单。
		if (!this.floating)
			document.once('mouseup', this.hideSubMenu, this);

		// 隐藏当前项子菜单。
		this.hideSubMenu();

		// 激活本项。
		menuItem.hovering(true);

		// 如果指定的项存在子菜单。
		if (menuItem.subControl) {

			// 设置当前激活的项。
			this.currentSubMenu = menuItem;

			// 显示子菜单。
			menuItem.subControl.showBy(menuItem);

		}
		
	},

	/**
	 * 关闭本菜单打开的子菜单。
	 * @protected
	 */
	hideSubMenu: function() {

		// 如果有子菜单，就隐藏。
		if (this.currentSubMenu) {

			// 关闭子菜单。
			this.currentSubMenu.subControl.hide();

			// 取消激活菜单。
			this.currentSubMenu.hovering(false);
			this.currentSubMenu = null;
		}
		
	}

});



