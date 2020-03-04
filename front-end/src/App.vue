<template>
  <div id="app">
    <header>
      <img id="logo" src="/logo.svg" alt="The Arch Gathering logo">
      <nav>
        <router-link to="/architectures" class="linkText">architecture</router-link>
        <router-link to="/architects" class="linkText" @click="animate = true">architects</router-link>
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
      name: "App"
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
</style>