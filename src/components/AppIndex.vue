<el-container>
<el-aside>
  <el-menu
    router
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <home-left :navMenus="leftMenus"/>
  </el-menu>
</el-aside>
<el-container>
  <el-main>
    <router-view/>
  </el-main>
  <script>
    import menuList from '../../util/menuConfig'
    export default {
      components: {HomeLeft},
      data() {
        return {
          leftMenus: menuList,
        }
      }
    }
  </script>
