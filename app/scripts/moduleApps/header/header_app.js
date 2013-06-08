define([
	'backbone',
	'marionette',
	'shoppingApp',
	'ProductHeaderView',
	'CartHeaderView'
], function (Backbone, Marionette, shoppingApp, ProductHeaderView, CartHeaderView) {

	var header_app = shoppingApp.module('header_app');

	header_app.showProductHeader = function() {

		var productHeaderView = new ProductHeaderView;

		shoppingApp.header.show(productHeaderView);
	}

	header_app.showCartHeader = function() {

		var cartHeaderView = new CartHeaderView;

		shoppingApp.header.show(cartHeaderView);
	}

	return header_app;
});