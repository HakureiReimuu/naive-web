<template>
  <div class="login-container bg-gradient-to-br from-blue-500 to-pink-400">
    <el-card class="login-box container mx-auto">
      <div slot="header">
        <span>登录</span>
      </div>
      <div>
        <el-form>
          <el-form-item>
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-input></el-input>
          </el-form-item>
          <el-form-item class="float-right">
            <el-button>让我访问！</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="less" scoped>
.login-container {
  //background-color: aliceblue;
  height: 100vh;
}

.login-box {
  width: 480px;
  //height: 300px;
  border-radius: 5px;
  //position: absolute;
  //left: 50%;
  //top: 50%;
  //transform: translate(-50%, -50%);
}
</style>
