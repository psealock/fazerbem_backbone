define([
  'backbone',
	'marionette',
	'templates',
  'vent'
], function (Backbone, Marionette, templates, vent) {

  var CartFooterView = Backbone.Marionette.ItemView.extend({
      template: templates.cartFooter,
      events: {
      	'click #viewList': 'goToProducts',
        'click #reset': 'resetBoughtPlusIncart'
      },
      goToProducts: function() {
      	vent.trigger('goToProducts', $('#user').html());
      },
      resetBoughtPlusIncart: function(event) {
        event.preventDefault();
        
        $.post('resetBoughtPlusIncart/' + $('#user').html());

        this.trigger('resetBoughtPlusIncart');
      }
  });

  return CartFooterView;
	
});