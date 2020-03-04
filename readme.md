# The Arch Gathering

The Arch Gathering, is a digital publication celebrating beautiful architecture. Architectural pieces, as well as architects’ biographies, are posted as a reference for architects and an educational medium for architecture enthusiasts. 

Built as an integrated assignment for courses 6003 and 6007.

## notes
* login, registration and about pages are rendered in ejs, available in the back-end folder, and sent to the front-end for display (using sendFile)

## project run
* in back-end server (/back-end)
    * run ```npm install``` 
    * run ```npm run dev```
* for front-end, run ```vue ui```, import the /front-end folder and run the server

## helpful resources
* vue transitions https://medium.com/vue-mastery/how-to-create-vue-js-transitions-6487dffd0baa
* res.sendFile pathing https://stackoverflow.com/a/25463996/1446598
* on debugging sessions https://stackoverflow.com/questions/36486397/passport-login-and-persisting-session
* connecting front-end and back-end to passport https://blog.zairza.in/oauth-using-mevn-stack-4b4a383dae08
* multiple passport strategies https://stackoverflow.com/ questions/20745296/passport-js-with-multiple-authentication-providers
* on reseting css in media queries (inital and unset) https://www.quora.com/How-can-I-undefine-delete-a-CSS-property-in-media-query and https://developer.mozilla.org/en-US/docs/Web/CSS/unset