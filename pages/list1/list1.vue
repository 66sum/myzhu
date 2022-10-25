<template>
	<view>
		<van-card :num="item.goods_number" :price="item.goods_price" :title="item.goods_name"
			:thumb="item.goods_big_logo" v-for="(item,index) in arr" :key="item.goods_id"
			@click.native="goDetail(item.goods_id)" />
		<p v-if="arr.length==total">到底了~~</p>
	</view>
</template>

<script>
	import qs from 'querystring'
	export default {
		data() {
			return {
				arr: [],
				obj: {
					cid: 0,
					pagesize: 10,
					pagenum: 1
				},
				total: 0
			};
		},
		onLoad(options) {
			this.obj.cid = options.cid
			this.getlist()
		},
		methods: {
			getlist() {
				this.http.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/search?' + qs.stringify(this.obj))
					.then(res => {
						this.arr = [...this.arr, ...res.data.message.goods]
						console.log(this.arr);
						this.total = res.data.message.total
						console.log(this.total);
					})
			},
			goDetail(id) {
				wx.navigateTo({
					url: '../detail/detail?goods_id=' + id
				})
			}
		},
		onReachBottom() {
			console.log('触底');
			if (this.total > this.obj.pagesize) {
				this.obj.pagenum++
				this.getlist()
			}
		},
		onPullDownRefresh() {
			console.log('下拉');
			this.list = []
			this.obj.pagenum = 1
			this.getlist()
			setTimeout(() => {
				wx.stopPullDownRefresh()
				console.log('停止下拉');
			}, 500)
		}
	}
</script>

<style lang="scss">

</style>
