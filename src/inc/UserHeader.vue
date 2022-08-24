<template>
    <nav class="topnav navbar navbar-light">
      <notifications group="master"/>
        <button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
          <i class="fe fe-menu navbar-toggler-icon"></i>
        </button>
        <form class="form-inline mr-auto searchform text-muted">
          <input class="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted" type="search" placeholder="Type something..." aria-label="Search">
        </form>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link text-muted my-2" href="#" id="modeSwitcher" data-mode="dark">
              <p class="text-white text-bold">{{user.name}}</p>
            </a>
          </li>
          <li class="nav-item" @click.prevent="logout">
            <a class="nav-link text-muted my-2" href="#">
              <strong style="color:red">Logout <i class="fe fe-log-out fe-4"></i></strong>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="avatar avatar-sm mt-2">
                <img src="/assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle">
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Profile</a>
              <a class="dropdown-item" href="#">Settings</a>
              <a class="dropdown-item" href="#">Activities</a>
            </div>
          </li>
        </ul>
      </nav>
</template>

<script>
import Auth from '../api/auth.js'
import Api from "../api/index.js"
export default {
  name: 'UserHeader',
  data(){
    return {
      user: Auth.user,
      token: Auth.token
    }
  },
  methods: {
    logout(){
      Api().post('logout', this.user, this.token)
        .then(() => {
          Auth.logout()
        })
        this.$notify({ type: "success", group: "master", title: "Logging out" })
        let self = this
          setTimeout(function(){
            self.$router.push({path: '/login'})
        }, 4000)
        this.$notify({ type: "success", group: "master", title: "Logged out" })
    }
  },
  mounted(){
    console.log(this.user)
  }
    
}
</script>
