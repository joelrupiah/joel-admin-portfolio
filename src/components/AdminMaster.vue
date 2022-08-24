<template>
    <div class="wrapper">
      <UserHeader v-if="!['Login', 'Register'].includes($route.name)" />
      <SideBar v-if="!['Login', 'Register'].includes($route.name)" />
      <main role="main" class="main-content">
        <div class="container-fluid">
          <router-view></router-view>
        </div> <!-- .container-fluid -->
      </main> <!-- main -->
    </div> <!-- .wrapper -->
</template>

<script>
import Auth from '../api/auth.js'
import UserHeader from '../inc/UserHeader.vue'
import SideBar from '../inc/SideBar.vue'

export default {
  name: 'App',
  components: {
    UserHeader,
    SideBar
  },
  data(){
    return {
      authenticatedUser: Auth.user
    }
  },
  mounted(){
    console.log(Auth.user)
  }
}
</script>