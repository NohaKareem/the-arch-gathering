<template>
  <div class="container">
    <login v-if="!loggedIn"/>
    <div class="architectureListCon" v-else>
      <div class="architectureCon" v-for="architecture in architectures" :key="architecture._id">
        
        <transition name="hoverImage">
          <router-link :to="`/architectures/${architecture._id}`" class="linkImage">
            <img :src="`/static/${architecture.image}`" :alt="`${architecture.name} image`" class="listThumb">
          </router-link>
        </transition>

        <p class="architectureName">
            <router-link :to="`/architectures/${architecture._id}`" class="linkText">
                {{ architecture.name }}
            </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    import Login from "./Login.vue";
    import axios from "axios";
    export default {
      name: "Architectures",
      components: { 'login': Login },
      data() {
        return {
          loadPage: true,
          architectures: {}, 
          loggedIn: false
        }
      },
      created: function() {
        var self = this;

        // get all architectures
        axios.get('http://localhost:3000/api/architectures', {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
          .then(function(response) {
            // if(!response.data.name) {
            //   self.loadPage = false;
            //   document.querySelector('.container').innerHTML = response.data;
            // }
            // else {
              // if server sends a message (requiring login), mark loggedIn as false
              self.loggedIn = (response .data.msg) ? false : true;
              console.log(response.data)
              self.loadPage = true;
              self.architectures = response.data;
            // }           
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    }
</script>

<style lang="scss">
  @import '@/styles/globalStyles.scss';

  $mblWidth: 150px;
  $ImgDsktpWidth: 20vw;//300px;
  $imgDsktpHeight: 20vw;//300

  .architectureListCon {
    margin-bottom: $largeMargin;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    justify-items: center;

    .architectureCon {
      width: $mblWidth;
      margin-right: $baseMargin * 2;
      margin-bottom: $largeMargin * 2.5;
    }
  }
  
  .architectureName {
    width: $mblWidth;
  }

  .listThumb {
      width: $mblWidth;
      height: 350px;
      object-fit: cover;
  }

  // .architectureListCon:last-child {
  // }

  // transitions
  .hoverImage-enter, .hoverImage-leave-to {
    filter: grayscale(0%);
      // opacity: 0;
      // transform: rotateY(50deg);
  }

  .hoverImage-enter-to, .hoverImage-leave {
    filter: grayscale(90%);
    // opacity: 1;
    // transform: rotateY(0deg);
  }

  .hoverImage-enter-active, .hoverImage-leave-active {
    transition: filter 300ms ease-in;
    // transition: opacity, transform 200ms ease-out;
  }

  @media screen and (min-width: $desktopWidth) {
    .architectureListCon {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      // margin: 0 auto;
      .architectureCon {
        width: $ImgDsktpWidth;
      }
    }

    .architectureName {
      width: $ImgDsktpWidth;
    }

    .listThumb {
        width: $ImgDsktpWidth;
        height: $imgDsktpHeight;
    }
  }
</style>