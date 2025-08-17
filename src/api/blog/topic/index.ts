import request from '@/config/axios'

// 主题列 VO
export interface TopicVO {
  id: number // id
  topicName: string // 主题名称
}

// 主题列 API
export const TopicApi = {
  // 查询主题列分页
  getTopicPage: async (params: any) => {
    return await request.get({ url: `/blog/topic/page`, params })
  },

  // 查询主题列详情
  getTopic: async (id: number) => {
    return await request.get({ url: `/blog/topic/get?id=` + id })
  },

  // 新增主题列
  createTopic: async (data: TopicVO) => {
    return await request.post({ url: `/blog/topic/create`, data })
  },

  // 修改主题列
  updateTopic: async (data: TopicVO) => {
    return await request.put({ url: `/blog/topic/update`, data })
  },

  // 删除主题列
  deleteTopic: async (id: number) => {
    return await request.delete({ url: `/blog/topic/delete?id=` + id })
  },

  // 导出主题列 Excel
  exportTopic: async (params) => {
    return await request.download({ url: `/blog/topic/export-excel`, params })
  }
}