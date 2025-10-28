// CoCanvas 需求验证原型
const analytics = require('./utils/analytics.js');

App({
  onLaunch: function () {
    console.log('CoCanvas MVP 启动');
    
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      });
      console.log('云开发已初始化');
    }
    
    // 记录启动埋点
    analytics.track('app_launch', {
      timestamp: Date.now(),
      scene: this.options?.scene || 'unknown'
    });
  },
  
  globalData: {
    // 用于存储临时发布的组队
    userCreatedTeam: null
  }
});

