<template>
    <div class="login">
        <div class="form-wrap">
            <div class="form-logo">
                <img src="./logo_index.png" alt="啦啦啦">
            </div>
            <el-form :model="form" :rules="rules" ref="form" class="form-content">
                <el-form-item  prop="mobile">
                    <el-input v-model="form.mobile" placeholder="输入手机号"></el-input>
                </el-form-item>
                <el-form-item  prop="code">
                    <el-col :span="11">
                        <el-input v-model="form.code" placeholder="输入验证码"></el-input>
                    </el-col>
                    <el-col :offset="2" :span="11">
                        <el-button class="sendCode" @click="handleSendCode">发送验证码</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item prop="checked">
                    <el-checkbox class="agree-checkbox" v-model="form.checked"></el-checkbox>
                    <span class="agree-text">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginbtn" type="primary" @click="handleLogin" >立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
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
          { pattern: /^\d{11}$/, message: '请输入11位手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入6位数字验证码', trigger: 'blur' }
        ],
        checked: [
          { pattern: /true/, message: '请阅读并同意用户协议和隐私条款' }
        ]
      }
    }
  },
  methods: {
    handleSendCode () {

    },
    handleLogin () {
      this.$refs['form'].validate(valid => {
        if (!valid) {

        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login{
    height: 100%;
    background: url(./login_bg.jpg)no-repeat;
    .form-wrap{
        position:absolute;
        left:0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 260px;
        height: 320px;
        padding: 30px;
        border: 1px solid #ccc;
        margin:auto;
        background: #fff;
        .form-logo {
            padding: 0 10px 30px;
            img{
                width: 100%;
            }
        }
        .loginbtn{
            width: 100%;
        }
        .sendCode{
            float: right;
        }
        .agree-checkbox{
            margin-right: 10px;
        }
        .agree-text a{
            color: #409eff;
            text-decoration: none;
        }
    }
}
</style>
