<template>
  <div class="container">
    <div class="architectureListCon" v-if="loadPage">
      <div class="architectureCon" v-for="architecture in architectures" :key="architecture._id">
        <router-link :to="`/architectures/${architecture._id}`" class="linkImage">
          <img :src="`/static/${architecture.image}`" :alt="`${architecture.name} image`" class="listThumb">
        </router-link>
        <h1>
            <router-link :to="`/architectures/${architecture._id}`" class="linkText">
                {{ architecture.name }}
            </router-link>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
      name: "Architectures",
      data() {
        return {
          loadPage: true,
          architectures: {}
        }
      },
      created: function() {
        var self = this;

        // get all architectures
        axios.get('http://localhost:3000/api/architectures')
          .then(function(response) {
            // if(!response.data.name) {
            //   self.loadPage = false;
            //   document.querySelector('.container').innerHTML = response.data;
            // }
            // else {
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
  
  .listThumb {
      width: $mblWidth;
      height: 350px;
      object-fit: cover;
  }

  // .architectureListCon:last-child {
  // }

  @media screen and (min-width: $desktopWidth) {
    .architectureListCon {
      grid-template-columns: repeat(3, minmax(0, 1fr));
            
      .architectureCon {
        width: $ImgDsktpWidth;
      }
    }

    .listThumb {
        width: $ImgDsktpWidth;
        height: $imgDsktpHeight;
    }
  }
</style>