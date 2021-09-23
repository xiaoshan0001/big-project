//每次使用jq的时候，jq都会先调用ajaxPrefilter
$.ajaxPrefilter(function(options) {
	//发起ajax之前，统一请求拼接请求的根路径
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url

	// 统一为有权限接口设置请求头
	// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
	//如果要检索的字符串值没有出现，则该方法返回 -1
	if (options.url.indexOf('/my/') !== -1) {
		options.headers = {
			Authorization: localStorage.getItem('token') || ''
		}
	}

	// 全局挂载complete回调函数
	options.complete = function(res) {
		if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
			// 强制清空token
			localStorage.removeItem('token')
			// 强制跳转登录页面
			location.href = './login.html'
		}
	}
})
