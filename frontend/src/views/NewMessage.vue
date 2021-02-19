<template>
  <div>
    <div class="new-message">
      <form class="form-goup">
        <label for="title" class="new-mess-title">Titre</label>
        <input class="form-control titre col-6" type="text" v-model="title" autofocus required />
        <label for="message" class="new-mess-content">Message</label>
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
      name: this.name,
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
}
.new-mess-title, .new-mess-content {
  float: left;
  margin: 10% 2% 0 2%;
}
.titre {
  width: 90%;  
  margin: auto;
}
textarea {
  width: 90%;
  margin: auto;
  height: 200px;
}
button {
  margin: 2% auto;
  width: 20%;
}
</style>