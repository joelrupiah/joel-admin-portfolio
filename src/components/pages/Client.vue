<template>
  <div class="container-fluid">
    <notifications group="client"/>
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="page-title">Clients table</h2>
        <div class="row">
          <!-- simple table -->
          <div class="col-md-12 my-4">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Client List</h5>
                <el-button text @click="clientCreateModal()"
                  >open a Form nested Dialog</el-button
                >
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
                      v-for="(client, index) in clients"
                      :key="client.id"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ client.name }}</td>
                      <td>{{ moment(client.created_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}</td>
                      <td>
                        <span>
                          <el-button type="primary" size="small" @click.prevent="clientEditModal(client)">Edit</el-button>
                          <el-button type="danger" size="small" @click.prevent="clientDeleteModal(client.id)">Delete</el-button>
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

    <el-dialog v-model="clientModal"
    :title="form.id ? 'Edit Client' : 'Create Client'">
      <el-form :model="form">
        <el-form-item label="Client Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <span class="text-danger text-sm" v-if="errors.name">
            {{ errors.name[0] }}
        </span>
        <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click.prevent="closeClientModal">Cancel</el-button>
          <el-button
            type="primary"
            size="small"
            :loading="loading"
            v-show="!editMode"
            @click.prevent="createClient"
          >
            {{ loading ? "Creating client....." : "Create" }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :loading="loading"
            v-show="editMode"
            @click.prevent="updateClient"
          >
            {{ loading ? "Udpating client....." : "Update" }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
    v-model="deleteClientModal"
    title="Caution"
    width="30%"
  >
    <span>Do you want to delete ?</span>
    <span>Once deleted it won't be retrieved</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" size="small" @click.prevent="closeDeleteModal">Cancel</el-button>
        <el-button type="danger" size="small" @click.prevent="deleteClient()" :loading="loading">
        {{ loading ? "Deleting client....." : "Delete Client" }}
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
export default {
  name: "Client",
  data() {
    return {
      editMode: false,
      loading: false,
      deleteClientModal: false,
      clientModal: false,
      formLabelWidth: "140px",
      clientDeleteId: '',
      errors: [],
      clients: [],
      form: {
        id: "",
        name: "",
      },
    }
  },
  methods: {
    clientCreateModal(){
      this.editMode = false
      this.form.id = ''
      this.form.name = ''
      this.clientModal = true
    },
    clientEditModal(client){
      this.editMode = true
      this.form.id = client.id
      this.form.name = client.name
      this.clientModal = true
    },
    clientDeleteModal(id){
      this.clientDeleteId = id
      this.deleteClientModal = true
    },
    closeClientModal() {
      this.form.id = ""
      this.form.name = ""
      this.editMode = false
      this.loading = false
      this.clientModal = false
    },
    closeDeleteModal(){
      this.deleteClientModal = false
    },
    getClients: async function () {
      Api()
        .get("/admin/get-clients")
        .then((response) => {
          this.clients = response.data.clients
        })
    },
    createClient: async function () {
      this.loading = true
      Api()
        .post("/admin/create-client", this.form)
        .then(() => {
          this.form.name = ""
          this.loading = false
          this.getClients()
          this.clientModal = false
          this.$notify({ type: "success", group: "client", title: "Client added" })
        })
    },
    updateClient: async function(){
      this.loading = true
      Api().post(`/admin/update-client/${this.form.id}`, this.form)
        .then(() => {
          this.loading = false
          this.form.id = ''
          this.form.name = ''
          this.editMode = false
          this.$notify({ type: "success", group: "client", title: "Client updated" })
          this.getClients()
          this.clientModal = false
        })
    },
    deleteClient: async function(){
      this.loading = true
      Api().delete("/admin/delete-client/" + this.clientDeleteId)
        .then(() => {
          this.deleteClientModal = false
          this.loading = false
          this.$notify({ type: "success", group: "client", title: "Client deleted" })
          this.getClients()
        })
    }
  },
  mounted() {
    this.getClients()
  },
  computed:{
    
  },
  created(){
    this.moment = moment
  }
}
</script>