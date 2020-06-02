<template>
	<view class="order-container" :style="{height: `${height}px`}">
		<scroll-view
			class="scroll-view_H"
			scroll-y="true"
			refresher-enabled="true"
			@scroll="scroll"
		>
			<template v-if="listData.length > 0">
				<block v-for="(item, index) in listData" :key="index">
					<view class="order-li">
						<view class="order-li-orderId">
							<text
								:class="['orderId-title',{
									'bg-orange': index == 0,
									'bg-green': index == 1,
									'bg-red': index == 2
								}]"
							>
								待付款
							</text>
							<text class="orderId-number">12544665489758478</text>
							<image class="icons-img " src="../../static/icon/icon-copy.png" mode=""></image>
						</view>
						<view class="order-li-goods">
							<view class="goods-img">
								<image class="goods-img-img" src="../../static/user.png" mode=""></image>
							</view>
							<view class="goods-info">
								<view class="goods-info-title">
									<text class="gs_title">日系印花连帽工装棉服男ins潮流棉衣外套春季新品上新 </text>
									<text class="gs_price">￥9.90</text>
								</view>
								<view class="goods-info-rule">
									<view class="gs_rule">
										<text class="gs_rule-text">灰色JM4401</text>
										<text>XL【加棉款】</text>
									</view>
									<view class="gs_num">
										<text>x2</text>
									</view>
								</view>
							</view>
						</view>
						<view class="order-li-total">
							<view class="total-title">
								<text class="total-title-text">
									共
									<text class="gs_price">2</text>
									件
								</text>
								<text>
									合计（含快递费：￥0.00）
								</text>
							</view>
							<view>
								<text class="gs_price">￥19.80</text>
							</view>
						</view>
						<view class="order-li-address">
							<view class="address-box">
								<view class="address-label">
									<text>收件人</text>
								</view>
								<view class="address-name">
									<view>
										<text>张三</text>
									</view>
									<view class="address-tel">
										<text class="tel-num">18218744579</text>
										<image class="icons-img " src="../../static/icon/icon-copy.png" mode=""></image>
									</view>
								</view>
							</view>
							<view class="address-box">
								<view class="address-label">
									<text>收货地址</text>
								</view>
								<view class="address-detailed">
									<text class="address-detailed-text">
										浙江省杭州市滨江区秋溢路3498号一幢三单元27楼101室
									</text>
								</view>
							</view>
						</view>
						<view class="order-li-btn">
							<view class="btn-names">
								<image class="avtar-img" src="../../static/user.png" mode=""></image>
								<text class="merchants">红狐集团</text>
							</view>
							<view class="btn-list">
								<!-- 根据状态显示不同 -->
								<template>
									<button class="btn-button btn-gray" type="default">关闭订单</button>
									<button class="btn-button btn-active" type="default">修改价格</button>
								</template>
								<!-- <template v-if="">
									<button class="btn-button btn-gray" type="default">核对地址</button>
									<button class="btn-button btn-active" type="default">发货</button>
								</template>
								<template v-if="">
									<button class="btn-button btn-gray" type="default">关闭订单</button>
									<button class="btn-button btn-active" type="default">修改价格</button>
								</template>
								<template v-if="">
									<button class="btn-button btn-gray" type="default">关闭订单</button>
									<button class="btn-button btn-active" type="default">修改价格</button>
								</template> -->
							</view>
						</view>
					</view>
				</block>
			</template>
			<template v-else>
				<u-empty text="暂无数据" mode="list"></u-empty>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			listData: {
				type: Array,
				default: []
			},
			height: {
				type: Number
			}
		},
		data () {
			return {
				
			}
		},
		methods: {
			// 滚动
			scroll () {
				this.$emit('scrollPage')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.icons-img {
		@include setBox(28rpx, 28rpx)
	}
	.avtar-img {
		@include setBox(50rpx, 50rpx);
		border-radius: 50%;
	}
	.gs_price {
		color: #D7B975 !important;
	}
	.bg-orange {
		background: #EAA34B !important;
	}
	.bg-green {
		background: #39D4BC !important;
	}
	.bg-red {
		background: #E93340 !important;
	}
	.order-container {
		position: relative;
		.scroll-view_H {
			padding: 10px 0;
			@include setBox();
			.order-li {
				background: #fff;
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				&-orderId {
					padding: 20rpx 20rpx;
					@include flexBox(flex-start);
					margin-bottom: 10rpx;
					@include border_bottom();
					font-size: 26rpx;
					.orderId-title {
						color: #fff;
						padding: 2rpx 9px;
						border-radius: 26rpx;
						font-size: 24rpx;
					}
					.orderId-number {
						color: #B1B1B6;
						margin:0 10rpx;
					}
				}
				&-goods {
					padding:  0 20rpx;
					@include flexBox(space-between, flex-start);
					.goods-img {
						@include setBox(180rpx, 180rpx);
						&-img {
							@include setBox();
							border-radius: 16rpx;
						}
					}
					.goods-info {
						flex: 1;
						padding-left: 20rpx;
						font-size: 28rpx;
						&-title {
							width: 100%;
							@include flexBox(space-between, flex-start);
							margin-bottom: 20rpx;
							.gs_title {
								width: 360rpx;
								@include textOverHidden(2);
							}
						}
						&-rule {
							width: 100%;
							@include flexBox(space-between);
							font-size: 24rpx;
							.gs_rule,
							.gs_num {
								padding: 10rpx 20rpx;
								background: #FFF7DF;
								color: #D7B975;
								border-radius: 22rpx;
							}
							.gs_rule {
								&-text {
									margin-right: 20rpx;
								}
							}
						}
					}
				}
				&-total {
					width: 100%;
					padding: 20rpx;
					@include flexBox(flex-end);
					@include border_bottom();
					font-size: 24rpx;
					.total-title {
						margin-right: 20rpx;
						color: #B1B1B6;
						&-title {
							margin-right: 20rpx;
							&-text {
								margin-right:20rpx;
							}
						}
						.gs_price {
							font-size: 28rpx;
						}
					}
				}
				&-address {
					width: 100%;
					padding: 20rpx 20rpx;
					@include border_bottom();
					.address-box {
						width: 100%;
						padding: 5rpx 0;
						@include flexBox(space-between, flex-start);
						.address-label {
							width: 140rpx;
							color: #B1B1B6;
						}
						.address-name {
							flex: 1;
							@include flexBox(space-between);
							.address-tel {
								@include flexBox();
							}
							.tel-num {
								margin-right: 20rpx;
								color: #7BA9F6;
							}
						}
						.address-detailed {
							flex: 1;
							@include textOverHidden(2);
						}
					}
				}
				&-btn {
					width: 100%;
					padding: 20rpx 20rpx;
					@include flexBox(space-between);
					.btn-names {
						@include flexBox();
						.merchants {
							margin-left: 15rpx;
						}
					}
					.btn-list {
						@include flexBox();
						.btn-button {
							padding: 3rpx 5rpx;
							margin-right: 20rpx;
							width: 150rpx;
							height: 50rpx;
							border-radius: 25rpx;
							font-size: 27rpx;
							background: #fff;
							font-weight: normal;
							@include flexBox();
							&:last-child {
								margin: 0;
							}
							&::after,
							&::before {
								border: 0;
							}
							&.btn-gray {
								border: 1rpx solid #333;
								color: #333;
							}
							&.btn-active {
								border: 1rpx solid #D7B975;
								color: #D7B975;
							}
						}
					}
				}
			}
		}
	}
	
</style>