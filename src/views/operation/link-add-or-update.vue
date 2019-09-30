<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-form-item label="链接名称" prop="title">
        <el-input v-model="dataForm.title" placeholder="链接名称"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="url">
        <el-input v-model="dataForm.url" placeholder="链接地址"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="url"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="dataForm.avatar" :src="dataForm.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="dataFormSubmit()"
                 :disabled="confirmButtonDisabled">
        确定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {getinfo, save, update, batchDelete} from '@/api/operation/link'
  export default {
    data () {
      return {
        visible: false,
        confirmButtonDisabled: false,
        dataForm: {
          avatar: ''
        },
        dataRule: {
          id: [{ required: true, message: '主键不能为空', trigger: 'blur' }],
          title: [{ required: true, message: '链接名称不能为空', trigger: 'blur' }],
          url: [{ required: true, message: '链接地址不符合规范', pattern: '(http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&amp;:/~\\+#]*[\\w\\-\\@?^=%&amp;/~\\+#])?', trigger: 'blur' }]
        },
        url: ''
      }
    },
  methods: {
    init (id) {
      this.dataForm.id = id || ''
      this.visible = true
      this.confirmButtonDisabled = false
      if (this.dataForm.id) {
          getinfo(this.dataForm.id).then((data) => {
              if (data && data.code === 200) {
                  this.dataForm = data.link
              }
          })
      } else {
          this.dataForm = {}
      }
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.dataForm.id){
              save(this.dataForm).then((data) => {
                  this.confirmButtonDisabled = true
                  if (data && data.code === 200) {
                      this.$message({
                          message: '操作成功',
                          type: 'success',
                          duration: 1000,
                          onClose: () => {
                              this.visible = false
                              this.$emit('refreshDataList')
                          }
                      })
                  } else {
                      this.$message.error(data.msg)
                  }
              })
          } else {
              update(this.dataForm).then((data) => {
                  this.confirmButtonDisabled = true
                  if (data && data.code === 200) {
                      this.$message({
                          message: '操作成功',
                          type: 'success',
                          duration: 1000,
                          onClose: () => {
                              this.visible = false
                              this.$emit('refreshDataList')
                          }
                      })
                  } else {
                      this.$message.error(data.msg)
                  }
              })
          }
        }
      })
    },
    handleAvatarSuccess (response) {
      if (response && response.code === 200) {
        this.dataForm.avatar = response.resource.url
        this.$message.success('上传成功！')
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是jpg、png、gif格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
