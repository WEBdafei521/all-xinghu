<template>
	<view>
		<view class="wrap">
			<u-toast ref="uToast"></u-toast>
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[0].length>0">
							<view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
							
								<view class="item" >
									<view class="left"><image :src="res.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ res.title }}</view>
										<view class="title u-line-2">库存：{{ res.stock }}</view>
										<view class="title u-line-2">销量：{{ res.sale_num }}</view>
										<view class="price">
											单价：￥{{ tui.fmoney(res.price) }}
										</view>
									</view>
									
								</view>
						
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<!-- <view class="logistics btn">查看物流</view> -->
									<!-- <view class="exchange btn">卖了换钱</view> -->
									<view class="evaluate btn" @click="saleOff(res.id)">下架商品</view>
									<view class="evaluate btn" @click="delGoods(res.id)">删除商品</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view class="centre" v-else>
							<u-empty text="您还没有相关的订单" mode="list"></u-empty>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[1].length>0">
							<view class="order" v-for="(res, index) in  orderList[1]" :key="res.id">
								
								<view class="item" >
									<view class="left"><image :src="res.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ res.title }}</view>
										<view class="title u-line-2">库存：{{ res.stock }}</view>
										<view class="title u-line-2">销量：{{ res.sale_num }}</view>
										<view class="price">
											单价：￥{{ tui.fmoney(res.price) }}
										</view>
									</view>
									
								</view>
														
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<!-- <view class="logistics btn">查看物流</view> -->
									<!-- <view class="exchange btn">卖了换钱</view> -->
									<view class="evaluate btn" @click="saleOn(res.id)">上架商品</view>
									<view class="evaluate btn" @click="delGoods(res.id)">删除商品</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
						<view class="centre" v-else>
							<u-empty text="您还没有相关的订单" mode="list"></u-empty>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									
									<u-empty text="您还没有相关的订单" mode="list"></u-empty>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderStatus:["state_close", // TODO
				"state_new",
				"state_pay",
				"state_send",
				"state_success",
				"state_cancel",
				"state_refund",
				"state_unevaluate"],
			orderList: [[], [], [], []],
			dataList: [],
			list: [
				{
					name: '已上架直播间'
				},
				{
					name: '已下架'
				}
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
			curPages: [1,1,1,1],
		};
	},
	onLoad() {
		this.getFirstOrderList(0);
	},
	computed: {
		// 价格小数
		priceDecimal() {
			return val => {
				val = val +""
				if (val && val !== parseInt(val)){
					val = val.slice(-2);
					return val.replace('.','');
				} 
				else return '00';
			};
		},
		// 价格整数
		priceInt() {
			
			return val => {
				val = val +""
				if (val && val !== parseInt(val)){
					val = val.split('.')[0];
				}
				return val.replace('.','');
			};
		}
	},
	methods: {
		reFound(sn){
			this.$refs.uToast.show({
				title: '请联系商家，获取退款信息',
				type: 'error'
			})
		},
		payNow(sn){
			sn.length && this.tui.pay(sn);
		},
		reachBottom() {
			// 此tab为空数据
			// if(this.current != 2) {
			// 	this.loadStatus.splice(this.current,1,"loading")
			// 	setTimeout(() => {
			// 		this.getOrderList(this.current);
			// 	}, 1200);
			// }
			this.getOrderList(this.current);
		},
		addGoodToView(ee){
			var t = this;
			ee&&ee.length>0&&ee.forEach(function(e){
				if(e.is_on_sale == 1){
					t.orderList[0].push({
						id: e.id,
						store: '直播间购买',
						deal: '待付款',
						title: e.title,
						stock: e.stock,
						sale_num: e.sale_num,
						goodsUrl:e.img,
						price:e.price
						
							
					})
				}else if(e.is_on_sale ==0){
					
					t.orderList[1].push({
						id: e.id,
						store: '直播间购买',
						deal: '待付款',
						title: e.title,
						stock: e.stock,
						sale_num: e.sale_num,
						goodsUrl:e.img,
						price:e.price
					})
				}
			})
		},
		// 页面数据
		delGoods(idx) {
			
			var t = this;
			this.tui.p("/goods/del",{
				"ids": [idx],
			},1).then((res) => {
				
				if (res.code == 0) {
					--this.curPages[t.current]
					t.orderList = [[], [], [], []]
					t.getOrderList(t.current);
				}
			}).catch((res) => {
				console.log(res);
			})
			// this.loadStatus.splice(this.current,1,"loadmore")
		},
		// 页面数据
		saleOff(idx) {
			
			var t = this;
			this.tui.p("/goods/offSale",{
				"ids": [idx],
			},1).then((res) => {
				
				if (res.code == 0) {
					--this.curPages[t.current]
					t.orderList = [[], [], [], []]
					t.getOrderList(t.current);
				}
			}).catch((res) => {
				console.log(res);
			})
			// this.loadStatus.splice(this.current,1,"loadmore")
		},
		// 页面数据
		saleOn(idx) {
			
			var t = this;
			this.tui.p("/goods/onSale",{
				"ids": [idx],
			},1).then((res) => {
				
				if (res.code == 0) {
					--this.curPages[t.current]
					t.orderList = [[], [], [], []]
					t.getOrderList(t.current);
				}
			}).catch((res) => {
				console.log(res);
			})
			// this.loadStatus.splice(this.current,1,"loadmore")
		},
		// 页面数据
		getFirstOrderList(idx) {
			
			var t = this;
			this.tui.g("/goods/list",{
				"current": 1,
				"pageSize": 5,
				"stateType": "state_new",
				shop_id:t.vuex_userInfo.shop_id,
			},1).then((res) => {
				if(res.result.list.length == 0 ){
					t.loadStatus.splice(t.current,1,"nomore")
				}
				if (res.code == 0) {
					t.addGoodToView(res.result.list)
				}
			}).catch((res) => {
				console.log(res);
			})
			// this.loadStatus.splice(this.current,1,"loadmore")
		},
		// 页面数据
		getOrderList(idx) {
			console.log(idx)
			console.log(this.curPages)
			var t = this;
			this.tui.g("/goods/list",{
				"current": ++this.curPages[idx],
				"pageSize": 5,
				"stateType": "state_new",
				shop_id:t.vuex_userInfo.shop_id,
			},1).then((res) => {
				if(res.result.list.length == 0 ){
					t.loadStatus.splice(t.current,1,"nomore")
				}
				if (res.code == 0) {
					t.addGoodToView(res.result.list)
				}
			}).catch((res) => {
				console.log(res);
			})
			// this.loadStatus.splice(this.current,1,"loadmore")
		},
		// 总价
		totalPrice(item) {
			let price = 0;
			item.map(val => {
				price += parseFloat(val.price);
			});
			return price.toFixed(2);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.number;
			});
			return num;
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
			
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 40rpx;
		padding: 0 10rpx;
		justify-content: space-between;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
