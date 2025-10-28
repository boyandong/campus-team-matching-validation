// 发布组队页
const mockData = require('../../data/mock_teams.js');
const analytics = require('../../utils/analytics.js');

Page({
  data: {
    teamTypes: mockData.TEAM_TYPES,
    selectedTypeIndex: 0,
    title: '',
    description: ''
  },

  onLoad: function() {
    console.log('发布组队页加载');
    
    // 记录页面浏览埋点
    analytics.trackPageView('create', {});
  },

  // 输入标题
  onTitleInput: function(e) {
    this.setData({
      title: e.detail.value
    });
  },

  // 选择类型
  onTypeChange: function(e) {
    this.setData({
      selectedTypeIndex: parseInt(e.detail.value)
    });
  },

  // 输入描述
  onDescInput: function(e) {
    this.setData({
      description: e.detail.value
    });
  },

  // 提交发布
  onSubmit: function() {
    const { title, description, selectedTypeIndex, teamTypes } = this.data;
    
    // 简单验证
    if (!title || !title.trim()) {
      wx.showToast({
        title: '请输入组队标题',
        icon: 'none'
      });
      return;
    }
    
    if (!description || !description.trim()) {
      wx.showToast({
        title: '请输入组队描述',
        icon: 'none'
      });
      return;
    }
    
    // 记录发布按钮点击埋点
    const selectedType = teamTypes[selectedTypeIndex];
    analytics.trackButtonClick('publish_team', {
      team_type: selectedType.id,
      team_type_name: selectedType.name,
      title_length: title.length,
      desc_length: description.length
    });
    
    // 创建假的组队数据
    const newTeam = {
      id: Date.now(), // 使用时间戳作为临时ID
      type: selectedType.id,
      title: title.trim(),
      description: description.trim(),
      members: '1/10人',
      currentMembers: 1,
      maxMembers: 10,
      location: '待定',
      deadline: '长期招募',
      tags: ['新发布'],
      requirements: [],
      creator: '我',
      createTime: '刚刚',
      typeIcon: selectedType.icon,
      typeName: selectedType.name,
      typeColor: selectedType.color
    };
    
    // 保存到全局数据
    const app = getApp();
    app.globalData.userCreatedTeam = newTeam;
    
    // 假门提示
    wx.showModal({
      title: '组队已发布！',
      content: '您的组队信息已成功发布，请返回首页查看。\n\n（当前为体验版本，实际功能开发中）',
      showCancel: false,
      confirmText: '返回首页',
      confirmColor: '#4A90E2',
      success: (res) => {
        if (res.confirm) {
          // 返回首页
          wx.navigateBack();
        }
      }
    });
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: 'CoCanvas 校园组队 - 发布你的组队信息',
      path: '/pages/index/index'
    };
  }
});

