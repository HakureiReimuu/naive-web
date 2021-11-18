<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title>这位更是个寄吧</v-toolbar-title>
        </v-app-bar>
        <v-main class="mt-16">
            <v-container>
                <v-card class="login-box">
                    <v-card-title>Login</v-card-title>
                    <v-card-subtitle></v-card-subtitle>
                    <v-card-text>
                        <v-form>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model.lazy="server.url"
                                        :prepend-inner-icon="ssl ? 'mdi-link-lock' : 'mdi-link'"
                                        clearable
                                        dense
                                        hide-details
                                        label="Server address or URL"
                                        outlined/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field
                                        v-model.lazy.number="server.port"
                                        dense
                                        hide-details
                                        label="Port"
                                        maxlength="5"
                                        outlined/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model.lazy="server.username"
                                        clearable
                                        dense
                                        hide-details
                                        label="Username"
                                        outlined
                                        prepend-inner-icon="mdi-account"/>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        v-model.lazy="server.password"
                                        :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="password_show ? 'text' : 'password'"
                                        clearable
                                        dense
                                        hide-details
                                        label="Password"
                                        outlined
                                        prepend-inner-icon="mdi-lock"
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
                        <v-btn color="indigo" icon>
                            <v-icon>mdi-login</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                        <div v-show="setting_show">
                            <v-divider/>
                            <v-card-text>
                                <v-checkbox
                                    v-model="ssl"
                                    label="Enable SSL/TLS"
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
        server: {},
        ssl: false,
        password_show: false,
        setting_show: false
    }),
    methods: {
        password_show_toggle () {
            this.password_show = !this.password_show
        },
        setting_show_toggle () {
            this.setting_show = !this.setting_show
        },
        clear () {
            this.server = {}
        }
    }
}
</script>

<style lang="less" scoped>
.login-box {
    width: 600px;
}
</style>
