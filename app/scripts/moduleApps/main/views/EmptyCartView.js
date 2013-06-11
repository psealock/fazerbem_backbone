define([
	'backbone',
  'marionette',
  'templates'
], function (Backbone, Marionette, templates) {

  var EmptyCartView = Backbone.Marionette.ItemView.extend({
    template: templates.emptyView
  });
  
  return EmptyCartView;
	
});