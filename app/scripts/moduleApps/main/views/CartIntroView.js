define([
  'backbone',
	'marionette',
	'templates'
], function (Backbone, Marionette, templates) {

  var CartIntroView = Backbone.Marionette.ItemView.extend({
      template: templates.cartIntro
  });

  return CartIntroView;
	
});