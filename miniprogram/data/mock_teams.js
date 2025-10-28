// 模拟组队数据
// 用于需求验证阶段的假门测试

// 组队类型配置
const TEAM_TYPES = [
  { id: 1, name: '学习小组', icon: '📚', color: '#4CAF50' },
  { id: 2, name: '科研项目', icon: '🔬', color: '#2196F3' },
  { id: 3, name: '竞赛团队', icon: '🏆', color: '#FF9800' },
  { id: 4, name: '创业项目', icon: '💼', color: '#9C27B0' },
  { id: 5, name: '社团活动', icon: '🎭', color: '#F44336' },
  { id: 6, name: '志愿服务', icon: '❤️', color: '#E91E63' },
  { id: 7, name: '实习项目', icon: '💻', color: '#607D8B' },
  { id: 8, name: '其他', icon: '📝', color: '#9E9E9E' }
];

// 模拟组队数据
const MOCK_TEAMS = [
  {
    id: 1,
    type: 2,
    title: '寻找AI大模型研究队友',
    description: '我们正在进行关于大语言模型在教育领域应用的研究项目，需要对机器学习和NLP感兴趣的同学加入。项目已有导师指导，有机会发表论文。',
    members: '3/5人',
    currentMembers: 3,
    maxMembers: 5,
    location: '线上+实验室',
    deadline: '2025-11-15',
    tags: ['机器学习', 'NLP', '论文发表'],
    requirements: ['有Python基础', '对AI感兴趣', '每周投入10小时'],
    creator: '王同学 · 计算机学院',
    createTime: '2025-10-20'
  },
  {
    id: 2,
    type: 3,
    title: '数学建模美赛组队',
    description: '准备参加2026年美国大学生数学建模竞赛，寻找擅长编程和论文写作的队友。我负责建模，希望找到能用Python/MATLAB实现算法的同学和英文写作能力强的同学。',
    members: '2/3人',
    currentMembers: 2,
    maxMembers: 3,
    location: '图书馆',
    deadline: '2025-11-01',
    tags: ['数学建模', '算法', '英文写作'],
    requirements: ['会Python或MATLAB', '有竞赛经验优先'],
    creator: '李同学 · 数学系',
    createTime: '2025-10-22'
  },
  {
    id: 3,
    type: 1,
    title: '考研英语互助学习小组',
    description: '组建考研英语学习小组，每天早上7点线上打卡背单词，每周末线下聚一次做真题、讨论错题。已有5位研友，希望再招2-3位认真备考的同学。',
    members: '5/8人',
    currentMembers: 5,
    maxMembers: 8,
    location: '线上+咖啡厅',
    deadline: '2025-10-30',
    tags: ['考研', '英语', '互助学习'],
    requirements: ['2026考研', '能坚持打卡', '积极分享'],
    creator: '张同学 · 文学院',
    createTime: '2025-10-23'
  },
  {
    id: 4,
    type: 4,
    title: '校园二手交易小程序开发团队',
    description: '计划开发一个校园二手交易平台小程序，解决校内闲置物品交易问题。现有产品经理和后端开发，急需前端开发和UI设计。项目有可能参加互联网+比赛。',
    members: '2/4人',
    currentMembers: 2,
    maxMembers: 4,
    location: '创业孵化基地',
    deadline: '2025-11-10',
    tags: ['微信小程序', '前端开发', 'UI设计', '互联网+'],
    requirements: ['有小程序开发经验', '或UI设计能力', '每周至少15小时'],
    creator: '陈同学 · 软件学院',
    createTime: '2025-10-21'
  },
  {
    id: 5,
    type: 5,
    title: '摄影社校园风光拍摄活动',
    description: '摄影社计划在秋季拍摄一组校园风光主题作品，欢迎对摄影感兴趣的同学加入。不要求有专业设备，手机摄影也可以，主要是交流学习和记录美好时光。',
    members: '8/15人',
    currentMembers: 8,
    maxMembers: 15,
    location: '校园各处',
    deadline: '2025-11-05',
    tags: ['摄影', '社团活动', '兴趣爱好'],
    requirements: ['对摄影感兴趣', '有时间参加活动'],
    creator: '刘同学 · 艺术学院',
    createTime: '2025-10-24'
  },
  {
    id: 6,
    type: 2,
    title: 'SRTP项目：智能家居系统设计',
    description: '学校SRTP立项项目，研究基于物联网的智能家居系统。需要硬件开发（Arduino/树莓派）和移动端开发的同学。项目有经费支持，指导老师经验丰富。',
    members: '3/6人',
    currentMembers: 3,
    maxMembers: 6,
    location: '工程实训中心',
    deadline: '2025-11-08',
    tags: ['SRTP', '物联网', '嵌入式', '移动开发'],
    requirements: ['有硬件基础或移动开发经验', '能长期投入'],
    creator: '赵同学 · 电子学院',
    createTime: '2025-10-19'
  },
  {
    id: 7,
    type: 3,
    title: 'ACM程序设计竞赛训练队',
    description: '为明年的ACM-ICPC区域赛做准备，每周三次训练，主要刷Codeforces和牛客网题目。欢迎算法基础好、想提升编程能力的同学。',
    members: '6/10人',
    currentMembers: 6,
    maxMembers: 10,
    location: '线上',
    deadline: '2025-11-01',
    tags: ['ACM', '算法竞赛', '编程'],
    requirements: ['算法基础', '能坚持训练', 'C++优先'],
    creator: '周同学 · 计算机学院',
    createTime: '2025-10-25'
  },
  {
    id: 8,
    type: 6,
    title: '周末去敬老院志愿服务',
    description: '每周六上午去附近敬老院做志愿服务，陪老人聊天、表演节目、帮忙打扫卫生。活动轻松愉快，可以积累志愿时长，结识有爱心的朋友。',
    members: '12/20人',
    currentMembers: 12,
    maxMembers: 20,
    location: '夕阳红敬老院',
    deadline: '长期招募',
    tags: ['志愿服务', '公益', '周末活动'],
    requirements: ['有爱心', '周六上午有空'],
    creator: '吴同学 · 社会学院',
    createTime: '2025-10-18'
  },
  {
    id: 9,
    type: 1,
    title: '雅思口语练习搭子',
    description: '备考雅思，目前口语是弱项，想找个同样在准备雅思的伙伴每天练习30分钟口语。可以互相纠正发音，分享话题思路，共同进步。',
    members: '1/2人',
    currentMembers: 1,
    maxMembers: 2,
    location: '线上',
    deadline: '2025-10-28',
    tags: ['雅思', '口语', '语言学习'],
    requirements: ['在备考雅思', '能每天坚持', '口语6分以上'],
    creator: '郑同学 · 外语学院',
    createTime: '2025-10-26'
  },
  {
    id: 10,
    type: 4,
    title: '寻找产品经理一起打造校园APP',
    description: '技术团队已成型（前后端+设计），现在缺一位产品经理来把控产品方向。希望你有产品思维，善于分析用户需求，有创业热情。',
    members: '4/5人',
    currentMembers: 4,
    maxMembers: 5,
    location: '线上+创业基地',
    deadline: '2025-11-03',
    tags: ['产品经理', '创业', 'APP开发'],
    requirements: ['有产品经验优先', '善于沟通', '执行力强'],
    creator: '孙同学 · 管理学院',
    createTime: '2025-10-24'
  },
  {
    id: 11,
    type: 7,
    title: '互联网公司暑期实习组队内推',
    description: '明年暑假想去大厂实习，组个队一起刷题、改简历、模拟面试。目标是腾讯、字节、阿里等公司的技术岗位。有内推资源可以互相分享。',
    members: '5/8人',
    currentMembers: 5,
    maxMembers: 8,
    location: '线上',
    deadline: '2025-11-15',
    tags: ['实习', '互联网', '求职', '算法'],
    requirements: ['计算机相关专业', '有求职意向', '积极刷题'],
    creator: '冯同学 · 软件学院',
    createTime: '2025-10-23'
  },
  {
    id: 12,
    type: 5,
    title: '桌游社万智牌周赛',
    description: '桌游社每周五晚上举办万智牌比赛，欢迎新老玩家参加。我们有完整的赛制，提供套牌借用，还有小奖品。零基础也可以来学习！',
    members: '15/30人',
    currentMembers: 15,
    maxMembers: 30,
    location: '学生活动中心',
    deadline: '长期招募',
    tags: ['桌游', '万智牌', '社团'],
    requirements: ['对桌游感兴趣', '周五晚上有时间'],
    creator: '徐同学 · 理学院',
    createTime: '2025-10-20'
  },
  {
    id: 13,
    type: 2,
    title: '区块链技术研究小组',
    description: '对区块链、智能合约、Web3感兴趣？加入我们的研究小组，一起学习Solidity开发，研究DeFi和NFT项目，探索去中心化的未来。',
    members: '4/8人',
    currentMembers: 4,
    maxMembers: 8,
    location: '线上+图书馆',
    deadline: '2025-11-12',
    tags: ['区块链', 'Web3', '智能合约'],
    requirements: ['有编程基础', '对区块链感兴趣', '爱学习'],
    creator: '黄同学 · 计算机学院',
    createTime: '2025-10-22'
  },
  {
    id: 14,
    type: 3,
    title: '全国大学生电子设计竞赛备赛',
    description: '准备明年的电赛（TI杯），队伍需要一名软件方向的同学。我们负责硬件和模拟电路，你负责单片机编程和算法实现。往年拿过省一等奖。',
    members: '2/3人',
    currentMembers: 2,
    maxMembers: 3,
    location: '电子实验室',
    deadline: '2025-11-05',
    tags: ['电子设计', '单片机', '嵌入式'],
    requirements: ['会C语言', '熟悉STM32优先', '能长期投入'],
    creator: '林同学 · 电子学院',
    createTime: '2025-10-21'
  },
  {
    id: 15,
    type: 1,
    title: '早起打卡学习小组',
    description: '想改掉晚睡晚起的习惯？加入早起打卡小组！每天早上6:30在群里打卡，7:00-8:30去图书馆自习。坚持21天养成好习惯。',
    members: '18/25人',
    currentMembers: 18,
    maxMembers: 25,
    location: '图书馆',
    deadline: '2025-10-29',
    tags: ['早起', '自律', '学习习惯'],
    requirements: ['想改变作息', '能坚持', '住校内优先'],
    creator: '杨同学 · 经济学院',
    createTime: '2025-10-25'
  },
  {
    id: 16,
    type: 8,
    title: '组队参加校园马拉松比赛',
    description: '下月学校举办校园马拉松，想组个5人队一起参加。不求速度，主要是享受运动的快乐，完赛后一起聚餐庆祝！',
    members: '3/5人',
    currentMembers: 3,
    maxMembers: 5,
    location: '校园操场',
    deadline: '2025-11-02',
    tags: ['跑步', '马拉松', '运动'],
    requirements: ['身体健康', '喜欢跑步', '能坚持训练'],
    creator: '何同学 · 体育学院',
    createTime: '2025-10-26'
  },
  {
    id: 17,
    type: 4,
    title: '校园美食探店博主团队招募',
    description: '想做一个校园美食公众号/抖音号，需要摄影、剪辑、文案方向的同学。我们会去探访校内外美食店，拍视频写推文。有一定粉丝基础可以接广告。',
    members: '2/6人',
    currentMembers: 2,
    maxMembers: 6,
    location: '校内外美食店',
    deadline: '2025-11-08',
    tags: ['自媒体', '美食', '摄影', '剪辑'],
    requirements: ['会拍视频或修图', '文案能力强', '爱吃爱玩'],
    creator: '韩同学 · 新闻学院',
    createTime: '2025-10-23'
  },
  {
    id: 18,
    type: 6,
    title: '支教社西部支教志愿者招募',
    description: '明年暑假去云南山区支教两周，教小朋友语文、数学、英语和音体美。包食宿，学校有补贴。这是一次难忘的经历，期待有爱心的你加入。',
    members: '8/15人',
    currentMembers: 8,
    maxMembers: 15,
    location: '云南山区',
    deadline: '2025-11-20',
    tags: ['支教', '志愿服务', '暑期实践'],
    requirements: ['暑假有时间', '有耐心和爱心', '身体健康'],
    creator: '梁同学 · 教育学院',
    createTime: '2025-10-19'
  },
  {
    id: 19,
    type: 3,
    title: '"挑战杯"创业计划大赛组队',
    description: '有一个环保科技的创业想法，想参加挑战杯比赛。需要商业策划、市场调研、财务分析方向的队友。项目已有技术原型，差商业化团队。',
    members: '3/7人',
    currentMembers: 3,
    maxMembers: 7,
    location: '创业孵化基地',
    deadline: '2025-11-10',
    tags: ['挑战杯', '创业', '商业计划'],
    requirements: ['商科背景优先', '有创业热情', '擅长PPT'],
    creator: '田同学 · 环境学院',
    createTime: '2025-10-22'
  },
  {
    id: 20,
    type: 1,
    title: '四六级刷分小组',
    description: '四级/六级没考够分想刷分的同学看过来！组建刷分小组，每周做2套真题，互相监督打卡。已有学习资料和做题计划，就差你了。',
    members: '10/15人',
    currentMembers: 10,
    maxMembers: 15,
    location: '线上+自习室',
    deadline: '2025-10-31',
    tags: ['四六级', '英语', '刷分'],
    requirements: ['想提高四六级成绩', '能坚持做题'],
    creator: '白同学 · 商学院',
    createTime: '2025-10-24'
  }
];

// 获取类型信息
function getTypeInfo(typeId) {
  return TEAM_TYPES.find(t => t.id === typeId) || TEAM_TYPES[7];
}

// 获取所有组队数据（附加类型信息）
function getAllTeams() {
  return MOCK_TEAMS.map(team => {
    const typeInfo = getTypeInfo(team.type);
    return {
      ...team,
      typeIcon: typeInfo.icon,
      typeName: typeInfo.name,
      typeColor: typeInfo.color
    };
  });
}

// 根据类型筛选
function getTeamsByType(typeId) {
  if (!typeId) {
    return getAllTeams();
  }
  return getAllTeams().filter(team => team.type === typeId);
}

// 根据ID获取单个组队
function getTeamById(id) {
  const team = MOCK_TEAMS.find(t => t.id === id);
  if (!team) return null;
  
  const typeInfo = getTypeInfo(team.type);
  return {
    ...team,
    typeIcon: typeInfo.icon,
    typeName: typeInfo.name,
    typeColor: typeInfo.color
  };
}

module.exports = {
  TEAM_TYPES,
  MOCK_TEAMS,
  getAllTeams,
  getTeamsByType,
  getTeamById
};

