// pages/personInfo/personInfo.js
const fancUrl = require('../../config').fancUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()

  },
  formBindsubmit: function (e) {
    var mobile = e.detail.value.mobile;
    var addr = e.detail.value.addr;
    var qq = e.detail.value.qq;
    var openId = wx.getStorageSync('openid')
    var that = this
    wx.request({
      url: fancUrl + '/updateFanc',
      data: {
        'openId': openId,
        'qq':qq,
        'addr':addr,
        'mobile':mobile
      },
      method:'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo: res.data
        })
        wx.showToast({
          title: '修改成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      },fail:function(){
        wx.showToast({
          title: '修改失败',
          icon: 'fail',
          duration: 1000,
          mask: true
        })
      }
    })
   

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getUserInfo: function () {
    var openId = wx.getStorageSync('openid')
    var that = this
    wx.request({
      url: fancUrl + '/getByOpenId',
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo: res.data
        })
       

      }
    })



  }
})