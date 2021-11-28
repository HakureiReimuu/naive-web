<template>
    <Container :background="background">
        <LoginBox class="box"/>
    </Container>
</template>

<script>
import LoginBox from '@/components/LoginBox'
import Container from '@/components/Container'

export default {
    name: 'Login',
    components: {
        Container,
        LoginBox
    },
    data: () => ({
        background: require('../assets/acg.gy_04.jpg')
    })
}
</script>

<style lang="less" scoped>
.box {
    width: 600px;
}
</style>
