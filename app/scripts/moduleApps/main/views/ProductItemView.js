define([
	'backbone',
  'marionette'
], function (Backbone, Marionette) {

  var ProductItemView = Backbone.Marionette.ItemView.extend({
      tagName: "li",
      attributes: function() {
      	return{
      		class: 'item aisle' + this.model.get('aisle') + ' incart-' + this.model.get('incart')
      	};
      },
      template: _.template('<h5><%=item %></h5><%=aisle %>'),
      events: {
        'click': 'moveToCart'
      },
      moveToCart: function(event) {
        event.preventDefault();
        this.model.set('incart', true);

        this.model.save();
        this.trigger('moveToCart');
      }

  });

  return ProductItemView;
	
});