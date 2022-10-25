<template>
	<view>
		<p v-html="item.goods_name" v-for="item in list" :key="item.id"></p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad(options) {
			this.getlist(options.name)
		},
		methods: {
			getlist(name) {
				this.http.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch?query=' + name).then(res => {
					this.list = res.data.message
					console.log(this.list);
					var str = `<span style="color:red;">${name}</span>`
					this.list.forEach(item => {
						item.goods_name = item.goods_name.replace(name, str)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	p {
		padding: 10px;
		// box-shadow: 0 0 1px 5px #eee;
		border-bottom: 5px solid #eee;
	}
</style>
