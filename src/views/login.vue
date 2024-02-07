<template>
  <div class="login-box">
    <div class="login-logo">
      <img src="~@/assets/images/logo.png" width="45" />
      <h1 class="mb-0 ml-2 text-3xl font-bold">Antd Admin</h1>
    </div>

    <!-- Username -->
    <a-form layout="horizontal" :model="state.formInline" @submit.prevent="handleSubmit">
      <a-form-item>
        <a-input v-model:value="state.formInline.username" size="large" placeholder="admin">
          <template #prefix><user-outlined type="user" /></template>
        </a-input>
      </a-form-item>

      <!-- Password -->
      <a-form-item>
        <a-input
          v-model:value="state.formInline.password"
          size="large"
          type="password"
          placeholder="123456"
          autocomplete="new-password"
        >
          <template #prefix><lock-outlined type="user" /></template>
        </a-input>
      </a-form-item>

      <!-- verifyCode -->      
      <a-form-item>
        <a-input
          v-model:value="state.formInline.verifyCode"
          placeholder="验证码"
          :maxlength="4"
          size="large"
        >
          <template #prefix><SafetyOutlined /></template>
          <template #suffix>
            <img
              :src="state.captcha"
              class="absolute right-0 h-full cursor-pointer"
              @click="setCaptcha"
            />
          </template>
        </a-input>
      </a-form-item>

      <!-- remember -->
      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="state.remember">Remember me</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">Forgot password</a>
      </a-form-item>

      <!-- submit -->
      <a-form-item>
        <a-button type="primary" html-type="submit" size="large" :disabled="disabled" block>Log in</a-button>
        Or <a href="">register now!</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, computed } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue'
  import { message, Modal } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import { to } from '@/utils/awaitTo';
  import { getImageCaptcha } from '@/utils/request'
  import { useRoute, useRouter } from 'vue-router';  

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const state = reactive({
    remember: true,
    captcha: '',
    formInline: {
      username: '',
      password: '',
      captchaId: '',
      verifyCode: '',
    }
  });

  // 验证用户名、密码、验证码不为空。
  const disabled = computed(() => {
    return !(state.formInline.username && state.formInline.password && state.formInline.verifyCode);
  });
  // 提交登录
  const handleSubmit = async () => {
    const patt = /^\w{5,12}$/;
    const { username, password, verifyCode } = state.formInline;    
    if(!patt.test(username) && !patt.test(password)){ 
      return message.warning("用户名或密码必须由 5~12 位数字、字符串或下划线组成！") 
    } else if(verifyCode.length < 4){
      return message.warning("验证码必须为四位数字或字符串！")
    }
    const [err] = await to(userStore.login(state.formInline))
    if (err) {
      console.log(err)
      setCaptcha()
    } else {
      message.success('登录成功！');
      setTimeout(() => router.replace('/'));
      // setTimeout(() => router.replace((route.query.redirect as string) ?? '/'));
    }
    message.destroy()
  }
  // 获取验证码
  const setCaptcha = async<T = any>(): Promise<T> => {
    try {
      const {img, id} = await getImageCaptcha({ width: 100, height: 50 })      
      state.captcha = img;
      state.formInline.captchaId = id;
    } catch (error: any) { return Promise.reject(error); }    
  }
  setCaptcha()
</script>
<style lang="less" scoped>
  .login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-top: 240px;
    background: url('@/assets/login.svg');
    background-size: 100%;

    .login-logo {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      .svg-icon {
        font-size: 48px;
      }
    }

    :deep(.ant-form) {
      width: 400px;

      .ant-col {
        width: 100%;
      }

      .ant-form-item-label {
        padding-right: 6px;
      }
    }
  }
</style>
