<template>
    <div class="container-fluid">
        <notifications group="project" />
        <div class="row justify-content-center">
            <div class="col-12">
                <h2 class="page-title">Projects table</h2>
                <div class="row">
                    <!-- simple table -->
                    <div class="col-md-12 my-4">
                        <div class="card shadow">
                            <div class="card-body">
                                <h5 class="card-title">Create Project</h5>
                                <el-form :model="form" :inline="true" enctype="multipart/form-data">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <el-form-item label="Project Name" :label-width="formLabelWidth">
                                                <el-input v-model="form.title" autocomplete="off" style="width:100%" />
                                            </el-form-item>
                                            <span class="text-danger text-sm" v-if="errors.name">
                                                {{ errors.name[0] }}
                                            </span>
                                        </div>
                                        <div class="col-md-6">
                                            <el-form-item label="Website Link" :label-width="formLabelWidth">
                                                <el-input v-model="form.website" autocomplete="off"
                                                    style="width:100%" />
                                            </el-form-item>
                                            <span class="text-danger text-sm" v-if="errors.website">
                                                {{ errors.website[0] }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <el-form-item label="Github Link" :label-width="formLabelWidth">
                                                <el-input v-model="form.github" autocomplete="off" style="width:100%" />
                                            </el-form-item>
                                            <span class="text-danger text-sm" v-if="errors.github">
                                                {{ errors.github[0] }}
                                            </span>
                                        </div>
                                        <div class="col-md-6">
                                            <el-form-item label="Completion Date" :label-width="formLabelWidth">
                                                <!-- <el-input v-model="form.date" autocomplete="off" /> -->
                                                <el-date-picker v-model="form.date" type="date"
                                                    label="Pick completion date" placeholder="Pick completion date"
                                                    style="width:100%" />
                                            </el-form-item>
                                            <span class="text-danger text-sm" v-if="errors.date">
                                                {{ errors.date[0] }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <el-form-item label="Categories" :label-width="formLabelWidth">
                                                <el-select v-model="form.category_id" clearable
                                                    placeholder="Select category" style="width:100%">
                                                    <el-option v-for="category in categories" :key="category.id"
                                                        :label="category.name" :value="category.id" />
                                                </el-select>
                                                <span class="text-danger text-sm" v-if="errors.category_id">
                                                    {{ errors.category_id[0] }}
                                                </span>
                                            </el-form-item>
                                        </div>
                                        <div class="col-md-6">
                                            <el-form-item label="Clients" :label-width="formLabelWidth">
                                                <el-select v-model="form.client_id" clearable
                                                    placeholder="Select client" style="width:100%">
                                                    <el-option v-for="client in clients" :key="client.id"
                                                        :label="client.name" :value="client.id" />
                                                </el-select>
                                                <span class="text-danger text-sm" v-if="errors.client_id">
                                                    {{ errors.client_id[0] }}
                                                </span>
                                            </el-form-item>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <el-form-item label="Project Description" :label-width="formLabelWidth">
                                                <el-input class="w-100" :rows="2" v-model="form.description"
                                                    maxlength="200" placeholder="Enter project description"
                                                    show-word-limit type="textarea" style="width:100%" />
                                                <span class="text-danger text-sm" v-if="errors.description">
                                                    {{ errors.description[0] }}
                                                </span>
                                            </el-form-item>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-4">
                                            <el-form-item label="Image One" :label-width="formLabelWidth">
                                                <input type="file" @change="loadImageOne($event)" style="width:100%" />
                                            </el-form-item>
                                            <span class="text-danger text-sm" v-if="errors.imageOne">
                                                {{ errors.imageOne[0] }}
                                            </span>

                                        </div>
                                        <div class="col-md-2">
                                            <span>
                                                <img :src="form.imageOne" alt="" style="width:150px;height:150px">
                                            </span>
                                        </div>
                                        <div class="col-md-4">
                                            <el-form-item label="Image Two" :label-width="formLabelWidth">
                                                <input type="file" @change="loadImageTwo($event)" style="width:100%" />
                                            </el-form-item>
                                            <span class="text-danger text-sm" v-if="errors.imageTwo">
                                                {{ errors.imageTwo[0] }}
                                            </span>

                                        </div>
                                        <div class="col-md-2">
                                            <span>
                                                <img :src="form.imageTwo" alt="" class="mt-5"
                                                    style="width:150px;height:150px">
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <el-button type="success" :loading="loading" size="small"
                                                @click.prevent="createProject">
                                                {{ loading ? 'Creating Project......' : 'Create Project' }}
                                            </el-button>
                                        </div>
                                    </div>
                                </el-form>

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

    </div>
</template>

<script>
import Api from "../../api/index.js"
export default {
    name: 'CreateProject',
    data() {
        return {
            loading: false,
            formLabelWidth: "140px",
            errors: [],
            categories: [],
            clients: [],
            projects: [],
            form: {
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
        loadImageOne(e) {
            let file = e.target.files[0]
            let reader = new FileReader()
            reader.onload = (e) => {
                this.form.imageOne = e.target.result
            }
            reader.readAsDataURL(file)
        },
        loadImageTwo(e) {
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
        createProject() {
            this.loading = true
            Api()
                .post("/admin/create-project", this.form)
                .then(() => {
                    this.loading = false
                    this.$notify({ type: "success", group: "project", title: "Project added" })
                })
        }
    },
    mounted() {
        this.getCategories()
        this.getClients()
    },
}
</script>