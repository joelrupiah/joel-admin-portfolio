<template>
 <div class="container-fluid">
  <notifications group="login"/>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="row">
          <!-- login card -->
          <div class="col-md-12 my-4">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title text-center">Sign In</h5>
                <input type="email" name="email" v-model="form.email" placeholder="enter email address">
                <input type="password" name="password" v-model="form.password" placeholder="enter password">
                <button class="btn btn-success btn-sm text-white" @click.prevent="login">Sign In</button>
              </div>
            </div>
          </div>
          <!-- login card -->
        </div>
        <!-- end section -->
      </div>
      <!-- .col-12 -->
    </div>
    <!-- .row -->

  </div>
</template>

<script>
import Auth from "../../api/auth.js"
import Api from "../../api/index.js"
export default {
    name: 'Login',
    data(){
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods:{
        login(){
            Api().post('login', this.form)
              .then(({data}) => {
                Auth.login(data.access_token, data.user)
              })
              this.$notify({ type: "success", group: "login", title: "Login successful redirecting...." })
              let self = this
              setTimeout(function(){
                self.$router.push({path: '/'})
              }, 4000)
        }
    }
}
</script>