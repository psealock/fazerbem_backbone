define([
	'backbone',
  'marionette',
  'templates',
  'ProductItemView'
], function (Backbone, Marionette, templates, ProductItemView) {

  var ProductListView = Backbone.Marionette.CompositeView.extend({
    template: templates.productArea,
    itemView: ProductItemView,
    itemViewContainer: 'ul'
  });

  return ProductListView;
	
});