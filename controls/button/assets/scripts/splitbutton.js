/** * @author xuld */imports("Controls.Button.SplitButton");using("Controls.Button.MenuButton");var SplitButton = MenuButton.extend({		xtype: 'splitbutton',		tpl: '<span class="x-splitbutton x-buttongroup">\				<button class="x-button">&nbsp;</button>\				<button class="x-button"><span class="x-button-menu x-button-menu-down"></span></button>\			</span>',		input: function(){		return this.query('x-button');	},		init: function () {		var next = this.next();		this.find('>.x-button:last-child').on('click', this.toggleDropDown, this);		this.setDropDown(new Menu(next && next.hasClass('x-dropdown') ? next : null).on('click', this.onDropDownClick, this));	}	});