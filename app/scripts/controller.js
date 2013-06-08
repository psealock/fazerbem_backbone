define([
	'backbone',
	'marionette',
	'shoppingApp',
	'header_app',
	'main_app',
	'footer_app'
], function (Backbone, Marionette, shoppingApp) {
	var controller = {

		showLandingPage: function() {

			shoppingApp.header.close();

			shoppingApp.main_app.showLandingMain();

			shoppingApp.footer.close();

		},

		showProductPage: function(param) {

			shoppingApp.header_app.showProductHeader();

			shoppingApp.main_app.showProductMain(param);

			shoppingApp.footer_app.showProductFooter();

		},

		showCartPage: function(param) {

			shoppingApp.header_app.showCartHeader();

			shoppingApp.main_app.showCartMain(param);

			shoppingApp.footer_app.showCartFooter();
		}

	};

	return  controller;
});