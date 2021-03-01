<template>
  <div>
    <div class="card new-message">
      <div class="card-header">
        <p class="hello">Bonjour {{ userName }} !!</p>
      </div>
      <div class="card-body">
        <form class="form-goup">
          <label for="title" class="new-mess-title col-form-label-lg"
            >Titre</label
          >
          <input
            class="form-control titre"
            type="text"
            v-model="title"
            autofocus
            required
          />
          <label for="message" class="new-mess-content col-form-label-lg"
            >Message</label
          >
          <textarea
            class="form-control"
            type="textarea"
            v-model="content"
            required
          ></textarea>
        </form>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" @click.once="envoiMessage">
          Envoyer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "messages",
  data() {
    return {
      userName: localStorage.getItem("userName"),
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
      if (message.title === "" || message.content === "") {
        alert("Veuillez remplir les champs avant d'envoyer !!!");
      } else {
        this.$store
          .dispatch("envoiMessage", message)
          .then(() => {
            document.location.reload();
            console.log("Message envoyé !!");
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.new-message {
  width: 100%;
}
.hello {
  font-size: 2rem;
  text-transform: capitalize;
}
label {
  font-size: 1.5rem;
}
.form-control {
  font-size: 1.5em;
}
.card {
  width: 50%;
}
.card-body {
  margin: auto;
  width: 100%;
}
button {
  font-size: 2em;
  margin: auto;
}
@media only screen and (max-width: 900px) {
  .card {
    width: 80%;
  }
}
</style>