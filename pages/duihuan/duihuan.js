// pages/duihuan/duihuan.js
const exchangeDetailUrl = require('../../config').exchangeDetailUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
  getList: function () {
    var that = this;
    var openId = wx.getStorageSync('openid')
    wx.request({
      url: exchangeDetailUrl + "/list", //
      data: {
        'openid':openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var json = res.data;
        console.log("res==" + json)
        that.setData({
          dataList: json.body
        })

      }
    })
  },
  
  openAlert: function () {
    wx.showModal({
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }

})