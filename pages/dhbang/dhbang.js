// pages/dhbang/dhbang.js
// pages/dhDetail/dhDetail.js
const exchangeDetailUrl = require('../../config').exchangeDetailUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dhList:null
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
    this.dhList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.dhList();
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
  dhList: function () {

    var that = this;
    var openId = wx.getStorageSync('openid')
    wx.request({
      url: exchangeDetailUrl + "/page",
      data: {
       
      },
      success: function (res) {
        var json = res.data.rows;
        that.setData({
          dhList: json
        })

      }
    })



  }
})