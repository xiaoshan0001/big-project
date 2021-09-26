$(function() {
	var layer = layui.layer

	// 1.1 获取裁剪区域的 DOM 元素
	var $image = $('#image')
	// 1.2 配置选项
	const options = {
		// 纵横比
		aspectRatio: 1,
		// 指定预览区域
		preview: '.img-preview'
	}

	// 1.3 创建裁剪区域
	$image.cropper(options)

	//为上传按钮绑定点击事件
	$('#btnChooseImage').on('click', function() {
		$('#file').click()
	})

	//为文件绑定change事件
	$('#file').on('change', function(e) {
		//获取用户选择的文件
		var filelist = e.target.files
		console.log(filelist)
		if (filelist.length === 0) {
			return layer.msg('请选择照片！')
		}
		//拿到用户上传的图片
		var file = e.target.files[0]
		//根据文件创建对应的url地址
		var newImURL = URL.createObjectURL(file)
		$image
			.cropper('destroy') // 销毁旧的裁剪区域
			.attr('src', newImURL) // 重新设置图片路径
			.cropper(options) // 重新初始化裁剪区域
	})

	//为确定按钮绑定点击事件
	$('#btnUpload').on('click', function() {
		//拿到用户裁剪过后的头像
		var dataURL = $image
			.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
				width: 100,
				height: 100
			})
			.toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
			//base64字符串将图片转化为字符串，减少了图片的请求，但是会扩大代码的内存。所以大图片不适合转化为base64
		//调用接口，把头像上传服务器
		$.ajax({
			method: 'POST',
			url: '/my/update/avatar',
			data: {
				avatar: dataURL
			},
			success: function(res) {
				if(res.status !== 0) {
					return layer.msg('更换头像失败！')
				}
				layer.msg('更换头像成功！')
				window.parent.getUserInfo()
			}
		})
	})
})
