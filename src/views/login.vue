<template>
    <section class="page index">
      <div class="login-box">
        <el-row>
          <el-form ref="login-form" :model="loginModel" :rules="loginRule">
            <el-row type="flex"  style="margin-top:50px">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="loginModel.username" placeholder="请输入用户名" @on-keyup.enter="submitForm">
                </el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginModel.password" placeholder="请输入密码" @on-keyup.enter="submitForm">
                </el-input>
              </el-form-item>
            </el-row>
            <el-row type="flex" justify="center" style="margin-top:20px">
              <el-form-item>
                <el-button type="primary" width="200px" @click="submitForm">登录</el-button>
                <el-button type="primary" width="200px" @click="register">注册</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataAPi from '@/api/data-api'
@Component
export default class Login extends Vue{
  private loginModel: object = {
    username:'',
    password:''
  }
  private loginRule:object = {
    username: [{required: true, message: "用户名不能为空", trigger: "blur"}],
    password: [{required: true, message: "密码不能为空", trigger: "blur"}]
  }
  private submitForm() {
    const loginForm:any = this.$refs['login-form'] as HTMLElement
    loginForm.validate(valid => {
      if(!valid) return
      DataAPi.login(this.loginModel).subscribe(data => {
        this.$router.push('/home')
      },({msg}) => {this.$notify.error({title: '错误', message: msg})})
    })
  }
  private register() {
    const loginForm:any = this.$refs['login-form'] as HTMLElement
    loginForm.validate(valid => {
      if(!valid) return
      DataAPi.register(this.loginModel).subscribe(data => {
        this.$notify.success({title: '成功', message: data.msg})
      },({msg}) => {this.$notify.error({title: '错误', message: msg})})
    })
  }
}
</script>

<style lang="less" scoped>
  .page.index {
    background-image: url("../assets/images/bg6.jpg");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box{
      background: white;
      width: 450px;
      height: 440px;
      padding: 0 50px;
      &:hover {
        box-shadow: 1px 1px 10px 1px #ddd;
      }
    }
  }
</style>
