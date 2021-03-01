<template>
  <div class="register">
    <h2>Inscription</h2>
    <form @submit.prevent="register">
      <div class="form-group-lg">
        <label for="name" class="label-size col-form-label-lg">Nom :</label>
        <input
          onchange="this.value = this.value.charAt(0).toUpperCase() + this.value.substr(1);"
          class="form-control"
          id="name"
          type="text"
          v-model="name"
          placeholder="Nom"
          required
          autofocus
        />
      </div>
      <div class="form-group-lg">
        <label for="email" class="label-size col-form-label-lg">Adresse e-mail :</label>
        <input
          class="form-control"
          id="email"
          type="email"
          v-model="email"
          placeholder="Adresse e-mail"
          required
        />
      </div>
      <div class="form-group-lg">
        <label for="password" class="label-size col-form-label-lg">Mot de passe :</label>
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
      <div class="form-group-lg">
        <label for="password-confirm" class="label-size col-form-label-lg">Confirmation Mot de passe :</label>
        <input
          class="form-control"
          id="password-confirm"
          type="password"
          v-model="passwordConfirmation"
          placeholder="Confirmez mot de passe"
          minlength="8"
          required
        />
      </div>
      <div class="form-group-lg">
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
      passwordConfirmation: "",
    };
  },
  methods: {
    register() {
      const user = {
        name: this.name,
        email: this.email,
        pwd: this.password,
        pwdConf: this.passwordConfirmation
      };
      this.$store
        .dispatch("register", user)
        .then(() => this.$router.push("/resources"))
        .catch(() => {
          alert('Le mot de passe ne correspond pas, Veuillez vérifier la saisie !!')
          });
    },
    
  },
};
</script>

<style lang="scss" scoped>
.register {
  margin: 200px auto;
  width: 70%;
}
.register h2 {
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