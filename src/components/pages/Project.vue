<template>
  <div class="container-fluid">
    <notifications group="project"/>
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="page-title">Projects table</h2>
        <div class="row">
          <!-- simple table -->
          <div class="col-md-12 my-4">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Project List</h5>
                <el-button text @click="projectCreateModal()"
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
                      v-for="(project, index) in projects"
                      :key="project.id"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ project.title }}</td>
                      <td>{{ moment(project.created_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}</td>
                      <td>
                        <span>
                          <el-button type="primary" size="small" @click.prevent="projectEditModal(project)">Edit</el-button>
                          <el-button type="danger" size="small" @click.prevent="projectDeleteModal(project.id)">Delete</el-button>
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

    <el-dialog v-model="projectModal" width="80%"
    :title="form.id ? 'Edit Project' : 'Create Project'">
      <el-form :model="form" :inline="true" enctype="multipart/form-data">
        <el-form-item label="Project Name" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <span class="text-danger text-sm" v-if="errors.name">
            {{ errors.name[0] }}
        </span>
        <el-form-item label="Website Link" :label-width="formLabelWidth">
          <el-input v-model="form.website" autocomplete="off" />
        </el-form-item>
        <span class="text-danger text-sm" v-if="errors.website">
            {{ errors.website[0] }}
        </span>
        <el-form-item label="Github Link" :label-width="formLabelWidth">
          <el-input v-model="form.github" autocomplete="off" />
        </el-form-item>
        <span class="text-danger text-sm" v-if="errors.github">
            {{ errors.github[0] }}
        </span>
        <el-form-item label="Completion Date" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.date" autocomplete="off" /> -->
          <el-date-picker
            v-model="form.date"
            type="date"
            label="Pick completion date"
            placeholder="Pick completion date"
          />
        </el-form-item>
        <span class="text-danger text-sm" v-if="errors.date">
            {{ errors.date[0] }}
        </span>
        <el-form-item label="Categories" :label-width="formLabelWidth">
            <el-select v-model="form.category_id" clearable placeholder="Select category">
                <el-option
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                />
            </el-select>
            <span class="text-danger text-sm" v-if="errors.category_id">
                {{ errors.category_id[0] }}
            </span>
        </el-form-item>
        <el-form-item label="Clients" :label-width="formLabelWidth">
            <el-select v-model="form.client_id" clearable placeholder="Select client">
                <el-option
                    v-for="client in clients"
                    :key="client.id"
                    :label="client.name"
                    :value="client.id"
                />
            </el-select>
            <span class="text-danger text-sm" v-if="errors.client_id">
                {{ errors.client_id[0] }}
            </span>
        </el-form-item>
        <el-form-item label="Project Description" :label-width="formLabelWidth">
            <el-input
            class="w-100"
                :rows="2"
                v-model="form.description"
                maxlength="200"
                placeholder="Enter project description"
                show-word-limit
                type="textarea" 
            />
            <span class="text-danger text-sm" v-if="errors.description">
                {{ errors.description[0] }}
            </span>
        </el-form-item>
        <el-form-item label="Image One" :label-width="formLabelWidth">
          <input 
            type="file" 
            @change="loadImageOne($event)"
          />
        </el-form-item>
        <span class="text-danger text-sm" v-if="errors.imageOne">
            {{ errors.imageOne[0] }}
        </span>
        <span>
           <img :src="form.imageOne" alt="" style="width:150px;height:150px"> 
        </span>
        <el-form-item label="Image Two" :label-width="formLabelWidth">
          <input 
            type="file" 
            @change="loadImageTwo($event)"
          />
        </el-form-item>
        <span class="text-danger text-sm" v-if="errors.imageTwo">
            {{ errors.imageTwo[0] }}
        </span>
        <span>
           <img :src="form.imageTwo" alt="" class="mt-5" style="width:150px;height:150px"> 
        </span>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click.prevent="closeProjectModal">Cancel</el-button>
          <el-button
            type="primary"
            size="small"
            :loading="loading"
            v-show="!editMode"
            @click.prevent="createProject"
          >
            {{ loading ? "Creating project....." : "Create" }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :loading="loading"
            v-show="editMode"
            @click.prevent="updateProject"
          >
            {{ loading ? "Udpating project....." : "Update" }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
    v-model="deleteProjectModal"
    title="Caution"
    width="30%"
  >
    <span>Do you want to delete ?</span>
    <span>Once deleted it won't be retrieved</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" size="small" @click.prevent="closeDeleteModal">Cancel</el-button>
        <el-button type="danger" size="small" @click.prevent="deleteProject()" :loading="loading">
        {{ loading ? "Deleting project....." : "Delete Project" }}
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
    name: 'Project',
    data() {
    return {
      editMode: false,
      loading: false,
      deleteProjectModal: false,
      projectModal: false,
      formLabelWidth: "140px",
      projectDeleteId: '',
      errors: [],
      categories: [],
      clients: [],
      projects: [],
      form: {
        id: "",
        title: "",
        category_id: "",
        client_id: "",
        website: "",
        github: "",
        date: "",
        description: "",
        imageOne: "",
        imageTwo: ""
      },
    }
  },
  methods: {
    projectCreateModal(){
      this.editMode = false
      this.form.id = ''
      this.form.title = ''
      this.projectModal = true
    },
    projectEditModal(project){
      this.editMode = true
      this.form.id = project.id
      this.form.title = project.title
      this.form.category_id = project.category_id
      this.form.client_id = project.client_id
      this.form.website = project.website
      this.form.github = project.github
      this.form.date = project.date
      this.form.description = project.description
      this.form.imageOne = project.imageOne
      this.form.imageTwo = project.imageTwo
      this.projectModal = true
    },
    projectDeleteModal(id){
      this.projectDeleteId = id
      this.deleteProjectModal = true
    },
    closeProjectModal() {
      this.form.id = ""
      this.form.title = ""
      this.editMode = false
      this.loading = false
      this.projectModal = false
    },
    closeDeleteModal(){
      this.deleteProjectModal = false
    },
    loadImageOne(e){
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (e) => {
        this.form.imageOne = e.target.result
      }
      reader.readAsDataURL(file)
    },
    loadImageTwo(e){
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (e) => {
        this.form.imageTwo = e.target.result
      }
      reader.readAsDataURL(file)
    },
    getCategories: async function () {
      Api()
        .get("/admin/get-categories")
        .then((response) => {
          this.categories = response.data.categories
        })
    },
    getClients: async function () {
      Api()
        .get("/admin/get-clients")
        .then((response) => {
          this.clients = response.data.clients
        })
    },
    getProjects: async function () {
      Api()
        .get("/admin/get-projects")
        .then((response) => {
          this.projects = response.data.projects
        })
    },
    createProject: async function () {
      this.loading = true
      Api()
        .post("/admin/create-project", this.form)
        .then(() => {
          this.form.title = ""
          this.loading = false
          this.getProjects()
          this.projectModal = false
          this.$notify({ type: "success", group: "project", title: "Project added" })
        })
    },
    updateProject: async function(){
      this.loading = true
      Api().post(`/admin/update-project/${this.form.id}`, this.form)
        .then(() => {
          this.loading = false
          this.form.id = ''
          this.form.title = ''
          this.editMode = false
          this.$notify({ type: "success", group: "project", title: "Project updated" })
          this.getProjects()
          this.projectModal = false
        })
    },
    deleteProject: async function(){
      this.loading = true
      Api().delete("/admin/delete-project/" + this.projectDeleteId)
        .then(() => {
          this.deleteProjectModal = false
          this.loading = false
          this.$notify({ type: "success", group: "project", title: "Project deleted" })
          this.getProjects()
        })
    }
  },
  mounted() {
    this.getCategories()
    this.getClients()
    this.getProjects()
  },
  computed:{
    
  },
  created(){
    this.moment = moment
  }
}
</script>