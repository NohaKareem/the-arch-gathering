<template>
  <div class="container">
    <div class="about"></div>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
      name: "About",
      created: function() {

        // get about page
        axios.get('http://localhost:3000/about')
          .then(function(response) {
            // console.log(response);
            let pageCon = document.querySelector('.about');
            pageCon.innerHTML = response.data;
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    }
</script>
