<template>
  <div class="container architecture">
    <login v-if="!loggedIn"/>

    <div class="detailsCon" v-else>
        <h2 class="italic">{{ architecture.name }}</h2>
        <p v-for="architect in architects" :key="architect">
            {{ architect.first_name }} {{ architect.last_name }}
        </p>
        <p>{{ architecture.year }} · {{ architecture.location_city }}</p>
        <hr>
        <p>{{ architecture.description }}</p>
        <hr>
        <div class="commentSection">
            <h3 class="italic">Conversation</h3>
            comments
            <h3 class="addCommentHeading"> Add a comment</h3>
            <form :action="`/architecture/${architecture._id}/new/comment`" ref="addComment" method="post" enctype="multipart/form-data">
                <textarea name="comment" id="commentTextArea" cols="50" rows="10" placeholder="type your comment here"></textarea>
                <button type="button" class="linkText" id="commentButton" @click="addComment()">
                    +add comment 
                </button>
           </form>
        </div>
    </div>
    <div class="imageCon">
        <div class="addToFavesButton" @click="addToFaves()">
            <hr>
                <router-link to="#">
                    +
                    <br>
                    add to favorites
                </router-link>
            <hr>
        </div>
      <transition name="appearTransition" appear>
        <img :src="`/static/${architecture.image}`" :alt="`${architecture.name} image`" class="detailImage">
      </transition>
    </div>    
  </div>
</template>

<script>
    import Login from "./Login.vue";
    import axios from "axios";
    export default {
      name: "Architectures",
      components: {'login': Login },
      data() {
        return {
          architecture: {}, 
          architects: [],
          loggedIn: false
        }
      },
      created: function() {
        var self = this;

        // get all architectures
        axios.get(`http://localhost:3000/api/architectures/${this.$route.params.id}`,  {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
          .then(function(response) {
            // if server sends a message (requiring login), mark loggedIn as false
            self.loggedIn = (response .data.msg) ? false : true;
            
              console.log(response.data[0])
            self.architecture = response.data[0];
            
            // console.log(response.data[0].architects)
            // get all architects for an architecture piece
            self.architecture.architects.forEach(architectId => {
                console.log(architectId)
                console.log('id')
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
      }, 
      methods: {
          addComment() {
                const formData = new FormData(this.$refs.addComment);
                console.log(formData);
                let self = this;
                axios.post(`/architecture/${self.architecture._id}/new/comment`, formData)
                    .then(response => {
                        console.log('added comment');
                        console.log(response.data);
                    }).catch(error => {
                        console.error(error);
                        this.$errors = error.reponse.data.errors; 
                    });
          }, 
          addToFaves(){
            //    const formData = new FormData(this.$refs.addComment);
                let self = this;
                let userId;

                // get user id
                axios.get(`/users/getUserId`)
                    .then(response => {
                        console.log(response.data)
                        userId = response.data.user;
                    }).catch(error => {
                        console.error(error);
                        this.$errors = error.reponse.data.errors; 
                });
                
                console.log('user id is' + userId);

                // save architecture to favorites
                if (userId) {
                    axios.post(`/users/${userId}/add/architecture/${self.architecture._id}`)
                        .then(response => {
                            console.log('added architecture');
                            console.log(response.data);
                        }).catch(error => {
                            console.error(error);
                            this.$errors = error.reponse.data.errors; 
                        });
                }
          }
      }
    }
</script>

<style lang="scss">
  @import '@/styles/globalStyles.scss';
    
    // button 
    hr:last-child {
        margin-top: 20px;
    }

    // layout
    .container.architecture {
        display: flex;
        flex-direction: column;
    }
    .imageCon {
        order: -1;
        display: flex;
        flex-direction: row;
        .addToFavesButton {
            margin-right: auto;
            left: 0;
            position: absolute;
            // align-self: flex-start; 
            // height: 115px;
            margin-top: 15px;
        }
        img {
            margin-left: auto;
            margin-right: -30px;
        }
    }

    .detailImage {
        width: 55vw;
        height: 65vw;
        object-fit: cover;
    }

    .addCommentHeading {
        margin-top: 10px;
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

        hr {
            visibility: hidden;
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
        border: none;
        background-color: $sandyRose;
        font-family: 'Cormorant Garamond', sans-serif;
        font-size: 20px;
        cursor: pointer;
        margin-bottom: 30px;
    }

    #commentButton:hover {
        background-color: black;
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
            width: 30vw;
            height: 30vw;
            object-fit: cover;
        }

        .container.architecture {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-column-gap: 17vw;
            
            .detailsCon {
                margin-left: 10vw;
                width: 35vw;
            }
        }

        .imageCon {
            order: 1;

            display: grid;
            grid-template-columns: 0.25fr 2fr;
            margin-left: 20px;
            margin-right: 20px;
        }

        .addToFavesButton {
            // undo mobie styling
            margin-right: unset !important;
            left: unset !important;
            position: unset !important;

            // apply desktop styling
            height: 115px;
            margin-top: 15px;
            hr:first-child {
                margin-top: -10px;
            }
        }
  }
</style>