<template>
	<view class="content">
		<!-- 规格一 -->
		<view class="l-size" v-if="typeList[0]">
			<view class=" l-my-flex-bw ">
				<view class="l-size-title">{{typeList[0].size}}</view>
				<view @tap="del_type0"><u-icon name="close" color="#B1B1B6" size="28"></u-icon></view>
			</view>
			<!-- 颜色种类 -->
			<view class="l-my-flex-start">
				
				<view class="l-size-item l-my-flex-bw" v-for="(item,index) in list0" :key="index" @tap="del0">
					<view>{{item.size}}</view>
					<view :data-index="index"><image :data-index="index" src="../../static/del.png" mode=""></image></view>
				</view>
				
				<!-- 添加 -->
				<view @tap="addSize0">
					<view class="l-size-item l-my-flex-center" v-if="!addStatus0">
						<view><u-icon name="plus" color="#B1B1B6" size="28"></u-icon></image></view>
						<view>添加</view>
					</view>
					<view class="l-size-item l-my-flex-center" v-if="addStatus0">
						<input type="text" value="" placeholder="请输入" v-model="addValue0" @blur="add0"/>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- 规格二 -->
		<view class="l-size" v-if="typeList[1]">
			<view class=" l-my-flex-bw ">
				<view class="l-size-title">{{typeList[1].size}}</view>
				<view @tap="del_type1"><u-icon name="close" color="#B1B1B6" size="28"></u-icon></view>
			</view>
			<!-- 颜色种类 -->
			<view class="l-my-flex-start">
				
				<view class="l-size-item l-my-flex-bw" v-for="(item,index) in list1" :key="index" @tap="del1">
					<view>{{item.size}}</view>
					<view :data-index="index"><image :data-index="index" src="../../static/del.png" mode=""></image></view>
				</view>
				
				<!-- 添加 -->
				<view @tap="addSize1">
					<view class="l-size-item l-my-flex-center" v-if="!addStatus1">
						<view><u-icon name="plus" color="#B1B1B6" size="28"></u-icon></image></view>
						<view>添加</view>
					</view>
					<view class="l-size-item l-my-flex-center" v-if="addStatus1">
						<input type="text" value="" placeholder="请输入" v-model="addValue1" @blur="add1"/>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- 添加规格 -->
		<view class="l-add-size">
			<view class="l-my-flex-center" @tap="btnClick">
				<view><u-icon name="plus" color="#B1B1B6" size="28"></u-icon></image></view>
				<view>添加</view>
			</view>
		</view>
		
		<!-- 批量 价格及库存 -->
		<view class="l-price l-my-flex-bw animated shakeX delay-.5s">
			<view>
				价格及库存
			</view>
			<view class="l-batch-setting" @tap="setting" v-if="batch_setting">
				批量设置
			</view>
		</view>
		
		<!-- 已选中规格列表 -->
		<view class="l-type-list">
			<!-- 规格列表项 -->
			<view class="l-type-item" v-for="(item,index) of typeListInfo" :key="index">
				<!-- 列表项title -->
				<view class="l-type-item-title">
					{{item.size}}
				</view>
				<!-- 列表项价格 -->
				<view class="l-type-item-price l-my-flex-bw">
					<view class="l-my-flex-bw">
						<view>原价</view>
						<view class="l-price-money">￥{{item.oldPrice?item.oldPrice:'0.00'}}</view>
					</view>
					<view class="l-my-flex-bw">
						<view>现价</view>
						<view class="l-price-money">￥{{item.newPrice?item.newPrice:'0.00'}}</view>
					</view>
				</view>
				
				<!-- 列表项库存 -->
				<view class="l-type-item-price l-my-flex-bw">
					<view class="l-my-flex-bw">
						<view>库存</view>
						<view class="l-price-kucun">{{item.stock}}</view>
					</view>
				</view>
				<!-- 预览图 -->
				<view class="l-pic-prev">
					<view class="">
						<view class="l-pic-text">预览图</view>
						<view class="l-pic-upload" v-if="item.url" @tap="chooseImage">
							<image class="l-upload-photo" style="width: 123rpx;height:123rpx" :data-index="index" :src="item.url" mode=""></image>
						</view>
						<view class="l-pic-upload" v-if="!item.url">
							<view @tap="chooseImage"><image :data-index="index" src="../../static/l-upload.png" mode=""></image></view>
							<view @tap="chooseImage" class="" :data-index="index">上传图片</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 规格列表 -->
		<view class="u-demo-area">
			<u-popup border-radius="10" v-model="show" 
				mode="bottom"
				@close="close"
				length="auto" :mask="mask"
				:closeable="closeable"
				:close-icon-pos="closeIconPos"
			>
				<view class="l-popup">
					<!-- title -->
					<view class="l-my-flex-bw l-popup-title">
						<view class="l-popup-cancel" @tap="cancelSelect">取消</view>
						<view>添加商品规格</view>
						<view class="l-popup-confirm" @tap="comfirmSelect">确认</view>
					</view>
					<!-- 已选择选项数量 -->
					<view class="l-my-flex-start l-select-info">
						 <span class="l-select-title">已选</span>
						 <span class="l-select-sum">{{select_sum}}/2</span>
					</view>
					<!-- 选项 -->
					<view class="l-select-list l-my-flex-start" @longtap="long_select_item"  @tap="select_item">
						<view class="l-select-item l-select-del" 
									v-for="(item,index) of sizeList" 
									:data-id="item.id" :key="index" 
									:class="{'selectActive':active_index[0]==item.id||active_index[1]==item.id,'animated heartBeat delay-.5s':animate}"
							>
							{{item.size}} 
							<!-- 删除按钮 -->
							<view class="l-select-del-icon" v-if="del_rule_status" @tap="del_rule_item(index)"><image src="../../static/del.png" mode=""></image></view>
						</view>
							
							<!-- 自定义 -->
						<view class="l-select-item" @tap="set_custom" v-if="!set_customs">
							<view>自定义</view>
						</view>
						<view class="l-set-custom" v-if="set_customs">
							<input type="text" v-model="set_custom_val" :focus="setFocus" />
							<view @tap="set_rule_confirm">确定</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		
		<view class="zanwei"></view>
		<view class="confirm-bottom">	</view>
		<view class="confirm-up" @tap="save_rule">
			保存
		</view>
		<!-- 弹出框 -->
		<view>
				<u-toast ref="uToast" />
		</view>
		<!-- 批量设置 弹出框 -->
		<u-popup v-model="show_setting" mode="center" border-radius="14">
				<view class="l-setting">
					<view>批量设置价格及库存</view>
					<view class="l-setting-old-price l-my-flex-start">
						<view class="l-old-price">原价</view>
						<view class="l-old-price-value"><input type="text" v-model="l_setting_old_price" placeholder="￥0.00"/></view>
					</view>
					
					<view class="l-setting-old-price l-my-flex-start">
						<view class="l-old-price">现价</view>
						<view class="l-old-price-value"><input type="text" v-model="l_setting_new_price" placeholder="￥0.00"/></view>
					</view>
					
					<view class="l-setting-old-price l-my-flex-start">
						<view class="l-old-price">库存</view>
						<view class="l-old-price-value"><input type="text" v-model="l_setting_stock" placeholder="0"/></view>
					</view>
					<!-- confirm -->
					<view class="l-confirm">
						<view class="l-setting-confirm l-my-flex-bw">
							<view class="l-setting-cancel" @tap="l_setting_cancel">取消</view>
							<view class="l-setting-confirm" @tap="l_setting_confirm">确定</view>
						</view>
					</view>
					
				</view>
			</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				// 规格一
				addStatus0:false,
				list0:[],
				id0:"0",
				addValue0:"",
				// 规格二
				addStatus1:false,
				list1:[],
				id1:999,
				addValue1:"",
				// 规格弹出框
				show: false,
				mask: true, // 是否显示遮罩
				closeable: false,
				closeIconPos: 'top-right',
				// 总规格
				sizeList:[
					{
						id:1,
						size:"颜色"
					},
					{
						id:2,
						size:"尺寸"
					},
					{
						id:3,
						size:"布料"
					},
					{
						id:4,
						size:"材质"
					},
					{
						id:5,
						size:"口味"
					},
					{
						id:6,
						size:"容量"
					},
					{
						id:7,
						size:"款式"
					},
					{
						id:8,
						size:"功效"
					},
					{
						id:9,
						size:"重量"
					},
					{
						id:10,
						size:"时间"
					},
				],
				// 选中的ID
				active_index:[],
				select_sum:0,
				// 选中规格列表
				typeList:[],
				// 已选则总规格列表
				typeListInfo:[],
				// 混合规格id
				id2:1000,
				// 长按动画
				animate:false,
				// 批量设置按钮显/隐
				batch_setting:false,
				// 批量设置框显/隐
				show_setting:false,
				
				// 批量设置价格及库存
				l_setting_old_price:"",
				l_setting_new_price:"",
				l_setting_stock:"",
				
				// 自定义 规格名输入框
				set_customs:false,
				setFocus:false,
				set_custom_val:"",
				// 长按显示删除按钮 状态字段
				del_rule_status:false
				
			}
		},
		onLoad() {

		},
		methods: {
			save_rule(){
				if(this.typeListInfo[0].oldPrice){
					uni.setStorageSync('typeListInfo', JSON.stringify(this.typeListInfo));
					wx.navigateBack()
				}
				
			},
		  btnClick() {
				// this.animate = true
		  	this.show = true;
				this.select_sum = "0"
		  },
			// 关闭 选择规格 弹幕
			close() {
				this.set_custom_val=""
				this.setFocus= false;
				this.set_customs= false;
				this.del_rule_status = false
				this.active_index = []
			},
			open() {},
			addSize0(){
				this.addStatus0 = true
			},
			addSize1(){
				this.addStatus1 = true
			},
			// 规格一
			add0(e){
				this.addStatus0 = false
				if(!this.addValue0){
					this.$refs.uToast.show({
										title: '请输入正确规格',
										type: 'error',
									})
									return
				}
				for(var item of this.list0){
					if(item == this.addValue0){
						this.$refs.uToast.show({
											title: '已有相同规格',
											type: 'error',
										})
										this.addValue0=""
										return
					}
				}
				var obj = {}
				this.id0 =parseInt(this.id0)+1;
				
				obj.id = this.id0
				obj.size = this.addValue0
				obj.name = this.typeList[0].size
				this.list0.push(obj)
				
				this.addValue0=""
				this.setListInfo()
			},
			// 规格二
			add1(e){
				this.addStatus1 = false
				if(!this.addValue1){
					this.$refs.uToast.show({
										title: '请输入正确规格',
										type: 'error',
									})
									return
				}
				for(var item of this.list1){
					if(item == this.addValue1){
						this.$refs.uToast.show({
											title: '已有相同规格',
											type: 'error',
										})
										this.addValue1=""
										return
					}
				}
				var obj = {}
				this.id1 =parseInt(this.id1)-1;
				
				obj.id = this.id1
				obj.size = this.addValue1
				obj.name = this.typeList[1].size
				this.list1.push(obj)
				this.addValue1="",
				this.setListInfo()
			},
			// 列表处理
			setListInfo(){
				var arr = []
					console.log(this.list0)
				for(var item of this.list0){
					for(var idx of this.list1){
						var obj = {}
						this.id2 =parseInt(this.id2)+1;
						obj.id = this.id2;
						obj.size = item.size +"-"+idx.size;
						obj.url = "";
						obj.rule1 = item.name;
						obj.rule2 = idx.name;
						arr.push(obj)
					}
				}
				this.typeListInfo = arr;
				// console.log(this.typeListInfo)
				if(this.typeListInfo.length){
					this.batch_setting = true
				}else{
					this.batch_setting = false
				}
			},
			// 选择规格
			select_item(e){
				if(this.del_rule_status == true){
					return
				}
				var selectId = e.target.dataset.id;
				var active_arr = this.active_index;
				var lengths = this.active_index.length;
				if(!selectId){
					return
				}
				// 首选查找数组中是否 已有该类型   有的话直接移除
				var index = active_arr.indexOf(selectId)
				if(index != -1){
					var indexs = Math.abs(index-1);
					var new_active_arr = active_arr.splice(indexs,1)
					this.active_index = new_active_arr
					return
				}
				// 如果数组中没有该 类型 判断是否 已经选择两种类型
				if(lengths<=2){
					// console.log(index)
					if(index != -1){
						var indexs = Math.abs(index-1);
						var new_active_arr = active_arr.splice(indexs,1)
						this.active_index = new_active_arr
					}else{
						this.active_index.push(selectId)
					}
				}
				if(this.active_index.length>2){
					
				}else{
					this.select_sum=this.active_index.length
				}
			},
			chooseImage(e){
				console.log(e)
				var index = e.target.dataset.index
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
											console.log(obj.data.url)
											that.typeListInfo[index].url = obj.data.url
											console.log(that.typeListInfo)
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
			long_select_item(){
				this.animate = !this.animate
				this.del_rule_status = true
				this.active_index= []
				this.select_sum = 0
			},
			// 删除规格单项
			del0(e){
				var index = e.target.dataset.index
				this.list0.splice(index,1)
				this.setListInfo()
			},
			del1(e){
				var index = e.target.dataset.index
				this.list1.splice(index,1)
				this.setListInfo()
			},
			// 删除规格总类
			del_type0(){
				this.typeList.splice(0,1)
				this.list0 = []
				this.setListInfo()
			},
			del_type1(){
				this.typeList.splice(1,1)
				this.list0 = []
				this.setListInfo()
			},
			cancelSelect(){
				this.show = false
				this.active_index = []
			},
			comfirmSelect(){
				this.del_rule_status = false
				this.show = false;
				this.typeList =[]
				this.typeListInfo = []
				this.list0 =[]
				this.list1 =[]
				this.setFocus= false;
				this.set_customs= false;
				this.set_custom_val=""
				var typeList = []
				for(var item of this.active_index){
					for(var idx of this.sizeList){
						if(item == idx.id){
							typeList.push(idx)
						}
					}
				}
				this.typeList = typeList
				this.active_index = []
			},
			// 显示批量设置价格和库存
			setting(){
				this.show_setting = true
			},
			l_setting_confirm(){
				this.show_setting = false;
				// 订单 价格库存列表
				var arr = this.typeListInfo
				for(var item of arr){
					item.oldPrice = this.l_setting_old_price
					item.newPrice = this.l_setting_new_price
					item.stock = this.l_setting_stock
				}
				this.typeListInfo = arr;
				this.l_setting_cancel();
			},
			l_setting_cancel(){
				this.show_setting = false;
				this.l_setting_old_price="";
				this.l_setting_new_price="";
				this.l_setting_stock="";
			},
			// 自定义规格名
			set_custom(){
				this.set_customs= true;
				this.setFocus= true;
				this.del_rule_status = false
			},
			// 输入自定义规格名 确定
			set_rule_confirm(){
				this.setFocus= false;
				this.set_customs= false;
				if(this.set_custom_val){
					var lengths = this.sizeList.length
					var obj = {}
					if(this.sizeList.length){
						obj.id = parseInt(this.sizeList[lengths-1].id)+1;
					}else{
						obj.id = 0;
					}
					obj.size = this.set_custom_val;
					this.sizeList.push(obj)
					this.set_custom_val=""
				}else{
					this.$refs.uToast.show({
										title: '添加错误',
										type: 'warning'
									})
				}
			},
			// 删除 选择规格列表中的 项
			del_rule_item(index){
				this.sizeList.splice(index,1)
			},
		}
	}
</script>

<style>
.l-size{
	padding: 27.17rpx 26.27rpx;
	background: #FFFFFF;
	margin-top: 9rpx;
}
.l-size-title{
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(51,51,51,1);
	
}
.l-size-item{
	width:214.2rpx;
	height: 58rpx;
	background:rgba(248,248,248,1);
	border-radius:7px;
	padding: 0 18.12rpx;
	margin-top: 25.3rpx;
	margin-right:18.12rpx ;
	font-size:24rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
}
.l-size-item input{
	font-size: 27rpx;
}
.l-size-item image{
	width: 22.64rpx;
	height: 22.64rpx;
}
.l-add-size{
	padding: 27rpx 25rpx;
	margin-top: 9rpx;
	background: #FFFFFF;
}
.l-add-size>view{
	width: 100%;
	height: 58rpx;
	background:rgba(248,248,248,1);
	border-radius:7px;
}
.l-popup{
	width: 100%;
	padding: 36rpx 27rpx 80rpx 27rpx;
}
.l-popup-title{
	padding-bottom: 16rpx;
	border-bottom: 2rpx solid rgba(238,238,238,1);
}
.l-popup-cancel{
	font-size: 27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,182,1);
}
.l-popup-confirm{
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(233,51,64,1);
}
.l-select-info{
	margin-top: 18rpx;
}
.l-select-title{
	font-size:22rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,182,1);
}
.l-select-sum{
	font-size:26rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:#333333;
}
.l-select-item{
	position: relative;
	width: 212rpx;
	height: 58rpx;
	line-height: 58rpx;
	margin:20rpx 20rpx 0 0 ;
	background:rgba(248,248,248,1);
	border-radius:7rpx;
	font-size:24rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	transition: all .3s;
}
.l-select-del{
	position: relative;
}
.l-select-del-icon{
	position: absolute;
	top: -16rpx;
	right: -14rpx;
}
.l-select-del-icon image{
	width: 32rpx;
	height: 32rpx;
}
.l-select-item input{
	height: 58rpx;
	font-size: 27rpx;
}
.l-kayboard-input{
	position: absolute;
	background: #FFFFFF;
	z-index: 10;
	width: 750rpx;
	height: 90rpx;
	left: -258rpx;
	bottom: 0;
}
.selectActive{
	color: #FFFFFF;
	background:rgba(215,185,117,1);
	font-size: 27rpx;
}
.l-price{
	padding: 27rpx 26rpx;
	background: #FFFFFF;
	margin-top: 18rpx;
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(51,51,51,1);
}
.l-type-list{
	/* margin-top: 9rpx; */
}
.l-type-item{
	padding: 27rpx 26rpx;
	background: #FFFFFF;
	margin-top: 9rpx;
}
.l-type-item-title{
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	padding-bottom: 27rpx;
	border-bottom: 2rpx solid rgba(237,237,237,1);
}
.l-type-item-price{
	padding:27rpx 0;
	border-bottom: 2rpx solid rgba(237,237,237,1);
}
.l-type-item-price>view{
	width: 50%;
	padding-right: 0rpx;
}
.l-price-money{
	width: 220rpx;
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,181,1);
}
.l-price-kucun{
	width: 220rpx;
}
.l-pic-prev{
	padding-top: 26rpx;
}
.l-pic-prev>view{
	display: flex;
	justify-content: flex-start;
}
.l-pic-text{
	padding-right: 29rpx;
}
.l-pic-upload{
	width: 123rpx;
	height: 123rpx;
	border:2rpx dashed rgba(177,177,181,1);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.l-pic-upload>view{
	font-size:21rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,181,1);
}
.l-pic-upload image{
	width: 48rpx;
	height: 38rpx;
}
/* 底部按钮 */
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
	height: 143rpx;
	background-color:  rgba(248,248,248,1);
}
.l-batch-setting{
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(215,185,117,1);
}
.l-setting{
	position: relative;
	width: 507rpx;
	height: 476rpx;
	text-align: center;
	padding: 27rpx 45rpx 0 45rpx;
	box-sizing: border-box;
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
}
.l-setting-old-price{
	height: 97rpx;
	border-bottom: 2rpx solid rgba(238,238,238,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}
.l-old-price{
	padding-right: 43rpx;
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
}
.l-old-price-value{}
.l-old-price-value input{
	text-align: left;
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,182,1);
	height: 97rpx;
	width: 230rpx;
}
.l-confirm{
	position: absolute;
	left: 0;
	width: 100%;
	bottom: 0;
}
.l-setting-confirm{
	height: 90rpx;
	border-top: 2rpx solid rgba(238,238,238,1);
}
.l-setting-confirm>view{
	width: 50%;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	border-right: 2rpx solid rgba(238,238,238,1);
}
.l-setting-cancel{
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(177,177,182,1);
}
.l-setting-confirm{
	font-size:27rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(215,185,117,1);
}
.l-upload-photo{
	width: 123rpx;
	height: 123rpx;
}
.l-add-rule-confirm{
	width: 100%;
	height: 80rpx;
	font-size: 30rpx;
	color: #FFFFFF;
	line-height: 80rpx;
	/* margin */
	background-color: rgba(215,185,117,1);
}
.l-set-custom{
	width: 100%;
	height: 98rpx;
	padding: 26rpx;
	background: #FFFFFF;
	padding-top: 9rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 2rpx solid rgba(238,238,238,1);
	margin-top: 20rpx;
}
.l-set-custom>view{
	color: rgba(215,185,117,1);
	font-size: 27rpx;
	
}
.l-set-custom input{
	text-align: left;
	height: 98rpx;
	font-size: 26rpx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
}
</style>
