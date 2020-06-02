<template>
	<view class="detail-container">
		<view class="detail-head">
			<view class="detail-head-title">
				<text>订单状态：交易成功</text>
			</view>
			<view class="detail-head-logistics">
				<image class="icon-img" src="../../static/icon/icon-bigCar.png" alt=""></image>
				<view class="logistics-info">
					<text class="info-end">已签收，签收人凭取货码签收。</text>
					<text class="info-date">2020-04-16 12:59:30</text>
				</view>
			</view>
			<view class="detail-head-logistics">
				<image class="icon-img img-small" src="../../static/icon/icon-area.png" alt=""></image>
				<view class="logistics-info">
					<text class="user-info">
						<text class="user-info-name">张三</text>
						<text>1828666666</text>
					</text>
					<text class="user-address">杭州市滨江区秋溢路云狐科技园601号</text>
				</view>
			</view>
		</view>
		<view class="detail-list">
			<block v-for="(item, index) in 2" :key="index">
				<view class="detail-list-li">
					<view class="li-merchants">
						<image class="merchants-img" src="../../static/icon/foot-zan.png" alt=""></image>
						<text class="merchants-title">红狐集团旗舰店</text>
						<u-icon name="arrow-right" color="#333" size="14"></u-icon>
					</view>
					<view class="li-goods">
						<image class="goods-img" src="../../static/img/room-bg.jpg" mode=""></image>
						<view class="goods-info">
							<view class="goods-info-title">
								<view class="title-text">
									日系印花连帽工装棉服男ins潮流棉衣外套
								</view>
								<view>￥9.9</view>
							</view>
							<view class="goods-info-rule">
								<view class="rule-text">
									<text>灰色JM4401</text>
									<text>XL【加棉款】</text>
								</view>
								<view>x1</view>
							</view>
						</view>
					</view>
					<view class="li-btns">
						<button class="btns-button">我要退货</button>
					</view>
				</view>
			</block>
			<view class="detail-list-total">
				<text>
					实付：￥
					<text class="total-price">9.9</text>
					(免运费)
				</text>
			</view>
		</view>
		<view class="detail-order">
			<view class="detail-order-li">
				<view class="order-tips">
					<text>
						订单编号：15489875468547851
					</text>
				</view>
				<button class="copy-btn" type="default">复制</button>
			</view>
			<view class="detail-order-li">
				<view class="order-tips">
					<text>
						支付方式：微信支付
					</text>
				</view>
			</view>
			<view class="detail-order-li">
				<view class="order-tips">
					<text>
						下单时间：2020-04-10  21:20:30
					</text>
				</view>
			</view>
			<view class="detail-order-li">
				<view class="order-tips">
					<text>
						发货时间：2020-04-11  08:20:30
					</text>
				</view>
			</view>
			<view class="detail-order-li">
				<view class="order-tips">
					<text>
						成交时间：2020-04-15  09:20:40
					</text>
				</view>
			</view>
			<view class="detail-order-li">
				<view class="order-tips">
					<text>
						快递单号：SF515611644
					</text>
				</view>
				<button class="copy-btn" type="default">复制</button>
			</view>
			<view class="detail-foot">
				<view class="detail-foot-btn">
					<img class="icon-img" src="../../static/icon/icon-serve.png" alt="">
					<text>联系卖家</text>
				</view>
				<view class="detail-foot-btn">
					<img class="icon-img" src="../../static/icon/icon-tel.png" alt="">
					<text>拨打电话</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.icon-img {
		width: auto;
		height: 38rpx;
		margin-right: 20rpx;
	}
	.merchants-img {
		@include setBox(43rpx, 43rpx);
		border-radius: 50%;
	}
	.goods-img {
		width: 227rpx;
		height: 227rpx;
		border-radius: 16rpx;
	}
	.detail-container {
		background: #f8f8f8;
		/* 标题 */
		.detail-head {
			padding: 0 30rpx;
			background: #fff;
			font-size: 28rpx;
			margin-bottom: 20rpx;
			&-title {
				color: #D7B975;
				padding: 20rpx 0;
				@include border_bottom();
			}
			&-logistics {
				padding: 20rpx 0;
				@include border_bottom();
				@include flexBox(flex-start);
				.icon-img {
					width: 53rpx;
					&.img-small {
						width: 33rpx;
						margin-left: 10rpx;
						margin-right: 30rpx;
					}
				}
				.logistics-info {
					flex: 1;
					height: 80rpx;
					@include flexBox(space-between, flex-start);
					flex-direction: column;
					.user-info {
						&-name {
							margin-right: 40rpx;
						}
					}
					.user-address {
						width: 100%;
						padding-right: 20rpx;
						@include textOverHidden();
					}
					.info-end {
						color: #D7B975;
					}
					.info-date {
						color: #B1B1B6;
						font-size: 24rpx;
					}
				}
			}
		}
		/* 商品 */ 
		.detail-list {
			background: #fff;
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			&-li {
				.li-merchants {
					padding: 20rpx 0;
					@include flexBox(flex-start);
					.merchants-title {
						margin: 0 20rpx;
					}
				}
				.li-goods {
					@include flexBox(space-between, flex-start);
					.goods-info {
						flex: 1;
						padding-left: 20rpx;
						&-title {
							width: 100%;
							@include flexBox(space-between, flex-start);
							margin-bottom: 20rpx;;
							.title-text {
								width: 340rpx;
								@include textOverHidden(2);
							}
						}
						&-rule {
							width: 100%;
							font-size: 24rpx;
							@include flexBox(space-between);
							color: #999;
							.rule-text {
								color: #999;
							}
						}
					}
				}
				.li-btns {
					width: 100%;
					@include flexBox(flex-end);
					padding: 10rpx 0 30rpx;
					@include border_bottom();
					.btns-button {
						@include resetBtn();
						width: auto;
						margin: 0;
						height: 46rpx;
						padding: 0 20rpx;
						border:1px solid #b1b1b1;
						border-radius:25px;
						font-size: 28rpx;
						color: #b1b1b1;
					}
				}
			}
			&-total {
				padding: 30rpx 0;
				@include flexBox(flex-end);
				font-size: 26rpx;
				.total-price {
					color: #D7B975;
					margin-right: 10rpx;
					font-weight: bold;
					font-size: 28rpx;
				}
			}
		}
		/* 订单 */
		.detail-order {
			background: #fff;
			padding: 10rpx 30rpx;
			.detail-order-li {
				padding: 8rpx 0;
				font-size: 24rpx;
				color: #b1b1b1;
				@include flexBox(space-between);
				.order-tips {
					
				}
				.copy-btn {
					@include resetBtn();
					border: 1px solid #b1b1b1;
					border-radius: 8rpx;
					width: 70rpx;
					height: 40rpx;
					line-height: 40rpx;
					margin: 0;
					padding: 0;
					font-size: 24rpx;
					background: #fff;
					color: #b1b1b1;
				}
			}
			.detail-foot {
				margin-top: 20rpx;
				padding: 30rpx 80rpx;
				@include flexBox(space-between);
				@include border_top();
				.icon-img {
					width: 36rpx;
				}
				&-btn {
					@include flexBox();
				}
			}
		}
	}
</style>
