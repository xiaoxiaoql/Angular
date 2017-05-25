;(function(){//组件
	var directives=angular.module('directives',[]);
	//头部
	directives.directive('xhead',function(){
		return{
			templateUrl:'./directive/xheade.html',
			

		}
	});
	//导航
	directives.directive('pnav',function(){
		return{
			templateUrl:'./directive/pnav.html'

		}
	})
	//列表
	directives.directive('xlist',function(){
		return{
			templateUrl:'./directive/xlist.html'

		}
	})
	//侧边栏
	directives.directive('sidebar',function(){
		return{
			templateUrl:'./directive/sidebar.html',


		}
	})

})()