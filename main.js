import Vue from 'vue'
import App from './App'
// main.js
import store from '@/store';
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const tui = {
	toast: function(text, duration, success) {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	constNum: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android" ? 300 : 0;
	},
	px: function(num) {
		return uni.upx2px(num) + 'px';
	},
	interfaceUrl: function() {
		//接口地址
		return "https://mp.starfox.cn:9004/api/master";
	},
	ainterfaceUrl: function() {
		//接口地址
		return "https://mp.starfox.cn:9006/admin";
	},
	p: function(url, postData, admin) {
		
	
		//接口请求
		this.isLogin();
		var realUrl = this.interfaceUrl() + url
		if (admin) {
			realUrl = this.ainterfaceUrl() + url
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: realUrl,
				data: postData,
				header: {
					'content-type': 'application/json',
					'access-token': this.getToken(),
					'security': 1
				},
				method: 'POST', //'GET','POST'
				dataType: 'json',
				success: (res) => {
					resolve(res.data)
				},
				fail: (res) => {
					this.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	tryLogin: function() {
		var t = this;
		//接口请求
		return new Promise((resolve, reject) => {
			wx.checkSession({
			  success: function(){
				resolve("res.data");
				//session_key 未过期，并且在本生命周期一直有效，直接发送加密字段
				 console.log("checkSession.success")
			  },
			  fail: function(){
				wx.removeStorageSync("userInfo");
				wx.removeStorageSync("access_token");
				wx.login({
					success: res => {
						// 发送 res.code 到后台换取 openId, sessionKey, unionId
						t.code = res.code;
						uni.request({
							method: 'POST',
							url: t.interfaceUrl() + '/pub/login',
							data: {
								wechat_mini_code: res.code
							},
							dataType: 'json',
							success: (res) => {
								//用户不存在
								if (res.data.code == 20001) {
									uni.navigateTo({
										url: "/pages/login/login"
									})
									reject(res.data)
									return
								}
								
								res.data.result && t.setToken(res.data.result.access_token)
								// getApp().globalData.userInfo = res.data.result
								uni.setStorageSync("userInfo", JSON.stringify(res.data.result))
								resolve(res.data);
								console.log(res.data)
							},
							fail: (res) => {
								this.toast("网络不给力，请稍后再试~")
								reject(res)
							}
				
						})
				
					}
				})
				// session_key 已经失效，需要重新执行登录流程
				console.log("checkSession.fail")//重新登录
			
			  }
			})
			
			
		})
	},
	g: function(url, postData,admin) {
		var realUrl = this.interfaceUrl() + url
		if (admin) {
			realUrl = this.ainterfaceUrl() + url
		}
		//接口请求
		return new Promise((resolve, reject) => {
			uni.request({
				url: realUrl,
				data: postData,
				header: {
					'content-type': 'application/json',
					'access-token': this.getToken(),
					'security': 1
				},
				method: 'GET', //'GET','POST'
				dataType: 'json',
				success: (res) => {
					resolve(res.data)
				},
				fail: (res) => {
					this.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	fmoney:function fmoney(s, n) {
		/*
		 * 参数说明：
		 * s：要格式化的数字
		 * n：保留几位小数
		 * */
		var n = n > 0 && n <= 20 ? n : 2;
		var s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(),
			r = s.split(".")[1];
		var t = "";
		for (var i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r;
	},
	uploadFile: function(src) {
		const that = this
		uni.showLoading({
			title: '请稍候...'
		})
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: 'https://abc.cc',
				filePath: src,
				name: 'file',
				header: {
					'content-type': 'multipart/form-data'
				},
				formData: {},
				success: function(res) {
					uni.hideLoading()
					let d = JSON.parse(res.data)
					if (d.code === 1) {
						let fileObj = JSON.parse(d.data)[0];
						//文件上传成功后把图片路径数据提交到服务器，数据提交成功后，再进行下张图片的上传
						resolve(fileObj)
					} else {
						that.toast(res.message);
					}
				},
				fail: function(res) {
					reject(res)
					uni.hideLoading();
					that.toast(res.message);
				}
			})
		})
	},
	pay: function(sn) {
		var data = {
			"order_id": 0,
			"order_sn": sn
		}
		this.p("/unipay/prePayOrder", data).then((res) => {

			if (res.code == 0) {
				let paymentData = res.result;
				uni.requestPayment({
					timeStamp: paymentData.timeStamp,
					nonceStr: paymentData.nonceStr,
					package: paymentData.package,
					signType: 'MD5',
					paySign: paymentData.paySign,
					success: (res) => {
						uni.showToast({
							title: "交易成功!"
						})
						uni.navigateBack({

						})
					},
					fail: (res) => {
						uni.showToast({
							title: "订单生成失败",
							icon: "faild"
						});
					},
					complete: () => {
						this.loading = false;
					}
				})
			}
		}).catch((res) => {
			console.log(res);
		})
	},
	setToken: function(token) {
		uni.setStorageSync("access_token", token)
	},
	getToken() {
		return uni.getStorageSync("access_token")
	},
	isLogin: function() {
		var t = this;
		var getToken = function() {
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					t.code = res.code;
					uni.request({
						method: 'POST',
						url: t.interfaceUrl() + '/pub/login',
						data: {
							wechat_mini_code: res.code
						},
						dataType: 'json',
						success: (res) => {
							//用户不存在
							if (res.data.code == 20001) {
								uni.navigateTo({
									url: "/pages/login/login"
								})
								return
							}
							console.log(res.data)
							
							res.data.result && t.setToken(res.data.result.access_token)
							// getApp().globalData.userInfo = res.data.result
							uni.setStorageSync("userInfo", JSON.stringify(res.data.result))
						},
						fail: (res) => {
							this.toast("网络不给力，请稍后再试~")
							reject(res)
						}

					})

				}
			})
		}
		if (!uni.getStorageSync("access_token")) {
			getToken();
		}
	},
	webURL: function() {
		return "https://mp.starfox.cn"
	},
	imgURL: function() {
		return "https://img1.starfox.cn:9002"
	},
	userInfo: function() {
		var j = uni.getStorageSync("userInfo");
		if (!j) return false
		return JSON.parse(j)
	},
	registermp: function() {
		var t = this;
		wx.getUserInfo({
			success: res => {
				// 发送 

				var pshop_id = wx.getStorageSync("parent_shop_id");
				if (pshop_id) {
					pshop_id = parseInt(pshop_id)
				}
				wx.request({
					url: t.interfaceUrl() + '/pub/register',
					method: 'POST',
					data: {
						register_type: "miniapp",
						parent_shop_id: pshop_id || 0,
						wechat_mini_param: {
							code: t.code,
							iv: res.iv,
							raw_data: res.rawData,
							encrypted_data: res.encryptedData,
							signature: res.signature,
						}

					},
					success: (res) => {
						//用户不存在
						t.isLogin();

						console.log(res.data)
						// t.setToken(res.data.result.access_token)
						// getApp().globalData.userInfo = res.data.result
						// uni.setStorageSync("userInfo", JSON.stringify(res.data.result))
						//注册全局变量，返回过去
						var pages = getCurrentPages();
						console.log(pages)
						var currPage = pages[pages.length - 1]; //当前页面
						var prevPage = pages[pages.length - 2]; //上一个页面
						console.log(currPage)
						console.log(prevPage)
						if (prevPage && prevPage.route == "pages/center/index") {
							uni.switchTab({
								url: "/pages/index/index"
							})
						} else {
							uni.navigateBack({

							})
						}

					},
					fail: (res) => {
						this.toast("网络不给力，请稍后再试~")
						reject(res)
					}
				})

			}
		})

	}

}

Vue.prototype.tui = tui
const app = new Vue({
	store,
	...App
})
app.parent_shop_id = 0
app.$mount()
