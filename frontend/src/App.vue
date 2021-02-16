<template>
  <div id="app">
    <Header />
  </div>
</template>
<script>
import Header from './views/Header'
export default {
  name: 'app',
  components: { Header },
}
</script>
<style lang="scss">
html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
  width: 100%;
}
</style>