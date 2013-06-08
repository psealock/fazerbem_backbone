define([
  'backbone',
	'marionette',
], function (Backbone, Marionette) {

  var UserView = Backbone.Marionette.ItemView.extend({
      tagName: "option",
      template: _.template('<%=name %>')
  });

  return UserView;
	
});