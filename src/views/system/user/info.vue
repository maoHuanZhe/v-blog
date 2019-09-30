<template>
    <el-dialog
            title="用户信息"
            :close-on-click-modal="false"
            :visible.sync="visible">
            <p>
                <span>用户名：</span><span>{{user.username}}</span>
            </p>
            <p>
                <span>邮箱：</span><span>{{user.email}}</span>
            </p>
            <p>
                <span>联系电话：</span><span>{{user.mobile}}</span>
            </p>
            <p>
                <span>状态：</span><span>{{user.status}}</span>
            </p>
            <p>
                <span>创建时间：</span><span>{{user.createTime}}</span>
            </p>
            <p>
                <span>修改时间：</span><span>{{user.modifyTime}}</span>
            </p>
            <p>
                <span>最近访问时间：</span><span>{{user.lastLoginTime}}</span>
            </p>
            <p>
                <span>性别：</span><span>{{user.sex}}</span>
            </p>
    </el-dialog>
</template>

<script>
    export default {
        name: "info",
        data() {
            return {
                visible : false,
                user: {
                    username : "fgrapp",
                    email : "fgrapp",
                    mobile : "fgrapp",
                    status : "fgrapp",
                    createTime : "fgrapp",
                    modifyTime : "fgrapp",
                    lastLoginTime : "fgrapp",
                    sex : "fgrapp",
                }
            }
        }
    }
</script>

<style scoped>

</style>
