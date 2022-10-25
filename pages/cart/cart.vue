<template>
	<view>
		<van-nav-bar :left-text="show?'返回':'编辑'" @click-left="show = !show" />

		<scroll-view scroll-y class="center">
			<van-swipe-cell :right-width="65 " v-for="(item,index) in goods" :key="index">
				<van-checkbox :value="item.flag" shape="square" @click.native="fx(index)" class='fx'></van-checkbox>
				<van-card :num="item.number" :price="item.price" :title="item.name" :thumb="item.pic">
					<view slot="footer">
						<van-stepper :value="item.number" @plus="addnum(index)" @minus="cutnum(index)" />
					</view>
				</van-card>
				<view slot="right" class="sc" @click="del(index)">删除</view>
			</van-swipe-cell>
		</scroll-view>

		<van-submit-bar :price="sum1" button-text="提交订单" v-if="!show">
			<van-checkbox :value="checked" @click.native="all()">全选</van-checkbox>
			<template #tip>
				选中商品数量：{{sum2}}
			</template>
		</van-submit-bar>

		<van-submit-bar :price="sum1" button-text="选中删除" @submit="done()" v-if="show">
			<van-checkbox :value="checked" @click.native="all()">全选</van-checkbox>
			<template #tip>
				选中商品数量：{{sum2}}
			</template>
		</van-submit-bar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				goods: [],
				checked: false
			};
		},
		onLoad() {
			this.goods = wx.getStorageSync('cart') || []
		},
		methods: {
			addnum(index) {
				this.goods[index].number++
				wx.setStorageSync('cart', this.goods)

			},
			cutnum(index) {
				this.goods[index].number--
				wx.setStorageSync('cart', this.goods)
			},
			fx(index) {
				this.goods[index].flag = !this.goods[index].flag
				wx.setStorageSync('cart', this.goods)
			},
			all() {
				this.checked = !this.checked
				this.goods.forEach(item => {
					return item.flag = this.checked
				})
				wx.setStorageSync('cart', this.goods)
			},
			del(index) {
				this.goods.splice(index, 1)
				wx.setStorageSync('cart', this.goods)
			},
			done() {
				var arr = this.goods.filter(item => {
					return !item.flag
				})
				return this.goods = arr
				wx.setStorageSync('cart', this.goods)
			}
		},
		computed: {
			sum1() {
				var count = 0
				this.goods.forEach(item => {
					if (item.flag) {
						count += item.price * item.number * 100
					}
				})
				return count
				wx.setStorageSync('cart', this.goods)
			},
			sum2() {
				var count1 = 0
				this.goods.forEach(item => {
					if (item.flag) {
						count1 += item.number
					}
				})
				return count1
				wx.setStorageSync('cart', this.goods)
			}

		},
		watch: {
			goods: {
				handler(val) {
					var arr = val.filter(item => {
						return item.flag
					})
					if (val.length == 0) {
						this.checked = false
					} else {
						if (arr.length == val.length) {
							this.checked = true
						} else {
							this.checked = false
						}
					}
				},
				deep: true,
				immediate: true
			},
		}
	}
</script>

<style lang="scss">
	.van-nav-bar {
		position: fixed;
		width: 100%;
		height: 0px !important;
		top: 0;
		left: 0;
	}

	.sc {
		width: 65px;
		height: 136px;
		background-color: red;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 25px;
	}

	.van-card {
		margin-left: 40px;
	}

	.center {
		height: 900rpx;
	}

	.fx {
		position: relative;
		top: 60px;
		left: 10px;
	}

	.van-card {
		// border: 1px solid #000;
		box-sizing: border-box;
	}
</style>
