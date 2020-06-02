<template>
	<view class="u-demo">
		
		<view class="u-demo-wrap">
			<view class="u-demo-title">商品信息</view>
			<u-cell-group>
				<u-field
					v-model="goodsName"
					label="品名"
					placeholder="请填写商品名字"
				>
				</u-field>
				<u-field
					v-model="goodsCode"
					label="货号"
					placeholder="请填写货号"
				>
				</u-field>
			</u-cell-group>
			<view class="u-demo-title">商品图片</view>
			<view class="u-demo-area">
				<u-top-tips ref="uTips"></u-top-tips>
				<u-toast ref="uToast"></u-toast>
				<view class="pre-box" v-if="!showUploadList">
					<view class="pre-item" v-for="(item, index) in lists" :key="index">
						<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
						<view class="u-delete-icon" @tap.stop="deleteItem(index)">
							<u-icon name="close" size="20" color="#ffffff"></u-icon>
						</view>
						<u-line-progress v-if="item.progress > 0 && !item.error" :show-percent="false" height="16" class="u-progress"
						 :percent="item.progress"></u-line-progress>
					</view>
				</view>
				<u-upload ref="uUpload" :form-data="uploadData" :custom-btn="customBtn" :show-upload-list="showUploadList" :action="action" :auto-upload="autoUpload" :file-list="fileList"
				 :show-progress="showProgress" @on-success="fileSuccessUpload" @on-error="fileFaildUpload" :deletable="deletable" :max-count="maxCount" @on-list-change="onListChange">
					<view v-if="customBtn" slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
				
				<!-- <u-button :custom-style="{marginTop: '40rpx'}" @click="reUpload">重新上传</u-button> -->
			</view>
		</view>
		<view class="u-demo-wrap u-m-t-20">
			<u-table>
				<u-tr>
					<u-th>单品</u-th>
					<u-th v-if="allSpecValue.length>1">规格</u-th>
					<u-th>库存</u-th>
					<u-th>单价</u-th>
				</u-tr>
				
				<view class="u-flexc" v-for="(items, key) in allSpecValue" :key="key" >
					<view class="u-flex"  v-if="items.length == 3">
						<u-th >{{items[0]}}</u-th>
						<u-th ><input  type="number" v-model="items[1]" /></u-th>
						<u-th ><input  type="digit" v-model="items[2]" /></u-th>
						
						
					</view>
					<view class="u-flex"  v-else>
						<u-th >{{items[0]}}</u-th>
						<u-th >{{items[1]}}</u-th>
						<u-th ><input type="number" v-model="items[2]" /></u-th>
						<u-th ><input type="digit" v-model="items[3]" /></u-th>
						
					</view>
				</view>
				
			</u-table>
			
			<view class="u-config-title ">
				
				<u-button size="mini u-m-l-20 " type="success" @click="addSpec" >点我添加一个规格</u-button>
				<u-button size="mini u-m-l-20 " type="warning" @click="addSpecDeault" >我不想添加规格</u-button>
			</view>
			
		<!-- 	<view v-for="(item, index) in specList" :key="index">
				<u-section  :title="item.specName" sub-title=""></u-section>
			</view> -->
			
			<view class="u-flex " v-if="showSpec">
			<u-field
				v-model="newSpecName"
				label="规格名"
				placeholder="如颜色,尺寸"
			
			>
			</u-field>
			<u-button size="mini u-m-l-20 " type="success" v-if="!showSpecValue" @click="confirmSpec">确定</u-button>
			</view>
			<view class="u-flex " v-if="showSpecValue">
			<u-field
				v-model="newSpecValue"
				label="规格值"
				placeholder="X,XL,XXL"
			>
			</u-field>
			<u-button size="mini u-m-l-20 " type="success" @click="confirmSpecValue">确定</u-button>
			</view>
			
		</view>
		<view class=" u-m-t-20">
			<u-button :custom-style="{marginTop: '20rpx'}" :disabled="updating" @click="upload">上传</u-button>
			<u-button :custom-style="{marginTop: '40rpx'}" @click="clear">清空列表</u-button>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				updating:false,
				action: 'https://img1.starfox.cn:9001/livefs/upload',
				// 预置上传列表
				fileList: [],
				uploadData:{
					"scene": "zhyaliu",
				},
				showUploadList: true,
				customBtn: false,
				autoUpload: true,
				showProgress: true,
				deletable: true,
				customStyle: false,
				maxCount: 3,
				lists: [], // 组件内部的文件列表
				duration: 3000,
				title: '忽如一夜春风来，千树万树梨花开',
				goodsCode: '',
				goodsName: '',
				type: 'primary',
				newSpecName:'',
				newSpecValue:'',
				specList:[],
				allSpecValue:[],
				allSpec:[],
				showSpec:false,
				showSpecValue:false,
				goodsImages:[],
				skuList:[]
			}
		},
		onLoad:function(){
			// this.showTips()
		},
		methods: {
			addSpecDeault(){
				this.allSpec.push('默认')
				this.allSpecValue = [['默认',100,1]];
				this.showSpec = false
				this.showSpecValue = false
			},
			fileSuccessUpload(e){
				console.log(e)
				this.goodsImages.push(e)
			},
			fileFaildUpload(e){
				console.log(e)
			},
			updateSpec(){
				function descartes(array){
				    if( array.length < 2 ) return array[0] || [];
				
				    return [].reduce.call(array, function(col, set) {
				        var res = [];
				        col.forEach(function(c) {
				            set.forEach(function(s) {
				                var t = [].concat( Array.isArray(c) ? c : [c] );
				                t.push(s);
				                t.push(0);
				                t.push(0);
				                res.push(t);
				        })});
				        return res;
				    });
				}
				
				
				this.allSpecValue = []
				if(this.specList.length == 0){
					
				}else if(this.specList.length == 1){
					this.allSpecValue = this.specList[0].specValue
					var res = [];
					
					this.allSpecValue.forEach(function(s) {
					        var t = [];
					        t.push(s);
					        t.push(0);
					        t.push(0);
					        res.push(t);
					});
					this.allSpecValue = res;
					
				}else if(this.specList.length == 2){
					this.allSpecValue =  descartes([this.specList[0].specValue,this.specList[1].specValue])
				}
				
			},
			confirmSpec(){
				// this.showSpec = false
				this.allSpec.push(this.newSpecName)
				this.title = '商品的规格值用空格或者英文逗号分隔如：x,xl,xxl xs'
				this.showTips()
				this.showSpecValue = true
			},
			confirmSpecValue(){
				var newa = this.newSpecValue.replace(/\s+/g, ",");
				var newas = newa.replace(/，+/g, ",").split(',');
				this.showSpec = false
				var realv = []
				
				for(var i in newas){
					if(newas[i] && newas[i].length >0)
					realv.push(newas[i])
				}
				this.specList.push({
					specName:this.newSpecName,
					specValue:realv,
					show:true
				})
				this.updateSpec()
				this.showSpecValue = false
				this.newSpecValue = ''
				this.newSpecName = ''
			},
			addSpec(){
				this.showSpec = true
			},
			addSpecValue(){
				this.showSpecValue = true
			},
			showTips() {
				this.$refs.uTips.show({
					duration: this.duration,
					title: this.title,
					type: this.type
				});
			},
			reUpload() {
				this.$refs.uUpload.reUpload();
			},
			clear() {
				this.allSpecValue =[]
				this.$refs.uUpload.clear();
			},
			autoUploadChange(index) {
				this.autoUpload = index == 0 ? true : false;
			},
			controlChange(index) {
				if(index == 0) {
					this.showProgress = true;
					this.deletable = true;
				} else {
					this.showProgress = false;
					this.deletable = false;
				}
			},
			maxCountChange(index) {
				this.maxCount = index == 0 ? 1 : index == 1 ? 2 : 4;
			},
			customStyleChange(index) {
				if (index == 0) {
					this.showUploadList = false;
					this.customBtn = true;
					
				} else {
					this.showUploadList = true;
					this.customBtn = false;
				}
			},
			upload() {
				
				if(this.allSpecValue.length == 0){
					this.addSpecDeault()
				}
				if(this.goodsName.length <=0){
					this.title = '请填写品名'
					this.showTips()
					return;
				}
				if(this.goodsImages.length <1){
					this.title = '至少一张图片'
					this.showTips()
					return;
				}
				var that = this;
				function getValueId(i,specValue){
					for(var k in that.specList[i].specValue){
						var e = that.specList[i].specValue[k]
						if(e === specValue) return parseInt(k)
						
					}
					return 0 
				}
				this.updating = true
				var skuList = []
				var baseid = this.$u.random(0, 9999);
				var basevalueid = this.$u.random(0, 9999);
				var basevalue2id = this.$u.random(0, 9999);
				for(var k in this.allSpecValue){
					var e = this.allSpecValue[k]
					console.log(e)
					console.log(this.allSpecValue)
					if(e.length == 3){
						var t = {
						  "code": "100",
						  "create_time": 0,
						  "delete_time": 0,
						  "goods_id": 0,
						  "group_sale_num": 0,
						  "id": 0,
						  "img": this.goodsImages[k],
						  "open_id": 3,
						  "price": parseFloat(e[2]),
						  "sale_num": 0,
						  "spec": [
							
						    {
						      "id": parseInt(baseid),
						      "name": this.allSpec[0],
						      "value_id": parseInt(basevalueid)+parseInt(k),
						      "value_img": "",
						      "value_name": e[0]
						    }
							
						  ],
						  "spec_sign": "string",
						  "spec_value_sign": "string",
						  "stock": parseInt(e[1]),
						  "title": "string",
						  "update_time": 0,
						  "weight": 0
						}
						skuList.push(t)
					}else if(e.length == 4){
						var t = {
						  "code": "100",
						  "create_time": 0,
						  "delete_time": 0,
						  "goods_id": 0,
						  "group_sale_num": 0,
						  "id": 0,
						  "img": this.goodsImages[k],
						  "open_id": 3,
						  "price": parseFloat(e[2]),
						  "sale_num": 0,
						  "spec": [
							
						    {
						      "id": parseInt(baseid),
						      "name": this.allSpec[0],
						      "value_id": parseInt(basevalueid)+getValueId(0,e[0]),
						      "value_img": "",
						      "value_name": e[0]
						    },
						    {
						      "id": parseInt(baseid)+1,
						      "name": this.allSpec[1],
						      "value_id": parseInt(basevalue2id)+getValueId(1,e[1]),
						      "value_img": "",
						      "value_name": e[1]
						    }
							
						  ],
						  "spec_sign": "string",
						  "spec_value_sign": "string",
						  "stock": parseInt(e[1]),
						  "title": "string",
						  "update_time": 0,
						  "weight": 0
						}
						skuList.push(t)
					}
				}
				var gd = {
				  "category_ids": [
				    "[6]"
				  ],
				  "shop_id": this.tui.userInfo().shop_id,
				  "skus": skuList,
				  "title": this.goodsName,
				  "images": this.goodsImages,
				}

				
				console.log(gd)
				console.log(this.allSpecValue)
				
				this.tui.p("/goods/add",gd,1).then((res) => {
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
			},
			deleteItem(index) {
				this.$refs.uUpload.remove(index);
			},
			onOversize(file, lists) {
				// console.log('onOversize', file, lists);
			},
			onPreview(url, lists) {
				// console.log('onPreview', url, lists);
			},
			onRemove(index, lists) {
				// console.log('onRemove', index, lists);
			},
			onSuccess(data, index, lists) {
				// console.log('onSuccess', data, index, lists);
			},
			onChange(res, index, lists) {
				// console.log('onChange', res, index, lists);
			},
			error(res, index, lists) {
				// console.log('onError', res, index, lists);
			},
			onProgress(res, index, lists) {
				// console.log('onProgress', res, index, lists);
			},
			onUploaded(lists) {
				// console.log('onUploaded', lists);
			},
			onListChange(lists) {
				// console.log('onListChange', lists);
				this.lists = lists;
			}
		}
	}
</script>

<style lang="scss">
	.u-demo-title,
	.u-config-title {
	  text-align: left;
	  font-size: 32rpx;
	  font-weight: bold;
	  margin-bottom: 40rpx;
	}
	.u-demo-wrap {
		background-color: #FFFFFF;
		padding: 40rpx 8rpx;
		margin-left: -14rpx;
		margin-right: -14rpx;
	}
	
	.u-add-wrap {
		flex-direction: column;
		color: $u-content-color;
		font-size: 28rpx;
	}
	
	/deep/ .slot-btn {
		width: 329rpx;
		height: 140rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}

	.pre-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.pre-item {
		flex: 0 0 48.5%;
		border-radius: 10rpx;
		height: 140rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
	}

	.u-progress {
		position: absolute;
		bottom: 10rpx;
		left: 8rpx;
		right: 8rpx;
		z-index: 9;
		width: auto;
	}

	.pre-item-image {
		width: 100%;
		height: 140rpx;
	}

	.u-delete-icon {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 10;
		background-color: $u-type-error;
		border-radius: 100rpx;
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
