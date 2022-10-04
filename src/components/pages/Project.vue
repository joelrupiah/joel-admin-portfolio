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
                <RouterLink class="nav-link" to="/create-project">
                  <el-button text type="success"
                  >Create Project</el-button>
                </RouterLink>
                
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
                          <RouterLink :to="`/edit-project/${project.id}`">
                            <el-button type="primary" size="small">Edit</el-button>
                          </RouterLink>
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
      formLabelWidth: "140px",
      projectDeleteId: '',
      errors: [],
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
    projectDeleteModal(id){
      this.projectDeleteId = id
      this.deleteProjectModal = true
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
    getProjects: async function () {
      Api()
        .get("/admin/get-projects")
        .then((response) => {
          this.projects = response.data.projects
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
    this.getProjects()
  },
  computed:{
    
  },
  created(){
    this.moment = moment
  }
}
</script>