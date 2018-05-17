<template>
  <div>
    <div class='layout-view'>
      <div class='text-center'>
        <h3>Perfil de {{this.user.name}} </h3>
      </div>
      <div class='layout-view layout-padding'>
        <q-card inline style='width: 500px'>
          
          <q-card-title>
              {{this.user.name}}
            <div slot='right' class='row items-center'>
            <q-icon name='audiotrack' /> {{this.user.genre}}
            </div>
          </q-card-title>
          <q-card-main>
            <p>{{this.user.instrument}}</p>
            <p class='text-faded'>{{this.user.profile}}</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn flat round small><q-icon name='event' /></q-btn>
            <q-btn flat>Mensajes</q-btn>
            <q-btn flat>7:30PM</q-btn>
            <q-btn flat>9:00PM</q-btn>
            <q-btn flat color='primary'>Reserve</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Toast,
  QBtn,
  QToolbar,
  QIcon,
  QToolbarTitle,
  QField,
  QInput,
  QCard,
  QCardMedia,
  QCardTitle,
  QCardMain,
  QCardSeparator,
  QCardActions
} from 'quasar'
import axios from 'axios'
import menu from '../layouts/menu'

export default {
  data () {
    return {
      user: {}
    }
  },

  mounted () {
    this.getProfile()
  },

  methods: {
    getProfile () {
      axios.get('getprofile', { id: this.$route.params.id }).then(
        response => {
          this.user = response.data.users[0]
        },
        () => {
          Toast.create.negative('Fallo al recuperar el perfil')
        }
      )
    }
  },

  components: {
    'q-menu': menu,
    QBtn,
    QToolbar,
    QIcon,
    QToolbarTitle,
    QField,
    QInput,
    QCard,
    QCardMedia,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QCardActions
  }
}
</script>
