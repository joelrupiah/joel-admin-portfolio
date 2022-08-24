<template>
  <div class="container-fluid">
    <notifications group="category"/>
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="page-title">Categories table</h2>
        <div class="row">
          <!-- simple table -->
          <div class="col-md-12 my-4">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">Category List</h5>
                <el-button text @click="categoryCreateModal()"
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
                      v-for="(category, index) in categories"
                      :key="category.id"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ category.name }}</td>
                      <td>{{ moment(category.created_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}</td>
                      <td>
                        <span>
                          <el-button type="primary" size="small" @click.prevent="categoryEditModal(category)">Edit</el-button>
                          <el-button type="danger" size="small" @click.prevent="categoryDeleteModal(category.id)">Delete</el-button>
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

    <el-dialog v-model="categoryModal"
    :title="form.id ? 'Edit Category' : 'Create Category'">
      <el-form :model="form">
        <el-form-item label="Category Name" :label-width="formLabelWidth">
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
          <el-button @click.prevent="closeCategoryModal">Cancel</el-button>
          <el-button
            type="primary"
            size="small"
            :loading="loading"
            v-show="!editMode"
            @click.prevent="createCategory"
          >
            {{ loading ? "Creating category....." : "Create" }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :loading="loading"
            v-show="editMode"
            @click.prevent="updateCategory"
          >
            {{ loading ? "Udpating category....." : "Update" }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
    v-model="deleteCategoryModal"
    title="Caution"
    width="30%"
  >
    <span>Do you want to delete ?</span>
    <span>Once deleted it won't be retrieved</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" size="small" @click.prevent="closeDeleteModal">Cancel</el-button>
        <el-button type="danger" size="small" @click.prevent="deleteCategory()" :loading="loading">
        {{ loading ? "Deleting category....." : "Delete Category" }}
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
  name: "Category",
  data() {
    return {
      editMode: false,
      loading: false,
      deleteCategoryModal: false,
      categoryModal: false,
      formLabelWidth: "140px",
      categoryDeleteId: '',
      errors: [],
      categories: [],
      form: {
        id: "",
        name: "",
      },
    }
  },
  methods: {
    categoryCreateModal(){
      this.editMode = false
      this.form.id = ''
      this.form.name = ''
      this.categoryModal = true
    },
    categoryEditModal(category){
      this.editMode = true
      this.form.id = category.id
      this.form.name = category.name
      this.categoryModal = true
    },
    categoryDeleteModal(id){
      this.categoryDeleteId = id
      this.deleteCategoryModal = true
    },
    closeCategoryModal() {
      this.form.id = ""
      this.form.name = ""
      this.editMode = false
      this.loading = false
      this.categoryModal = false
    },
    closeDeleteModal(){
      this.deleteCategoryModal = false
    },
    getCategories: async function () {
      Api()
        .get("/admin/get-categories")
        .then((response) => {
          this.categories = response.data.categories
        })
    },
    createCategory: async function () {
      this.loading = true
      Api()
        .post("/admin/create-category", this.form)
        .then(() => {
          this.form.name = ""
          this.loading = false
          this.getCategories()
          this.categoryModal = false
          this.$notify({ type: "success", group: "category", title: "Category added" })
        })
    },
    updateCategory: async function(){
      this.loading = true
      Api().post(`/admin/update-category/${this.form.id}`, this.form)
        .then(() => {
          this.loading = false
          this.form.id = ''
          this.form.name = ''
          this.editMode = false
          this.$notify({ type: "success", group: "category", title: "Category updated" })
          this.getCategories()
          this.categoryModal = false
        })
    },
    deleteCategory: async function(){
      this.loading = true
      Api().delete("/admin/delete-category/" + this.categoryDeleteId)
        .then(() => {
          this.deleteCategoryModal = false
          this.loading = false
          this.$notify({ type: "success", group: "category", title: "Category deleted" })
          this.getCategories()
        })
    }
  },
  mounted() {
    this.getCategories()
  },
  computed:{
    
  },
  created(){
    this.moment = moment
  }
}
</script>