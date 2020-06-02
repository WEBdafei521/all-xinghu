<template>
	<view class="after-container" :style="{'height': `${windowHeight}px`}">
		<u-toast ref="uToast"></u-toast>
		<view class="after-goods">
			<image class="goods-img" :src="goods.goodsList[0].goodsUrl" mode="aspectFill"></image>
			<view class="goods-info">
				<text class="info-title">
					{{goods.goodsList[0].title}}
				</text>
				<view class="info-rule">
					<text>规格：{{goods.goodsList[0].type}}</text>
				</view>
			</view>
		</view>
		<view class="after-cell">
			<u-cell-group>
				<u-cell-item title="货物状态" :value="valueOne" @click="showGoodsType()"></u-cell-item>
				<u-cell-item title="退款原因" :value="valueTwo" @click="showAfterType()"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="after-sales">
			<view class="sales-title">
				<text>订单总金额：</text>
				<text class="price-text">￥{{goods.amount}}</text>
			</view>
			<view class="sales-input">
				<input
					class="u-input"
					type="text"
					placeholder="退款金额"
					v-model="salesPrice"
				/>
			</view>
			<view class="sales-tips">
				<text class="tips-title">退款说明</text>
				<input
					class="tips-input"
					type="text"
					placeholder="选填"
					v-model="salesRemaks"
				/>
			</view>
		</view>
	<!-- 	<view class="after-photo">
			<view class="photo-title">
				<text>上传凭证</text>
			</view>
			<view class="photo-list">
				<u-upload
					ref="uUpload"
					width="120"
					:action="action"
					:file-list="fileList"
					:auto-upload="false"
					max-count="3"
					del-bg-color="#B1B1B6"
					:show-progress="false"
					:custom-btn="true"
					@on-uploaded="onUploaded"
				>
					<view slot="addBtn" class="slot-btn">
						<u-icon name="camera" color="#B1B1B6" size="55"></u-icon>
						<text>上传图片</text>
					</view>
				</u-upload>
				<text class="photo-tips">最多上传三张</text>
			</view>
		</view> -->
		
		<view class="after-btn">
			<button class="btn-button" type="default" @click="commitBtn()">提交</button>
		</view>
		
		
		<u-popup v-model="goodsVisible" mode="bottom" border-radius="18">
			<view class="pop-goods-list">
				<view class="pop-title">
					货物状态
				</view>
				<block v-for="(item, index) in typeList" :key="index">
					<view class="pop-list" @click="changeRideo(item, 1)">
						<view>
							<text>{{ item.name }}</text>
						</view>
						<radio class="li-radio" :value="item.id" :checked="item.checked" color="#D7B975"/>
					</view>
				</block>
				<view class="pop-btn">
					<button class="btn-class" type="default" @click="goodsVisible = false">关闭</button>
				</view>
			</view>
		</u-popup>
			
		<u-popup v-model="afterVisible" mode="bottom" border-radius="14">
			<view class="pop-goods-list">
				<view class="pop-title">
					退款原因
				</view>
				<block v-for="(item, index) in afterList" :key="index">
					<view class="pop-list" @click="changeRideo(item, 2)">
						<view>
							<text>{{ item.name }}</text>
						</view>
						<radio class="li-radio" :value="item.id" :checked="item.checked" color="#D7B975"/>
					</view>
				</block>
				<view class="pop-btn">
					<button class="btn-class" type="default" @click="afterVisible = false">关闭</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				goods:{},
				windowHeight: 200,
				// 货物/退款
				valueOne: '请选择',
				valueTwo: '请选择',
				// 退款金额
				salesPrice: '',
				salesRemaks: '',
				
				// 图片上传
				action: 'http://www.example.com/upload',
				fileList: [
					{
						url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
					}
				],
				// 弹窗状态
				goodsVisible: false,
				afterVisible: false,
				typeList: [
					{
						name: '未收到货',
						checked: false,
					},
					{
						name: '已收到货',
						checked: false,
					},
				],
				afterList: [
					{
						name: '不喜欢/不想要',
						checked: false,
					},
					{
						name: '空包裹',
						checked: false,
					},
					{
						name: '未按约定时间发货',
						checked: false,
					},
					{
						name: '快递/物流一直未送达',
						checked: false,
					},
					{
						name: '快递/物流无跟踪记录',
						checked: false,
					},
					{
						name: '货物破损已拒签',
						checked: false,
					},
				]
			}
		},
		onLoad() {
			this.goods = uni.getStorageSync("refound");
			if(!this.goods){
				uni.navigateBack({
					
				})
				return
			}
			this.goods = JSON.parse(this.goods);
			// 将页面全屏 
			uni.getSystemInfo({
			    success: (res) => {
			        this.windowHeight = res.windowHeight
				}
			})
		},
		methods: {
			onUploaded (lists) {
				this.fileList = lists
			},
			// 提交
			commitBtn () {
				var t = this;
				if(t.salesPrice.length == 0){
					this.$refs.uToast.show({
						title: '请填写金额',
						type: 'success'
					})
					return
				}
				if(t.salesPrice > t.goods.amount ){
					this.$refs.uToast.show({
						title: '填写金额不能超过订单金额',
						type: 'success'
					})
					return
				}
				
				this.tui.p("/order/afterSales",{
					"order_id": t.goods.id,
					"new_price": parseFloat(t.salesPrice),
					"order_sn": t.sn,
					"refound_reason": t.salesRemaks,
				}).then((res) => {
					
					if (res.code == 0) {
						uni.navigateBack({
							
						})
					}
					this.$refs.uToast.show({
						title: res.msg,
						type: 'success'
					})
				}).catch((res) => {
					console.log(res);
				})
				
			},
			showGoodsType () {
				this.goodsVisible = true
			},
			showAfterType () {
				this.afterVisible = true
			},
			// 切换radio
			changeRideo ({ name }, type) {
				if (type == 1) {
					this.valueOne = name
					this.typeList.forEach(item => {
						item.checked = item.name == name ? true : false
					})
				}
				if (type == 2) {
					this.valueTwo = name
					this.afterList.forEach(item => {
						item.checked = item.name == name ? true : false
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '~@/common/scss/mixins.scss';
	.after-container {
		background: #f8f8f8;
		padding: 10rpx 0 100rpx;
		
		.after-goods {
			background: #fff;
			padding: 30rpx;
			margin-bottom: 10rpx;
			@include flexBox();
			.goods-img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 20rpx;
			}
			.goods-info {
				flex: 1;
				padding: 0 20rpx;
				height: 160rpx;
				@include flexBox(flex-start, flex-start);
				flex-direction: column;
				.info-title {
					@include flexBox(flex-start);
					@include textOverHidden(2);
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}
				.info-rule {
					font-size: 24rpx;
					color: #b1b1b1;
					.rule-l {
						margin-left: 20rpx;
					}
				}
			}
		}
		
		.after-sales {
			background: #fff;
			margin: 10rpx 0;
			padding: 0 30rpx;
			font-size: 30rpx;
			.sales-title {
				padding: 20rpx 0 10rpx;
			}
			.sales-input {
				.u-input {
					font-size: 24rpx;
				}
			}
			.sales-tips {
				@include flexBox(flex-start);
				padding: 10rpx 0;
				.tips-title {
					
				}
				.tips-input {
					font-size: 30rpx;
					margin-left: 20rpx;
				}
			}
			
			.price-text {
				color: #E93340;
			}
		}
		.after-photo {
			background: #fff;
			padding: 0 30rpx 20rpx;;
			.photo-title {
				padding: 20rpx 0;
				font-szie: 30rpx;
			}
			.photo-list {
				@include flexBox(flex-start, flex-end);
				.photo-tips {
					color: #B1B1B6;
					font-size: 24rpx;
					margin-left: 20rpx;
					padding-bottom: 10rpx;
				}
			}
			/* 上传图片 */
			.slot-btn {
				width: 120rpx;
				height: 120rpx;
				border: 1px solid #B1B1B6;
				@include flexBox();
				flex-direction: column;
				font-size: 20rpx;
				color: #B1B1B6;
				margin-left: 20rpx;
			}
			::v-deep .u-delete-icon {
				width: 36rpx;
				height: 36rpx;
			}
		}
		
		.after-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 140rpx;
			background: #f8f8f8;
			padding: 0 30rpx;
			.btn-button {
				@include resetBtn();
				background: #D7B975;
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
	::v-deep .u-list-item {
		.u-preview-image {
			@include setBox();
		}
	}
	/* 弹窗样式 */
	.pop-goods-list {
		position: relative;
		background: #fff;
		font-size: 30rpx;
		padding: 0 30rpx 240rpx;
		.pop-title {
			@include flexBox();
			padding: 20rpx 0;
		}
		.pop-list {
			padding: 20rpx 0;
			@include flexBox(space-between);
			@include border_bottom();
			&:last-child {
				&::before {
					border: 0;
				}
			}
		}
		.li-radio {
			transform: scale(.8);
		}
		.pop-btn {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			padding: 0 30rpx 60rpx;
			@include flexBox();
			.btn-class {
				height: 98rpx;
				@include resetBtn();
				background: #D7B975;
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
</style>
