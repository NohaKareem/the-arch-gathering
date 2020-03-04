<template>
  <div class="container">
      <div class="overlayCon">
        <img src="static/login.jpg" alt="login image" class="loginImage">
        <div class="overlay register">
            <h1 class="overlayText">Reg<span class="contrast">ister</span></h1>
            <form action="http://localhost:3000/register" method="post">
                <input type="text" name="email" placeholder="email"> 
                <br>
                <input type="text" name="username" placeholder="username"> 
                <br>
                <input type="password" name="password" placeholder="password">
                <br>
                <input type="password" name="password" placeholder="password">
                <br>
                <input type="submit" value="register >">
            </form>
        </div>
        <div class="registerCon">
             <p>already a member? <router-link to="login" class="linkText">login</router-link> </p>
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
