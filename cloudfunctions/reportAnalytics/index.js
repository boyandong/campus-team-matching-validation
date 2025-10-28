// 云函数：埋点数据上报
// 接收前端上报的埋点事件并存储到数据库

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  console.log('收到埋点数据上报:', event);
  
  const { events } = event;
  
  // 参数验证
  if (!events || !Array.isArray(events) || events.length === 0) {
    return {
      success: false,
      message: '参数错误：events 必须是非空数组'
    };
  }
  
  try {
    // 获取用户信息
    const wxContext = cloud.getWXContext();
    
    // 批量插入埋点记录
    const promises = events.map(event => {
      return db.collection('analytics_logs').add({
        data: {
          ...event,
          openid: wxContext.OPENID,
          appid: wxContext.APPID,
          unionid: wxContext.UNIONID,
          report_time: db.serverDate(),
          env: wxContext.ENV || 'production'
        }
      });
    });
    
    await Promise.all(promises);
    
    console.log(`✅ 成功保存 ${events.length} 条埋点记录`);
    
    return {
      success: true,
      message: `成功保存 ${events.length} 条埋点记录`,
      count: events.length
    };
    
  } catch (err) {
    console.error('保存埋点记录失败:', err);
    
    return {
      success: false,
      message: '保存失败',
      error: err.message
    };
  }
};

