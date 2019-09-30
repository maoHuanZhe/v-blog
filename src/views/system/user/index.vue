<template>
    <div class="app-container">
        <el-form :inline="true"
                 :model="dataForm"
                 @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input v-model="dataForm.username" placeholder="用户名" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                <el-button type="warning"
                           @click="resetPassword()"
                           :disabled="dataListSelections.length <= 0">
                    重置密码
                </el-button>
                <el-button type="danger"
                           @click="deleteHandle()"
                           :disabled="dataListSelections.length <= 0">
                    批量删除
                </el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList"
                  border
                  v-loading="dataListLoading"
                  @selection-change="selectionChangeHandle"
                  style="width: 100%;"
                  size="mini">
            <el-table-column
                    type="selection"
                    header-align="center"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="username"
                    header-align="center"
                    align="center"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    header-align="center"
                    align="center"
                    label="性别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">
                        {{ scope.row.sex | sexStr }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="email"
                    header-align="center"
                    align="center"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    header-align="center"
                    align="center"
                    label="电话">
            </el-table-column>
            <el-table-column
                    prop="status"
                    header-align="center"
                    align="center"
                    label="状态">
                <template slot-scope="scope">
                    <el-button size="mini" :type="scope.row.status==='0'?'danger':'success'">{{scope.row.status | statusStr}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    header-align="center"
                    align="center"
                    width="250"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    header-align="center"
                    align="center"
                    width="150"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text"
                               size="small"
                               @click="addOrUpdateHandle(scope.row.id)">
                        修改
                    </el-button>
                    <el-button type="text"
                               size="small"
                               @click="getInfo(scope.row.id)">
                        查看
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :total="totalPage"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible"
                       ref="addOrUpdate"
                       @refreshDataList="getDataList"></add-or-update>
        <info ref="info">

        </info>
    </div>
</template>

<script>
    import {getPage, batchDelete, batchReset, getUserById} from '@/api/system/user'
    import addOrUpdate from "./add-or-update"
    import info from "./info"
    export default {
        components : {
            addOrUpdate,
            info
        },
        data () {
            return {
                dataForm: {
                    username: ''
                },
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false
            }
        },
        created () {
            this.getDataList()
        },
        methods: {
            // 获取数据列表
            getDataList () {
                this.dataListLoading = true
                getPage({
                    'page': this.pageIndex,
                    'limit': this.pageSize,
                    'username': this.dataForm.username
                }).then((data) => {
                    if (data && data.code === 200) {
                        this.dataList = data.data.rows;
                        this.totalPage = data.data.total;
                    } else {
                        this.dataList = []
                        this.totalPage = 0
                    }
                    this.dataListLoading = false
                })
            },
            getInfo(id){
                getUserById(id).then(res =>{
                    this.$refs.info.user = res.user;
                    this.$refs.info.visible = true;
                })
            },
            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.getDataList()
            },
            // 多选
            selectionChangeHandle (val) {
                this.dataListSelections = val
            },
            // 新增 / 修改
            addOrUpdateHandle (id) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
            // 删除
            deleteHandle () {
                var ids = this.dataListSelections.map(item => item.id)
                this.$confirm(`确定对这${ids.length}条数据进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    batchDelete(ids).then((data) => {
                        if (data && data.code === 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.getDataList()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                })
            },
            // 重置密码
            resetPassword() {
                var ids = this.dataListSelections.map(item => item.id)
                this.$confirm(`确定将这${ids.length}条数据的密码重置为123456?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    batchReset(ids).then((data) => {
                        if (data && data.code === 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.getDataList()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                })
            }
        },
        filters:{
            sexStr(value){
                // 性别 0男 1女 2保密
                if (value === "0") {
                    return "boy"
                }else if (value === "1"){
                    return "girl"
                } else {
                    return "undefined"
                }
            },
            statusStr(value){
                if (value === "0"){
                    return "锁定"
                }else {
                    return "有效"
                }
            }
        }
    }
</script>

<style scoped>

</style>
