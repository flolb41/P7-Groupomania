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
              <div class="interior">
                <a class="btn" href="#open-modal"
                  ><button
                    v-if="userIdLogged == message.user.id"
                    class="btn btn-warning btn-modify"
                    @click="showModal = true"
                  >
                    <i class="far fa-edit"></i></button
                ></a>
            </div>
            <div id="open-modal" class="modal-window">
              <div>
                <a href="#" title="Close" class="modal-close">Fermer</a>
                <h1>Modifiez votre message</h1>
                <form action="">
                    <div class="new-title form-group">
                    <label>Titre :</label>
                    <input type="text" v-model="message.title">
                    </div>
                    <div class="new-content form-group">
                      <label for="">Message :</label>
                      <textarea v-model="message.content"></textarea>
                    </div>
                    <button @click.prevent="updateMessage(message)" class="btn btn-success">Envoyer</button>
                </form>
              </div>
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
      message: {
        id: this.id,
        title: this.title,
        content: this.content,
        createdAt: this.createdAt
      },
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
    updateMessage(message) {
        let newMessage = {
          id: message.id,
          title: message.title,
          content: message.content
        };
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
}.modal-window {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  &:target {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  & > div {
    width: 800px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: white;
    border: 1px solid black;
  }
  header {
    font-weight: bold;
  }
  h1 {
    font-size: 3em;
    margin: 0 0 15px;
  }
  label {
    font-size: 2em;
  }
  input, textarea {
    font-size: 2em;
    width: 85%;
    float: right;
  }
  form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
  button {
    font-size: 2em;
    width: 30%;
    margin: auto;
  }
}

.modal-close {
  color: #aaa;
  line-height: 50px;
  font-size: 2em;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
}

@media only screen and (max-width: 900px) {
  .card {
    width: 90%;
  }
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>