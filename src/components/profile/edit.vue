<template>
  <div>
    <div class='layout-view'>
      <div class='text-center'>
        <h3>Edición de Perfil</h3>
      </div>
      <div class='layout-view layout-padding'>
        <q-input v-model='user.name' stack-label='Nombre público' />
        <q-input v-model='user.profile' stack-label='Descripcion de perfil' />
        <q-input v-model='user.city' stack-label='Ciudad' />
        <q-input v-model='user.country' stack-label='País' />
        <q-input v-model='user.instrument' stack-label='Instrumentos' />
        <q-input v-model='user.genere' stack-label='Géneros' />
        <q-btn color='secondary' class='on-right' @click='editProfile'>Realizar Cambios</q-btn>

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
  QInput
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
    this.fetchProfile()
    this.setLocation()
  },

  methods: {
    fetchProfile() {
      axios.get('profile').then(
        response => {
          this.user = response.data.users[0];
        },
        () => {
          Toast.create.negative('Fallo al recuperar el perfil');
        }
      );
    },
    editProfile() {
      axios
        .post('profile', {
          name: this.user.name,
          profile: this.user.profile,
          city: this.user.city
        })
        .then(
          () => {
            Toast.create.positive('Perfil actualizado');
          },
          () => {
            Toast.create.negative('Fallo al actualizar el perfil');
          }
        )
    },
    setLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.sendLocation
        )
      } else {
        Toast.create.negative('Fallo al coger posicion geográfica');
      }
    },
    sendLocation(position){
      axios
            .post('location', {
              lat: position.coords.latitude,
              long: position.coords.longitude
            })
            .then(
              () => {
                Toast.create.positive('Tomada geolocalización');
              },
              () => {
                Toast.create.negative('Fallo al detectar posicion geográfica');
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
    QInput
  }
};
</script>
