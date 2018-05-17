<template>
  <div>
    <div class="layout-view layout-padding">
      <div class="text-center">
          <h3>Buscar geográficamente</h3>
            <q-select  v-model="select" :options="selectOptions"  />
      </div>

      <div class="layout-view layout-padding">
        <q-list striped-odd sparse no-border>
      <q-item v-for="user in results" :key="user.id">
        <q-item-main>
          <q-item-tile label>{{ user.name }}
            <q-btn color="secondary" class="on-right" @click="$router.push('/messages/'+this.user.id)">Chat</q-btn>
            <q-btn color="secondary" class="on-right" @click="$router.push('/profile/'+this.user.id)">Perfil</q-btn>
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
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
  QSearch,
  QItem,
  QList
} from 'quasar'
import axios from 'axios'
import menu from '../layouts/menu'

export default {
  data () {
    return {
      srch: '',
      results: [],
      options: [],
      selectOptions: []
    }
  },

  methods: {
    getInst () {
      axios.get('inst').then(
        response => {
          this.options = response.data.users
        },
        () => {
          Toast.create.negative('Fallo al recuperar lista de instrumentos')
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
    QSearch,
    QItem,
    QList
  }
}
</script>
