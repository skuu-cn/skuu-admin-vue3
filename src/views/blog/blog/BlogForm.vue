<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="广场id" prop="squareId">
        <el-input v-model="formData.squareId" placeholder="请输入广场id" />
      </el-form-item>
      <el-form-item label="话题id" prop="topicId">
        <el-input v-model="formData.topicId" placeholder="请输入话题id" />
      </el-form-item>
      <el-form-item label="分类，1:普通，2:求助，3:助力" prop="categary">
        <el-input v-model="formData.categary" placeholder="请输入分类，1:普通，2:求助，3:助力" />
      </el-form-item>
      <el-form-item label="类型，1:图文，2:视频" prop="blogType">
        <el-select v-model="formData.blogType" placeholder="请选择类型，1:图文，2:视频">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor v-model="formData.content" height="150px" />
      </el-form-item>
      <el-form-item label="资源列表" prop="resources">
        <el-input v-model="formData.resources" placeholder="请输入资源列表" />
      </el-form-item>
      <el-form-item label="地区" prop="addressId">
        <el-input v-model="formData.addressId" placeholder="请输入地区" />
      </el-form-item>
      <el-form-item label="共享类型。1:公开，2:私密，3:仅朋友可看" prop="shareType">
        <el-select v-model="formData.shareType" placeholder="请选择共享类型。1:公开，2:私密，3:仅朋友可看">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
  import {BlogApi, BlogVO} from '@/api/blog/blog'
  // import {handleTree} from '@/utils/tree'
      
/** 博客 表单 */
defineOptions({ name: 'BlogForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  squareId: undefined,
  topicId: undefined,
  categary: undefined,
  blogType: undefined,
  content: undefined,
  resources: undefined,
  addressId: undefined,
  shareType: undefined
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await BlogApi.getBlog(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as BlogVO
    if (formType.value === 'create') {
      await BlogApi.createBlog(data)
      message.success(t('common.createSuccess'))
    } else {
      await BlogApi.updateBlog(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    squareId: undefined,
    topicId: undefined,
    categary: undefined,
    blogType: undefined,
    content: undefined,
    resources: undefined,
    addressId: undefined,
    shareType: undefined
  }
  formRef.value?.resetFields()
}
</script>