<template>
  <div class="forum">
    <div class="new-message">
      <NewMessage />
    </div>
    <div class="wall">
      <Wall />
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

<style lang="scss" scoped>

</style>