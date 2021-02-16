<template>
  <div id="header-site" v-bind:class="{ withSidebar }">
    <div class="site-pusher">
      <div class="header">
        <a
          href="#"
          class="header__icon"
          @click="withSidebar = !withSidebar"
        ></a>
        <img src="../assets/icon-left-font-new.png" alt="" />
        <nav class="menu">
          <a href="#"><router-link to="/">Home</router-link></a>
          <a href="#" v-if="isLoggedIn"><router-link to="/moncompte">Mon compte</router-link></a>
          <a href="#" v-if="!isLoggedIn"
            ><router-link to="/register">Inscription</router-link></a
          >
          <a href="#" v-else
            ><router-link to="/resources">Messagerie</router-link></a
          >
          <a href="#" v-if="isLoggedIn" @click="logout">Déconnection</a>
          <a href="#" v-else
            ><router-link to="/login">Connection</router-link></a
          >
          <a href="#"><router-link to="/about">A propos</router-link></a>
        </nav>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: localStorage.getItem("user"),
      withSidebar: false,
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
#header-site {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  padding: 0;
  margin: 0;
}
.site-pusher {
  height: 100%;
}
a:link {
  text-decoration: none;
}
.header {
  position: fixed;
  left: 0;
  right: 0;
  height: auto;
}
#header-site img {
  width: 45%;
  max-width: 350px;
  margin: 2% 2% 0 2% ;
  float: left;
}
nav {
  width: 60%;
  text-align: right;
  float: right;
  padding-top: 3%;
}

nav a {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 10px 0 0;
}

nav a.router-link-exact-active {
  color: #fd2d01;
}
@media only screen and (max-width: 925px) {
  .site-pusher {
    transition-duration: 0.3s;
    transform: translateX(0px);
  }
  .header {
    position: fixed;
    height: auto;
  }
  .header__icon {
    position: relative;
    display: block;
    float: left;
    width: 50px;
    height: 60px;
    cursor: pointer;
  }
  .header__icon:after {
    content: "";
    position: absolute;
    display: block;
    width: 16px;
    height: 0;
    top: 16px;
    left: 16px;
    box-shadow: 0 10px 0 1px black, 0 16px 0 1px black, 0 22px 0 1px black;
  }
  img {
    width: 100%;
    margin: 0 20%;
  }
  .menu {
    position: absolute;
    height: 94.5vh;
    background-color: #122442;
    left: 0;
    top: 0;
    width: 250px;
    transform: translateX(-250px);
    transition-duration: 0.3s;
  }
  .menu a {
    display: block;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin: auto;
    border-bottom: 1px solid black;
    text-decoration: none;
  }

  .withSidebar .site-pusher {
    transform: translateX(250px);
  }
}
</style>
