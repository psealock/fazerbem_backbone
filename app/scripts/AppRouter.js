define([
	'backbone',
	'marionette'
], function (Backbone, Marionette) {

		var AppRouter = Backbone.Marionette.AppRouter.extend({
			appRoutes: {
				'': 'showLandingPage',
				'products/:param': 'showProductPage',
				'cart/:param': 'showCartPage'
			}
	});

	return AppRouter;
});