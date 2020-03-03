<template>
  <div class="container">
    <div class="detailsCon">
        <h2 class="italic">{{ architecture.name }}</h2>
        <p v-for="architect in architecture.architects" :key="architect"></p>
        <p>{{ architecture.year }} · {{ architecture.location_city }}</p>
        <hr>
        <p>{{ architecture.description }}</p>
        <hr>
        <div class="commentSection">
            <h3 class="italic">Conversation</h3>
            ~comments
            <h2> Add a comment~</h2>
            <textarea name="comment" id="commentTextArea" cols="50" rows="10" placeholder="type your comment here"></textarea>
            <router-link to="#" class="linkText" id="commentButton">
                +add comment ~
            </router-link>
        </div>
    </div>
    <div class="imageCon">
        <div class="addToFavesButton">
            <hr>
                <router-link to="#">
                    +~ 
                    <br>
                    add to favorites
                </router-link>
            <hr>
        </div>
        <img :src="`/static/${architecture.image}`" :alt="`${architecture.name} image`" class="detailImage">
    </div>    
  </div>
</template>

<script>
    import axios from "axios";
    export default {
      name: "Architectures",
      data() {
        return {
          architecture: {}, 
          architects: []
        }
      },
      created: function() {
        var self = this;

        // get all architectures
        axios.get(`http://localhost:3000/api/architectures/${this.$route.params.id}`)
          .then(function(response) {
            //   console.log(response.data)
            self.architecture = response.data[0];

            console.log(self.architecture.architects)
            // get all architects for an architecture piece
            self.architecture.architects.forEach(architectId => {
                console.log(architectId)
                axios.get(`http://localhost:3000/api/architects/${architectId}`)
                    .then(function(response) {
                        console.log(response.data);
                        self.architects.push(response.data[0]);
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            })
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    }
</script>

<style lang="scss">
  @import '@/styles/globalStyles.scss';

    .detailImage {
        width: 55vw;
        height: 65vw;
        object-fit: cover;
    }

    // add to favorites
    .addToFavesButton {
        text-align: center;
        width: 100px;
        padding-left: 5px;
        padding-right: 5px;

        a { 
            text-decoration: none;
            color: black;
        }

        hr {
            border-color: black;
        }
    }

    .addToFavesButton:hover {
        background-color: black;

        a {
            color: $sandyRose;
        }
    }

    .selected {
        background-color: black;

        a {
            color: $sandyRose;
        }
    }

    .selected:hover {
        background-color: $sandyRose;

        a {
            color: black;
        }
    }

    // comments
    #commentButton {
        display: block;
        width: auto;
    }

    #commentTextArea {
        margin-top: $baseMargin / 2;
        background-color: $sandyRose;
        border-bottom: none;
        border-right: none;
        font-family: 'Cormorant Garamond', sans-serif;
        font-size: 23px;
    }

  @media screen and (min-width: $desktopWidth) {
        .detailImage {
            width: 35vw;
            height: 35vw;
            object-fit: cover;
        }

        .container {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-column-gap: 20vw;
            
            .detailsCon {
                margin-left: 10vw;
                width: 35vw;
            }
        }

  }
</style>