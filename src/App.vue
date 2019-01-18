<template lang="pug">
  #app.font-serif.text-grey-darkest.leading-normal
    router-view
</template>

<script>
import '@/style/_main.css'
export default {
  name: 'app'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:16px;
}

.fade-enter-active{transition:opacity 500ms;}
.fade-enter{opacity:0;}
</style>
