<template>
    <router-view/>
</template>

<script>
export default {
    name: 'App',
    computed: {
        thisYear () {
            return new Date().getFullYear()
        }
    }
}
</script>
