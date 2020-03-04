<template>
  <div class="container">
      <div class="overlayCon">
        <img src="static/login.jpg" alt="login image" class="loginImage">
        <div class="overlay">
            <h1 class="overlayText">Log<span class="contrast">in</span></h1>
            <form action="login" method="post">
                <input type="text" placeholder="username"> 
                <br>
                <input type="text" placeholder="password">
                <input type="submit" value="Log In">
            </form>
        </div>
        <div class="registerCon">
             new? <a href="register" class="linkText">register</a>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Logiin"
    }
</script>

<style lang="scss">
  @import '@/styles/globalStyles.scss';
</style>
