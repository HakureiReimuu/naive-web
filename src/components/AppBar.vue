<template>
    <v-app-bar app>
        <v-toolbar-title>Naive Violet</v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="open('https://github.com/Lappand233/naive-web')">
            <v-icon>mdi-github</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
const open = (url) => window.open(url)

export default {
    name: 'AppBar',
    props: {
        login: Boolean
    },
    methods: {
        open
    }
}
</script>
