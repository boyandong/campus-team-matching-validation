// 首页 - 组队列表
const mockData = require('../../data/mock_teams.js');
const analytics = require('../../utils/analytics.js');

Page({
  data: {
    slogan: '找到你的队友，一起搞点有意思的事！',
    teamTypes: [],
    selectedType: 0, // 0表示全部
    teamList: [],
    allTeams: []
  },

  onLoad: function() {
    console.log('首页加载');
    
    // 加载类型列表
    const types = [{ id: 0, name: '全部', icon: '🔥', color: '#4A90E2' }, ...mockData.TEAM_TYPES];
    this.setData({
      teamTypes: types
    });
    
    // 加载组队数据
    this.loadTeams();
    
    // 记录页面浏览埋点
    analytics.trackPageView('index', {
      total_teams: mockData.MOCK_TEAMS.length
    });
  },

  onShow: function() {
    // 检查是否有用户新发布的组队
    const app = getApp();
    if (app.globalData.userCreatedTeam) {
      // 将用户发布的组队添加到列表顶部
      const userTeam = app.globalData.userCreatedTeam;
      const allTeams = [userTeam, ...this.data.allTeams];
      
      this.setData({
        allTeams: allTeams,
        teamList: this.data.selectedType === 0 ? allTeams : allTeams.filter(t => t.type === this.data.selectedType)
      });
      
      // 清除全局数据
      app.globalData.userCreatedTeam = null;
      
      // 显示提示
      wx.showToast({
        title: '组队已发布！',
        icon: 'success'
      });
    }
  },

  // 加载组队数据
  loadTeams: function() {
    const teams = mockData.getAllTeams();
    this.setData({
      allTeams: teams,
      teamList: teams
    });
  },

  // 筛选类型
  onTypeSelect: function(e) {
    const typeId = e.currentTarget.dataset.type;
    
    // 记录筛选埋点
    analytics.trackFilterClick('team_type', typeId);
    
    this.setData({
      selectedType: typeId
    });
    
    // 筛选数据
    if (typeId === 0) {
      this.setData({
        teamList: this.data.allTeams
      });
    } else {
      const filtered = this.data.allTeams.filter(team => team.type === typeId);
      this.setData({
        teamList: filtered
      });
    }
  },

  // 点击组队卡片
  onTeamTap: function(e) {
    const team = e.currentTarget.dataset.team;
    
    // 记录卡片点击埋点
    analytics.trackCardClick('team', {
      team_id: team.id,
      team_type: team.type,
      team_title: team.title
    });
    
    // 跳转到详情页
    wx.navigateTo({
      url: `/pages/detail/detail?id=${team.id}`
    });
  },

  // 点击发布组队按钮
  onCreateTeam: function() {
    // 记录按钮点击埋点
    analytics.trackButtonClick('create_team', {
      from_page: 'index'
    });
    
    // 跳转到发布页
    wx.navigateTo({
      url: '/pages/create/create'
    });
  },

  // 点击反馈按钮
  onFeedback: function() {
    analytics.trackButtonClick('feedback_entry', {
      from_page: 'index'
    });
    
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: 'CoCanvas 校园组队 - 找到你的队友！',
      path: '/pages/index/index'
    };
  }
});

