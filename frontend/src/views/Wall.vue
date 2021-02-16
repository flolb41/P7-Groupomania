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
            {{ message.name }}
          </h4>
          <h4 class="date">
            Le : <br />
            {{ message.createdAt }}
          </h4>
          <button
            v-if="userLogged == message.name"
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
export default {
  name: "wall",
  data() {
    return {
      allMessages: [],
      message: {},
      userLogged: localStorage.getItem("user"),
    };
  },
  methods: {
    deleteMessage(id) {
      let message = { id: id };
      console.log(message);
      this.$store
        .dispatch("deleteMessage", message)
        .then((res) => {
          document.location.reload();
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
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
  height: 60vh;
  margin: 0 5%;
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