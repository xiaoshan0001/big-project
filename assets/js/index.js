$(function() {
	getUserInfo()
	var layer = layui.layer
	// 退出功能
	$('#btnLogout').on('click', function() {
		// 提示用户是否确认退出
		layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
		  //do something
		  // 清除本地存储中的token
		  localStorage.removeItem('token')
		  location.href = './login.html'
		  
		  
		  layer.close(index);
		});
	})
})
//获取用户基本信息
function getUserInfo() {
	$.ajax({
		method: 'GET',
		url: '/my/userinfo',
		// headers: {
		// 	Authorization: localStorage.getItem('token') || ''
		// },
		success: function(res) {
			//console.log(res)
			if (res.status !== 0) {
				return layui.layer.msg('获取用户信息失败！ ')
			}
			renderAvatar(res.data)
		},
		//ajax请求无论成功与否,都会调用complete回调函数
		// complete: function(res) {
		// 	console.log(res)
		// 	// responseJSON中存储着登录信息
		// 	if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！') {
		// 		// 强制清空token
		// 		localStorage.removeItem('token')
		// 		// 强制跳转登录页面
		// 		location.href = './login.html'
		// 	}
		// }
	})
}

function renderAvatar(user) {
	// 获取用户名字
	var name = user.nickname || user.username
	// 设置欢迎文本
	$('#welcome').html('欢迎&nbsp&nbsp;' + name)
	// 渲染用户头像
	if (user.user_pic !== null) {
		// 渲染图片头像
		$('.layui-nav-img').attr('src', user.user_pic).show()
		$('.text-avatar').hide()
	}else {
		// 渲染文本头像
		$('.layui-nav-img').hide()
		var first = name[0].toUpperCase()
		$('.text-avatar').html(first).show()
	}
}
