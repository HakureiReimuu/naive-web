<template>
    <v-app>
        <AppBar/>
        <v-img :src="background">
            <v-main class="mt-16">
                <v-container>
                    <slot/>
                </v-container>
            </v-main>
        </v-img>
    </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'

export default {
    name: 'Container',
    components: { AppBar },
    props: {
        background: Image
    }
}
</script>
