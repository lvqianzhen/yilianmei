//app.js
let app = getApp();
let util = require('utils/util.js');
// 请求数据时的loading方法封装
wx.topLoading = function (type) {
  if (type == 'close') {
    wx.hideNavigationBarLoading();
  } else {
    wx.showNavigationBarLoading();
  }
};

wx.loading = function (param) {
  if (param == 'close') {
    wx.hideLoading();
  } else {
    wx.showLoading({
      mask: true,
      title: param ? param.title : ''
    });
  }
};

App({
  globalData: {
    userInfo: null,
    systemInfo:null,
    mediaHeight:'',
    screenHeight:'',

    accessToken:'',
    userName:'',
    avatarUrl:'',
    gender:''
  },
  onLaunch: function () {
    let that = this;
    // 获取设备高度
    wx.getSystemInfo({
      success:res=> {
        that.globalData.systemInfo = res;
        that.globalData.mediaHeight = res.windowHeight;
        that.globalData.screenHeight = res.windowHeight
      }
    });
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 获取用户信息
    wx.getSetting({
      success: function (res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          that.globalData.accessToken = wx.getStorageSync('accessToken');
          that.globalData.gender = wx.getStorageSync('gender');
          that.globalData.userName = wx.getStorageSync('userName');
          that.globalData.avatarUrl = wx.getStorageSync('avatarUrl');
        }else{
          wx.removeStorageSync('userName');
          wx.removeStorageSync('avatarUrl');
          wx.removeStorageSync('gender');
          wx.removeStorageSync('accessToken');
        }
      }
    })
  }
});
