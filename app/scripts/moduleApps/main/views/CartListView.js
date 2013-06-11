define([
	'backbone',
  'marionette',
  'templates',
  'CartItemView',
  'EmptyCartView'
], function (Backbone, Marionette, templates, CartItemView, EmptyCartView) {

  var CartListView = Backbone.Marionette.CompositeView.extend({
    template: templates.productArea,
    itemView: CartItemView,
    itemViewContainer: 'ul',
    emptyView: EmptyCartView
  });

  return CartListView;
	
});