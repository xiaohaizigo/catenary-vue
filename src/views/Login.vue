<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <div class="maintext" style="position:relative; top: 40px;">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.GongHao"
                auto-complete="off" placeholder="工号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.KouLing"
                auto-complete="off" placeholder="口令"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
    </div>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        GongHao: '2018112722',
        KouLing: '123'
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      if(this.loginForm .GongHao==='')
      {
          this.$message({
            message: '工号不能为空',
            type:'warning'
          });
      }
      else if(this.loginForm.KouLing==='')
      {
        this.$message({
          message: '口令不能为空',
          type:'warning'
        });
      }
      else
      {
        let url=`http://localhost:8443/api/login/?GongHao=${this.loginForm.GongHao}&KouLing=${this.loginForm.KouLing}`
        this.$axios
          .get(url)
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data=successResponse.data.result
              this.$store.commit('login', data)

              this.$alert(JSON.parse(window.localStorage.getItem('user')).gongHao)

              //this.$alert(data)
              //this.$alert(666)

              var path = this.$route.query.redirect
              this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
              this.$alert(this.$store.state.user.gongHao)

            }
            else if(successResponse.data.code===400)
            {
              this.$message(
                {
                  message: '工号或者口令错误',
                  type:'error'
                }
              );
            }
          })
          .catch(failResponse => {

          })
      }

    }
  }
}
</script>

<style>
#poster {
  background: url("../assets/gaotie.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  top: -10px;
}
body{
  margin: 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 500px;
  height: 400px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

</style>

