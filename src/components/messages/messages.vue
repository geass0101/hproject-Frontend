<template>
  <div>
    <div class="layout-view">
      <div class="text-center">
        <h3>Timeline </h3>
      </div>
      <div class="layout-view layout-padding">
       <q-chat-message v-for="message in messages" :key=message.id
        name=message.ori
        :text=message.body
        v-if="message.ori!=this.des" :v-bind="sent"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QChatMessage} from 'quasar'
  import axios from 'axios'
  import menu from '../layouts/menu'

  export default{
    data () {
      return {
        messages: [],
        body: '',
        ori: '',
        des: '$route.params.id'
      }
    },

    mounted () {
      this.getMessages()
    },

    methods: {
      getMessages () {
        axios.get('messages', {'des': this.des, 'body': this.body})
          .then((response) => {
            this.posts = response.data
          }, () => {
            Toast.create.negative('Fallo al recuperar mensajes')
          })
      },
      createMessage () {
        axios.post()
          .then((response) => {
            this.getMessages()
          }, () => {
            Toast.create.negative('Fallo al enviar mensaje')
          })
      }
    },

    components: {'q-menu': menu, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QChatMessage}
  }
</script>
