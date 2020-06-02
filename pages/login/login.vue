<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			<view class="wechat item">
				<view class="icon u-flex u-row-center">
					<image class="logo" src="../../static/yuskin.png" style="width: 100px;height: 100px;"></image>
				</view>
				
			</view>
			<!-- <u-gap height="5" bg-color="rgb(83,194,64)"></u-gap> -->
			<view class="tips ">直播买货就上明星狐！</view>
			<button  open-type="getUserInfo" @getuserinfo="bindGetUserInfo"  class="u-m-b-10 u-m-t-80 getCaptcha">立即登陆</button>
			<button @tap="submit" :style="[inputStyle]" class="notgetCaptcha">暂时不用</button>
			
		</view>
		<view class="buttom">
	
			<view class="hint u-m-t-80">
				登录<!-- 代表同意
				<text class="link">用户协议、隐私政策，</text> -->
				并授权使用您的微信账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tel: ''
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.tel) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		bindGetUserInfo (e) {
		    console.log(e.detail.userInfo)
			this.tui.registermp();
		},
		submit() {
			uni.navigateBack({
				
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: center;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			text-align: center;
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.notgetCaptcha {
			background-color: #F3F4F6;
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
