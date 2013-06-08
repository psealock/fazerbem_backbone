define([
	'backbone',
	'marionette',
	'vent',
	'shoppingApp',
	'ProductFooterView',
	'CartFooterView'
], function (Backbone, Marionette, vent, shoppingApp, ProductFooterView, CartFooterView) {

	var footer_app = shoppingApp.module('footer_app');

	footer_app.showProductFooter = function() {

		var productFooterView = new ProductFooterView;

		shoppingApp.footer.show(productFooterView);
	}

	footer_app.showCartFooter = function() {

		var cartFooterView = new CartFooterView;

		cartFooterView.on('resetBoughtPlusIncart', function() {

			vent.trigger('resetCart');
			
		});

		shoppingApp.footer.show(cartFooterView);
	}

	return footer_app;
});