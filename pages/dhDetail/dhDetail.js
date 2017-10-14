// pages/dhDetail/dhDetail.js
const exchangeDetailUrl = require('../../config').exchangeDetailUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
      model:null,
      tapId:'dhDetail'
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      var id = options.id;
      this.getInfo(id);
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
  getInfo: function (id) {
    var that = this;
    var openId = wx.getStorageSync('openid')
    wx.request({
      url: exchangeDetailUrl + "/"+id, 
      success: function (res) {
        var json = res.data;
        that.setData({
          model: json.body
        })

      }
    })
  }
  ,
  fuzhi: function () {
    var content = this.data.model.content;

    wx.setClipboardData({
      data: content,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    })


  }
})