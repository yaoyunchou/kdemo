// pages/word/word.js
const wordUrl = require('../../config').wordUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initData:'',
    wordList:null,
    openid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log('reload')
    
      this.getList();
      var openId = wx.getStorageSync('openid')
      this.setData({
        openid: openId
      })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      initData: ''
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('xianshi')
    
    var openId = wx.getStorageSync('openid')
    this.setData({
      openid:openId
    })
  
    this.getList();
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
          console.log('shangla')
  },
  formBindsubmit: function (e) {
    var openId = wx.getStorageSync('openid')
    var userInfo = wx.getStorageSync('userInfo')

    var word = e.detail.value.word;
    if (word.length==0){
      wx.showToast({
        title: '你他娘的耍我？',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return;
    }
    wx.showToast({
      title: '请求中...',
      icon: 'loading',
      duration: 10000
    })

    console.log(word)
    var that = this
    wx.request({
      url: wordUrl + '/addWord',
      data: {
        'openid': openId,
        'content': word,
        'nickName': userInfo.nickName,
        'headImage': userInfo.avatarUrl,
        'formId': e.detail.formId
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '留言成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        that.setData({
          initData:''
        })

        that.getList();

      }, 
      fail: function () {
        wx.showToast({
          title: '留言失败',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
      }
    })



  },
  getList:function(){
    
    var that = this
    wx.request({
      url: wordUrl + '/page',
      data: {

      },
      success: function (res) {
        console.log(res)
        var json = res.data.rows;
        that.setData({
          wordList: json
        })

      },
      fail: function () {
    
      }
    })

  } , //留言回复
  hFsubmit: function (e) {
    var id = e.detail.value.id;
    var word = e.detail.value.replyContent;



    console.log(word)
    var that = this
    wx.request({
      url: wordUrl + '/hfWord',
      data: {
        'id': id,
        'replyContent': word,
        'formId': e.detail.formId
      },
      method: 'PUT',
      success: function (res) {
        wx.showToast({
          title: '留言成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        that.getList();
      },
      fail: function () {
        wx.showToast({
          title: '留言失败',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
      }
    })



  }
})