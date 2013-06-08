define([
  'backbone',
	'marionette',
], function (Backbone, Marionette) {

 var ProductLayout = Backbone.Marionette.Layout.extend({
 	template: _.template('<div id="intro"></div><div id="products"></div>'),
 	regions: {
 		introRegion: '#intro',
 		productsRegion: '#products'
 	}
 });

  return ProductLayout;
	
});