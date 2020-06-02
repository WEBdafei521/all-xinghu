<template>
	<view class="u-demo">
		<view class="u-demo-wrap">
			<view class="u-demo-title">今日数据</view>
			<view class="u-item-title">详情</view>
			<view class="u-demo-area">
				<u-grid :col="3">
					<u-grid-item>
						<view class="price">
							{{all_sets.new_order}}
						</view>
						<view class="grid-text">订单</view>
					</u-grid-item>
					<u-grid-item>
						<view class="price">
							{{all_sets.refound_order}}
						</view>
						<view class="grid-text">退款</view>
					</u-grid-item>
					<u-grid-item>
						<view class="price">
							￥{{ all_sets.total_price}}
						</view>
						<view class="grid-text">成交金额</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="u-config-wrap">
		<!-- 	<view class="u-config-title u-border-bottom">
				参数配置
			</view>
			<view class="u-config-item">
				<view class="u-item-title">本次转播结束后，下一次是否开启？</view>
				<u-subsection vibrateShort :list="['自动转播', '停止转播']" @change="modeChange"></u-subsection>
			</view> -->
			
			<view class="u-config-item">
				<!-- <view class="u-item-title">开启</view> -->
				<u-button :custom-style="{marginTop: '20rpx'}" type="success" :disabled="updating" @click="getOrder">刷新</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				all_sets:{
					new_order: 0,
					refound_order: 0,
					total_price: 0,
					}
			}
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
		onLoad() {
			this.getOrder()
		},
		methods: {
			close(){
				uni.navigateBack({})
			},
			modeChange(index) {
				if(index == 0){
					this.$refs.uToast.show({
						title: '下一次主播开播的时候，系统会自动转播',
						type: 'success'
					})
				}else{
					this.$refs.uToast.show({
						title: '下一次主播开播的时候，系统不会自动转播',
						type: 'success'
					})
				}
			},
			maxLengthChange(index) {
				this.maxlength = index == 0 ? 4 : index == 1 ? 5 : 6;
			},
			valueChange(index) {
				this.value = index == 0 ? '' : index == 1 ? '23' : '678';
			},
			breatheChange(index) {
				this.breathe = index == 0 ? true : false;
			},
			boldChange(index) {
				this.bold = index == 0 ? true : false;
			},
			dotFillChange(index) {
				this.dotFill = index == 0 ? true : false;
			},
			getOrder() {
				var t = this;
				this.tui.g("/order/stat",{
					shop_id:t.vuex_userInfo.shop_id,
				},1).then((res) => {
					
					if (res.code == 0) {
						t.all_sets = res.result
					}
				}).catch((res) => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {}
	.u-demo-title,
	.u-config-title {
	  text-align: left;
	  font-size: 32rpx;
	  font-weight: bold;
	  margin-bottom: 40rpx;
	}
</style>
