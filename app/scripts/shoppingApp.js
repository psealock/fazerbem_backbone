define([
	'backbone',
	'marionette'
], function (Backbone, Marionette) {

	var shoppingApp = new Backbone.Marionette.Application();

	shoppingApp.addRegions({
		header : '#header',
	  main   : '#main',
	  footer : '#footer'
	});

	return  shoppingApp;
});