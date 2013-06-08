define(function(require){
  "use strict";
  return {
  	landing: require('tpl!moduleApps/main/templates/landing.tmpl'),
  	productArea: require('tpl!moduleApps/main/templates/productArea.tmpl'),
  	productHeader: require('tpl!moduleApps/header/templates/productHeader.tmpl'),
  	productFooter: require('tpl!moduleApps/footer/templates/productFooter.tmpl'),
  	productIntro: require('tpl!moduleApps/main/templates/productIntro.tmpl'),
  	cartHeader: require('tpl!moduleApps/header/templates/cartHeader.tmpl'),
  	cartFooter: require('tpl!moduleApps/footer/templates/cartFooter.tmpl'),
  	cartIntro: require('tpl!moduleApps/main/templates/cartIntro.tmpl')
  };
});
