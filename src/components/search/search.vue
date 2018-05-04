<template>
  <div>
    <div class="layout-view layout-padding">
      <div class="text-center">
          <h1>Buscar</h1>
            <q-search v-model="srch" v-on:change="search" />
      </div>

      <div class="layout-view layout-padding">
        <q-list striped-odd sparse no-border>
      <q-item v-for="user in results" :key="user.id">
        <q-item-main>
          <q-item-tile label>{{ user.name }}
            <q-btn color="secondary" class="on-right" @click="">Chat</q-btn>
            <q-btn color="secondary" class="on-right" @click="">Perfil</q-btn>
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSearch, QItem, QList } from 'quasar'
import axios from 'axios'
import menu from '../layouts/menu'

export default{
  data () {
    return {
      srch: '',
      results: []
    }
  },

  methods: {
    search () {
      axios.post('search', {name: this.srch})
        .then((response) => {
          this.results = response.data.users
        }, () => {
          Toast.create.negative('Fallo al listar usuarios')
        })
    }
  },
  components: { 'q-menu': menu, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSearch, QItem, QList }
}
</script>
