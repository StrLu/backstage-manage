<template>
  <div class="login">
    <div class="form-wrap">
      <div class="form-logo">
        <img src="./logo_index.png" alt="啦啦啦">
      </div>
      <el-form :model="form" :rules="rules" ref="form" class="form-content">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="11">
            <el-input v-model="form.code" placeholder="输入验证码"></el-input>
          </el-col>
          <el-col :offset="2" :span="11">
            <el-button
              :disabled="!!codeTimer"
              :loading="codeLoading"
              @click="handleSendCode"
            >{{ codeTimer ? `${codeTimerSeconds}秒后重试`:'获取验证码' }}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox class="agree-checkbox" v-model="form.checked"></el-checkbox>
          <span class="agree-text">
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            class="loginbtn"
            :disabled="loginFlag"
            type="primary"
            @click="handleLogin"
            :loading="loginLoading"
          >立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { saveUser } from '@/utils/auth'
import initGeetest from '@/utils/initGeetest'

const initCodeTimeSecond = 60

export default {
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        checked: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: '请输入11位的有效手机号',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            pattern: /^\d{6}$/,
            message: '请输入6位数字验证码',
            trigger: 'blur'
          }
        ],
        checked: [
          { pattern: /true/, message: '请阅读并同意用户协议和隐私条款' }
        ]
      },
      codeTimer: null,
      codeTimerSeconds: initCodeTimeSecond,
      codeLoading: false,
      loginLoading: false
    }
  },
  methods: {
    handleSendCode () {
      // 验证手机号是否有效
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return null
        }
        // 验证通过，执行初始化验证码操作
        this.initCode()
      })
    },
    async initCode () {
      try {
        this.codeLoading = true
        const { mobile } = this.form
        const data = await this.$http({
          method: 'GET',
          url: `/captchas/${mobile}`
        })
        const captchaObj = await initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 验证模式  弹出式
        })
        captchaObj.onReady(() => {
          captchaObj.verify() // 弹出验证码内容框
          this.codeLoading = false
        }).onSuccess(async () => {
          try {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate
            } = captchaObj.getValidate()
            await this.$http({
              method: 'GET',
              url: `hsms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            })
            // 成功发送短信，执行倒计时
            this.countDown()
          } catch {
            this.$message.error('获取验证码失败')
            this.codeLoading = false
          }
        })
      } catch {
        this.$message.error('获取验证码失败')
        this.codeLoading = false
      }
    },
    // 倒计时
    countDown () {
      this.flag = true
      this.codeTimer = setInterval(() => {
        this.codeTimerSeconds--
        if (this.codeTimerSeconds <= 0) {
          window.clearInterval(this.codeTimer)
          this.codeTimerSeconds = initCodeTimeSecond
          this.codeTimer = null
          this.flag = false
        }
      }, 1000)
    },
    handleLogin () {
      this.$refs['form'].validate(error => {
        if (!error) {
          return null
        }
        // 表单验证通过，提交登录请求
        this.submitLogin()
      })
    },
    async submitLogin () {
      // 禁用登录按钮
      this.loginLoading = true
      try {
        const userInfo = await this.$http({
          method: 'POST',
          // url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          url: '/authorizations',
          data: {
            mobile: this.form.mobile,
            code: this.form.code
          }
        })
        // 登录成功  200<= 的状态会进入这里 <=400
        saveUser(userInfo)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      } catch (error) {
        // >=400 的状态会进入这里
        this.$message.error('登录失败，手机号或验证码错误！')
      }
      this.loginLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background: url(./login_bg.jpg) no-repeat center center;
  background-size: cover;
  .form-wrap {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 270px;
    height: 320px;
    padding: 30px;
    border: 1px solid #ccc;
    margin: auto;
    background: #fff;
    .form-logo {
      padding: 0 10px 30px;
      img {
        width: 100%;
      }
    }
    .loginbtn {
      width: 100%;
    }
    .sendCode {
      float: right;
    }
    .agree-checkbox {
      margin-right: 10px;
    }
    .agree-text a {
      color: #409eff;
      text-decoration: none;
    }
  }
}
</style>
