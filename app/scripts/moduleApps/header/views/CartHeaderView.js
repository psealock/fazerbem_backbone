define([
  'backbone',
	'marionette',
	'templates',
	'vent'
], function (Backbone, Marionette, templates, vent) {

  var CartHeaderView = Backbone.Marionette.ItemView.extend({
      template: templates.cartHeader,
       events: {
      	'click #viewList': 'goToProducts',
        'keyup .search-query': 'searchFunction',
        'click .clear': 'clearSearch'
      },
      goToProducts: function() {
      	vent.trigger('goToProducts', $('#user').html());
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

  return CartHeaderView;
	
});