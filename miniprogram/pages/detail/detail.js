// 组队详情页
const mockData = require('../../data/mock_teams.js');
const analytics = require('../../utils/analytics.js');

Page({
  data: {
    team: null
  },

  onLoad: function(options) {
    const teamId = parseInt(options.id);
    console.log('加载组队详情，ID:', teamId);
    
    // 加载组队数据
    const team = mockData.getTeamById(teamId);
    
    if (team) {
      this.setData({
        team: team
      });
      
      // 记录页面浏览埋点
      analytics.trackPageView('detail', {
        team_id: team.id,
        team_type: team.type,
        team_title: team.title
      });
    } else {
      wx.showToast({
        title: '组队不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 点击"聊一聊"按钮
  onChatTap: function() {
    const team = this.data.team;
    
    // 记录按钮点击埋点
    analytics.trackButtonClick('chat', {
      team_id: team.id,
      team_type: team.type,
      team_title: team.title
    });
    
    // 假门提示
    wx.showModal({
      title: '功能维护中',
      content: '聊天功能正在开发中，敬请期待！\n\n感谢您的体验，我们会尽快上线。',
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#4A90E2'
    });
  },

  // 点击"加入组队"按钮
  onJoinTap: function() {
    const team = this.data.team;
    
    // 记录按钮点击埋点
    analytics.trackButtonClick('join_team', {
      team_id: team.id,
      team_type: team.type,
      team_title: team.title
    });
    
    // 假门提示
    wx.showModal({
      title: '功能维护中',
      content: '加入组队功能正在开发中，敬请期待！\n\n您的兴趣已被记录，感谢支持。',
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#4A90E2',
      success: (res) => {
        if (res.confirm) {
          // 可以引导用户去反馈页
          setTimeout(() => {
            wx.showModal({
              title: '期待您的反馈',
              content: '想告诉我们您对组队平台的期待吗？',
              cancelText: '稍后再说',
              confirmText: '去反馈',
              confirmColor: '#4A90E2',
              success: (res2) => {
                if (res2.confirm) {
                  wx.navigateTo({
                    url: '/pages/feedback/feedback'
                  });
                }
              }
            });
          }, 500);
        }
      }
    });
  },

  // 分享
  onShareAppMessage: function() {
    const team = this.data.team;
    return {
      title: `【组队】${team.title}`,
      path: `/pages/detail/detail?id=${team.id}`
    };
  }
});

