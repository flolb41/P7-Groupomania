<template>
  <div class="account">
    <div class="infos-compte">
      <h3>Mon compte</h3>
      <div class="securite">
        <p class="unlock">Cochez pour modifier vos données</p>
        <input
          type="checkbox"
          name="name"
          @click="disabled = !disabled"
          class="enable-name"
        />
      </div>
      <form class="form-group">
        <label class="name">Nom :</label>
        <input class="form-control" v-model="userData.name" disabled />
        <label class="email">E-mail :</label>
        <input
          class="form-control"
          type="email"
          v-model="userData.email"
          disabled
        />
        <label for="password1" class="password">Nouveau mot de passe :</label>
        <input
          class="form-control"
          id="password1"
          type="password"
          name="up"
          v-model="password"
          v-bind:disabled="disabled"
          minlength="8"
        />
        <label for="password2" class="password-confirmation"
          >Confirmez votre nouveau mot de passe :</label
        >
        <input
          class="form-control"
          id="password2"
          type="password"
          name="up2"
          v-bind:disabled="disabled"
          minlength="8"
        />
      </form>
    </div>
    <div class="divider"></div>
    <div class="maj-compte"></div>
    <h3 class="maj">Mettre à jour mon compte</h3>
    <button @click="updateUser" class="btn btn-success">Mettre à jour</button>
    <div class="divider"></div>
    <div class="delete-user">
      <h3 class="supression">Supprimer mon compte</h3>
      <button @click="deleteUser" class="btn btn-danger">Supprimer</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {},
      password: '',
      disabled: true,
    };
  },
  methods: {
    getUserData() {
      const user = { id: localStorage.getItem('id') };
      this.$store
        .dispatch("getUserData", user)
        .then((res) => {
          return this.userData = res.data;
        })
        .catch((err) => console.log(err));
    },
    updateUser() {
      const user = {
        id: this.id, 
        name: this.userData.name,
        email: this.userData.email,
        password: this.password
      };
      this.$store
        .dispatch("updateUser", user)
        .then((res) => {
          this.$router.push("/resources");
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },    
    deleteUser() {
      const reponse = window.confirm('Attention !! Etes-vous sûr de vouloir supprimer votre compte ?');
        if(reponse == true) { 
      console.log(localStorage.getItem('id'));
      const user = { id: localStorage.getItem('id') };
      this.$store
        .dispatch("deleteUser", user)
        .then(() => {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          })
        }).catch((err) => console.log(err));
        } else { 
          return false;
          }
    },  
  },
  mounted() {
    this.getUserData();
  }
};
</script>
<style lang="scss">
.infos-compte {
  margin: 110px 15% 0 15%;
}
h3 {
  font-size: 2em;
  margin-bottom: 2%;
  text-decoration: underline;
}
p {
  font-size: 1.6em;
}
.divider {
  border: 1px solid black;
  margin: 4%;
}
</style>
