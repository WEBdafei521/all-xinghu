<template>
	<view class="s" style="background-color: #F6F6F6;height: 100vh;">

		<view class="u-p-20">
			<u-search placeholder="搜索想要的内容/主播/商品" v-model="keyword" @search="goSearch"></u-search>
		</view>
		<view class="swiper">
			<u-tabs :list="tab_bar" active-color="#D7B975" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<u-toast ref="uToast"></u-toast>
		<view v-if="current==1">
			<view class=" u-m-t-20 u-row-between u-flexc bg-white u-p-30">
				<u-section title="邀请人" :right="false" :bold="false" sub-title="查看更多"></u-section>
				<view class="u-row-between u-flex">
				<view class="u-flex u-m-t-20" style="">
					<view class="u-flex ">
						<image style="width: 40px; height: 40px; border-radius:100px;background-color: #eeeeee;" mode="aspectFill" :src="inviterInfo.avatar?inviterInfo.avatar:'../../static/mlogo.png'"
						 @error="imageError"></image>
					</view>
					<view class="u-m-l-20 u-flexc ">
						<view class="u-flex " style="font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);">
							{{inviterInfo.nickname || '明星狐直播'}}
						</view>
						<view class="u-flex u-m-t-10" style="font-size: 12px; font-family:PingFang SC;color:rgba(102,102,102,1);">
							{{inviterInfo.wechat_id || '关注明星狐直播公众号，主播动态随时了解！'}}
						</view>
					</view>
				</view>
				<view class="u-flex ">
					<u-button size="mini" type="success" @click ="copyWeiChat">复制微信号</u-button>
				</view>
				</view>
			</view>
			<view class=" u-m-t-20 u-row-between u-flexc bg-white u-p-30" v-if="userInfo.avatar">
				<u-section title="我自己" :right="false" :bold="false" sub-title="查看更多"></u-section>
				<view class="u-row-between u-flex">
				<view class="u-flex u-m-t-20" style="">
					<view class="u-flex ">
						<image style="width: 40px; height: 40px; border-radius:100px;background-color: #eeeeee;" mode="aspectFill" :src="userInfo.avatar" 
						 @error="imageError"></image>
					</view>
					<view class="u-m-l-20 u-flexc ">
						<view class="u-flex " style="font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);">
							{{userInfo.nick_name}} 
						</view>
						<view class="u-flex u-m-t-10" style="font-size: 12px; font-family:PingFang SC;color:rgba(102,102,102,1);">
							<!-- {{tui.userInfo().weichat_num}} -->
							<input  v-model="weichat_num" placeholder="点此填写微信号" /><u-icon name="edit-pen" color="#2979ff" size="28"></u-icon>
						</view>
					</view>
				</view>
				<view class="u-flex ">
					<u-button size="mini" type="success" @tap="updateWxNum">更新微信号</u-button>
				</view>
				</view>
			</view>
			<view class=" u-m-t-20 u-row-between u-flexc bg-white u-p-30" >
				<u-section title="我的粉丝" :right="false" :bold="false" sub-title="查看更多"></u-section>
				<view class="u-row-between u-flex" v-for="(item, index) in fansList" :key="index" >
				<view class="u-flex u-m-t-20" style="">
					<view class="u-flex ">
						<image style="width: 40px; height: 40px; border-radius:100px;background-color: #eeeeee;" mode="aspectFill" :src="item.avatar" 
						 @error="imageError"></image>
					</view>
					<view class="u-m-l-20 u-flexc ">
						<view class="u-flex " style="font-family:PingFang SC;color:rgba(51,51,51,1);">
							{{item.nickname}} 
						</view>
						<view class="u-flex u-m-t-10" style="font-size: 12px; font-family:PingFang SC;color:rgba(102,102,102,1);">
							{{item.weichat_num || '未填写微信号'}}
						</view>
					</view>
				</view>
				
				</view>
				<u-loadmore class="u-m-t-20" :load-text="loadText" color="#D7B975" font-size="20" :status="loadFansStatus" @loadmore="addRandomData"></u-loadmore>
			</view>
		</view>
		<view v-if="current==0">
			<view class="content">
				<view class="swiper u-m-t-0">
					<u-swiper :height="250" name="media_src" :list="listgg" :title="title" :effect3d="effect3d" :indicator-pos="indicatorPos"
					 :mode="mode" :interval="3000" @click="click"></u-swiper>
				</view>
				<view class="swiper u-m-t-40">
					<u-notice-bar mode="horizontal" :more-icon="true" bg-color="#fff" :list="listad"></u-notice-bar>
				</view>
				<view class=" u-m-t-20  bg-white">
					<official-account></official-account>
				</view>
				<!-- <view class=" u-m-t-20 u-row-between u-flex bg-white u-p-20">
				<view class="u-flex " style="">
					<view class="u-flex ">
						<image style="width: 40px; height: 40px; border-radius:100px;background-color: #eeeeee;" mode="aspectFill" src="../../static/mlogo.png"
						 @error="imageError"></image>
					</view>
					<view class="u-m-l-20 u-flexc ">
						<view class="u-flex " style="font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);">
							明星狐直播
						</view>
						<view class="u-flex " style="font-size: 12px; font-family:PingFang SC;color:rgba(102,102,102,1);">
							关注明星狐直播公众号，主播动态随时了解！
						</view>
					</view>
				</view>
				<view class="u-flex ">
					<u-button size="mini" type="success">关注</u-button>
				</view>
			</view> -->
			</view>
			<u-waterfall :flowList="flowList">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="goToLive(item.shop_id)">
						<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-50" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="demo-img-wrap">
							<image class="demo-image" :src="item.image" mode="widthFix"></image>
						</view>
						<!-- #endif -->
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price" v-if="0">
							{{item.price}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								{{item.live_status == 0?'预告':'直播'}}
							</view>
							<view class="demo-tag-text">

								{{item.live_status == 0?'即将开播':'直播中'}}
							</view>
						</view>
						<view class="demo-shop">
							{{item.shop}}
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="goToLive(item.shop_id)">
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="demo-img-wrap">
							<image class="demo-image" :src="item.image" mode="widthFix"></image>
						</view>
						<!-- #endif -->
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price" v-if="0">
							{{item.price}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								{{item.live_status == 0?'预告':'直播'}}
							</view>
							<view class="demo-tag-text">

								{{item.live_status == 0?'即将开播':'直播中'}}
							</view>
						</view>
						<view class="demo-shop">
							{{item.shop}}
						</view>
					</view>
				</template>
			</u-waterfall>

			<u-loadmore bg-color="#f6f6f6" color="#D7B975" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fansList:[],
				weichat_num:'',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '粉丝数据加载完毕~'
				},
				tab_bar: [{
					name: '我的关注'
				}, {
					name: '我的邀请'
				}],
				current: 0,
				keyword: "",
				title: false,
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: false,
				listgg: [],
				listad: [],
				loadStatus: 'loadmore',
				loadFansStatus: 'loadmore',
				pullDown:false,
				flowList: [],
				list: [],
				userInfo:{},
				getFans:false,
				inviterInfo:{},
				parent_shop_id:0,
				totalUpper:0,
				curPageUpper:0,
				curPageFans:0,
			}
		},
		onLoad: function(options) {
			
			
			
			//bar_type 0进入直播间，1，查看预告，100，邀请注册，3，自动转播
			//&是我们定义的参数链接方式
			if(options.scene){
				let scene = decodeURIComponent(options.scene);
				let pshop_id = scene.split('&')[1];
				this.parent_shop_id = parseInt(pshop_id)
				wx.setStorageSync("parent_shop_id",pshop_id)
				this.$u.vuex('vuex_latestUrl', "/packageA/pages/live/subpages/room/index?shop_id="+pshop_id)
			}
			// let userId = scene.split("&")[0];
			
			// getApp().globalData.parent_shop_id = spaceId
			// let pre_liveid = scene.split('&')[2];
			
			this.getHomePage();
			
			// this.addRandomData();
		},
		onShow:function(){
			var t = this;
			console.log(this.vuex_userInfo.shop_id)
			
			if(!this.vuex_userInfo.user_id){
				var userInfo = wx.getStorageSync("userInfo");
				if(userInfo){
					userInfo = JSON.parse(userInfo)
					this.$u.vuex('vuex_userInfo', userInfo);
				}
			}
			//扫码进来，先关注
			if(t.parent_shop_id && t.vuex_userInfo.user_id){
				t.tui.p("/user/followUpper", {
					shop_id: t.parent_shop_id
				}).then((res) => {
				
					t.parent_shop_id = 0
					if (res.code == 0) {
						t.flowList.splice(0,t.flowList.length);
						// that.listad = res.result.list
						t.getUppersList()
					
					}
				}).catch((res) => {
					console.log(res);
				})
			}else{
				// t.getUppersList()
			}
			//然后进房间
			if(t.vuex_userInfo.user_id && t.vuex_latestUrl && t.vuex_latestUrl.length >0){
				uni.navigateTo({
					url:t.vuex_latestUrl
				})
				//删除需要跳转的路径
				t.$u.vuex('vuex_latestUrl', "")
			}
			// this.$u.vuex('vuex_userInfo', res.data.result);
		},
		onReady:function(){
			// var t = this
			// setTimeout(function(){
			// 	if(t.parent_shop_id && wx.getStorageSync("userInfo")){
			// 		t.tui.p("/user/followUpper", {
			// 			shop_id: t.parent_shop_id
			// 		}).then((res) => {
			// 			var scanShopId = t.parent_shop_id
			// 			t.parent_shop_id = 0
			// 			if (res.code == 0) {
							
			// 				t.flowList.splice(0,t.flowList.length);
			// 				// that.listad = res.result.list
			// 				t.getUppersList()
						
			// 			}
			// 		}).catch((res) => {
			// 			console.log(res);
			// 		})
			// 	}else{
			// 		// t.getUppersList()
			// 	}
			// },2000)
		},
		onPullDownRefresh() {
			
		    console.log("正在下拉刷新");
			var t = this;
			if(this.current == 0){
				this.loadStatus = 'loading';
			
				!t.pullDown &&
				setTimeout(() => {
					t.listgg = []
					t.listad = []
					t.curPageUpper = 0
					t.flowList.splice(0,t.flowList.length);
					t.getHomePage();
				}, 1000)
			}else if(this.current == 1){
				this.loadFansStatus = 'loading';
				!t.pullDown &&
				setTimeout(() => {
					t.curPageFans= 0
					t.fansList.splice(0,t.fansList.length);
					t.getMoreFansList();
				}, 1000)
			}
			t.pullDown = true
		},
		onReachBottom() {
			console.log('onReachBottom')
			
			// 模拟数据加载
			setTimeout(() => {
				if(this.current == 1){
					this.loadStatus = 'loading';
					this.getMoreFansList();
				}else{
					this.loadFansStatus = 'loading';
					this.getUppersList();
				}
				
				// this.loadStatus = 'nomore';
			}, 1000)
		},
		methods: {
			getMoreFansList(){
				var t = this;
				this.tui.p("/user/getFans", {
					page_size: 5,
					current_page:++t.curPageFans
				}).then((res) => {
					t.loadFansStatus = ((!res.result.fans_list) || (res.result.total_num <= res.result.page_size * res.result.current_page) || (res.result.fans_list.length == 0))
					 ?"nomore":"loadmore"
					if (res.code == 0) {
						
						t.inviterInfo = res.result.inviter
						t.fansList = res.result.fans_list || []
						t.getFans = true
					}
					t.pullDown = false
					wx.stopPullDownRefresh();
				}).catch((res) => {
					t.pullDown = false
					wx.stopPullDownRefresh();
					console.log(res);
				})
			},
			getHomePage(){
				var t = this;
				t.tui.g("/home/topBanner", {
					pages_index: 0
				}).then((res) => {
				
					if (res.code == 0) {
						t.listgg = res.result.list
				
					}
				}).catch((res) => {
					console.log(res);
				})
				t.tui.g("/home/topNoticeList", {
					pages_index: 0
				}).then((res) => {
				
					if (res.code == 0) {
						res.result.list.forEach(function(e) {
							t.listad.push(e.title)
						})
						// that.listad = res.result.list
				
					}
				}).catch((res) => {
					console.log(res);
				})
				this.tui.tryLogin().then((res) => {
				
					console.log(res);
					
					t.getUppersList()
					// t.pullDown = false
					wx.stopPullDownRefresh();
					
				}).catch((res) => {
					console.log(res);
				})
			},
			getUppersList(){
				var t = this;
				this.tui.p("/user/getUppers", {
					page_size: 5,
					current_page:++t.curPageUpper
				}).then((res) => {
					t.pullDown = false
					if (res.code == 0) {
						
						t.loadStatus = ((!res.result.data_list) || (res.result.total_num <= res.result.page_size * res.result.current_page) || (res.result.data_list.length == 0))
						 ?"nomore":"loadmore"
						
						res.result.data_list.forEach(function(e) {
							if(e.live_info.shop_id > 0){
								var live_cover = JSON.parse(e.live_info.live_cover);
								var image = '';
								if (live_cover.length > 0) {
									image = live_cover[0].cover
									
									t.flowList.push({
										id: e.live_info.shop_id,
										price: 35,
										shop: e.nickname,
										title: e.live_info.live_title,
										image: image,
										live_status: e.live_info.live_status,
										shop_id: e.live_info.shop_id,
									})
								}
							}
						})
				
						// that.addRandomData()
					}
				}).catch((res) => {
					t.pullDown = false
					console.log(res);
				})
			},
			copyWeiChat(){
				if(this.inviterInfo && this.inviterInfo.wechat_id){
					uni.setClipboardData({
						data:this.inviterInfo.wechat_id,
						
					})
					// this.$refs.uToast.show({
					// 	title: '复制成功',
					// 	type: 'success'
					// })
				}else{
					this.$refs.uToast.show({
						title: '该用户没有填写微信号',
						type: 'error'
					})
				}
			},
			goSearch(){
			
				this.$refs.uToast.show({
					title: '没有找到任何数据',
					type: 'success'
				})
			},
			updateWxNum(){
				if(this.userInfo && this.weichat_num){
					var t = this
					
					this.tui.p("/user/setWeChatNum", {
						wechat_num:this.weichat_num
					}).then((res) => {
					
						if (res.code == 0) {
						
						}
					}).catch((res) => {
						console.log(res);
					})
					
					this.$refs.uToast.show({
						title: '更新成功',
						type: 'success'
					})
				}else{
					this.$refs.uToast.show({
						title: '请填写真实的微信号',
						type: 'success'
					})
				}
			},
			goToLive(liveId){
				uni.navigateTo({
					url:"/packageA/pages/live/subpages/room/index?shop_id="+liveId
				})
			},
			addRandomData() {
				
				console.log("addmore")
				// this.getUppersList()
				if(this.current == 1){
					this.loadFansStatus = 'loading';
					this.getMoreFansList();
				}else{
					this.loadStatus = 'loading';
					this.getUppersList();
				}
			},
			change(index) {
				this.current = index;
				if(this.current == 0){
					
					return
				}
				//切换的时候获取一下当前用户信息，这是首页中唯一用到token的地方
				var raw = uni.getStorageSync("userInfo")
				if(raw){
					this.userInfo = JSON.parse(raw)
					if(this.userInfo.weichat_num){
						this.weichat_num = this.userInfo.weichat_num
					}
					
				}
				var t = this
				if(this.userInfo && !this.getFans){
					this.getMoreFansList()
				}
			},
			click(index) {

			}
		}
	}
</script>
<style>
	.u-waterfall {
		background-color: #F6F6F6 !important;
	}
</style>
<style lang="scss" scoped>
	.item {
		margin: 30rpx 0;
	}

	.content {
		padding: 10px 22px;
		background: #f6f6f6;
	}

	.bg-white {
		background: #fff;
	}

	.btgzh {
		width: 42px;
		height: 21px;
		font-size: 22px;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(102, 220, 121, 1);
	}

	.u-flexc {
		flex-direction: column;
		display: flex;
		flex-wrap: wrap;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #FFFFFF;
		padding: 8px;
	}

	.demo-img-wrap {}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: #D7B975;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>
