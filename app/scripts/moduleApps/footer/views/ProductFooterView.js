define([
  'backbone',
	'marionette',
	'templates',
	'vent'
], function (Backbone, Marionette, templates, vent) {

  var ProductFooterView = Backbone.Marionette.ItemView.extend({
      template: templates.productFooter,
      events: {
      	'click #viewList': 'goToCart',
        'submit form': 'newProduct'
      },
      goToCart: function() {
      	vent.trigger('goToCart', $('#user').html());
      },
      newProduct: function() {

        var newItem = {
          item: $('.newProduct').val(),
          aisle: $('#chooseAisle').val(),
          incart: false,
          bought: false
        };

        $.post('newProduct/' + $('#user').html(), newItem);

        vent.trigger('newProduct', newItem);
      
        return false;
      }
  });

  return ProductFooterView;
	
});