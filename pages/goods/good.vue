<template>
	<view class="upload">
		
		<view class="l-upload">
			<view class="l-upload-title">
				<view class="l-upload-title-icon">*</view>
				<view class="l-upload-title-text">	添加主图 </view>
			</view>
			<view class="l-upload-main">
				<view class="l-upload-image" v-for="(item,index) of imgList1" :key="index">
					<!-- 删除按钮 -->
					<view class="l-upload-image-del" @tap="del_sencond1">
						<image :data-id="index" src="../../static/l-upload-close.png" mode=""></image>
					</view>
					<image :src="item" mode=""></image>
					<!-- 封面图 文字样式 -->
					<view v-if="index==0" class="l-upload-image-text">
						封面图
					</view>
				</view>
				<!-- 添加按钮 -->
				<view class="l-flex-col l-upload-image-btn" @tap="chooseImage1" v-if="imgListLength!=5">
					<view>
						<image class="l-upload-photo" src="../../static/l-upload-photo.png" mode=""></image>
					</view>
					<view class="l-upload-photo-text">
						{{imgListLength1}}/5
					</view>
				</view>
				
			</view>
		</view>
		
		
		<!-- 输入标题 -->
		<view class="l-title l-margin-top-sm" >
			<view class="l-upload-title">
				<view class="l-upload-title-icon">*</view>
				<view class="l-upload-title-text"> 输入标题 </view>
				<view class="l-title-inp">
					<input type="text" v-model="upload_pro_title" placeholder="请输入商品标题" />
				</view>
			</view>
		</view>
		<!-- 类目 -->
		<view class="l-type-list l-margin-top-sm" @tap="showType">
			<view class="l-upload-title">
				<view class="l-upload-title-icon">*</view>
				<view class="l-upload-title-text"> 类目 </view>
			</view>
			<view class="l-type-list-item">
				<view>  {{selectType}}	 </view>
				<u-icon name="arrow-right" color="#B1B1B6" size="28"></u-icon>
			</view>
		</view>
			<u-picker mode="selector" @confirm="confirm" v-model="show"  :default-selector="[0]" :range="selectorObj" range-key="cateName"></u-picker>
		
		<!-- 商品规格 -->
		<view class="l-type-list l-margin-top-md" @tap="changeInfo">
			<view class="l-upload-title">
				<view class="l-upload-title-icon">*</view>
				<view class="l-upload-title-text"> 商品规格 </view>
			</view>
			<view class="l-type-list-item">
				<view>  修改 </view>
				<u-icon name="arrow-right" color="#B1B1B6" size="28"></u-icon>
			</view>
		</view>
		
		
		<!-- 商品文案 -->
		<view class="l-upload l-margin-top-lg">
			<view class="l-upload-title">
				<view class="l-upload-title-icon" style="opacity: 0;">*</view>
				<view class="l-upload-title-text">	商品文案 </view>
			</view>
			<view class="l-title-inp l-product-title">
				<input type="text" value="" placeholder="请输入商品文案..." />
			</view>
			<view class="l-upload-main">
				<view class="l-upload-image" v-for="(item,index) of imgList" :key="index">
					<!-- 删除按钮 -->
					<view class="l-upload-image-del" @tap="del_sencond">
						<image :data-id="index" src="../../static/l-upload-close.png" mode=""></image>
					</view>
					<image :src="item" mode=""></image>
				</view>
				<!-- 添加按钮 -->
				<view class="l-flex-col l-upload-image-btn" @tap="chooseImage" v-if="imgListLength!=5">
					<view>
						<image class="l-upload-photo" src="../../static/l-upload-photo.png" mode=""></image>
					</view>
					<view class="l-upload-photo-text">
						{{imgListLength}}/5
					</view>
				</view>
			</view>
		</view>
		
		<!-- 同步商品 -->
		<view class="l-type-list l-margin-top-ssm">
			<view class="l-upload-title">
				<view class="l-upload-title-icon">*</view>
				<view class="l-upload-title-text"> 同步商品 </view>
				<view class="l-upload-title-text l-title-inp l-upload-photo-text">(多选)</view>
				
				<view class="l-upload-title-text">
					<u-checkbox-group @change="checkboxGroupChange" active-color="#d7b975">
								<u-checkbox 
									icon-size="12"
									v-model="item.checked" 
									v-for="(item, index) in list" :key="index" 
									:name="item.name"
								>{{item.name}}</u-checkbox>
							</u-checkbox-group>
				</view>
			</view>
		</view>
		
		<!-- 虚拟销量 -->
		<view class="l-type-list l-margin-top-sm">
			<view class="l-upload-title">
				<view class="l-upload-title-icon" style="opacity: 0;">*</view>
				<view class="l-upload-title-text"> 虚拟销量 </view>
				<view class="l-upload-title-text l-togger">
					<image src="../../static/l-about.png" mode=""></image>
				</view>
			</view>
			<view class="l-type-list-item l-send-price">
				0
			</view>
		</view>
		
		<!-- 设置佣金 -->
		<view class="l-type-list l-margin-top-sm">
			<view class="l-upload-title">
				<view class="l-upload-title-icon" style="opacity: 0;">*</view>
				<view class="l-upload-title-text"> 设置佣金 </view>
				<view class="l-upload-title-text l-togger">
					<image src="../../static/l-about.png" mode=""></image>
				</view>
			</view>
			<view class="l-type-list-item l-send-price">
				0%
			</view>
		</view>
		
		<!-- 运费 -->
		<view class="l-type-list l-margin-top-sm">
			<view class="l-upload-title">
				<view class="l-upload-title-icon" style="opacity: 0;">*</view>
				<view class="l-upload-title-text"> 运费 </view>
			</view>
			<view class="l-type-list-item l-send-price" @tap="changeInfo">
				0.00
			</view>
		</view>
		<view class="zanwei">
			
		</view>
		
		<view class="confirm-bottom">	</view>
		<view class="confirm-up" @click="uploadInfo">
			确定发布
		</view>
		<!-- 弹出框 -->
		<view>
				<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				upload_pro_title:"",
				selectorObj: [
					{
						cateName: '食品类',
						id: 1
					},
					{
						cateName: '娱乐类',
						id: 2
					}
				],
				
				imgList1:[],
				imgListLength1:"0",
				// 商品文案 上传图片
				imgList:[],
				imgListLength:"0",
				// 同步商品
				list: [
								{
									name: '直播间',
									checked: false,
									disabled: false
								},
								{
									name: '商城',
									checked: false,
									disabled: false
								}
							],
								selectType:"服装类",
								action: 'http://192.168.100.17/index.php/index/index/upload', // 演示地址
								showUploadList: false, 
								uUpload: {}, // 组件实例
								
				typeListInfo:[]
			}
		},
		onLoad() {

		},
		onShow(){
			var arr = uni.getStorageSync('typeListInfo');
			this.typeListInfo = JSON.parse(arr)
		},
		// 只有onReady生命周期才能调用refs操作组件
		onReady() {
			// 得到整个组件对象，内部图片列表变量为"lists"
			this.uUpload = this.$refs.uUpload;
		},
		methods: {
			uploadInfo(){
				var skuList = []
				var baseid = this.$u.random(0, 9999);
				var basevalueid = this.$u.random(0, 9999);
				for(var item of this.typeListInfo){
					var t = {
					  "code": "100",
					  "create_time": 0,
					  "delete_time": 0,
					  "goods_id": 0,
					  "group_sale_num": 0,
					  "id": 0,
					  "img": item.url,
					  "open_id": 3,
					  "price": item.newPrice,
					  "sale_num": 0,
					  "spec": [
						
					    {
					      "id": parseInt(baseid),
					      "name": item.rule1,
					      "value_id": parseInt(basevalueid)+parseInt(item.id),
					      "value_img": item.url,
					      "value_name": item.size.split("-")[0]
					    },
					    {
					      "id": parseInt(baseid)+1,
					      "name": item.rule2,
					      "value_id": parseInt(basevalueid)+parseInt(item.id),
					      "value_img": item.url,
					      "value_name": item.size.split("-")[1]
					    }
						
					  ],
					  "spec_sign": "string",
					  "spec_value_sign": "string",
					  "stock": item.stock,
					  "title": "string",
					  "update_time": 0,
					  "weight": 0
					}
					skuList.push(t)
				}
				
				if(!this.imgList1.length){
					this.$refs.uToast.show({
										title: '请上传主图',
										type: 'error',
									})
									return
				}
				if(!this.upload_pro_title){
					this.$refs.uToast.show({
										title: '请输入商品标题',
										type: 'error',
									})
									return
				}
				
				var info={
				  "category_ids": [
				    "[6]"
				  ],
				  "shop_id": this.tui.userInfo().shop_id,
				  "skus": skuList,
				  "title": this.upload_pro_title,
				  "images": this.imgList1,
				}
				this.tui.p("/goods/add",info,1).then((res) => {
					this.updating = false
					if (res.code == 0) {
						this.title = "上传成功"
						this.showTips()
					}
				}).catch((res) => {
					console.log(res);
					this.title = "上传失败"
					this.showTips()
				})
				console.log(info)
			},
			// 展示select
			showType(){
				this.show = !this.show
			},
			// 选择 类目
			confirm(idn){
				var index = idn[0]
				this.selectType = this.selectorObj[index].cateName
			},
			// 修改
			changeInfo(){
				uni.navigateTo({
				    url: './updata'
				});
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 主图图片上次
			chooseImage1(){
				uni.showToast({
					title:"上传中...",
					icon:"none"
				})
				var that = this ;
				uni.chooseImage({
						sourceType:['camera', 'album'],
						// #ifdef MP-WEIXIN
						sizeType:['compressed', 'original'],
						// #endif
						count: 1,
						success: (res) => {
							uni.hideToast()
							uni.uploadFile({
							    url: 'http://www.moo9995.com:8089/wx/storage/batchInsertShops', //仅为示例，非真实的接口地址
							    filePath: res.tempFilePaths[0],
							    name: 'file',
							    formData: {
							        'user': 'test'
							    },
							    success: function (uploadFileRes) {
										
										var obj = JSON.parse(uploadFileRes.data);
										if(obj.code==200){
											var arr = [];
											that.imgList1 = that.imgList1.concat(obj.data.url);
											that.imgListLength1 = that.imgList1.length
										}
										uni.showToast({
											title:"正在上传",
											icon:"none"
										})
							    }
							});
						}
					})
			},
			
			//商品文案选择图片
			chooseImage: async function() {
				uni.showToast({
					title:"上传中...",
					icon:"none"
				})
				var that = this ;
				uni.chooseImage({
						sourceType:['camera', 'album'],
						// #ifdef MP-WEIXIN
						sizeType:['compressed', 'original'],
						// #endif
						count: 1,
						success: (res) => {
							console.log(res)
							uni.hideToast()
							uni.uploadFile({
							    url: 'http://www.moo9995.com:8089/wx/storage/batchInsertShops', //仅为示例，非真实的接口地址
							    filePath: res.tempFilePaths[0],
							    name: 'file',
							    formData: {
							        'user': 'test'
							    },
							    success: function (uploadFileRes) {
										
										var obj = JSON.parse(uploadFileRes.data);
										if(obj.code==200){
											var arr = [];
											that.imgList = that.imgList.concat(obj.data.url);
											that.imgListLength = that.imgList.length
										}
										uni.showToast({
											title:"正在上传",
											icon:"none"
										})
							    }
							});
						}
					})
			},
			// 主图删除某一张图片
			del_sencond1(e){
				var index = e.target.dataset.id;
				var imgList = this.imgList1;
				this.imgListLength1 = imgList.length-1
				imgList.splice(index,1);
			},
			// 商品文案删除某一张图片
			del_sencond(e){
				var index = e.target.dataset.id;
				var imgList = this.imgList;
				this.imgListLength = imgList.length-1
				imgList.splice(index,1);
			}
		}
	}
</script>

<style>
.upload{
	background-color: rgba(248,248,248,1);
}
.l-flex-col{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
}
.l-flex-row{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
}
.l-upload{background-color: #FFFFFF;}
.l-upload-title{
	display: flex;
	align-content: center;
	background-color: #FFFFFF;
}
.l-upload-title-icon{
	
	padding:0 18rpx 0 27rpx;
	display: flex;
	align-items: center;
	padding-top: 6rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(233,51,64,1);
}
.l-upload-title-text{
	display: flex;
	align-items: center;
	height:79rpx;
	font-size:28rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(51,51,51,1);
}
.l-upload-main{
	background-color: #FFFFFF;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	padding: 27rpx 56rpx;
}
.l-upload-photo{
	width: 44rpx;
	height: 39rpx;
}
.l-upload-image-btn{
	width:116rpx;
	height:116rpx;
	margin-top: 10rpx;
	border:2rpx solid rgba(177,177,182,.5);
}
.l-upload-image{
	
	position: relative;
	width:116rpx;
	height:116rpx;
	margin: 10rpx 10rpx 0 0 ;
}
.l-upload-image image{
	width: 123rpx;
	height: 123rpx;
}
.l-upload-photo-text{
	font-size:22rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,182,1);
}
.l-upload-image-del image{
	width: 33rpx;
	height: 33rpx;
}
.l-upload-image-del{
	position: absolute;
	top: 6rpx;
	right: 6rpx;
	z-index: 1;
}
.l-upload-image-text{
		position: absolute;
		bottom: 0;
		z-index: 1;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:#fff;
		width: 123rpx;
		text-align: center;
		height:38rpx;
		line-height: 38rpx;
		color: #fff;
		background:rgba(215,185,117,1);
		opacity:0.7;
}

.l-title{
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
}
.l-title-inp{
	display: flex;align-items: center;
	padding: 0 18rpx;
	height: 79rpx;
}
.l-title-inp input{
	font-size:25rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,182,1);
}
.l-type-list{
	background-color: #FFFFFF;
	padding-right: 27rpx;
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
}
.l-type-list-item{
	height: 79rpx;
	display: flex;
	flex-direction: justify-content;
	align-items: center;
	font-size:25rpx;
	align-content: center;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
}
.l-type-list-item view,.l-type-list-item icon{
	height: 79rpx;
	padding-leftpadding-left: 18rpx;
	line-height: 79rpx;
	display: flex;
	flex-direction: justify-content;
	align-items: center;
}
.l-send-price{
	font-size:25rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,182,1);
}
.l-margin-top-ssm{
	border-top:2rpx solid rgba(248,248,248,1);;
}
.l-margin-top-sm{
	box-sizing: border-box;
	border-top:9rpx solid rgba(248,248,248,1);;
}
.l-margin-top-md{
	box-sizing: border-box;
	border-top: 9rpx solid rgba(248,248,248,1);;
}
.l-margin-top-lg{
	box-sizing: border-box;
	border-top: 9rpx solid rgba(248,248,248,1);
}
.l-product-title{
	padding:0 58rpx;
}
.l-togger image{
	margin: 0 6rpx;
	width: 22.64rpx;
	height: 22.64rpx;
}
.confirm-up{
	width: 696rpx;
	text-align: center;
	height: 88.77rpx;
	line-height: 88.77rpx;
	position: fixed;
	bottom: 62.5rpx;
	left: 27.17rpx;
	z-index: 1;
	background:rgba(215,185,117,1);
	border-radius:14px;
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(255,255,255,1);
}
.confirm-bottom{
	width:268rpx;
	height:9rpx;
	background:rgba(0,0,0,1);
	position: fixed;
	bottom: 14.5rpx;
	left: 241rpx;
	border-radius:5rpx;
}
.zanwei{
	/* width: 143r */
	height: 143rpx;
	background-color:  rgba(248,248,248,1);
}
</style>
