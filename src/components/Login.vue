<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title>这位更是个寄吧</v-toolbar-title>
        </v-app-bar>
        <v-main class="mt-16">
            <v-container>
                <v-card class="login-box">
                    <v-card-title>连接到 Naive Violet</v-card-title>
                    <v-card-text>
                        <v-form ref="form">
                            <v-row>
                                <v-col>
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
                                <v-col cols="2">
                                    <v-text-field
                                        v-model="server.port"
                                        :rules="rules.port"
                                        dense
                                        hide-details
                                        label="端口"
                                        maxlength="5"
                                        outlined
                                        required/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
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
                                <v-col>
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
                            <v-card-text>
                                <v-checkbox
                                    v-model="ssl"
                                    label="启用 SSL/TLS"
                                    prepend-icon="mdi-security-network"/>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'Login',
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
            console.log(this.$refs.form.validate())
        }
    }
}
</script>

<style lang="less" scoped>
.login-box {
    width: 600px;
}
</style>
