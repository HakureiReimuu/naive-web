<template>
    <router-view/>
</template>

<script>

export default {
    name: 'App',
    data: () => ({}),
    computed: {
        thisYear () {
            return new Date().getFullYear()
        }
    }
}
</script>
