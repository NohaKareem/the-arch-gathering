<template>
  <div class="container">
    <login v-if="!loggedIn"/>
    <div class="architectCon" v-for="architect in architects" :key="architect._id" v-else>
      <h1>{{ architect.first_name }} {{ architect.last_name }}</h1>
      <p>{{ architect.bio }}</p>
      <h2 v-if="displayArchitectures">Architecture:</h2>
      <ul v-if="displayArchitectures">
        <li v-for="architecture in architectures[architect._id]" :key="architecture._id">
          <!-- {{architectures}} -->
          <router-link :to="`/architectures/${architecture._id}`" class="linkText">{{ architecture.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import Login from "./Login.vue";
    import axios from "axios";
    export default {
      name: "Architects",
      components: { 'login': Login },
      data() {
        return {
          architects: {}, 
          architectures: [], 
          displayArchitectures: false, // displays only if loaded from axios
          loggedIn: false
        }
      },
      created: function() {
        var self = this;

        // get all architects
        axios.get('http://localhost:3000/api/architects', {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
          .then(function(response) {
            // if server sends a message (requiring login), mark loggedIn as false
            self.loggedIn = (response .data.msg) ? false : true;

            self.architects = response.data;

            // get all architectures by architect
            self.architects.forEach(function (architect) {
              let architectId = architect._id;
              axios.get(`http://localhost:3000/api/architects/${architectId}/architectures`)
                .then(function(response) {
                  self.architectures[architect._id] = response.data;
                  self.displayArchitectures = true;
                  // console.log(self.architectures[architect._id])
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