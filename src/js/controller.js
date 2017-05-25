;(function(){
	var controllers=angular.module('controllers',[]);

	controllers.controller('homectrl',function($scope,$http){
		//登录名
		$scope.user='';
		$scope.trackbool=false;
		$scope.logoisShow=false;
		window.localStorage.userInfo?$scope.msg=JSON.parse(window.localStorage.userInfo).avatar_url:$scope.msg='https://www.ldsun.com/vue-cnode/static/avatar.png';
		window.localStorage.userInfo?$scope.loginStatus=JSON.parse(window.localStorage.userInfo).loginname:$scope.loginStatus='未登录';
		// $scope.loginStatus='未登录';
		//显示侧边栏
		$scope.trackShow=function(){
			$scope.trackbool=true;
		};
		//点击遮罩隐藏侧边栏
		$scope.maskHide=function(){
			$scope.trackbool=false;
		};
		//显示登录窗口
		$scope.loginShow=function(){
		$scope.logoisShow=true;

		};
		//点击登录
		$scope.loginClick=function(){
			$scope.logoisShow=false;
			$.ajax({
				type:'POST',
				url:'https://cnodejs.org/api/v1/accesstoken',
				data:{
					accesstoken:$scope.user
				},
				dataType:'json',
				success:function(data){
					console.log(data)
					if(data.success==true){
						data.accesstoken=$scope.user;
						window.localStorage.userInfo=JSON.stringify(data);
						$scope.msg=JSON.parse(window.localStorage.userInfo).avatar_url;
						location.reload();
					}
				}
			})
		}

		$scope.searchshow=false;
		$scope.searchkey='';
		$scope.searchbtn=function(){
			$scope.searchshow=true;

		};
		$scope.findbtn=function(){
			$scope.searchshow=false;
			$scope.searchkey='';
		}

	})
	//主页
	controllers.controller('indexctrl',function($scope,$http){
		$scope.listarr=[];
		$scope.isshow=false;
		$scope.page=1;
		$scope.iscurrent=1;
		$scope.nav=function(pag,sty){
			console.log(sty)
			$scope.iscurrent=pag;
			$scope.sorts=sty;
			$scope.isshow=true;
			$scope.page=1;
			$http({
				url:'https://cnodejs.org/api/v1/topics',
				method:'GET',
				params:{
					page:1,
					tab:sty,
					limit:10,
					mdrender:false
				}
			}).then(function(data){
				console.log(data);
				$scope.listarr=data.data.data;
				console.log($scope.listarr)
				$scope.isshow=false;
			})
		}
		$scope.page=1;
		$scope.nav();
		$scope.more=function(){
			$scope.isshow=true;
			$http({
				url:'https://cnodejs.org/api/v1/topics',
				method:'GET',
				params:{
					page:$scope.page++,
					tab:$scope.sorts,
					limit:10,
					mdrender:false
				}
			}).then(function(data){
				console.log(data.data.data);
				console.log($scope.listarr)
				$scope.listarr=$scope.listarr.concat(data.data.data);
				$scope.isshow=false;
			})

		}
		

	})
	//详情 
	controllers.controller('detailctrl',function($scope,$http,$state){
		$scope.isloading=true;
		$http({
			url:'https://cnodejs.org/api/v1/topic/'+$state.params.id,
			params:{
				mdrender :true

			}
		}).then(function(data){
			console.log(data.data.data);
			$scope.arr=data.data.data;
			$scope.num=data.data.data.replies.length;
			$scope.repliArr=data.data.data.replies
			console.log(data.data.data.replies)
			//默认只显示10条评论
			$scope.pageone=$scope.repliArr.slice(0,10);
			$scope.isloading=false;


		})
		//点击所有评论
		$scope.allpage=function(){
			$scope.pageone=$scope.repliArr;
		}
		//点赞
		$scope.clickzan=function(){
			console.log($(event.target).parent().attr('dataes'));
			//获取点赞评论的id
			var idx=$(event.target).parent().attr('dataes');
			$.ajax({
				url:' https://cnodejs.org/api/v1/reply/'+idx+'/ups',
				type:'POST',
				data:{
					accesstoken:JSON.parse(window.localStorage.userInfo).accesstoken
				},
				success:function(data){
					console.log(data)
				}
			})

		}
		//评论
		$scope.commentcon='';//评论框默认为空
		$scope.commentbtn=function(){
			$.ajax({
				url:'https://cnodejs.org/api/v1/topic/'+$state.params.id+'/replies',
				type:'POST',
				data:{
					accesstoken:JSON.parse(window.localStorage.userInfo).accesstoken,
					content:$scope.commentcon
				},
				success:function(data){
					console.log(data);
					//完成后清空输入框
					$scope.commentcon=null;

				}
			})
		}
	})
	//我的消息
	controllers.controller('mynewsctrl',function($scope,$http){
		$http({
			url:'https://cnodejs.org/api/v1/message/count',
			params:{
				accesstoken:JSON.parse(window.localStorage.userInfo).accesstoken
			}

		}).then(function(data){
			$scope.count=data.data.data+'条未读消息';

		})
		$scope.bool=false;
		$scope.getnoread=function(){
			$http({
				url:'https://cnodejs.org/api/v1/messages',
				params:{
					accesstoken:JSON.parse(window.localStorage.userInfo).accesstoken,
					mdrender:false
				}
			}).then(function(data){
				console.log(data.data.data.has_read_messages)
				// if(data.data.data.has_read_messages.length!=0){
					

				// }
				$scope.bool?$scope.bool=false:$scope.bool=true;
				$scope.notReadmsg=data.data.hasnot_read_messages;
				
			})
		}
	})
	//发布话题
	controllers.controller('topicctrl',function(){

	})

})()