# 数据分析示例

验证周期结束后，使用本文档的方法分析收集的数据。

## 📊 数据导出

### 从云开发控制台导出

1. 登录云开发控制台
2. 数据库 → `analytics_logs` → 导出 → JSON/CSV
3. 数据库 → `user_feedback` → 导出 → JSON/CSV

## 📈 关键指标计算

### 1. 基础数据统计

```javascript
// 在云开发控制台 → 云函数 → 新建临时云函数
// 粘贴以下代码获取统计数据

const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const logsCollection = db.collection('analytics_logs');
  
  // 统计总访问人数（去重）
  const launchEvents = await logsCollection
    .where({ event_name: 'app_launch' })
    .get();
  
  const uniqueUsers = new Set(launchEvents.data.map(e => e.openid));
  const totalUsers = uniqueUsers.size;
  
  // 统计各类事件
  const allEvents = await logsCollection.get();
  const events = allEvents.data;
  
  const stats = {
    totalUsers: totalUsers,
    totalEvents: events.length,
    pageViews: events.filter(e => e.event_name === 'page_view').length,
    cardClicks: events.filter(e => e.event_name === 'card_click').length,
    chatClicks: events.filter(e => 
      e.event_name === 'button_click' && e.event_data.button_name === 'chat'
    ).length,
    joinClicks: events.filter(e => 
      e.event_name === 'button_click' && e.event_data.button_name === 'join_team'
    ).length,
    publishClicks: events.filter(e => 
      e.event_name === 'button_click' && e.event_data.button_name === 'publish_team'
    ).length,
    filterClicks: events.filter(e => e.event_name === 'filter_click').length
  };
  
  // 计算点击率
  stats.chatClickRate = ((stats.chatClicks / totalUsers) * 100).toFixed(2) + '%';
  stats.joinClickRate = ((stats.joinClicks / totalUsers) * 100).toFixed(2) + '%';
  stats.publishClickRate = ((stats.publishClicks / totalUsers) * 100).toFixed(2) + '%';
  
  return stats;
};
```

### 2. Excel 分析（推荐）

导出 CSV 格式后，使用 Excel 进行分析：

**透视表示例**：

| 指标 | 公式 | 说明 |
|------|------|------|
| 总访问人数 | `=COUNTA(UNIQUE(A:A))` | A列为openid |
| 查看详情次数 | `=COUNTIF(B:B, "card_click")` | B列为event_name |
| 聊一聊点击率 | `=(COUNTIFS(B:B,"button_click",C:C,"chat")/总访问人数)*100` | |

**图表建议**：
- 柱状图：各类型组队点击量对比
- 折线图：每日访问量趋势
- 饼图：事件类型分布

### 3. Python 分析脚本

```python
import pandas as pd
import json

# 读取导出的JSON数据
with open('analytics_logs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

df = pd.DataFrame(data)

# 基础统计
total_users = df['openid'].nunique()
print(f"总访问人数: {total_users}")

# 各事件统计
event_counts = df['event_name'].value_counts()
print("\n事件分布:")
print(event_counts)

# 计算点击率
def calc_click_rate(event_name, button_name=None):
    if button_name:
        clicks = df[
            (df['event_name'] == event_name) & 
            (df['event_data'].apply(lambda x: x.get('button_name') == button_name))
        ].shape[0]
    else:
        clicks = df[df['event_name'] == event_name].shape[0]
    
    rate = (clicks / total_users) * 100
    return f"{rate:.2f}%"

print(f"\n聊一聊点击率: {calc_click_rate('button_click', 'chat')}")
print(f"加入组队点击率: {calc_click_rate('button_click', 'join_team')}")
print(f"发布组队点击率: {calc_click_rate('button_click', 'publish_team')}")

# 按日期统计
df['date'] = pd.to_datetime(df['timestamp'], unit='ms').dt.date
daily_stats = df.groupby('date').agg({
    'openid': 'nunique',
    'event_name': 'count'
})
daily_stats.columns = ['日活用户', '总事件数']
print("\n每日数据:")
print(daily_stats)

# 组队类型热度
card_clicks = df[df['event_name'] == 'card_click']
if not card_clicks.empty:
    team_types = card_clicks['event_data'].apply(lambda x: x.get('team_type'))
    type_counts = team_types.value_counts()
    print("\n组队类型点击量:")
    print(type_counts)
```

## 🎯 关键结论判定

### 需求验证结论

根据数据计算核心点击率：

```
核心点击率 = (聊一聊点击 + 加入组队点击 + 发布组队点击) / 总访问人数
```

**判断标准**：

| 点击率范围 | 结论 | 下一步行动 |
|-----------|------|-----------|
| ≥ 10% | ✅ 需求强烈 | 立即进入MVP开发，优先实现：1对1聊天、组队发布、申请加入 |
| 5% - 10% | ⚠️ 需求存在，需细化 | 进行5-10个深度用户访谈，找到真实痛点 |
| < 5% | ❌ 需求不明确 | 重新审视问题定义，或调整目标群体 |

### 组队类型优先级

根据各类型组队的点击量排序：

```
优先级 = 点击量 × 用户反馈提及次数
```

**开发策略**：
- 先做点击量 TOP 3 的类型
- 其他类型作为"其他"类别暂缓开发

## 📝 用户反馈分析

### 定性分析步骤

1. **阅读所有反馈**
   - 导出 `user_feedback` 数据
   - 逐条阅读用户期待和队友类型

2. **提取关键词**
   
   使用词云工具或手动统计高频词：
   - 用户最关心什么？（靠谱、真实信息、快速匹配...）
   - 用户希望找什么队友？（技能、性格、时间...）

3. **归类用户需求**
   
   | 需求类别 | 示例 | 优先级 |
   |---------|------|--------|
   | 信息真实性 | "希望看到队友的真实简历" | P0 |
   | 快速匹配 | "能推荐合适的队友" | P1 |
   | 沟通便利 | "能直接聊天" | P0 |
   | 安全保障 | "避免不靠谱的人" | P1 |

4. **产品功能映射**
   
   将用户需求转化为产品功能：
   ```
   需求: 信息真实性
   → 功能: 实名认证、学校邮箱验证、个人主页展示
   
   需求: 快速匹配
   → 功能: 智能推荐算法、标签筛选、相似度匹配
   
   需求: 沟通便利
   → 功能: 即时聊天、语音通话、在线协作
   ```

## 📊 数据可视化示例

### 使用 Excel 制作图表

1. **每日访问趋势折线图**
   - X轴：日期
   - Y轴：访问人数
   - 显示5天的变化趋势

2. **事件分布饼图**
   - 显示各类事件占比
   - 标注百分比

3. **组队类型热度柱状图**
   - X轴：8种组队类型
   - Y轴：点击次数
   - 按降序排列

### 使用 Python 可视化

```python
import matplotlib.pyplot as plt
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 1. 事件分布饼图
event_counts.plot.pie(autopct='%1.1f%%', figsize=(8, 8))
plt.title('事件类型分布')
plt.savefig('event_distribution.png')
plt.close()

# 2. 每日趋势图
daily_stats['日活用户'].plot(kind='line', marker='o', figsize=(10, 6))
plt.title('每日活跃用户趋势')
plt.xlabel('日期')
plt.ylabel('用户数')
plt.grid(True)
plt.savefig('daily_trend.png')
plt.close()

# 3. 组队类型热度
type_counts.plot.bar(figsize=(10, 6))
plt.title('组队类型点击量')
plt.xlabel('组队类型')
plt.ylabel('点击次数')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('team_type_popularity.png')
plt.close()
```

## 📄 验证报告模板

```markdown
# CoCanvas 需求验证报告

## 一、验证概况

- 验证周期：2025年X月X日 - X月X日（5天）
- 推广渠道：微信群、朋友圈、QQ群
- 目标用户：XX大学在校学生

## 二、核心数据

| 指标 | 数值 | 备注 |
|------|------|------|
| 总访问人数 | XX人 | 去重后的openid数量 |
| 总事件数 | XX次 | 所有埋点事件 |
| 查看详情次数 | XX次 | 点击组队卡片 |
| 聊一聊点击 | XX次 | 点击率: XX% |
| 加入组队点击 | XX次 | 点击率: XX% |
| 发布组队点击 | XX次 | 点击率: XX% |
| 收到反馈数 | XX条 | 用户主动提交 |

**核心点击率：XX%**

## 三、验证结论

✅/⚠️/❌ 需求验证 [成功/需细化/失败]

理由：
1. 核心点击率为 XX%，[高于/低于]预期目标
2. 用户反馈中 XX% 表达了强烈使用意愿
3. [其他数据支撑]

## 四、用户洞察

### 最受欢迎的组队类型
1. XX (XX次点击)
2. XX (XX次点击)
3. XX (XX次点击)

### 用户核心需求（从反馈中提取）
1. [需求1]：XX% 的用户提到
2. [需求2]：XX% 的用户提到
3. [需求3]：XX% 的用户提到

### 典型用户画像
- 年级分布：大二、大三为主
- 主要需求场景：科研项目、竞赛、学习小组
- 痛点：找不到靠谱队友、信息不对称

## 五、下一步行动

### 产品开发计划
- [ ] 立即开发MVP，包含核心功能：[列举]
- [ ] 第一版发布时间：X月X日
- [ ] 目标用户量：XXX人

### 功能优先级
**P0（必须有）**：
1. 用户注册/登录
2. 发布组队信息
3. 浏览组队列表
4. 1对1聊天

**P1（应该有）**：
1. 组队申请审核
2. 个人主页
3. 标签筛选

**P2（可以有）**：
1. 智能推荐
2. 组队数据统计
3. 消息通知

## 六、风险和挑战

1. [识别的风险1]
2. [识别的风险2]
3. 应对措施：[...]

## 七、附录

- 原始数据文件：analytics_logs.csv
- 用户反馈汇总：user_feedback.csv
- 数据可视化图表：[附图]
```

---

**数据分析完成后，记得将结论同步给团队成员！**

