$(function() {
	var layer = layui.layer
	var form = layui.form
	initArtCateList()

	//获取文章列表
	function initArtCateList() {
		$.ajax({
			method: 'GET',
			url: '/my/article/cates',
			success: function(res) {
				//拿到字符串调用template模板
				//console.log(res)
				var htmlStr = template('tpl-table', res)
				$('tbody').html(htmlStr)
			}
		})
	}

	//为添加类别按钮绑定点击事件
	var indexAdd = null
	$('#btnAddCate').on('click', function() {
		indexAdd = layer.open({
			type: 1,
			area: ['500px', '250px'],
			title: '添加文章分类',
			content: $('#btn_add').html()
		})

	})

	//form-add页面加载完成之后并不存在，所以需要通过代理的形式为form-add绑定submit事件
	$('body').on('submit', '#form-add', function(e) {
		e.preventDefault()
		//console.log('ok')
		$.ajax({
			method: 'POST',
			url: '/my/article/addcates',
			data: $(this).serialize(),
			success: function(res) {
				if (res.status !== 0) {
					return layer.msg('新增分类失败！')
				}
				initArtCateList()
				layer.msg('新增分类成功！')
				layer.close(indexAdd)
			}

		})
	})
	//通过代理的形式，为btn—edit按钮绑定点击事件
	var indexEdit = null
	$('tbody').on('click', '.btn-edit', function() {
		indexEdit = layer.open({
			type: 1,
			area: ['500px', '250px'],
			title: '修改文章分类',
			content: $('#btn_edit').html()
		})

		var id = Math.abs($(this).attr('data-id'))
		console.log(id)
		//发起ajax请求获取相对应的分类数据
		$.ajax({
			method: 'GET',
			url: '/my/article/cates/' + id,
			success: function(res) {
				form.val('form-edit', res.data)
				//console.log(res)
			}
		})
	})

	//通过代理的形式，为修改分类的表单绑定submit事件
	$('body').on('submit', '#form-edit', function(e) {
		e.preventDefault()
		$.ajax({
			method: 'POST',
			url: '/my/article/updatecate',
			data: $(this).serialize(),
			success: function(res) {
				if (res.status !== 0) {
					return layer.msg('更新分类数据失败！')
				}
				layer.msg('更新分类数据成功！')
				layer.close(indexEdit)
				initArtCateList()
			}
		})
	})

	//为删除事件绑定点击事件
	 $('tbody').on('click', '.btn-delete', function() {
		//console.log('ok')
		var id = $(this).attr('data-id')
		console.log(id)
		//提示用户是否删除
		layer.confirm('确认删除?', {
			icon: 3,
			title: '提示'
		}, function(index) {
			//do something
			$.ajax({
				method: 'GET',
				url: '/my/article/deletecate/' + id,
				success: function(res) {
					if (res.status !== 0) {
						//return layer.msg('删除分类失败！')
						console.log(res)
					}
					layer.msg('删除分类成功！')
					layer.close(index);
					initArtCateList()
				}
			})

		});
	})
})
