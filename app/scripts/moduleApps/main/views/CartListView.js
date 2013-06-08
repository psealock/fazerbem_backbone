define([
	'backbone',
  'marionette',
  'templates',
  'CartItemView'
], function (Backbone, Marionette, templates, CartItemView) {

  var CartListView = Backbone.Marionette.CompositeView.extend({
    template: templates.productArea,
    itemView: CartItemView,
    itemViewContainer: 'ul'
  });

  return CartListView;
	
});