define([
  'backbone',
	'marionette',
	'templates',
	'vent'
], function (Backbone, Marionette, templates, vent) {

  var ProductHeaderView = Backbone.Marionette.ItemView.extend({
      template: templates.productHeader,
      events: {
      	'click #viewList': 'goToCart',
        'keyup .search-query': 'searchFunction',
        'click .clear': 'clearSearch'
      },
      goToCart: function() {
      	vent.trigger('goToCart', $('#user').html());
      },
      searchFunction: function() {
        vent.trigger('search');
      },
      clearSearch: function() {
        $('.search-query').val("");
        vent.trigger('search'); 
        return false;
      }
  });

  return ProductHeaderView;
	
});