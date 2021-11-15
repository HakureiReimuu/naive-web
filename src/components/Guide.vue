<template>
  <div></div>
</template>

<script>
export default {
  name: 'Guide',
  data () {
    return {
      active: 0,
      server: {
        name: '',
        url: '',
        port: 23333
      }
    }
  },
  methods: {
    next () {
      this.active++
    },
    back () {
      this.active--
    },
    done () {
      //
    }
  }
}
</script>

<style lang="less" scoped>

</style>
