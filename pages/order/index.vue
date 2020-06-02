<template>
	<view class="orderList-container">
		<view class="order-search">
			<view class="search-input">
				<view class="input-icon">
					<u-icon name="search" color="#D7B975" size="28"></u-icon>
				</view>
				<input
					class="uni-input"
					confirm-type="search"
					placeholder="订单号/昵称/商品名称/手机号"
					v-model="orderVal"
					@confirm="searchCommit()"
				/>
			</view>
			<!-- <u-search
				search-icon-color="#D7B975"
				bg-color="#F8F8F8"
				placeholder-color="订单号/昵称/商品名称/手机号"
				:show-action="false"
				placeholder="订单号/昵称/商品名称/手机号"
				v-model="orderVal"
			></u-search> -->
		</view>
		<view class="order-tabs">
			<u-tabs
				:list="list"
				:is-scroll="false"
				:current="current"
				@change="navChange"
				bar-width="56"
				bar-height="6"
				active-color="#D7B975"
				height="70"
				font-size="30"
				:bold="false"
			></u-tabs>
		</view>
		<view class="orderList-content">
			<order-list :listData="orderData" :height="srollHeight" @scrollPage="scrollPage"/>
		</view>
	</view>
</template>

<script>
	import OrderList from '@/components/merchants/OrderList'
	export default {
		components: {
			'order-list': OrderList
		},
		data () {
			return {
				list: [
					{
						name: '全部'
					},
					{
						name: '待付款'
					},
					{
						name: '待发货'
					}, 
					{
						name: '待收货'
					}, 
					{
						name: '待退款'
					},
				],
				current: 0,
				// 搜索内容
				orderVal: '',
				// 滚动高度
				srollHeight: 0,
				// 订单列表   默认要设置为空
				orderData: [1, 2, 3]
			}
		},
		onLoad() {
			// 将页面全屏 
			uni.getSystemInfo({
			    success: (res) => {
					// 底部tabbar高度 
					let footHeight = 155
			        this.srollHeight = res.windowHeight - footHeight
				}
			})
		},
		methods: {
			// 导航切换
			navChange (val) {
				this.current = val
				this.orderData = []
			},
			// 搜索
			searchCommit () {
				
			},
			// 滚动上拉加载
			scrollPage () {
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.orderList-container {
		.order-search {
			padding: 10rpx 10rpx 0rpx 30rpx;
			.search-input {
				padding: 0 20rpx;
				height: 66rpx;
				@include flexBox();
				background: #f8f8f8;
				border-radius:33px;
				.input-icon {
					margin-right: 10rpx;
				}
				.uni-input {
					flex: 1;
				}
			}
		}
		::v-deep .order-tabs {
			padding: 0 30rpx;
			.u-tab-item {
				font-size: 30rpx !important;
			}
		}
		.orderList-content {
			padding: 0 30rpx;
			background: #f8f8f8;
		}
	}
</style>
