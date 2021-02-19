<template>
  <div class="wall">
    <ol class="message-list">
      <li
        class="message-element"
        :key="message.id"
        v-for="message in allMessages"
      >
        <div class="delete">
          <h4 class="created-by">
            Posté par :<br />
            {{ message.user.name }}
          </h4>
          <h4 class="date">
            Le : <br />
            {{ dateFormat(message.createdAt) }}
          </h4>
          <button
            v-if="userIdLogged == message.user.id"
            class="btn btn-danger btn-delete"
            @click="deleteMessage(message.id)"
          >
            <i class="far fa-times-circle"></i>
          </button>
        </div>
        <div class="message">
          <h3 class="title">{{ message.title }}</h3>
          <p class="msg-content">{{ message.content }}</p>
        </div>
      </li>
    </ol>
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
        console.log(message);
        this.$store
          .dispatch("deleteMessage", message)
          .then((res) => {
            document.location.reload();
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    dateFormat(date) {
      moment.locale('fr');
      return moment(date).format('LLLL');
    }
  },
  mounted() {
    this.$store
      .dispatch("getAllMessages", this.allMessages)
      .then((data) => {
        this.allMessages = data.slice().reverse();
        console.log(this.allMessages);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
.message-list {
  padding: 10px;
  height: 90vh;
  margin: 0 0 5% 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
}
.message-element {
  width: 80%;
  text-align: justify;
  padding: 5px;
  box-shadow: 10px 10px 10px 10px;
  margin: 2% auto;
  display: flex;
}
.createdBy {
  float: left;
  width: 140px;
  text-align: center;
}
.message {
  width: 80%;
  margin: 2% auto;
}
.message h3 {
  margin: 2% auto;
  width: 80%;
}
.message p {
  width: 80%;
  margin: auto;
  font-size: 1em;
  justify-content: left;
}
.delete {
  width: 20%;
}
.btn-delete {
  margin: 40%;
}
</style>