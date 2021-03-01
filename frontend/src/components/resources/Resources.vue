<template>
  <div class="forum">
    <div class="wall-container">
      <Wall />
    </div>
    <div class="panel">
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
  };
</script>

<style lang="scss">
.forum {
  display: flex;
  flex-direction: column-reverse;
  margin-top: 150px;
}
@media only screen and (max-width: 900px) {
  .forum {
    margin: 30px auto;
  }
}
</style>