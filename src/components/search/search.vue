<template>
  <div>
    <div class="layout-view">
      <div class="text-center">
          <h1>Buscar</h1>
      </div>

      <div class="layout-view layout-padding">

      <q-search v-model="srch" />
      <q-btn color="secondary"  @click='search'>Buscar</q-btn>
      <q-item v-for="user in results" :key="user.id">
        <q-item-main>
          <q-item-tile label>{{ user.name }}
          </q-item-tile>
        </q-item-main>
      </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSearch, QItem } from 'quasar'
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
      axios.post('search', {
        name: this.srch
      })
        .then((response) => {
          this.results = this.response.data
        }, () => {
          Toast.create.negative('Fallo al listar usuarios')
        })
    }
  },
  components: { 'q-menu': menu, QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSearch, QItem }
}
</script>
