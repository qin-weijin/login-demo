<template>
  <Layout.Header class="layout-header">
    <Space :size="20">
      <Avatar :src="userInfo.headImg" :alt="userInfo.name">{{ userInfo.name }}</Avatar>
    </Space>
    <Space :size="20">
      <Menu>
        <Menu.Item><div @click.prevent="doLogout">
          <poweroff-outlined /> 退出系统
        </div></Menu.Item>
      </Menu>
    </Space>
  </Layout.Header>
  <div class="box">
    <img src="~@/assets/analysis.svg" />
    <Descriptions title="系统信息" bordered>
      <Descriptions.Item key="IP" label="IP">{{ loginIp }}</Descriptions.Item>   
      <!-- <Descriptions.Item v-for="(value, key) in browserInfo" :key="key" :label="key">{{ value }}</Descriptions.Item> -->
      <Descriptions.Item label="网络状态">网络状态</Descriptions.Item>
      <Descriptions.Item label="WebSocket连接情况">WebSocket连接情况</Descriptions.Item>
    </Descriptions>    
  </div>
</template>

<script lang="ts" setup>
  import { h } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { PoweroffOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Layout, Menu, Space, Avatar, Modal, Descriptions, Badge } from 'ant-design-vue';

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  const loginIp = "loginIp"
  // 获取浏览器信息
  const browserInfo = "browserInfo"

  const userInfo = {
    headImg: 'User',
    name: 'User'

  }

  // 退出登录
  const doLogout = () => {
    Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: h(QuestionCircleOutlined),
      centered: true,
      onOk: async () => {
        await userStore.logout()
        router.replace({ name: 'Login', query: {redirect: route.fullPath} });    
      }      
    })
  }
</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    position: sticky;
    z-index: 10;
    top: 0;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;

    * {
      cursor: pointer;
    }
  }
  .box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 280px);
    padding: 12px;
    img {
      flex: 1;
      min-height: 0;
    }
  }
</style>
