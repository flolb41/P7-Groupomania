<template>
  <div class="login">
    <form class="login-form" @submit.prevent="login">
      <h2>Connection</h2>
      <div class="form-group">
        <label>Adresse e-mail :</label>
        <input
          class="form-control"
          v-model="email"
          type="email"
          placeholder="Adresse e-mail"
          required
          autofocus
        />
      </div>
      <div class="form-group">
        <label>Mot de passe :</label>
        <input
          class="form-control"
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          required
        />
      </div>
      <hr />
      <button class="btn btn-primary" type="submit">Connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", user)
        .then(() => this.$router.push("/resources"))
        .catch((err) => {
          console.log(err);
          alert('Identifiants invalides !! Veuillez vérifier votre saisie.')
          });
    },
  },
};
</script>

<style>
.login {
  margin: 10% auto;
  width: 50%;
}
.login h2 {
  margin-bottom: 5%;
}
</style>