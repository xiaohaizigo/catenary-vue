<template>

  <el-menu
    :default-active="activeIndex2"
    class="admin-header"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item style="width: 250px">
    <img src="../../assets/Tielulogo.png" style="height: 60px;margin-top: 15px;margin-left: -30px"/>
      <span style="font-family: 宋体;font-weight: bold;font-size: 20px;">接触网管理系统</span>
    </el-menu-item>
    <el-menu-item index="1" class="item-pos">处理中心</el-menu-item>
    <el-submenu index="2" class="item-pos">
      <template slot="title"  >我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="3" disabled  class="item-pos">消息中心</el-menu-item>
    <el-menu-item style="position: relative;left: 1200px;top: 10px">
      <el-avatar :size="60" src="https://empty" @error="errorHandler" >
        <img src="../../assets/avator.png"/>
      </el-avatar>
    </el-menu-item>
    <el-submenu index="5" style="position: relative;left: 1180px;top: 10px;height: 66px;">
      <template slot="title" >{{this.$store.state.user.xingMing}}</template>
      <el-menu-item index="2-1">我的信息</el-menu-item>
      <el-menu-item index="2-2">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import {createRouter} from '../../router'

export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    logout () {
      var _this = this
      // this.$axios.get('/logout').then(resp => {
      //   if (resp && resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/login')
          // 清空路由，防止路由重复加载
      //     const newRouter = createRouter()
      //     _this.$router.matcher = newRouter.matcher
      //   }
      // }).catch(failResponse => {})
    },
    handleSelect(key, keyPath) {
      if(key==="2-2")
      {
          this.logout();
      }
    }
  }
}
</script>

<style scoped>
.admin-header {
  height: 80px;
  line-height: 40px;
  min-width: 1200px;
  top: -8px;

}
el-menu-item
{
  position: relative;
  height: 80px;
}
.el-icon-switch-button {
  cursor: pointer;
  outline:0;
}
.item-pos{
  margin-top: 15px;
}
</style>
