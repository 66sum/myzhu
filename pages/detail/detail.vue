<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="one">
			<swiper-item class="onebox" v-for="(item,index) in obj.pics" :key="index">
				<view class="swiper-item">
					<img :src="item.pics_big_url" alt="">
				</view>
			</swiper-item>
		</swiper>
		<div>
			<div style="color: red;">价格：${{obj.goods_price}}</div>
			<div>名称：{{obj.goods_name}}</div>
			<div>图文推荐</div>
			<div v-html="obj.goods_introduce"></div>
		</div>
		<van-goods-action>
			<van-goods-action-icon icon="chat-o" text="客服" bind:click="onClickIcon" />
			<van-goods-action-icon icon="cart-o" text="购物车" @click="goCart()" />
			<van-goods-action-icon icon="star-o" text="收藏" @click="colls()" v-if="!show" />
			<van-goods-action-icon icon="star" text="已收藏" @click="colls()" v-if="show" />
			<van-goods-action-button text="加入购物车" type="warning" @click="addCart()" />
			<van-goods-action-button text="立即购买" bind:click="onClickButton" />
		</van-goods-action>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {},
				show: false,
				coll: [],
				cart: []
			};
		},
		onLoad(options) {
			this.getobj(options.goods_id)
			this.coll = wx.getStorageSync('coll') || []
			this.cart = wx.getStorageSync('cart') || []
		},
		methods: {
			getobj(id) {
				this.http.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=' + id).then(res => {
					this.obj = res.data.message
					console.log(this.obj);
					// 收藏的初始化
					var index = this.coll.findIndex(item => {
						return item.id == this.obj.goods_id
					})
					if (index != -1) {
						this.show = true
					}
				})
			},
			colls() {
				var index = this.coll.findIndex(item => {
					return item.id == this.obj.goods_id
				})
				if (index == -1) {
					var obj = {
						name: this.obj.goods_name,
						price: this.obj.goods_price,
						number: 1,
						flag: false,
						id: this.obj.goods_id,
						pic: this.obj.goods_big_logo
					}
					this.coll.push(obj)
					console.log(obj);
					this.show = true
					wx.setStorageSync('coll', this.coll)
					wx.showToast({
						title: '收藏成功',
						icon: 'success'
					})
				} else {
					this.coll.splice(index, 1)
					this.show = false
					wx.setStorageSync('coll', this.coll)
					wx.showToast({
						title: '取消收藏',
						icon: 'error'
					})
				}
			},
			addCart() {
				var index = this.cart.findIndex(item => {
					return item.id == this.obj.goods_id
				})
				if (index == -1) {
					var obj = {
						name: this.obj.goods_name,
						price: this.obj.goods_price,
						number: 1,
						flag: false,
						id: this.obj.goods_id,
						pic: this.obj.goods_big_logo
					}
					this.cart.push(obj)
					console.log(obj);
					wx.showToast({
						title: '添加成功',
						icon: 'success'
					})
					wx.setStorageSync('cart', this.cart)
				} else {
					this.cart[index].number++
					wx.showToast({
						title: '已添加',
						icon: 'error'
					})
					wx.setStorageSync('cart', this.cart)
				}
			},
			goCart() {
				wx.switchTab({
					url: '../cart/cart'
				})
			}
		},
	}
</script>

<style lang="scss">
	.one {
		height: 500rpx;

		.onebox {
			width: 100%;
			height: 100%;

			.swiper-item {
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
