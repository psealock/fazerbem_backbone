define([
	'backbone',
	'marionette',
	'shoppingApp',
	'vent',
	'UserListView',
	'ProductListView',
	'ProductLayout',
	'ProductIntroView',
	'CartIntroView',
	'CartListView'
], function (Backbone, Marionette, shoppingApp, vent, UserListView, ProductListView, ProductLayout, ProductIntroView, CartIntroView, CartListView) {

	var main_app = shoppingApp.module('main_app');

	main_app.showLandingMain = function() {

		var UserModel = Backbone.Model.extend({});
		var UserList = Backbone.Collection.extend({
			model: UserModel,
			url: '/shoppers'
		});

		var userList = new UserList();

		userList.fetch({
			success: function() {
				var userListView = new UserListView({collection: userList});
				shoppingApp.main.show(userListView);
			}
		});

		
	}

	main_app.showProductMain = function(param) {

		//create layout of main region to #intro and #products.
		productLayout = new ProductLayout();
		shoppingApp.main.show(productLayout);


		//instantiate productIntroView to show intro in layout's #intro.
		var productIntroView = new ProductIntroView;
		productLayout.introRegion.show(productIntroView);
		$('#user').html(param);


		//instantiate productListView to show products in layout's #products.
		var ItemModel = Backbone.Model.extend({
			url: 'toCart/' + param
		});
		var ProductList = Backbone.Collection.extend({
			model: ItemModel,
			url: '/products/' + param,
			comparator: function(product) {
				return product.get('aisle');
			},
			howManyIncart: function() {
				return this.where({"incart": true}).length;
			},
			filterBySearch: function(input){
			  var filtered  = this.models.filter(function (product) {
			  	if (input == "")
			  		return product
			  	else if (product.get('item').toLowerCase().indexOf(input) != -1)
			  		return product;
			  });
			  return new ProductList(filtered);
			},
		});

		var productList = new ProductList();

		function instantiateProductListView() {
			var productListView = new ProductListView({collection: productList.filterBySearch($('.search-query').val())});
			productLayout.productsRegion.show(productListView);

			//count number of items with {incart: true}.
			$('.totalItemsInCart').html(productList.howManyIncart());		

			//listen for moveToCart function.
			productListView.on('itemview:moveToCart', function() {
				//re-render the list.
		    productListView.render();
		    //update the number of items with {incart: true}
		    $('.totalItemsInCart').html(productList.howManyIncart());

		  });

		}
		
		//get products data from server.
		productList.fetch({
			success: function() {

				instantiateProductListView();

			  vent.on('newProduct', function (data) {
			  	productList.add(data);
		  		instantiateProductListView();
			  });

			}
		});



		vent.on('search', function() {
			instantiateProductListView();
		});

	}


	main_app.showCartMain = function(param) {
		//create layout of main region to #intro and #products.
		productLayout = new ProductLayout();
		shoppingApp.main.show(productLayout);


		//instantiate cartIntroView to show intro in layout's #intro.
		var cartIntroView = new CartIntroView;
		productLayout.introRegion.show(cartIntroView);
		$('#user').html(param);


		//instantiate cartListView to show products in layout's #products.
		var ItemModel = Backbone.Model.extend({
			url: 'changeToBought/' + param
		});
		var ProductList = Backbone.Collection.extend({
			model: ItemModel,
			url: '/products/' + param,
			filterByIncart: function(){
			  var filtered  = this.models.filter(function (product) {
			  	return product.get('incart') === true;
			  });
			  return new ProductList(filtered);
			},
			filterBySearch: function(input){
			  var filtered  = this.models.filter(function (product) {
			  	if (input == "")
			  		return product
			  	else if (product.get('item').toLowerCase().indexOf(input) != -1)
			  		return product;
			  });
			  return new ProductList(filtered);
			},
			howManyIncart: function() {
				return this.where({"incart": true}).length;
			},
			howManyBought: function() {
				return this.where({"bought": true}).length;
			},
			comparator: function(product) {
				return product.get('aisle');
			}
		});


		var productList = new ProductList();
		var totalItemsInCart = $('#totalItemsInCart');
		var totalItemsBought = $('#totalItemsBought');


		function instantiateCartListView() {
			var cartListView = new CartListView({collection: productList.filterByIncart().filterBySearch($('.search-query').val())});
			productLayout.productsRegion.show(cartListView);

			totalItemsInCart.html(productList.howManyIncart());
			totalItemsBought.html(productList.howManyBought());

			//listen for moveToCart function.
			cartListView.on('itemview:changeToBought', function() {
		    cartListView.render();
		    totalItemsBought.html(productList.howManyBought());
		  });
		} 
		
		productList.fetch({
			success: function() {
				instantiateCartListView();
			}
		});
		

		vent.on('search', function() {
			instantiateCartListView();
		});
		

		vent.on('resetCart', function() {
			productLayout.productsRegion.close();
			totalItemsInCart.html("0");
			totalItemsBought.html("0");
		});
	}

	
	return main_app;
});



