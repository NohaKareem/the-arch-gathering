<template>
  <div class="container">
    <ul>
      <li>
        <a href="http://localhost:3000/API/architects" class="linkText">Architects</a>
      </li>
      <li>
        <a href="http://localhost:3000/API/architectures" class="linkText">Architecture</a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "API"
    }
</script>

<style lang="scss">
  @import '@/styles/globalStyles.scss';
  ul {
    list-style-type: square;
  }
</style>
