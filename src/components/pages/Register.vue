<template>
 <div class="container-fluid">
  <notifications group="register"/>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="row">
          <!-- login card -->
          <div class="col-md-12 my-4">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title text-center">Sign Up</h5>
                <input type="email" name="email" v-model="form.name" placeholder="enter email full name">
                <input type="email" name="email" v-model="form.email" placeholder="enter email address">
                <input type="password" name="password" v-model="form.password" placeholder="enter password">
                <input type="password" name="password" v-model="form.password_confirmation" placeholder="confirm password">
                <button class="btn btn-success btn-sm text-white" @click.prevent="register">Sign Up</button>
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
import Api from '../../api/index.js'
export default {
    name: 'Register',
    data(){
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    methods:{
        register(){
            Api().post('register', this.form)
              .then(() => {
                this.$notify({ type: "success", group: "register", title: "Register successful, please login to continue" })
              })
              let self = this
              setTimeout(function(){
                self.$router.push({path: '/login'})
              }, 4000)
        }
    }
}
</script>