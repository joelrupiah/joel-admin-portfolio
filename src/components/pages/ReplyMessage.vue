<template>
    <div class="container-fluid">
        <notifications group="message" />
        <div class="row justify-content-center">
            <div class="col-12">
                <h2 class="page-title">Message</h2>
                <div class="row">
                    <!-- simple table -->
                    <div class="col-md-12 my-4">
                        <div class="card shadow">
                            <div class="card-body">
                                <h5 class="card-title">Reply Message</h5>
                                <el-form :model="form" :inline="true" enctype="multipart/form-data">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <el-form-item label="Contact Name" :label-width="formLabelWidth">
                                                <el-input v-model="form.name" autocomplete="off" style="width:100%" />
                                            </el-form-item>
                                            <span class="text-danger text-sm" v-if="errors.name">
                                                {{ errors.name[0] }}
                                            </span>
                                        </div>
                                        <div class="col-md-6">
                                            <el-form-item label="Contact Email" :label-width="formLabelWidth">
                                                <el-input v-model="form.email" autocomplete="off"
                                                    style="width:100%" />
                                            </el-form-item>
                                            <span class="text-danger text-sm" v-if="errors.email">
                                                {{ errors.email[0] }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <el-form-item label="Subject" :label-width="formLabelWidth">
                                                <el-input class="w-100" :rows="2" v-model="form.subject"
                                                    maxlength="200" placeholder="Enter subject"
                                                    show-word-limit type="textarea" style="width:100%" />
                                                <span class="text-danger text-sm" v-if="errors.subject">
                                                    {{ errors.subject[0] }}
                                                </span>
                                            </el-form-item>
                                        </div>
                                        <div class="col-md-6">
                                            <el-form-item label="Message" :label-width="formLabelWidth">
                                                <el-input class="w-100" :rows="2" v-model="form.message"
                                                    maxlength="200" placeholder="Enter message"
                                                    show-word-limit type="textarea" style="width:100%" />
                                                <span class="text-danger text-sm" v-if="errors.message">
                                                    {{ errors.message[0] }}
                                                </span>
                                            </el-form-item>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <el-button type="success" :loading="loading" size="small"
                                                @click.prevent="replyMessage">
                                                Reply message</el-button>
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
    name: 'ReplyMessage',
    data() {
        return {
            loading: false,
            formLabelWidth: "140px",
            errors: [],
            form: {
                id: "",
                name: "",
                email: "",
                subject: "",
                message: "",
            },
        }
    },
    methods: {
        getMessage: async function () {
            Api()
                .get("/admin/get-message/" + this.$route.params.id)
                .then((response) => {
                    console.log(response)
                    let this_ = this
                    this.form.id = response.data.contact.id
                    this.form.name = response.data.contact.name
                    this.form.email = response.data.contact.email
                })
        },
        replyMessage() {
            this.loading = true
            Api()
                .post("/admin/reply-message/" + this.$route.params.id, this.form)
                .then(() => {
                    this.loading = false
                    this.$notify({ type: "success", group: "message", title: "Message sent" })
                })
                .catch(error => {
                    this.loading = false
                })
        }
    },
    mounted() {
        this.getMessage()
    },
}
</script>