/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名

 var host = "peng.cxylt.cn/app"

// var host = "localhost:8080/app"

 var httpType ="http";

var config = {

    // 下面的地址配合云端 Server 工作
    host,
    httpType,
    fancUrl: `${httpType}://${host}/fanc`,

    // 登录地址，用于建立会话
    loginUrl: `${httpType}://${host}/login`,

    // 资料列表
    prizeListUrl: `${httpType}://${host}/prize/list`,

    prizeUrl: `${httpType}://${host}/prize/`,

    // 用code换取openId
    openIdUrl: `${httpType}://${host}/xcx/openid`,

    //兑换记录
    exchangeDetailUrl: `${httpType}://${host}/exchangeDetail`,

    // 留言
    wordUrl: `${httpType}://${host}/word`,

    // 签到
    signUrl: `${httpType}://${host}/sign`,

    // 积分
    coreDetailUrl: `${httpType}://${host}/coreDetail`,

    // 广告和通知
    adMsgUrl: `${httpType}://${host}/admsg`,


    lucklyUrl: `${httpType}://${host}/luckly`,
    navs:[
      {
        name: '任务管理',
        leftChildren: [
          {
            text: ['$900.00', '你好']
          },
          {
            text: ['$10000.00', '你a好']
          },
          {
            text: ['$90.00', '你c好']
          }
        ],
        rightChildren: [
          {
            text: ['$90.00', '你r好']
          },
          {
            text: ['$90.00', '你r好']
          },
          {
            text: ['$90.00', '你r好']
          }
        ]

      }, {
        name: '公众号推荐',
        rightChildren: [
          {
            text: ['$90.00', '公众号推荐']
          },
          {
            text: ['$90.00', '公众号推荐']
          },
          {
            text: ['$90.00', '公众号推荐']
          }
        ]
      },
      {
        name: '致亲爱的用户',
        rightChildren: [
          {
            text: ['$90.00', '致亲爱的用户']
          }
        ]
      },
      {
        name: '榜单',
        rightChildren: [
          {
            text: ['--', '任务完成榜']
          }
        ]
      }
    ]
};

module.exports = config
