<template>
    <div class="message-list">
      <div
        class="card text-center"
        :key="message.id"
        v-for="message in allMessages"
      >
        <div class="card-header">
          <h3 class="card-title">{{ message.title }}</h3>
          <div class="delete">
            <button
              v-if="userIdLogged == message.user.id"
              class="btn btn-danger btn-delete"
              @click="deleteMessage(message.id)"
            >
              <i class="far fa-times-circle"></i>
            </button>
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
</template>

<script>
import moment from "moment";

export default {
  name: "wall",
  data() {
    return {
      allMessages: [],
      message: {},
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
@media only screen and (max-width: 900px) {
  .card {
    width: 90%
  }
}
@import'~bootstrap/dist/css/bootstrap.css';
</style>