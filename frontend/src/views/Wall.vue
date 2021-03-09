<template>
  <div class="message-list">
    <div
      class="card text-center"
      :key="message.id"
      v-for="message in allMessages"
    >
      <div>
        <div class="card-header">
          <div class="titre">
            <h3 class="card-title">{{ message.title }}</h3>
          </div>
          <div class="delete">
            <button
              v-if="userIdLogged == message.user.id"
              class="btn btn-danger btn-delete"
              @click="deleteMessage(message.id)"
            >
              <i class="far fa-trash"></i>
            </button>
           
            <button
              v-if="userIdLogged == message.user.id"
              class="btn btn-warning btn-modify"
              @click="openUpdate()"
            >
              <i class="far fa-edit"></i>
            </button>
            <div v-if="update == true && userIdLogged == message.user.id" class="updateMessage">
                  <form action="">
                    <div class="title form-group">
                      <label for="title">Titre :</label>
                      <input v-model="message.title" type="text">
                    </div>
                    <div class="message form-group">
                      <label for="content">Message :</label>
                      <textarea v-model="message.content" name="content" id="new-content" cols="30" rows="3"></textarea>
                    </div>
                    <button @click.prevent="updateMessage(message)" class="btn-success" >Envoyer</button>
                    <button @click="openUpdate()" class="btn-danger">Annuler</button>
                  </form>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="message">
            <p class="card-text">{{ message.content }}</p>
          </div>
        </div>
        <div class="card-footer">
          <h4 class="blockquote-footer created-by">
            {{ message.user.name }}
          </h4>
          <h4 class="date">
            {{ dateFormat(message.createdAt) }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "wall",
  data() {
    return {
      allMessages: [],
      message: {},
      update: false,
      userIdLogged: localStorage.getItem("id"),
    };
  },
  methods: {
    deleteMessage(id) {
      const reponse = window.confirm(
        "Attention !! Etes-vous sûr de vouloir supprimer ce message ?"
      );
      if (reponse === true) {
        let message = { id: id };
        this.$store
          .dispatch("deleteMessage", message)
          .then(() => {
            document.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    openUpdate() {
      return this.update = !this.update;
    },
    updateMessage(message) {
      const newMessage = {
        id: message.id,
        title: message.title,
        content: message.content
      };
      console.log(newMessage);
      this.$store
          .dispatch("updateMessage", newMessage)
          .then(() => {
            document.location.reload();
          })
          .catch((err) => console.log(err));
    },
    dateFormat(date) {
      moment.locale("fr");
      return moment(date).format("LLLL");
    },
  },
  mounted() {
    this.$store
      .dispatch("getAllMessages", this.allMessages)
      .then((data) => {
        this.allMessages = data.slice().reverse();
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style lang="scss">
.message-list {
  overflow: auto;
  scroll-behavior: smooth;
  height: 50vh;
}
.card {
  margin: 2% auto;
  width: 75%;
}
.card-text {
  text-align: justify;
}
.card-footer {
  display: flex;
  justify-content: space-between;
}
.created-by {
  font-size: 200%;
  text-transform: capitalize;
}
i {
  font-size: 2em;
}
.updateMessage {
  font-size: 2em;
  margin-top: 30px;
}
input, textarea {
  width: 80%;
}
.updateMessage button {
  margin-left: 2%;
}
@media only screen and (max-width: 900px) {
  .card {
    width: 90%;
  }
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>