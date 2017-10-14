// pages/member/member.js
const fancUrl = require('../../config').fancUrl

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
    this.myMember();
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
   * 我的会员
   */
  myMember: function () {
    
    var that = this;
    var openId = wx.getStorageSync('openid')
    wx.request({
      url: fancUrl + "/getMyMember",
      data: {
        "openId": openId
      },
      success: function (res) {
        var json = res.data.body
        that.setData({
          listData:json
        })

      }
    })



  }
})