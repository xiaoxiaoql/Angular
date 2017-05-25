// 路由模块
(function(){
	var routers=angular.module('routers',[]);
	routers.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.when("","/home/pageone");
		$stateProvider.state('home',{
			url:'/home',
			templateUrl:'template/home.html',
			controller:'homectrl'
		}).state('home.pageone',{
			url:'/pageone',
			templateUrl:'./template/pageone.html',
			controller:'indexctrl'
		}).state('home.detail',{
			url:'/detail/:id',
			templateUrl:'./template/detail.html',
			controller:'detailctrl'
		}).state('home.mynews',{
			url:'/mynews',
			templateUrl:'./template/mynews.html',
			controller:'mynewsctrl'
		}).state('home.publicTopic',{
			url:'/publicTopic',
			templateUrl:'./template/publicTopic.html',
			controller:'publicTopicctrl'
		})
		
	})
})()