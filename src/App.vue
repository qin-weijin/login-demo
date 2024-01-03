<template>
  <div id="app">
  <router-view #="{ Component }">
    <component :is="Component" />
  </router-view>
  </div>
</template>
<script setup lang="ts"></script>