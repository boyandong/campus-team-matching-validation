// 用户反馈页
const analytics = require('../../utils/analytics.js');

Page({
  data: {
    expectation: '',
    teamType: '',
    contact: ''
  },

  onLoad: function() {
    console.log('反馈页加载');
    
    // 记录页面浏览埋点
    analytics.trackPageView('feedback', {});
  },

  // 输入期待
  onExpectationInput: function(e) {
    this.setData({
      expectation: e.detail.value
    });
  },

  // 输入队友类型
  onTeamTypeInput: function(e) {
    this.setData({
      teamType: e.detail.value
    });
  },

  // 输入联系方式
  onContactInput: function(e) {
    this.setData({
      contact: e.detail.value
    });
  },

  // 提交反馈
  onSubmit: function() {
    const { expectation, teamType, contact } = this.data;
    
    // 验证
    if (!expectation || !expectation.trim()) {
      wx.showToast({
        title: '请填写您的期待',
        icon: 'none'
      });
      return;
    }
    
    // 记录埋点
    analytics.trackButtonClick('submit_feedback', {
      has_team_type: !!teamType,
      has_contact: !!contact,
      expectation_length: expectation.length
    });
    
    // 保存到云数据库
    wx.showLoading({
      title: '提交中...'
    });
    
    wx.cloud.database().collection('user_feedback').add({
      data: {
        expectation: expectation.trim(),
        team_type: teamType.trim(),
        contact: contact.trim(),
        create_time: new Date(),
        timestamp: Date.now()
      },
      success: (res) => {
        console.log('反馈提交成功:', res);
        wx.hideLoading();
        
        // 显示感谢页面
        wx.showModal({
          title: '感谢您的反馈！',
          content: '感谢体验 CoCanvas 校园组队原型！\n\n您的意见对我们非常重要，我们会认真考虑每一条反馈。\n\n如果功能上线，我们会第一时间通知您！',
          showCancel: false,
          confirmText: '返回首页',
          confirmColor: '#4A90E2',
          success: (res) => {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/index/index',
                fail: () => {
                  wx.navigateBack();
                }
              });
            }
          }
        });
        
        // 清空表单
        this.setData({
          expectation: '',
          teamType: '',
          contact: ''
        });
      },
      fail: (err) => {
        console.error('反馈提交失败:', err);
        wx.hideLoading();
        
        wx.showModal({
          title: '提交失败',
          content: '网络错误，请稍后重试',
          showCancel: false,
          confirmColor: '#4A90E2'
        });
      }
    });
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: 'CoCanvas 校园组队 - 期待您的反馈',
      path: '/pages/index/index'
    };
  }
});

