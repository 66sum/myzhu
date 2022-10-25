function get(url) {
	wx.showToast({
		title: '加载中',
		icon: 'loading'
	})
	return new Promise((resolve, reject) => {
		wx.request({
			url,
			success: (res) => {
				wx.hideLoading()
				resolve(res)
			}
		})
	})
}
export default {
	get
}
