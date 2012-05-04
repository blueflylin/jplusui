var BuildFiles = {
	"全部组件" : {
		"$name" : "全部组件",
		"targetCss" : "build/assets/styles/jplus.css",
		"targetJs" : "build/assets/scripts/jplus.js",
		"targetImages" : "../images",
		"require" : "",
		"define" : "",
		"removeTrace" : true,
		"removeAssert" : false,
		"removeConsole" : false,
		"copyImages" : true,
		"resolveLess" : true,
		"header" : true,
		"macro" : true,
		"using" : ["Controls.Core.Base", "Controls.Core.Common", "Controls.Display.Thumbnail", "Controls.Display.Icon", "Controls.Display.List", "Controls.Display.Arrow", "Controls.Container.Tabbable", "Controls.DataView.Table", "Controls.DataView.TreeView", "Controls.Page.Scaffolding", "Controls.Page.Grid", "Controls.Button.SplitButton", "Controls.Button.Menu", "Controls.Button.CloseButton", "System.Browser.Cookie"],
		"top" : ["System.Core.Base", "System.Dom.Base", "Controls.Core.Base"],
		"bottom" : [],
		"resolveUsing" : true
	},
	"release" : {
		"$name" : "release",
		"targetCss" : "../release/jplus-3.0-full/docs/assets/styles/jplus.css",
		"targetJs" : "../release/jplus-3.0-full/docs/assets/scripts/jplus.js",
		"targetImages" : "../images/",
		"require" : "",
		"define" : "",
		"removeTrace" : true,
		"removeAssert" : false,
		"removeConsole" : false,
		"copyImages" : true,
		"resolveLess" : true,
		"header" : true,
		"macro" : true,
		"resolveUsing" : true,
		"top" : ["System.Core.Base"],
		"using" : ["Controls.Core.Base", "Controls.Core.ListControl", "System.Browser.LocalStorage", "System.Dom.HashChange", "System.Dom.Drag", "Controls.Display.Icon", "Controls.Core.Splitter", "Controls.DataView.TreeView", "Controls.Button.Menu-Alt", "System.Fx.Animate", "Controls.Button.CloseButton", "Controls.Form.SearchTextBox", "Controls.Button.ContextMenu", "Controls.DataView.Table"],
		"excludeJs" : ["Controls.Button.Menu"]
	}
};

if( typeof module === 'object') {
	module.exports = BuildFiles;
}