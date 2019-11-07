// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    accessToken:'',
    userName:'',
    avatarUrl:'',
    gender:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      accessToken:wx.getStorageSync('accessToken'),
      userName:wx.getStorageSync('userName'),
      gender:wx.getStorageSync('gender')?'帅哥':'美女',
      avatarUrl:wx.getStorageSync('avatarUrl'),
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindGetUserInfo: function (e) {
    console.log(e);
    if (e.detail.userInfo) {
      wx.setStorageSync('userName',e.detail.userInfo.nickName);
      wx.setStorageSync('accessToken',e.detail.iv);
      wx.setStorageSync('avatarUrl',e.detail.userInfo.avatarUrl);
      wx.setStorageSync('gender',e.detail.userInfo.gender);
      this.setData({
        userName:wx.getStorageSync('userName'),
        avatarUrl:wx.getStorageSync('avatarUrl'),
        accessToken:wx.getStorageSync('accessToken'),
        gender:wx.getStorageSync('gender')?'帅哥':'美女'
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title:'警告',
        content:'您点击了拒绝授权，将无法正常使用小程序，请授权之后再进入!!!',
        showCancel:false,
        confirmText:'返回登录',
        success:function(res){
          if (res.confirm) {

          }
        }
      })
    }
  },
})
