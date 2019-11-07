//selectList.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authorization: wx.getStorageSync('authorization'),
    avatarUrl:'',
    city:'',
    nickName:'',
    country:'',
    province:''
  },
  onLoad: function () {
    let that = this;
    wx.getSetting({//判断是否授权
      success(res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getSystemInfo({//获取设备方法
            success(res) {
              console.log(res.model);
              console.log(res.pixelRatio);
              console.log(res.windowWidth);
              console.log(res.windowHeight);
              console.log(res.language);
              console.log(res.version);
              console.log(res.platform)
            }
          });
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo);
              that.setData({
                avatarUrl:res.userInfo.avatarUrl,
                nickName:res.userInfo.nickName,
                city:res.userInfo.city,
                province:res.userInfo.province,
                country:res.userInfo.country,
              })
            }
          })
        }
      }
    });
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
})
