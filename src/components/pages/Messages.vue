<template>
    <div class="container-fluid">
      <notifications group="message"/>
      <div class="row justify-content-center">
        <div class="col-12">
          <h2 class="page-title">Messages table</h2>
          <div class="row">
            <!-- simple table -->
            <div class="col-md-12 my-4">
              <div class="card shadow">
                <div class="card-body">
                  <h5 class="card-title">Message List</h5>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(message, index) in messages"
                        :key="message.id"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ message.name }}</td>
                        <td>{{ moment(message.created_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}</td>
                        <td>
                          <span>
                            <RouterLink :to="`/reply-message/${message.id}`">
                              <el-button type="primary" size="small">Reply</el-button>
                            </RouterLink>
                            <el-button type="danger" size="small" @click.prevent="messageDeleteModal(message.id)">Delete</el-button>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- simple table -->
          </div>
          <!-- end section -->
        </div>
        <!-- .col-12 -->
      </div>
      <!-- .row -->
  
      <el-dialog
      v-model="deleteContactModal"
      title="Caution"
      width="30%"
    >
      <span>Do you want to delete ?</span>
      <span>Once deleted it won't be retrieved</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" size="small" @click.prevent="closeDeleteModal">Cancel</el-button>
          <el-button type="danger" size="small" @click.prevent="deleteContact()" :loading="loading">
          {{ loading ? "Deleting Contact....." : "Delete Contact" }}
          </el-button
          >
        </span>
      </template>
    </el-dialog>
  
    </div>
  </template>
  
  <script>
  import Api from "../../api/index.js"
  import moment from "moment"
  export default{
      name: 'Messages',
      data() {
      return {
        editMode: false,
        loading: false,
        deleteContactModal: false,
        messageDeleteId: '',
        errors: [],
        messages: [],
        
      }
    },
    methods: {
      messageDeleteModal(id){
        this.messageDeleteId = id
        this.deleteContactModal = true
      },
      closeDeleteModal(){
        this.deleteContactModal = false
      },
      getMessages: async function () {
        Api()
          .get("/admin/get-messages")
          .then((response) => {
            this.messages = response.data.messages
          })
      },
      deleteContact: async function(){
        this.loading = true
        Api().delete("/admin/delete-message/" + this.messageDeleteId)
          .then(() => {
            this.deleteContactModal = false
            this.loading = false
            this.$notify({ type: "success", group: "message", title: "Message deleted" })
            this.getMessages()
          })
      }
    },
    mounted() {
      this.getMessages()
    },
    computed:{
      
    },
    created(){
      this.moment = moment
    }
  }
  </script>