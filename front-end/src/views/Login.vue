<template>
  <div class="container">
      <div class="overlayCon">
        <img src="static/login.jpg" alt="login image" class="loginImage">
        <div class="overlay">
            <h1 class="overlayText">Log<span class="contrast">in</span></h1>
            <form action="http://localhost:3000/login" method="post">
                <input type="text" name="username" placeholder="username"> 
                <br>
                <input type="password" name="password" placeholder="password">
                <br>
                <input type="submit" value="Log in >">
            </form>
        </div>
        <div class="registerCon">
            new? <router-link to="register" class="linkText">register</router-link> 
            <br>
            <a href="http://localhost:3000/auth/facebook" class="linkText">login through facebook</a> 
        </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Login"
    }
</script>

<style lang="scss">
  @import '@/styles/globalStyles.scss';
</style>
