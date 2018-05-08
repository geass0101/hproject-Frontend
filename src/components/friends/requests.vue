<template>
<div>
  <div class="layout-view">
    <q-tabs slot="navigation">
    <q-route-tab slot="title" icon="list" to="/friends" replace hide="icon" label="Amigos" />
    <q-route-tab slot="title" icon="add_circle" to="/friends/requests" replace hide="icon" label="Solicitudes de amistad" />
  </q-tabs>
    <div class="layout-padding">
      <div class="text-center">
        <h3>Lista de amigos</h3>
      </div>
      <div class="layout-view layout-padding">
      <q-list striped-odd sparse no-border>
        <q-item v-for="friend in friends" :key="friend.id">
          <q-item-main>
            <q-item-tile label>{{ friend.name }}
              <q-btn color="secondary" class="on-right" @click="">Chat</q-btn>
              <q-btn color="secondary" class="on-right" @click="">Perfil</q-btn>
            </q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  Toast,
  QList,
  QBtn,
  QItem,
  QItemMain,
  QItemTile,
  QTabs,
  QRouteTab
} from 'quasar'
import axios from 'axios'
import menu from '../layouts/menu'

export default {
  data () {
    return {
      friends: []
    }
  },

  mounted () {
    this.fetchFriends()
  },

  methods: {
    fetchFriends () {
      axios.get('friends')
        .then((response) => {
          this.friends = response.data
        }, () => {
          Toast.create.negative('Fallo al recuperar lista de amigos')
        })
    },
    getFriends () {
      axios.post('friends')
        .then((response) => {
          this.friends = response.data
        }, () => {
          Toast.create.negative('Something went wrong!')
        })
    }

  },

  components: {
    'q-menu': menu,
    QList,
    QItem,
    QItemMain,
    QItemTile,
    QBtn,
    QTabs,
    QRouteTab
  }
}
</script>
