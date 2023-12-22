<template>
  <h1>This View Login</h1>
  <button @click="handleSubmit">Submit</button>
  <button @click="setCaptcha">setCaptcha</button>
</template>
<script setup lang="ts">
  import { reactive } from 'vue';
  import { login } from '@/store/request';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/utils/Storage';
  import { getImageCaptcha } from '@/utils/request';
  import axios from "axios"
  const route = useRoute();
  const router = useRouter();
  const state = reactive({
    formInline: {
      username: 'rootadmin',
      password: '123456',
      verifyCode: 'verifyCode',
      captchaId: 'captchaId',
    },
  }); 

  const handleSubmit = async () => {
    const [err] = await to(userStore.login(state.formInline));
    if (err) {
      console.log('错误')
    } else { console.log('成功') }
  };   
  const setCaptcha = async () => {
    const { id, img } = await getImageCaptcha({ width: 100, height: 50 });
    console.log(id)
    console.log(img)
  }
</script> 