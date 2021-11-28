<template>
    <v-card>
        <v-card-title>连接到 Naive Violet</v-card-title>
        <v-card-text>
            <v-form ref="form">
                <v-row>
                    <v-col cols="12" sm="9">
                        <v-text-field
                            v-model="server.url"
                            :prepend-inner-icon="ssl ? 'mdi-link-lock' : 'mdi-link'"
                            :rules="rules.notEmpty"
                            clearable
                            dense
                            hide-details
                            label="服务器"
                            outlined
                            required/>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-text-field
                            v-model="server.port"
                            :rules="rules.port"
                            dense
                            hide-details
                            label="端口"
                            maxlength="5"
                            outlined
                            prepend-inner-icon="mdi-link-plus"
                            required/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="server.username"
                            :rules="rules.notEmpty"
                            clearable
                            dense
                            hide-details
                            label="用户名"
                            outlined
                            prepend-inner-icon="mdi-account"
                            required/>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="server.password"
                            :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="rules.notEmpty"
                            :type="password_show ? 'text' : 'password'"
                            clearable
                            dense
                            hide-details
                            label="密码"
                            outlined
                            prepend-inner-icon="mdi-lock"
                            required
                            @click:append="password_show_toggle"/>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions class="pt-0">
            <v-btn :color="setting_show ? 'indigo' : ''" icon @click="setting_show_toggle">
                <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-spacer/>
            <v-btn icon @click="clear">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn color="indigo" icon @click="login">
                <v-icon>mdi-login</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="setting_show">
                <v-divider/>
                <v-card-text class="pb-0">
                    <v-checkbox
                        v-model="ssl"
                        dense
                        label="启用 SSL/TLS"
                        prepend-icon="mdi-security-network"/>
                </v-card-text>
            </div>
        </v-expand-transition>
        <v-expand-transition>
            <v-card v-if="error.status" class="error-box transition-fast-in-fast-out">
                <v-card-title class="red--text">
                    <v-icon color="red" left>mdi-alert-circle-outline</v-icon>
                    {{ error.title }}
                    <v-spacer/>
                    <v-btn icon @click="error.status = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="pb-0">{{ error.msg }}</v-card-text>
            </v-card>
        </v-expand-transition>
        <v-overlay :value="status.logging" absolute color="white">
            <v-progress-circular color="indigo" size="48" indeterminate/>
        </v-overlay>
    </v-card>
</template>

<script>
import axios from 'axios'
import Global from '@/Global'

export default {
    name: 'LoginBox',
    data: () => ({
        server: {
            url: '',
            port: '',
            username: '',
            password: ''
        },
        ssl: false,
        password_show: false,
        setting_show: false,
        rules: {
            notEmpty: [v => !!v],
            port: [v => (v > 0 && v < 65536)]
        },
        status: {
            logging: false
        },
        error: {
            status: false,
            title: '',
            msg: ''
        }
    }),
    methods: {
        password_show_toggle () {
            this.password_show = !this.password_show
        },
        setting_show_toggle () {
            this.setting_show = !this.setting_show
        },
        clear () {
            this.$refs.form.reset()
        },
        login () {
            if (this.$refs.form.validate()) {
                this.status.logging = true

                const url = (this.ssl ? 'https://' : 'http://') + this.server.url + ':' + this.server.port + '/login'
                const data = new URLSearchParams()

                data.append('username', this.server.username)
                data.append('password', this.$md5(this.server.password))

                axios({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data,
                    timeout: 3000
                }).then(val => {
                    this.status.logging = false

                    const json = val.data
                    if (json.status === 200) {
                        Global.username = this.server.username
                        Global.target = this.server.url
                        Global.token = json.token

                        const { query } = this.$router
                        if (query.from) {
                            this.$router.push(query.from)
                        } else {
                            this.$router.push('/home')
                        }
                    } else {
                        this.err(this.status, this.msg)
                    }
                }, err => {
                    this.status.logging = false
                    this.err(err.name, err.message)
                }).catch(err => {
                    this.status.logging = false
                    this.err(err.name, err.message)
                })
            }
        },
        err (title, msg) {
            this.error.title = title
            this.error.msg = msg
            this.error.status = true
        }
    }
}
</script>

<style lang="less" scoped>
.error-box {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
