<template>
  <div>
    <div class="new-message">
      <form class="form-goup">
        <label for="title">Titre</label>
        <input class="form-control titre col-6" type="text" v-model="title" autofocus required />
        <label for="message">Message</label>
        <textarea class="form-control col-6" type="textarea" v-model="content" required></textarea>
        <button class="btn btn-primary" @click.once="envoiMessage">
          Envoyer
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "messages",
  data() {
    return {
      name: localStorage.getItem("user"),
      title: "",
      content: "",
    };
  },
  methods: {
    envoiMessage() {
      let message = {
        userId: localStorage.getItem("id"),
        title: this.title,
        content: this.content,
      };
      console.log(message);
      this.$store
        .dispatch("envoiMessage", message)
        .then(() => {
          document.location.reload();
          console.log("Message envoyé !!");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.new-message {
  width: 100%;
  margin: 110px auto 0 auto;
}
.titre {
  width: 30%;
  margin: 2% auto;
}
textarea {
  width: 50%;
  margin: auto;
}
button {
  margin: 2% auto;
  width: 20%;
}
</style>