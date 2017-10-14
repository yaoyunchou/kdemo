// pages/goodsDetail/goodsDetail.js
const prizeUrl = require('../../config').prizeUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
      prize:null,
      id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    console.log("-------"+id)
    this.getPrize(id)


  
  },

  //兑换
  formBindsubmit:function(e){
    console.log(e.detail.formId);
    var  that = this;
    var goodsId = that.data.prize.id;
    var openId = wx.getStorageSync('openid')
    if (openId == '') {
      app.getUserInfo();
      openId = wx.getStorageSync('openid')

    }

    wx.request({
      url: prizeUrl + "/duihuan", //
      method:'GET',
      data: {
         'openId': openId,
         'goodsId': goodsId,
         'formId': e.detail.formId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var json = JSON.parse(res.data.body)
        var isSuc = json.isSuccess;
        if (isSuc){
          wx.showToast({
            title: json.data,
            icon: 'success',
            duration: 1000,
            mask: true
          })
          //页面跳转
          wx.navigateTo({
            url: '../duihuan/duihuan'
          })
        }else{
          wx.showToast({
            title: json.data,
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }

   
       
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
  getPrize: function (id) {
    var that = this;
    wx.request({
      url: prizeUrl + "/"+ id, //
      data: {
       
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var json = res.data;
        console.log("res=="+json)
        that.setData({
          prize: json.body
        })

      }
    })
  }
})