<template>
  <div id="app">
    <header>
      <!-- <router-link to="/"> -->
        <img id="logo" src="/logo.svg" alt="The Arch Gathering logo">
      <!-- </router-link>~component cond stylng -->
      <nav>
        <transition name="fade">  
          <router-link to="/architectures" class="linkText">architecture</router-link>
        </transition>
        <router-link to="/architects" class="linkText">architects</router-link>
        <router-link to="/api" class="linkText">API</router-link>
        <router-link to="/about" class="linkText">about</router-link>
      </nav>
    </header>
    <router-view />
    <footer class="italic">
      <div class="leftFooter">
        <a href="#" class="linkText">contact us</a>
        <a href="#" class="linkText">terms& conditions</a>
        <a href="#" class="linkText">privacy policy</a>
      </div>
      <div class="rightFooter">
        <a href="#">contact</a>
        <i class="fa fa-facebook linkText"></i>
        <i class="fa fa-twitter linkText"></i>
        <i class="fa fa-instagram linkText"></i>
      </div>
    </footer>
  </div>
</template>

<script>
    export default {
      name: "App",
    }
</script>

<style lang="scss">
  @import '@/styles/globalStyles.scss';

  header {
    margin-top: 20px;
    text-align: center;
    
    #logo {
      max-width: 60vw;
    }
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>