<template>
	<view>
		<header>
			<input type="text" placeholder="搜索" placeholder-class="center" @click="search">
		</header>
		<section>
			<scroll-view scroll-y="true" class="zuo">
				<van-sidebar :active-key="activeKey">
					<van-sidebar-item :title="item.cat_name" v-for="(item,index) in list" :key="index"
						@click="change(index)" />
				</van-sidebar>
			</scroll-view>
			<scroll-view scroll-y="true" class="you">
				<div v-for="item in list[index].children" :key="item.id">
					<p>{{item.cat_name}}</p>
					<van-grid>
						<van-grid-item :icon="it.cat_icon" :text="it.cat_name" v-for="it in item.children"
							:key="it.cat_id" @click="goList(it.cat_id)" />
					</van-grid>
				</div>
			</scroll-view>
		</section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeKey: 0,
				list: [],
				index: ''
			};
		},
		onLoad() {
			this.getlist()
		},
		methods: {
			getlist() {
				this.http.get('https://api-hmugo-web.itheima.net/api/public/v1/categories').then(res => {
					this.list = res.data.message
					console.log(this.list);
				})
			},
			change(index) {
				this.index = index
				console.log(index);
			},
			goList(cid) {
				wx.navigateTo({
					url: '../list1/list1?cid=' + cid
				})
			},
			search() {
				wx.navigateTo({
					url: '../search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	section {
		height: 1020rpx;
		display: flex;

		.zuo {
			width: 160rpx;
			height: 1020rpx;
		}

		.you {
			height: 1020rpx;
		}
	}

	.center {
		text-align: center;
		color: #fff;
	}

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
</style>
