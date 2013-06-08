/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        marionette : {
            deps : ['jquery', 'underscore', 'backbone'],
            exports : 'Marionette'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        marionette: '../bower_components/marionette/backbone.marionette',
        bootstrap: 'vendor/bootstrap',
        tpl: 'vendor/tpl',
        main_app: 'moduleApps/main/main_app',
        header_app: 'moduleApps/header/header_app',
        footer_app: 'moduleApps/footer/footer_app',
        UserView: 'moduleApps/main/views/UserView',
        UserListView: 'moduleApps/main/views/UserListView',
        ProductLayout: 'moduleApps/main/views/ProductLayout',
        ProductItemView: 'moduleApps/main/views/ProductItemView',
        ProductListView: 'moduleApps/main/views/ProductListView',
        ProductHeaderView: 'moduleApps/header/views/ProductHeaderView',
        ProductFooterView: 'moduleApps/footer/views/ProductFooterView',
        ProductIntroView: 'moduleApps/main/views/ProductIntroView',
        CartHeaderView: 'moduleApps/header/views/CartHeaderView',
        CartFooterView: 'moduleApps/footer/views/CartFooterView',
        CartIntroView: 'moduleApps/main/views/CartIntroView',
        CartItemView: 'moduleApps/main/views/CartItemView',
        CartListView: 'moduleApps/main/views/CartListView'
    }
});

require([
    'backbone',
    'shoppingApp',
    'AppRouter',
    'controller',
    'vent'
], function (Backbone, shoppingApp, AppRouter, controller, vent) {

    shoppingApp.start();

    var appRouter = new AppRouter({
      controller: controller
    });

    vent.on('goToProducts', function(data) {
        appRouter.navigate('products/' + data, true);
    });

    vent.on('goToCart', function(data) {
        appRouter.navigate('cart/' + data, true);
    });

    Backbone.history.start();

});
















