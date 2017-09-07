<template>
  <div id="app">
    <meta-header></meta-header>
    <router-view></router-view>
  </div>
</template>

<script>
import metaHeader from '@/components/header.vue'

export default {
  name: 'app',
  components: {
    metaHeader
  }
}
</script>

