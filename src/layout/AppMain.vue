<template>
    <div class="app-main">
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'AppMain',//主要内容区域
    
}
</script>
<style lang="scss" scoped>
    .app-main {
        height: calc(100vh - 85px);
        width: 100%;
        overflow-x: hidden;
        background-color: #fafbfd;
    }
    //内容区域的过度动画
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all .3s;
    }
    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>