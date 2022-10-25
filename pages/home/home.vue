<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="one">
			<swiper-item class="onebox" v-for="item in banner" :key="item.id">
				<view class="swiper-item">
					<img :src="item.image_src" alt="">
				</view>
			</swiper-item>
		</swiper>

		<ul class="biao">
			<li v-for="item in nav" :key="item.id">
				<img :src="item.image_src" alt="">
			</li>
		</ul>

		<section class="floor" v-for="(item,index) in floor" :key="index">
			<p class="zi">
				<img :src="item.floor_title.image_src" alt="">
			</p>
			<div class="zong">
				<div class="left">
					<img :src="item.product_list[0].image_src" alt="">
				</div>
				<div class="right">
					<div><img :src="item.product_list[1].image_src" alt=""></div>
					<div><img :src="item.product_list[2].image_src" alt=""></div>
				</div>
				<div class="right">
					<div><img :src="item.product_list[3].image_src" alt=""></div>
					<div><img :src="item.product_list[4].image_src" alt=""></div>
				</div>
			</div>
		</section>
		<button class="goTop" v-if="show" @click="goTop">置顶</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				nav: [],
				floor: [],
				show: false
			};
		},
		onLoad() {
			this.getbanner()
			this.getnav()
			this.getfloor()
		},
		methods: {
			getbanner() {
				this.http.get('https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata').then(res => {
					this.banner = res.data.message
					console.log(this.banner);
				})
			},
			getnav() {
				this.http.get('https://api-hmugo-web.itheima.net/api/public/v1/home/catitems').then(res => {
					this.nav = res.data.message
					console.log(this.nav);
				})
			},
			getfloor() {
				this.http.get('https://api-hmugo-web.itheima.net/api/public/v1/home/floordata').then(res => {
					this.floor = res.data.message
					console.log(this.floor);
				})
			},
			goTop() {
				wx.pageScrollTo({
					scrollTop: 0
				})
			}
		},
		onPageScroll(e) {
			var obj = wx.getSystemInfoSync(e)
			if (e.scrollTop > obj.windowWidth / 2) {
				this.show = true
			} else {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.one {
		height: 400rpx;

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

	.biao {
		height: 90px;
		display: flex;

		li {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			img {
				width: 70px;
				height: 70px;
			}
		}
	}

	.floor {
		height: 500rpx;
		// background-color: red;

		.zi {
			width: 100%;
			height: 100rpx;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.zong {
			width: 100%;
			height: 400rpx;
			// background-color: saddlebrown;
			display: flex;

			.left {
				width: 30%;
				height: 100%;

				// background-color: aqua;
				img {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				width: 35%;
				height: 100%;
				display: flex;
				flex-direction: column;

				div {
					flex: 1;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

	}

	.goTop {
		position: fixed;
		bottom: 10px;
		right: 10px;
	}
</style>
