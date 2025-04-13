import request from '@/config/axios'

// 博客 VO
export interface BlogVO {
  id: number // id
  squareId: number // 广场id
  topicId: number // 话题id
  categary: number // 分类，1:普通，2:求助，3:助力
  blogType: number // 类型，1:图文，2:视频
  content: string // 内容
  resources: string // 资源列表
  addressId: number // 地区
  shareType: number // 共享类型。1:公开，2:私密，3:仅朋友可看
}

// 博客 API
export const BlogApi = {
  // 查询博客分页
  getBlogPage: async (params: any) => {
    return await request.get({ url: `/blog/blog/page`, params })
  },

  // 查询博客详情
  getBlog: async (id: number) => {
    return await request.get({ url: `/blog/blog/get?id=` + id })
  },

  // 新增博客
  createBlog: async (data: BlogVO) => {
    return await request.post({ url: `/blog/blog/create`, data })
  },

  // 修改博客
  updateBlog: async (data: BlogVO) => {
    return await request.put({ url: `/blog/blog/update`, data })
  },

  // 删除博客
  deleteBlog: async (id: number) => {
    return await request.delete({ url: `/blog/blog/delete?id=` + id })
  },

  // 导出博客 Excel
  exportBlog: async (params) => {
    return await request.download({ url: `/blog/blog/export-excel`, params })
  }
}