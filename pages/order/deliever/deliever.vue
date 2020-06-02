<template>
	<view class="delivery-container" :style="{height: `${windHeight}px`}">
		<view class="delivery-content" >
			<view class="order-li-goods">
				<view class="goods-img">
					<image class="goods-img-img" :src="goods.goodsList[0].goodsUrl" mode="aspectFill"></image>
				</view>
				<view class="goods-info">
					<view class="goods-info-title">
						<text class="gs_title">{{goods.goodsList[0].title}}</text>
						<text class="gs_price">￥{{ goods.goodsList[0].price}}</text>
					</view>
					<view class="goods-info-rule">
						<view class="gs_rule">
							<text class="gs_rule-text">{{goods.goodsList[0].type}}</text>
						</view>
						<view class="gs_num">
							<text>x{{goods.goodsList[0].number}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="order-li-total">
				<view class="total-title">
					<text class="total-title-text">
						共
						<text class="gs_price">{{goods.goodsList[0].number}}</text>
						件
					</text>
					<text>
						合计（含快递费：￥0.00）
					</text>
				</view>
				<view>
					<text class="gs_price">￥{{goods.amount}}</text>
				</view>
			</view>
			<view class="order-li-address">
				<view class="address-box">
					<view class="address-label">
						<text>收件人</text>
					</view>
					<view class="address-name">
						<view>
							<text>{{goods.reciverName}}</text>
						</view>
						<view class="address-tel" @click="copytext(goods.reciverPhone)">
							<text class="tel-num">{{goods.reciverPhone}}</text>
							<image class="icons-img " src="../../../static/icon/icon-copy.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="address-box">
					<view class="address-label">
						<text>收货地址</text>
					</view>
					<view class="address-detailed">
						<text class="address-detailed-text">
							{{goods.reciverCombineDetail}} {{goods.reciverAddress}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="delivery-info">
			
			<view class="info-title">
				<text>快递信息</text>
			</view>
			<u-cell-group>
				<u-field
					required
					v-model="deliever.deliver_name"
					label="发货人"
					placeholder="请填写发货人"
				>
				</u-field>
				<u-field
					required
					v-model="deliever.deliver_phone"
					label="手机号"
					placeholder="请填写手机号"
				>
				</u-field>
				<u-field
					type="textarea"
					v-model="deliever.deliver_address"
					label="发货地址"
					placeholder="请填写发货地址"
				>
				</u-field>
			</u-cell-group>
			<u-cell-group>
				<u-cell-item title="快递公司" :value="deliever.deliveryVal" @click="choose()"></u-cell-item>
			</u-cell-group>
			<view class="info-number">
				<view>
					<text>快递单号</text>
				</view>
				<view class="number-input">
					<input
						class="copy_input"
						type="text"
						placeholder="请输入单号"
						v-model="deliever.tracking_no"
					/>
					<button class="copy_btn" type="default" @click="boardData()">粘贴</button>
					<view class="copy_scan" @click="scanHandle()">
						<u-icon name="scan" color="#B1B1B6" size="31"></u-icon>
						<text class="scan_text">扫码</text>
					</view>
				</view>
			</view>
		</view>
		<view class="delivery-btn">
			<button class="btn-commit" type="default" @click="commitDelivery()">立即发货</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				windHeight: 200,
				
				
				goods:{},
				deliever:{
					id:0,
					deliver_name:'',
					deliver_phone:'',
					deliver_address:'',
					remark:'',
					express_id:0,
					tracking_no:'',
					deliveryVal: '请选择快递公司',
				}
			}
		},
		onLoad (option) {
			// 将页面全屏 
			uni.getSystemInfo({
			    success: (res) => {
					// 底部tabbar高度 
			        this.windHeight = res.windowHeight
				}
			})
			this.goods = uni.getStorageSync("deliever");
			if(!this.goods){
				uni.navigateBack({
					
				})
				return
			}
			this.goods = JSON.parse(this.goods);
			this.deliever.id = this.goods.id
		},
		methods: {
			// 发货
			commitDelivery () {
				var t = this;
				this.tui.p("/order/setSend",t.deliever,1).then((res) => {
					
					if (res.code == 0) {
						
					}
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success'
					})
				}).catch((res) => {
					console.log(res);
				})
			},
			// 复制
			copytext (val) {
				uni.setClipboardData({
					data: val,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								// uni.showToast({
								// 	title: '已复制到剪贴板'
								// });
							}
						});
					}
				});
			},
			// 粘贴
			boardData () {
				let _this = this
				uni.getClipboardData({
				    success: function (res) {
						_this.deliever.tracking_no = res.data
				    }
				})
			},
			// 扫码
			scanHandle () {
				let _this = this
				// 允许从相机和相册扫码
				uni.scanCode({
				    success: function (res) {
						_this.deliever.tracking_no = res.data
				    }
				});
			},
			// 选择物流
			choose () {
				let name = this.deliever.deliveryVal
				uni.navigateTo({
					url: './courier?name=' + name
				})
			}
		},
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
	.delivery-info {
		margin-top: 20rpx;
		background: #fff;
		.info-title {
			padding: 20rpx 0;
			@include flexBox();
			font-weight: bold;
			font-size: 28rpx;
		}
		.info-number {
			@include flexBox(space-between);
			padding: 20rpx 32rpx;
			.number-input {
				@include flexBox();
				.copy_input {
					text-align: right;
					font-size: 28rpx;
					padding-right: 10rpx;
					margin-right: 10rpx;
				}
				.copy_btn {
					@include resetBtn();
					width: 70rpx;
					padding: 0 4rpx;
					height: 32rpx;
					border: 1px solid #D7B975;
					border-radius: 16rpx;
					color: #D7B975;
					font-size: 24rpx;
					margin-right: 40rpx;
				}
				.copy_scan {
					@include flexBox();
					color: #B1B1B6;
					.scan_text {
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.delivery-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 200rpx;
		background: #fff;
		padding: 0 30rpx;
		.btn-commit {
			margin-top: 20rpx;
			@include resetBtn();
			height: 98rpx;
			background: #D7B975;
			border-radius: 49rpx;
			color: #fff;
			font-size: 30rpx;
		}
	}
	.delivery-container {
		padding: 20rpx 0;
		background: #f8f8f8;
		.delivery-content {
			background: #fff;
			padding: 20rpx 20rpx 0;
		}
		.order-li-goods {
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
		.order-li-total {
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
		.order-li-address {
			width: 100%;
			padding: 20rpx 20rpx;
			// @include border_bottom();
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
	}
</style>
