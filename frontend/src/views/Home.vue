<template>
  <div class="home">
    <h1 class="cover-heading">C'est l'heure de la pause ?</h1>
    <p class="desc">
      Alors essayez la nouvelle application Groupomania créée pour vous, ses
      collaborateurs afin de développer vos idées, vos suggestions. Parlez-en
      autour de vous !!
    </p>
    <div class="desc" v-if="!isLoggedIn">
      <a href="../login" class="btn btn-lg btn-secondary">Connection</a>
      <a href="../register" class="btn btn-lg btn-secondary">Inscription</a>
    </div>
    <footer class="mastfoot mt-auto">
      <div class="inner">
        <p>
          Application créée pour<a href="#/">Groupomania</a>par<a href="#"
            >Florian Le Blanc</a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 80vh;
  margin-top: 200px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-origin: padding-box;
}
a {
  margin: 2%;
}
h2 {
  width: 100%;
  font-size: 40px;
  color: #d1515a;
  margin: 5% auto;
}
p {
  font-size: 25px;
  color: #122422;
  width: 80%;
  margin: auto;
}
.btn {
  font-size: 200%;
}
footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
@media only screen and (max-width: 900px) {
  .home {
    margin-top: 50px;
  }
}
</style>