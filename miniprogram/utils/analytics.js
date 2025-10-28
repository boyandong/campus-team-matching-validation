// 埋点统计工具
// 用于记录用户行为数据，验证需求真实性

const STORAGE_KEY = 'analytics_queue';
const BATCH_SIZE = 10; // 每10条数据上报一次
const FLUSH_INTERVAL = 60000; // 每60秒上报一次（毫秒）

let analyticsQueue = [];
let flushTimer = null;

// 初始化：从本地存储加载未上报的数据
function init() {
  try {
    const cached = wx.getStorageSync(STORAGE_KEY);
    if (cached && Array.isArray(cached)) {
      analyticsQueue = cached;
      console.log(`[Analytics] 从缓存加载 ${analyticsQueue.length} 条埋点数据`);
    }
  } catch (e) {
    console.error('[Analytics] 初始化失败:', e);
  }
  
  // 启动定时上报
  startFlushTimer();
}

// 记录埋点事件
function track(eventName, eventData = {}) {
  const event = {
    event_name: eventName,
    event_data: eventData,
    timestamp: Date.now(),
    date: new Date().toISOString(),
    page: getCurrentPages().length > 0 ? getCurrentPages()[getCurrentPages().length - 1].route : 'unknown'
  };
  
  analyticsQueue.push(event);
  console.log(`[Analytics] 记录事件: ${eventName}`, eventData);
  
  // 保存到本地存储
  saveToStorage();
  
  // 达到批量上报阈值时立即上报
  if (analyticsQueue.length >= BATCH_SIZE) {
    flush();
  }
}

// 保存到本地存储
function saveToStorage() {
  try {
    wx.setStorageSync(STORAGE_KEY, analyticsQueue);
  } catch (e) {
    console.error('[Analytics] 保存到本地存储失败:', e);
  }
}

// 批量上报数据
function flush() {
  if (analyticsQueue.length === 0) {
    console.log('[Analytics] 队列为空，无需上报');
    return;
  }
  
  const dataToReport = [...analyticsQueue];
  console.log(`[Analytics] 开始上报 ${dataToReport.length} 条数据`);
  
  // 调用云函数上报
  wx.cloud.callFunction({
    name: 'reportAnalytics',
    data: {
      events: dataToReport
    },
    success: (res) => {
      console.log('[Analytics] 上报成功:', res);
      
      // 清空已上报的数据
      analyticsQueue = analyticsQueue.filter(item => !dataToReport.includes(item));
      saveToStorage();
      
      wx.showToast({
        title: '数据已同步',
        icon: 'none',
        duration: 1000
      });
    },
    fail: (err) => {
      console.error('[Analytics] 上报失败:', err);
      // 保留数据，下次再上报
    }
  });
}

// 启动定时上报
function startFlushTimer() {
  if (flushTimer) {
    clearInterval(flushTimer);
  }
  
  flushTimer = setInterval(() => {
    flush();
  }, FLUSH_INTERVAL);
}

// 停止定时上报
function stopFlushTimer() {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}

// 页面浏览埋点（快捷方法）
function trackPageView(pageName, pageData = {}) {
  track('page_view', {
    page_name: pageName,
    ...pageData
  });
}

// 按钮点击埋点（快捷方法）
function trackButtonClick(buttonName, buttonData = {}) {
  track('button_click', {
    button_name: buttonName,
    ...buttonData
  });
}

// 卡片点击埋点（快捷方法）
function trackCardClick(cardType, cardData = {}) {
  track('card_click', {
    card_type: cardType,
    ...cardData
  });
}

// 筛选点击埋点（快捷方法）
function trackFilterClick(filterType, filterValue) {
  track('filter_click', {
    filter_type: filterType,
    filter_value: filterValue
  });
}

// 获取当前队列状态（调试用）
function getQueueStatus() {
  return {
    queueLength: analyticsQueue.length,
    queue: analyticsQueue
  };
}

// 初始化
init();

module.exports = {
  track,
  flush,
  trackPageView,
  trackButtonClick,
  trackCardClick,
  trackFilterClick,
  getQueueStatus
};

