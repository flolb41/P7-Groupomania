<template>
  <div class="account">
    <div class="infos-compte">
      <h3>Mon compte</h3>
      <div class="securite">
        <p class="unlock">Cochez pour modifier vos données : </p>
        <input
          id="unlock"
          type="checkbox"
          name="unlock"
          @click="disabled = !disabled"
          class="input-group enable-name"
        />
      </div>
      <form class="form-group-lg">
        <label class="name col-form-label-lg">Nom :</label>
        <input class="form-control name-input" v-model="userData.name" disabled />
        <label class="email col-form-label-lg">E-mail :</label>
        <input
          class="form-control"
          type="email"
          v-model="userData.email"
          disabled
        />
        <label for="password1" class="password col-form-label-lg">Nouveau mot de passe :</label>
        <input
          class="form-control"
          id="password1"
          type="password"
          name="up"
          v-model="password"
          v-bind:disabled="disabled"
          minlength="8"
        />
        <label for="password2" class="password-confirmation col-form-label-lg"
          >Confirmez votre nouveau mot de passe :</label
        >
        <input
          class="form-control"
          id="password2"
          type="password"
          name="up2"
          v-model="pwdConf"
          v-bind:disabled="disabled"
          minlength="8"
        />
      </form>
    </div>
    <div class="divider"></div>
    <div class="maj-compte"></div>
    <h3 class="maj">Mettre à jour mon compte</h3>
    <button @click="updateUser" class="btn-lg btn-success">Mettre à jour</button>
    <div class="divider"></div>
    <div class="delete-user">
      <h3 class="supression">Supprimer mon compte</h3>
      <button @click="deleteUser" class="btn-lg btn-danger">Supprimer</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {},
      password: "",
      pwdConf:"",
      disabled: true,
    };
  },
  methods: {
    updateUser() {
      const user = {
        id: localStorage.getItem("id"),
        name: this.userData.name,
        email: this.userData.email,
        password: this.password,
        pwdConf: this.pwdConf
      };
      if(user.password === ""){
        alert('Votre mot de passe ne peut pas rester vide !!')
      } else {
      this.$store
        .dispatch("updateUser", user)
        .then(() => {
          alert("Mot de passe mis à jour !!");
          document.location.reload();
        })
        .catch((err) => {
          alert('Mots de passe différents, confirmation impossible !!');
          console.log(err);
        });
      }
    },
    deleteUser() {
      const reponse = window.confirm(
        "Attention !! Etes-vous sûr de vouloir supprimer votre compte ?"
      );
      if (reponse == true) {
        console.log(localStorage.getItem("id"));
        const user = { id: localStorage.getItem("id") };
        this.$store
          .dispatch("deleteUser", user)
          .then(() => {
            this.$store.dispatch("logout").then(() => {
              this.$router.push("/login");
            });
          })
          .catch((err) => console.log(err));
      } else {
        return false;
      }
    },
  },
  mounted() {
    const userId = localStorage.getItem("id");
    this.$store.dispatch("getUserData", userId).then((response) => {
      return this.userData = response.data;
    });
  },
};
</script>
<style lang="scss">
.infos-compte {
  margin: 120px 15% 0 15%;
}
label {
  margin-top: 10px;
  float: left;
}
.name-input {
  text-transform: capitalize;
}
h3 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-decoration: underline;
}
p {
  font-size: 2em;
}
.divider {
  border: 1px solid black;
  margin: 40px;
}
.name, .email, .password, .password-confirmation {
  font-size: 2em;
}
.btn-lg {
  font-size: 1.5em;
}
form .name::first-letter {
  text-transform: uppercase;
}
@media only screen and (max-width: 900px) {
  .infos-compte {
    margin: 10px 15% 0 15%;
  }
}
</style>
