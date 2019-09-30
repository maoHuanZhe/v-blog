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
            <el-form-item label="用户名" prop="username">
                <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="url">
                <el-input v-model="dataForm.password" placeholder="新用户默认密码为:123456" readonly></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="dataForm.mobile" placeholder="手机"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
                <el-select v-model="dataForm.roleId" multiple value-key="dataForm.roleId">
                    <el-option
                            v-for="role in roleData"
                            :key="role.roleId"
                            :value="role.roleId"
                            :label="role.roleName"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio v-model="dataForm.sex" label="0">男</el-radio>
                <el-radio v-model="dataForm.sex" label="1">女</el-radio>
                <el-radio v-model="dataForm.sex" label="2">保密</el-radio>
            </el-form-item>
            <el-form-item label="是否有效" prop="status">
                <el-switch
                        v-model="dataForm.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="1"
                        inactive-value="0">
                </el-switch>
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
    import {getUserById, save, update, batchDelete, getAllRoles} from '@/api/system/user'
    export default {
        name : "addOrUpdate",
        data () {
            return {
                visible: false,
                confirmButtonDisabled: false,
                dataForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                    roleId: [],
                    sex: '2',
                    status: "1"
                },
                dataRule: {
                    username: [{ required: true, message: '用户名不能为空', trigger: 'blur'}],
                    password: [{initialValue:'123456'}],
                    email: [{ required: true, message: '邮箱不能为空', trigger: 'blur'},
                            { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
                            { max: 50, message: '长度不能超过50个字符', trigger: 'blur'}
                            ],
                    mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur'},
                        { pattern: '^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$', message: '请输入正确的手机号', trigger: 'blur'}],
                    roleId: [{ required: true, message: '请选择角色', trigger: 'blur'}],
                },
                roleData: []
            }
        },
        methods: {
            init (id) {
                this.dataForm.id = id || ''
                this.visible = true
                this.confirmButtonDisabled = false
                getAllRoles().then(result => {
                    this.roleData = result.data;
                    if (this.dataForm.id) {
                        getUserById(this.dataForm.id).then((data) => {
                            if (data && data.code === 200) {
                                this.dataForm = data.user;
                                const roleIds = data.user.roleId.split(",");
                                let arr =  [];
                                for (let i = 0; i < roleIds.length; i++){
                                    arr.push(parseInt(roleIds[i]));
                                }
                                this.dataForm.roleId = arr;
                            }
                        })
                    }else {
                        this.dataForm= {
                            username: '',
                                password: '',
                                email: '',
                                mobile: '',
                                roleId: [],
                                sex: '2',
                                status: "1"
                        }
                    }
                })

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
                            this.dataForm.roleId = this.dataForm.roleId.join(",");
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
        }
    }
</script>
<style>
</style>
