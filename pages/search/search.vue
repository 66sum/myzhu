<template>
	<view>
		<header>
			<input type="text" placeholder="搜索" placeholder-class="center" @confirm="search" v-model="name">
		</header>
		<van-tag closeable size="medium" type="primary" id="primary" @close="onClose(index)"
			v-for="(item,index) in list">
			{{item.name}}
		</van-tag>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				name: ''
			};
		},
		onLoad() {
			this.list = wx.getStorageSync('list') || []
		},
		methods: {
			search() {
				if (this.name == '') {
					wx.showToast({
						title: '内容不能为空',
						icon: "error"
					})
				}
				var index = this.list.findIndex(item => {
					return item.name == this.name
				})
				if (index != -1) {
					this.list.splice(index, 1)
				}
				if (this.length >= 6) {
					this.list.pop()
				}
				var obj = {
					name: this.name
				}
				this.list.unshift(obj)
				console.log(obj);
				wx.setStorageSync('list', this.list)
				wx.navigateTo({
					url: '../searchList/searchList?name=' + this.name
				})
				this.name = ''
			},
			onClose(index) {
				this.list.splice(index, 1)
			}
		},
	}
</script>

<style lang="scss">
	header {
		height: 50px;
		background-color: #ce2911;
		display: flex;
		justify-content: space-around;
		align-items: center;

		input {
			width: 90%;
			height: 40px;
			border: 1px solid #fff;
			border-radius: 10px;
			-webkit-text-fill-color: #fff;
		}
	}

	.center {
		text-align: center;
	}
</style>
