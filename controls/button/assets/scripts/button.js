/** * @author  xuld */imports("Controls.Button.Button");using("Controls.Core.IInput");using("Controls.Core.ContentControl");var Button = ContentControl.extend(IInput).implement({		xtype: 'button',		options: {		type: 'button'	},		tpl: '<button class="x-control" type="button"></button>',		create: function(options){		var type = options.type;		delete options.type;		return Dom.parseNode(this.tpl.replace(/x-control/g, 'x-' + this.xtype).replace('type="button"', 'type="' + type + '"'));	},		input: function(){		return this;	},		actived: function(value){		return this.toggleClass('x-button-actived', value);	}	});