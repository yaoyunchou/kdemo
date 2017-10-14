// pages/coreDetail/coreDetail.js
const coreDetailUrl = require('../../config').coreDetailUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myCore();
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
    this.myCore();
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
   * 我的积分
   */
  myCore: function () {

    var that = this;
    var openId = wx.getStorageSync('openid')
    wx.request({
      url: coreDetailUrl + "/myCore",
      data: {
        "openId": openId
      },
      success: function (res) {
        var json = res.data.rows
        that.setData({
          listData: json
        })

      }
    })



  }
})