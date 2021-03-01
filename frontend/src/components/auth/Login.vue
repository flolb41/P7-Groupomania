<template>
  <div class="login">
    <form class="login-form" @submit.prevent="login">
      <h2>Connection</h2>
      <div class="form-group-lg">
        <label class="label-size col-form-label-lg">Adresse e-mail :</label>
        <input
          class="form-control"
          v-model="email"
          type="email"
          placeholder="Adresse e-mail"
          required
          autofocus
        />
      </div>
      <div class="form-group-lg">
        <label class="label-size col-form-label-lg">Mot de passe :</label>
        <input
          class="form-control"
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          minlength="8"
          required
        />
      </div>
      <button class="btn btn-primary btn-lg" type="submit">Connecter</button>
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
        .then(() => {
          this.$router.push("/resources");
          })
        .catch((err) => {
          console.log(err);
          alert('Identifiants invalides !! Veuillez vérifier votre saisie.')
          });
    },
  },
};
</script>

<style lang='scss' scoped>
.login {
  margin: 200px auto;
  width: 70%;
}
.login h2 {
  margin-bottom: 5%;
  font-size: 3em;
}
label, button {
  font-size: 1.5rem;
}
.label-size {
  font-size: 2em;
}
button {
  font-size: 2em;
  margin-top: 30px;
}
</style>