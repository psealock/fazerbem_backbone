define([
	'backbone',
  'marionette'
], function (Backbone, Marionette) {

  var CartItemView = Backbone.Marionette.ItemView.extend({
      tagName: "li",
      attributes: function() {
      	return{
      		class: 'item aisle' + this.model.get('aisle') + ' bought-' + this.model.get('bought')
      	};
      },
      template: _.template('<h5><%=item %></h5><%=aisle %>'),
       events: {
        'click': 'changeToBought'
      },
      changeToBought: function(event) {
        event.preventDefault();
        this.model.set('bought', true);

        this.model.save();
        this.trigger('changeToBought');
      }
  });

  return CartItemView;
	
});