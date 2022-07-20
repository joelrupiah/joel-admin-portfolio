<template>
    <div class="wrapper">
      <UserHeader v-if="!['AdminLogin'].includes($route.name)" />
      <SideBar v-if="!['AdminLogin'].includes($route.name)" />
      <main role="main" class="main-content">
        <div class="container-fluid">
          <router-view></router-view>
        </div> <!-- .container-fluid -->
      </main> <!-- main -->
    </div> <!-- .wrapper -->
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import UserHeader from '../inc/UserHeader.vue'
import SideBar from '../inc/SideBar.vue'

export default {
  name: 'App',
  components: {
    UserHeader,
    SideBar
  }
}
</script>