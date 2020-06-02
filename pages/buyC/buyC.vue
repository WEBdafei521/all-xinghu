<template>
	
		<view class="containers ">
		    <view class="order-tips-holder" v-if="isRealName&&!certification">
		        <view class="order-tips" style="top:navigationBarHeightpx">您的订单中包含海外商品，必须提供实名信息，否则无法清关</view>
		    </view>
			<u-toast ref="uToast"></u-toast>
		    <view class="order-wrap">
		        <view class="order-cert page-cell bgwh" v-if="isRealName">
		            <navigator class="cell-item realname-item" hoverClass="none" url="/pages/certList/certList?type=select">
		                <view class="cell-title">实名信息</view>
		                <view class="cell-value is-link color-8" v-if="certification">certification.realName</view>
		                <view class="cell-value is-link color-c" wx:else>请添加实名信息</view>
		                <view class="cell-allow"></view>
		            </navigator>
		        </view>
		        <view class="order-addr">
		            <navigator class="addr-item" style="border: none;" hoverClass="none" url="/pages/address/address">
		                <view class="text-green cuIcon-addressbook"></view>
		                <view class="addr-cont">
		                    <block v-if="address.truename">
		                        <view class="addr-tit">
		                            <text class="addr-name">{{address.truename}}</text>
		                            <text class="addr-tel">{{address.mobile_phone}}</text>
		                        </view>
		                        <view class="addr-detail ">{{address.combine_detail}}</view>
		                    </block>
		                    <view class="addr-none" wx:else>请添加收货地址</view>
		                </view>
		                <view class="text-green cuIcon-add"></view>
		            </navigator>
		        </view>
		        <view class="cart-item bgwh" v-for="(items,indexs) in selectedGoods" :key="indexs">
		            <navigator class="cart-shop "  style="border: none;" hoverClass="none" url="/pages/shopIndex/shopIndex?id=item.spaceInfo.spaceId">
		                <text class="cuIcon-shop text-green"></text>
		                <text class="margin-left-xs shop-name margin-bottom-xs">{{items.spaceName}}</text>
		                <!-- <text class="margin-left-xs text-green cuIcon-right"></text> -->
		            </navigator>
		            <view class="cart-list">
		                <view class="cart-goods flex" >
		                    <image mode="aspectFill" class="goods-pic" :src="items.img"></image>
		                    <view class="goods-cont">
		                        <view class="goods-left">
		                            <view class="goods-name ell2 mb16">
		                                {{items.title}}
		                            </view>
		                            <view class="goods-attr mb16 margin-top-xs">
		                                规格：
										<text class="text-green">默认</text>
										<text class="text-green margin-left">默认</text>
		                            </view>
		                            <view v-if="items.refundType">
		                                <text class="goods-tips color-8">七天无理由退换</text>
		                            </view>
		                        </view>
		                        <view class="goods-right">
		                            <view class="goods-price">
		                                <text class="">￥</text>
		                                <text class="fz26">{{items.price}}</text>
		                            </view>
		                            <view class="num-text color-9">{{items.buyNumber}}</view>
		                        </view>
		                    </view>
		                </view>
		            </view>
		            <view class="page-cell">
		                <view bindtap="getCoupon" class="cell-item" data-index="orderIndex">
		                    <view class="cell-title">优惠券</view>
		                    <view class="cell-value is-link">无优惠</view>
		                    <!-- <view class="cell-allow"></view> -->
		                </view>
		                <view class="cell-item">
		                    <view class="cell-title">快递运费</view>
		                    <!-- <view class="cell-value" v-if="item.freight">￥item.freight</view> -->
		                    <view class="cell-value">包邮</view>
		                </view>
		                <view class="cell-item" style="align-items: flex-start;">
		                    <view class="cell-title">备注</view>
		                    <view class="cell-value" hidden="showCoupon" style="flex:1;padding-left:24rpx;">
		                        <textarea autoHeight bindinput="bindTextAreaBlur" class="order-text" data-index="orderIndex" maxlength="50" placeholder="选填，输入备注信息" placeholderStyle="color:#ccc;" style="isIphone?'top: -10rpx;padding:0;':''" type="text"></textarea>
		                    </view>
		                </view>
		                <view class="cell-item">
		                    <view class="cell-title"></view>
		                    <view class="fz24">
		                        <text class="color-8">共{{items.buyNumber}}件</text>
		                        <text class=""> 小计：</text>
		                        <text class="fz32 text-red">￥</text>
		                        <text class="fz32 text-red fz28">{{items.buyNumber*items.price}}</text>
		                    </view>
		                </view>
		            </view>
		        </view>
		    </view>
		    <view class="footer-hold isIphoneX?'isIPX':''"></view>
		    <view class="footer flex isIphoneX?'isIPX':''">
		        <view class="color-8 ">共{{itemsLens}}件</view>
		        <view class="">总计：</view>
		        <view class="fz32 text-red">
		            <text>￥</text>
		            <text class="fz32 text-red">{{priceTotal}}</text>
		        </view>
		        <view bindtap="submitCart" class="submit" v-if="isFromCart">提交订单</view>
		        <view @tap="submitBuy" class="submit" wx:else>提交订单</view>
		    </view>
		    <view catchtouchmove="stopScroll" class="pop-wrapper" v-if="showCoupon">
		        <view bindtap="closePop" class="blank"></view>
		        <view class="actionsheet-box" style="isIphoneX?'padding-bottom:40rpx':''">
		            <view class="actionsheet-title">
		                <view bindtap="closePop" class="pop-close"></view>
		                <view class="fz32">选择优惠券</view>
		            </view>
		            <block v-if="couponList&&couponList.length">
		                <view class="color-8 fz28 actionsheet-tips">使用优惠券购买商品后发起退款，优惠券将不能退回</view>
		                <view class="actionsheet-bd">
		                    <scroll-view scrollY="true">
		                        <view bindtap="selectCoupon" class="coupon-item flex" data-id="0">
		                            <view class="fz28">
		                                <text>不使用优惠券</text>
		                            </view>
		                            <view>
		                                <text class="iconfont icon-checkboxround1 color-pink fz32" v-if="!curCouponId||curCouponId==0"></text>
		                                <text class="iconfont icon-checkboxround0 color-8 fz32" wx:else></text>
		                            </view>
		                        </view>
		                        <view bindtap="selectCoupon" class="coupon-item flex item.available?'':'disabled'" data-disable="!item.available" data-id="item.couponId" v-for="(items,indexs) in couponList" :key="indexs">
		                            <view>
		                                <view class="fz28 mb16">
		                                    <block v-if="item.couponType==1">item.couponDiscountAmount元优惠券</block>
		                                    <block v-if="item.couponType==2">满item.couponFilled减item.couponDiscountAmount</block>
		                                    <block v-if="item.couponType==3">couponDiscountRate折券</block>
		                                </view>
		                                <view class="fz24 color-8">
		                                    <text v-if="item.couponType==1">无门槛券</text>
		                                    <text v-if="item.couponType==2">满减券</text>
		                                    <text v-if="item.couponType==3">折扣券</text>
		                                    <text> | </text>
		                                    <text v-if="item.couponApplyType==1">店铺商品通用</text>
		                                    <text v-if="item.couponApplyType==2">指定商品可用</text>
		                                    <text v-if="item.couponApplyType==3">平台商品通用</text>
		                                </view>
		                                <view class="fz24 color-8">有效期：item.deadline</view>
		                            </view>
		                            <view>
		                                <text class="iconfont icon-checkboxround1 color-pink fz32" v-if="curCouponId&&curCouponId==item.couponId"></text>
		                                <text class="iconfont icon-checkboxround0 color-8 fz32" wx:else></text>
		                            </view>
		                        </view>
		                    </scroll-view>
		                </view>
		            </block>
		            <view class="list-empty" style="padding:12vh 24rpx" wx:else>
		                <image mode="widthFix" src="/empty/coupon.png"></image>
		                <view class="empty-text">暂无优惠券</view>
		            </view>
		        </view>
		    </view>
		</view>

</template>

<script>
	export default {
		onLoad: function(t) {
		      uni.setNavigationBarTitle({
		        title: "确认订单"
		      });
			  
			// var a = {"id":209,"goods_id":0,"spec":[{"id":9694,"name":"颜色","value_id":3502,"value_name":"1","value_img":""},{"id":9695,"name":"大小","value_id":514,"value_name":"大","value_img":""}],"price":0,"stock":0,"code":"100","img":"https://img1.starfox.cn:9001/livefs/live/20200422/14/01/0/微信图片_20200305095853.png","weight":0,"title":"1 大","sale_num":0,"group_sale_num":0,"spec_value_sign":"[514,3502]","spec_sign":"[9694,9695]","create_time":1589504144,"update_time":1589504144,"delete_time":0,"open_id":3}
			
			var raw = uni.getStorageSync('selectedGoods');
			
			if(raw){
				var se = JSON.parse(raw);
				this.selectedGoods = [se];
				this.itemsLens = se.buyNumber
				this.priceTotal = se.buyNumber * se.price
			}
			uni.removeStorageSync('address');
			this.getAddress();
		},
		onShow:function(){
			var raw = uni.getStorageSync('address');
			if(raw){
				this.address = JSON.parse(raw);
			}
		},
		data() {
			return {
				navigationBarHeight: 0,
				addressId: "",
				total: "",
				orderProductNum: "",
				submitFlag: !0,
				isRealName: !1,
				showCoupon: !1,
				orderDetail:[{spaceInfo:{spaceName:'你的店'},productInfo:[{
					productNum:2,
					productPrice:99,
					refundType:1,
					inventory:"L",
					productName:"裤衩",
					inventoryImage:"https://lab.starfox.cn:9001/static/goods/0b26a7877972a07b30e9194c61ad5e5d.jpg"
				}]}],
				selectedGoods:[],
				itemsLens:0,
				priceTotal:0,
				address:[]
			}
		},
		methods: {
			submitBuy(){
				let t = this;
				var data = {
				  "address_id": t.address.id,
				  "goods_sku_id": t.selectedGoods[0].skuId,
				  "quantity": t.selectedGoods[0].buyNumber || 1,
				  "remarks": t.selectedGoods[0].remarks || "无",
				};
				
				this.tui.p("/buy/createOrder", data).then((res) => {
				
					if (res.code == 0) {
						t.tui.pay(res.result.order_sn)
					}else{
						this.$refs.uToast.show({
							title: res.msg|| '权限不足',
							type: 'error'
						})
					}
				}).catch((res) => {
					console.log(res);
				})
			},
			getAddress(){
				let t = this;
				this.tui.g("/address/default", {}).then((res) => {
				
					if (res.code == 0) {
						t.address = res.result
					}
				}).catch((res) => {
					console.log(res);
				})
			}
		}
	}
</script>

<style>
page {
    background-color: #f4f4f4;
}
.bgwh {
background-color:#fff;

}
.flex {
display:flex;
align-items:center;
justify-content:space-between;
box-sizing:border-box;

}

.order-addr {
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
}

.addr-line {
    display: block;
    width: 100%;
    height: 16rpx;
}

.addr-icon {
    width: 60rpx;
    height: 60rpx;
    background: rgba(255,239,242,1);
    color: #FF3657;
    border-radius: 100%;
    line-height: 60rpx;
    text-align: center;
    font-size: 60rpx;
}

.addr-arrow {
    font-size: 22rpx;
}

.addr-item {
    display: flex;
    padding: 42rpx 24rpx;
    align-items: center;
}

.addr-cont {
    flex: 1;
    padding: 0 60rpx 0 24rpx;
}

.addr-tit {
    margin-bottom: 14rpx;
}

.addr-none,.addr-name {
    font-size: 28rpx;
}

.addr-tel {
    font-size: 24rpx;
    display: inline-block;
    margin-left: 20rpx;
}

.addr-detail {
    font-size: 24rpx;
    color: #888;
    line-height: 28rpx;
}

.icon-checked,.icon-default {
    vertical-align: middle;
    margin-right: 10rpx;
}

.footer-hold {
    height: 120rpx;
}

.footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 24rpx;
    height: 120rpx;
    background-color: #fff;
    justify-content: flex-end;
    align-items: center;
    font-size: 26rpx;
}

.footer>view {
    margin-left: 8rpx;
}

.footer .submit {
    width: 200rpx;
    height: 72rpx;
    border-radius: 5rpx;
    text-align: center;
    line-height: 72rpx;
    color: rgba(255,255,255,.8);
    background: #D7B975;
    border-radius: 40rpx;
    font-size: 28rpx;
    margin-left: 20rpx;
}

.cart-item {
    margin-bottom: 20rpx;
    padding-bottom: 20rpx;
    border-radius: 24rpx;
}

.cart-shop {
    height: 78rpx;
    padding: 20rpx 28rpx;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.shop-head {
    width: 50rpx;
    height: 50rpx;
    border-radius: 100%;
    background-color: #eee;
    margin-right: 20rpx;
}

.shop-icon {
    margin-right: 12rpx;
    color: #888;
}

.shop-arrow {
    font-size: 22rpx;
    margin-left: 24rpx;
    color: #888;
}

.shop-name {
    font-size: 26rpx;
}

.shop-checkbox {
    display: inline-block;
    width: 60rpx;
    height: 50rpx;
    vertical-align: middle;
    box-sizing: border-box;
    padding-top: 5rpx;
}

.cart-list {
    padding: 0 28rpx;
}

.cart-checkbox {
    width: 18px;
    margin-top: 50rpx;
    overflow: hidden;
}

.cart-goods {
    padding: 0 0 14rpx 0;
    margin-top: 6rpx;
    align-items: flex-start;
}

.cart-goods:last-child {
    border: none;
}

.goods-pic {
    width: 180rpx;
    height: 180rpx;
    border-radius: 10rpx;
    margin-right: 24rpx;
}

.goods-cont {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.goods-name {
    font-size: 26rpx;
    line-height: 30rpx;
}

.goods-attr {
    color: #888;
}

.goods-act {
    margin-top: 20rpx;
}

.goods-number {
    width: 210rpx;
    height: 50rpx;
    border: 1px solid rgba(153,153,153,1);
    border-radius: 5rpx;
    overflow: hidden;
}

.goods-price {
    line-height: 30rpx;
    margin-bottom: 5rpx;
}

.goods-tips {
    font-size: 20rpx;
    color: #FFFFFF;
    padding: 2rpx 5rpx;
    background: #D7B975;
    border-radius: 4rpx;
}

.num-text {
    color: #888;
}

.goods-number .cut,.goods-number .add {
    width: 28%;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 36rpx;
    color: #666;
}

.goods-number .number {
    width: 44%;
    box-sizing: border-box;
    border-width: 0 1px;
    border-color: rgba(153,153,153,1);
    border-style: solid;
    text-align: center;
}

.goods-right {
    text-align: right;
}

.order-text {
    width: 100%;
    font-size: 26rpx;
    line-height: 30rpx;
    color: #888;
    text-align: right;
    padding: 12rpx 0;
}

.order-tips-holder {
    position: relative;
    width: 100%;
    height: 90rpx;
}

.order-tips {
    position: fixed;
    left: 0;
    right: 0;
    padding: 28rpx 24rpx;
    background: #FEF7E5;
    color: #D69007;
    line-height: 32rpx;
    z-index: 1;
}

.realname-item {
    border-top: 0;
    padding-top: 25rpx;
    padding-bottom: 25rpx;
    font-size: 28rpx;
}

.realname-item text {
    display: inlne-block;
    margin-left: 40rpx;
}

.order-wrap {
    padding: 20rpx 24rpx;
}

.order-cert {
    border-radius: 24rpx;
    margin-bottom: 20rpx;
}
.cell-item {
position:relative;
display:flex;
align-items:center;
justify-content:space-between;
box-sizing:border-box;
padding:25rpx 0;
line-height:50rpx;
min-height:50rpx;
font-size:28rpx;
border-top:1px solid #eee;

}
.iconfont {
font-family:"iconfont"!important;
font-size:16px;
font-style:normal;
-webkit-font-smoothing:antialiased;
-moz-osx-font-smoothing:grayscale;

}
.color-pink {
color:#FF3657;

}

.page-cell {
padding:0 24rpx;

}
.icon-ic_store1:before {
    content: "\e65a";
}
.icon-ic_place:before {
    content: "\e65b";
}
.icon-jiantouyouhuise:before {
    content: "\e602";
}
.cart-item .cell-item {
    border: none;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    font-size: 26rpx;
}

.cart-item .cell-value {
    color: #D7B975;
}

.goods-left {
    padding-right: 24rpx;
}

.actionsheet-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 24rpx;
    background-color: #fff;
    border-radius: 24rpx 24rpx 0 0;
}

.actionsheet-title {
    position: relative;
    text-align: center;
    padding: 14rpx 0;
    line-height: 60rpx;
}

.pop-close {
    position: absolute;
    right: 0;
}

.actionsheet-tips {
    padding: 18rpx 0;
}

.actionsheet-bd {
    padding: 14rpx 0 48rpx;
}

.actionsheet-bd scroll-view {
    max-height: 50vh;
}

.coupon-item {
    min-height: 96rpx;
    padding: 24rpx 0;
    box-sizing: border-box;
    border-top: 1px solid #eee;
}

.coupon-item .iconfont {
    font-size: 40rpx;
}

.coupon-item.disabled {
    opacity: 0.5;
}

.containers {
		height: 100vh;
		width: 100vw;
		background: #F6F6F6;
		
	}
</style>
