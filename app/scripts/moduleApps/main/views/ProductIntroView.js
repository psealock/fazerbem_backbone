define([
  'backbone',
	'marionette',
	'templates'
], function (Backbone, Marionette, templates) {

  var ProductIntroView = Backbone.Marionette.ItemView.extend({
      template: templates.productIntro
  });

  return ProductIntroView;
	
});