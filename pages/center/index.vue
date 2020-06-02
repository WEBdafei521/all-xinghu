<template>
	<view>
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				我的
			</view>
			
		</view>
		<u-toast ref="uToast"></u-toast>
		<!--header-->
		<view class="tui-mybg-box">
			<image src="https://img1.starfox.cn:9001/livefs/zhyaliu/20200513/15/37/0/setting-bg.png" class="tui-my-bg" mode="widthFix"></image>
			<view class="tui-header-center" v-if="!userInfo.avatar" @tap="loginMe()">
				<image src="../../static/mlogo.png" class="tui-avatar" ></image>
				<view class="tui-info">
					<view class="tui-nickname">点我登陆 </image>
					</view>
					<view class="tui-explain">请登陆账号</view>
				</view>
				<!-- #ifndef MP -->
		<!-- 		<view class="tui-btn-edit">
					<tui-button type="white" :plain="true" shape="circle" width="92rpx" height="40rpx" :size="22" @click="href(3)">编辑</tui-button>
				</view> -->
				<!-- #endif -->
		
			</view>
			<view class="tui-header-center" v-else>
					<u-avatar :src="userInfo.avatar"  mode="square"></u-avatar>
					<view class="tui-info">
						<!-- <view class="tui-nickname">{{userInfo.nick_name}} <image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image> -->
						<view class="tui-nickname">{{userInfo.nick_name}} </image>
						</view>
						<view class="tui-explain">ID:{{90000+userInfo.user_id}}</view>
						<view class="tui-explain">注册时间:{{this.$u.timeFormat(userInfo.create_time, 'yyyy/mm/dd hh:MM')}}</view>
					</view>
					<!-- #ifndef MP -->
			<!-- 		<view class="tui-btn-edit">
						<tui-button type="white" :plain="true" shape="circle" width="92rpx" height="40rpx" :size="22" @click="href(3)">编辑</tui-button>
					</view> -->
					<!-- #endif -->
			
				</view>

		</view>
		<view class="tui-content-box">
			<view class="tui-box tui-order-box">
				<tui-list-cell :arrow="true" padding="0" :lineLeft="false" @click="orderCenter(1)">
					<view class="tui-cell-header">
						<view class="tui-cell-title">我的订单</view>
						<view class="tui-cell-sub">查看全部订单</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list">
					<view class="tui-order-item" @tap="orderCenter(4)">
						<view class="tui-icon-box">
							<image src="../../static/dsh.png" class="tui-order-icon"></image>
							<!-- <view class="tui-badge tui-badge-red">1</view> -->
						</view>
						<view class="tui-order-text">待付款</view>
					</view>
					<view class="tui-order-item" @tap="orderCenter(4)">
						<view class="tui-icon-box">
							<image src="../../static/dhh.png" class="tui-order-icon"></image>
							<!-- <view class="tui-badge tui-badge-red">1</view> -->
						</view>
						<view class="tui-order-text">待发货</view>
					</view>
					<view class="tui-order-item" @tap="orderCenter(4)">
						<view class="tui-icon-box">
							<image src="/static/dsh2.png" class="tui-order-icon"></image>
						</view>
						<view class="tui-order-text">待收货</view>
					</view>
					<view class="tui-order-item" @tap="orderCenter(4)">
						<view class="tui-icon-box">
							<image src="../../static/dpj.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red" v-if="false">12</view>
						</view>
						<view class="tui-order-text">评价</view>
					</view>
					<!-- <view class="tui-order-item" @tap="orderCenter(4)">
						<view class="tui-icon-box">
							<image src="../../static/sh.png" class="tui-order-icon"></image>
							<view class="tui-badge tui-badge-red">2</view>
						</view>
						<view class="tui-order-text">退款/售后</view>
					</view> -->
				</view>
			</view>

			<view class="tui-box tui-tool-box"  >
				<tui-list-cell  padding="0" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">常用工具</view>
						<!-- <view class="tui-cell-sub">查看更多</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
			
			
				
					<view class=" tui-tool-item" @tap="goShopCart">
						<view class="tui-icon-box">
							<image src="../../static/cart.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">购物车</view>
					</view>
					<view class="tui-tool-item" @tap="addAddress">
						<view class="tui-icon-box">
							<image src="../../static/address.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的地址</view>
					</view>
				
				
				</view>
			</view>
			<view class="tui-box tui-tool-box" v-if="userInfo && userInfo.user_status != 0">
				<tui-list-cell  padding="0" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">商家工具</view>
						<!-- <view class="tui-cell-sub">查看更多</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
					
					<view class="tui-tool-item" @tap="manageGoods(7)" v-if="userInfo && userInfo.shop_id > 0" >
						<view class="tui-icon-box">
							<image src="../../static/goods.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">发布商品</view>
					</view>
					<view class="tui-tool-item" @tap="editGoods(7)" v-if="userInfo && userInfo.shop_id > 0" >
						<view class="tui-icon-box">
							<image src="../../static/goodsm.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">商品管理</view>
					</view>
					<view class=" tui-tool-item" @tap="manageOrder" v-if="userInfo && userInfo.shop_id > 0">
						<view class="tui-icon-box">
							<image src="../../static/ordercenter.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">订单中心</view>
					</view>
					<view class=" tui-tool-item" @tap="manageMoney" v-if="userInfo && userInfo.shop_id > 0">
						<view class="tui-icon-box">
							<image src="../../static/moneycenter.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">钱包</view>
					</view>
					
					
				
				</view>
			</view>
			<view class="tui-box tui-tool-box" v-if="userInfo && userInfo.user_status != 0">
				<tui-list-cell  padding="0" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">开播工具</view>
						<!-- <view class="tui-cell-sub">查看更多</view> -->
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @tap="goFlux(7)">
						<view class="tui-icon-box">
							<image src="../../static/flux.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">流量</view>
					</view>
					
					<view class=" tui-tool-item" @tap="createLiveRoom" v-if="userInfo && userInfo.shop_id > 0">
						<view class="tui-icon-box">
							<image src="../../static/live.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">手机开播</view>
					</view>
					
					<view class="tui-tool-item" v-if="userInfo && userInfo.shop_id > 0">
						<view class="tui-icon-box" @tap="watchLiveRoom">
							<image src="../../static/tv.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">查看转播</view>
					</view>
					<view class="tui-tool-item" v-if="userInfo && userInfo.shop_id > 0" >
						<view class="tui-icon-box" @tap="computerLiveRoom">
							<image src="../../static/computer.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">电脑开播</view>
					</view>
					<!-- 当前还没有认证店铺 -->
					<view class="tui-tool-item" v-if="userInfo && userInfo.shop_id == 0">
						<view class="tui-icon-box" @tap="openLiveRoom" >
							<image src="../../static/openlive.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我要开播</view>
					</view>
					<!--1普通， 2为主播，3为机构代理，4为大客户 -->
					<view class="tui-tool-item" v-if="userInfo && userInfo.user_status == 4">
						<view class="tui-icon-box" @tap="genOpenLiveRoom" >
							<image src="../../static/openShop.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">自助开户服务</view>
					</view>
				
				</view>
			</view>
			<view class="tui-box tui-tool-box">
				<tui-list-cell  padding="0" :lineLeft="false">
					<view class="tui-cell-header">
						<view class="tui-cell-title">转播工具</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-list tui-flex-wrap">
					
					
					<view class="tui-tool-item" @click="goUseQRcode">
						<view class="tui-icon-box">
							<image src="../../static/tma1.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">使用转播码</view>
					</view>
					<view class="tui-tool-item" @click="goGenQRcode">
						<view class="tui-icon-box">
							<image src="../../static/tma.png" class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">生成转播码</view>
					</view>
				
				
				</view>
			</view>

			
			<!--加载loadding-->
			<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiButton from "@/components/extend/button/button"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiDivider from "@/components/divider/divider"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	export default {
		components: {
			tuiIcon,
			tuiButton,
			tuiListCell,
			tuiDivider,
			tuiLoadmore
		},
		onLoad: function(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif

			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth * 0.6
				}
			})
		},
		data() {
			return {
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				productList: [],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				userInfo:{}
			}
		},
		onShow:function(){
			var t = this;
			(t.userInfo.shop_id ==0 || !t.userInfo.avatar) &&
			wx.checkSession({
			  success: function(){
				//session_key 未过期，并且在本生命周期一直有效，直接发送加密字段
				console.log("checkSession.success")
				
				t.userInfo = JSON.parse(wx.getStorageSync("userInfo")||'{}')
			  },
			  fail: function(){
				t.userInfo = {}
				// session_key 已经失效，需要重新执行登录流程
				console.log("checkSession.fail")//重新登录
				wx.removeStorageSync("access_token");
				t.tui.isLogin()
			  }
			})
			// this.userInfo = getApp().globalData.userInfo
		},
		methods: {
			loginMe(){
				wx.removeStorageSync("userInfo");
				wx.removeStorageSync("access_token");
				this.tui.isLogin();
			},
			watchLiveRoom(){
				wx.setStorageSync("tlive",1)
				uni.navigateTo({
					url:"/packageB/pages/live/subpages/room/index"
				})
			},
			genOpenLiveRoom(){
				uni.navigateTo({
					url:"../sb/openShop/genAuthCode"
				})
			},
			computerLiveRoom(){
				let t = this;
				this.tui.p("/live/getPushUrl", {}).then((res) => {
					if(res.code == 0){
						uni.setClipboardData({
							data:res.result.pushURL
						})
						
						
					}else{
						this.$refs.uToast.show({
							title: res.msg|| '权限不足',
							type: 'error'
						})
					}
					
				}).catch((res) => {
					this.$refs.uToast.show({
						title: "权限不足",
						type: 'error'
					})
					console.log(res);
				})
				
			},
			manageMoney(){
				uni.navigateTo({
					url:"../wallet/index"
				})
			},
			manageOrder(){
				uni.navigateTo({
					url:"../order/morder/morder"
				})
				// uni.navigateTo({
				// 	url:"../order/index"
				// })
			},
			openLiveRoom(){
				uni.navigateTo({
					url:"../sb/openShop/openShop"
				})
			},
			createLiveRoom(){
				wx.removeStorageSync("tlive");
				uni.navigateTo({
					url:"/packageB/pages/live/subpages/room/index"
				})
			},
			goFlux(){
				// uni.navigateTo({url:"../buyC/buyC"})
				uni.navigateTo({url:"../coupon/coupon"})
			},
			goGenQRcode(){
				uni.navigateTo({url:"../genQrcode/genQrcode"})
			},
			goUseQRcode(){
				uni.navigateTo({url:"../qrcode/qrcode"})
			},
			editGoods(){
				uni.navigateTo({url:"../goods/mgoods/mgoods"})
			},
			manageGoods(){
				uni.navigateTo({url:"../goods/goods"})
			},
			goShopCart(){
				uni.navigateTo({url:"../cart/cart"})
			},
			addAddress(){
				uni.navigateTo({url:"../address/address"})
			},
			orderCenter(){
				uni.navigateTo({
					url: "../order/order"
				})
			},
			href(page) {
				let url = "";
				switch (page) {
					case 1:
						break;
					case 2:
						url = "../set/set"
						break;
					case 3:
						url = "../userInfo/userInfo"
						break;
					case 4:
						url = "../myOrder/myOrder"
						break;
					default:
						break;
				}
				if(url){
					uni.navigateTo({
						url: url
					})
				}else{
					this.tui.toast("功能尚未完善~")
				}
			},
			detail: function() {
				uni.navigateTo({
					url: '../../productDetail/productDetail'
				})
			}
		}
	}
</script>

<style>
	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9998;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* #ifndef MP */
	.tui-header-icon {
		position: fixed;
		top: 0;
		right: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
	}

	/* #endif */
	/* #ifdef MP */
	.tui-set-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* #endif */
	.tui-icon-box {
		position: relative;
	}

	.tui-icon-setup {
		margin-left: 8rpx;
	}

	.tui-badge {
		position: absolute;
		font-size: 24rpx;
		height: 32rpx;
		min-width: 20rpx;
		padding: 0 6rpx;
		border-radius: 40rpx;
		right: 10rpx;
		top: -5rpx;
		transform: scale(0.8) translateX(60%);
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.tui-badge-red {
		background: #F74D54;
		color: #fff;
	}

	.tui-badge-white {
		background: #fff;
		color: #F74D54;
	}

	.tui-badge-dot {
		position: absolute;
		height: 12rpx;
		width: 12rpx;
		border-radius: 50%;
		right: -12rpx;
		top: 0;
		background: #F74D54;
	}

	.tui-mybg-box {
		width: 100%;
		height: 464rpx;
		position: relative;
	}

	.tui-my-bg {
		width: 100%;
		height: 464rpx;
		display: block;
	}

	.tui-header-center {
		position: absolute;
		width: 100%;
		height: 128rpx;
		left: 0;
		top: 120rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		flex-shrink: 0;
		width: 128rpx;
		height: 128rpx;
		display: block;
	}

	.tui-info {
		width: 60%;
		padding-left: 30rpx;

	}

	.tui-nickname {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-img-vip {
		width: 56rpx;
		height: 24rpx;
		margin-left: 18rpx;
	}

	.tui-explain {
		width: 80%;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 8rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-btn-edit {
		flex-shrink: 0;
		padding-right: 22rpx;
	}

	.tui-header-btm {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.tui-btm-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tui-btm-num {
		font-size: 32rpx;
		font-weight: 600;
		position: relative;
	}

	.tui-btm-text {
		font-size: 24rpx;
		opacity: 0.85;
		padding-top: 4rpx;
	}

	.tui-content-box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		top: -72rpx;
		z-index: 10;
	}

	.tui-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-order-box {
		height: 208rpx;
	}

	.tui-cell-header {
		width: 100%;
		height: 74rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-cell-title {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 600;
		color: #333;
	}

	.tui-cell-sub {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
		padding-right: 28rpx;
	}

	.tui-order-list {
		width: 100%;
		height: 134rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		/* justify-content: space-between; */

	}

	.tui-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tui-order-text,
	.tui-tool-text {
		font-size: 26rpx;
		font-weight: 400;
		color: #666;
		padding-top: 4rpx;
	}

	.tui-tool-text {
		font-size: 24rpx;
	}

	.tui-order-icon {
		width: 56rpx;
		height: 56rpx;
		display: block;
	}

	.tui-assets-box {
		height: 178rpx;
		margin-top: 20rpx;
	}

	.tui-assets-list {
		height: 84rpx;
	}

	.tui-assets-num {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		position: relative;
	}

	.tui-assets-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
		padding-top: 6rpx;
	}

	.tui-tool-box {
		margin-top: 20rpx;
	}

	.tui-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 30rpx;
	}

	.tui-tool-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-tool-icon {
		width: 64rpx;
		height: 64rpx;
		display: block;
	}

	.tui-badge-icon {
		width: 66rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		transform: translateX(88%);
		top: -15rpx;
	}

	/*为你推荐*/
	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>
