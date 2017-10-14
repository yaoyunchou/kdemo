//index.js
const prizeListUrl = require('../../config').prizeListUrl
const fancUrl = require('../../config').fancUrl
const signUrl = require('../../config').signUrl
const openIdUrl = require('../../config').openIdUrl
var WxParse = require('../../wxParse/wxParse.js');
const adMsgUrl = require('../../config').adMsgUrl;
const lucklyUrl = require('../../config').lucklyUrl;
const navs = require('../../config').navs;
//获取应用实例
var app = getApp()
Page({
  data: {
    navData: navs,
    currentNav: 0,
    leftNav: navs[0].leftChildren,
    rightNav: navs[0].rightChildren,
    swList: null,
    xnList:null,
    userInfo: null,
    openid:null,
    article: null,
    buttonTip:'登录'
  },
  //菜单逻辑
  selectNave: function (event) {
    let self = this, leftNav = [], rightNav = [];
    let index = parseInt(event.currentTarget.dataset.index);
    self.setData({
      currentNav: index+1
    });
    let leftChildren = navs[index].leftChildren || [];
    if (leftChildren.length) {
      let i1 = 0;
      let timer1 = setInterval(function () {
        if (i1 <= leftChildren.length) {

          self.setData({
            leftNav: leftNav
          });
          leftNav.push(leftChildren[i1]);
          i1++;
        } else {
          clearInterval(timer1);
        }
      }, 200)
    } else {
      self.setData({
        leftNav: []
      });
    }
    let rightChildren = navs[index].rightChildren || [];
    if (rightChildren.length) {
      let i2 = 0;
      let timer2 = setInterval(function () {
        if (i2 <= rightChildren.length) {

          self.setData({
            rightNav: rightNav
          });
          rightNav.push(rightChildren[i2]);
          i2++;
        } else {
          clearInterval(timer2);
        }
      }, 200)
    } else {
      self.setData({
        rightNav: []
      });
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onTapTag: function (e) {
    var tab = e.currentTarget.id;
      //页面跳转
      wx.navigateTo({
        url: "../" + tab + "/" + tab
      })

  },

  onLoad: function (options) {
    console.log('onLoad ~')
    var that = this
    this.getMsg();

    var parentOpenId = options.parentOpenId

    this.getUserInfo();
      
    this.saveFanc(parentOpenId);
    this.listPrize(1);
    this.listPrize(2);


  },
  listPrize:function(types){
    var that = this;
    wx.request({
      url: prizeListUrl, 
      data: {
        "type": types
      },
      success: function (res) {
        var json = res.data;
        if(types == 2){
            that.setData({
              swList: json 
            })
        }else{
          that.setData({
            xnList: json
          })
        }
      }
    })
  },
  onReady: function () {
      console.log('ready');
      // app.setUserInfo();
  },
  onShow: function () {
    this.getUserInfo();
  },


  saveFanc: function (parentOpenId) {

    var that = this;
    var userInfo = wx.getStorageSync('userInfo')
    var openId = wx.getStorageSync('openid')
    if(userInfo==''){
      console.log('userinfo null')
      wx.getUserInfo({
        success: function (res) {
          userInfo = res.userInfo
        }
      })
    }

    //console.log(userInfo)
    wx.request({
      url: fancUrl + '/add',
      data: {
        openId: openId,
         nickName : userInfo.nickName,
         avatarUrl : userInfo.avatarUrl,
         gender : userInfo.gender, //性别 0：未知、1：男、2：女
         province : userInfo.province,
         city : userInfo.city,
         country : userInfo.country,
         parentOpenId: parentOpenId
      
      },
      method: 'POST',
      success: function (res) {       
        that.setData({
          userInfo: res.data.body,
          openid:openId
        })
      }
    })

  },
  qiandao:function(){
    console.log("qiandao")
    var that = this;

    var openId = wx.getStorageSync('openid')

    if(openId==''){
      app.getUserInfo();
      openId = wx.getStorageSync('openid')
      that.setData({
        openid: openId
      })
    }
    wx.switchTab({
      url: 'index'
    });
  

    wx.request({
      url: signUrl+"/add", //仅为示例，并非真实的接口地址
      method:'POST',
      data: {
        "openid": openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var json = JSON.parse(res.data.body)
        var isSuc = json.isSuccess;
        wx.showToast({
          title: json.data,
          
          duration: 1000,
          mask: true
        })
        that.saveFanc();

      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var openId = wx.getStorageSync('openid')
    if (openId == '') {
      this.getUserInfo();
      openId = wx.getStorageSync('openid')

    }
    return {
      title: '程序员葵花宝典',
      path: '/pages/index/index?parentOpenId='+openId,
      success: function (res) {
        // 转发成功
        wx.request({
          url: fancUrl + "/zhuanfa", 
          data: {
            "openid": openId
          },
          success: function (res) {
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  ,
  fuzhi: function () {

    wx.setClipboardData({
      data: 'liuzhipeng886',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    })


  },
  getMsg:function () {
    var that = this;

    wx.request({
      url: adMsgUrl + "/getByType", //
      method: 'GET',
      data: {
        'type': 3

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        var temp = WxParse.wxParse('article', 'html', res.data.body.content, that, 5);
        that.setData({
          article: temp
        })


      }
    })


  },
  denglu:function(){
   
    this.getUserInfo();



  },
  //获取用户openid并缓存
  getUserInfo: function () {
    var that = this
    const userInfo = wx.getStorageSync('userInfo') || null
    const openid = wx.getStorageSync('openid') || null

    if (userInfo && openid) {

      return
    }
    wx.showToast({
      title: '登录中...',
      icon: 'loading',
      duration: 1000
    })

    wx.login({
      success: function (res) {
        wx.request({
          url: openIdUrl,
          data: { "code": res.code },
          success: function (res) {
            wx.setStorageSync('openid', res.data.body.openid)
            wx.getUserInfo({
              success: function (res) {
                var userInfo = res.userInfo
                wx.setStorageSync('userInfo', userInfo)
                that.saveFanc();
              }
            })
          }
        })

      }
    })
  

  },
  choujiang:function(){

    console.log("qiandao")
    var that = this;

    var openId = wx.getStorageSync('openid')

    if (openId == '') {
      that.getUserInfo();
      return;
    }

    wx.request({
      url: lucklyUrl + "/add?openid=" + openId, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
       // "openid": openId
      },
      success: function (res) {
        var json = JSON.parse(res.data.body)
        var isSuc = json.isSuccess;
        wx.showToast({
          title: json.data,

          duration: 1000,
          mask: true
        })
        that.saveFanc(null);

      }
    })

  }
})
