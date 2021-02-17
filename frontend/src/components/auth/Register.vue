<template>
  <div class="register">
    <h2>Inscription</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Nom :</label>
        <input
          class="form-control"
          id="name"
          type="text"
          v-model="name"
          placeholder="Nom"
          required
          autofocus
        />
      </div>
      <div class="form-group">
        <label for="email">Adresse e-mail :</label>
        <input
          class="form-control"
          id="email"
          type="email"
          v-model="email"
          placeholder="Adresse e-mail"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input
          class="form-control"
          id="password"
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          minlength="8"
          required
        />
      </div>
      <div class="form-group">
        <label for="password-confirm">Confirmation Mot de passe :</label>
        <input
          class="form-control"
          id="password-confirm"
          type="password"
          v-model="password_confirmation"
          placeholder="Confirmez mot de passe"
          minlength="8"
          required
        />
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Inscription</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    register() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("register", user)
        .then(() => this.$router.push("/resources"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.register {
  margin: 10% auto;
  width: 50%;
}
.register h2 {
  margin-bottom: 5%;
}
</style>