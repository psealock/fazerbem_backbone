define([
	'backbone',
  'marionette',
  'vent',
  'templates',
  'UserView'
], function (Backbone, Marionette, vent, templates, UserView) {

  var UserListView = Backbone.Marionette.CompositeView.extend({
    template: templates.landing,
    itemView: UserView,
    itemViewContainer: '#chooseShopper',
    events: {
      'submit form': 'goToProducts'
    },
    goToProducts: function() {
      vent.trigger('goToProducts', $('#chooseShopper').val());
      return false;
    }
  });

  return UserListView;
	
});