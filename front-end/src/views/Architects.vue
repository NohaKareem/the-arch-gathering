<template>
  <div class="container">
    <div class="architectCon" v-for="architect in architects" :key="architect._id">
      <h1>{{ architect.first_name }} {{ architect.last_name }}</h1>
      <p>{{ architect.bio }}</p>
      <h2>Architecture:</h2>
      <ul>
        <li v-for="architecture in architectures" :key="architecture._id">
          {{ architecture.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
      name: "Architects",
      data() {
        return {
          architects: {}, 
          architectures: {}
        }
      },
      created: function() {
        var self = this;
        // var id = this.$route.params.id;

        // get all architects
        axios.get('http://localhost:3000/api/architects')
          .then(function(response) {
            self.architects = response.data;

            // get all architectures by architect
            self.architects.forEach(function (architect) {
              let architectId = architect._id;
              axios.get(`http://localhost:3000/api/architects/${architectId}/architectures`)
                .then(function(response) {
                  self.architectures = response.data;
                })
                .catch(function(error) {
                  console.error(error);
                });
            });
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    }
</script>

<style lang="scss">
  @import '@/styles/globalStyles.scss';
  .architectCon {
    margin-bottom: $largeMargin;
  }

  ul {
    margin-left: 20px;
    list-style-type: disc;
  }
</style>