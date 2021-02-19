<template>
  <div class="forum">
    <div class="wall-container">
      <Wall />
    </div>
    <div class="panel">
      <p class="hello">Bonjour {{ userName }} !!</p>

      <NewMessage />
    </div>
    
  </div>
</template>

<script>
import Wall from "../../views/Wall";
import NewMessage from "../../views/NewMessage";

export default {
  name: "messages",
  components: { Wall, NewMessage },
  data() {
    return {
      userName: localStorage.getItem('userName'),
    }
  },
  };
</script>

<style lang="scss">
.forum {
  display: flex;
  margin-top: 120px;
}
.wall-container {
  float: right;
  width: 100%;
}
.panel {
  float: right;
  width: 50%;
}

</style>