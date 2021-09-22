//每次使用jq的时候，jq都会先调用ajaxPrefilter
$.ajaxPrefilter(function(options) {
	//发起ajax之前，统一请求拼接请求的根路径
	options.url = 'http://api-breakingnews-web.itheima.net' +options.url
})