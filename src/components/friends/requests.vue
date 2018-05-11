<template>
<div>
  <div class="layout-view">
    <q-tabs slot="navigation">
    <q-route-tab slot="title" icon="list" to="/friends" replace hide="icon" label="Amigos" />
    <q-route-tab slot="title" icon="add_circle" to="/friends/requests" replace hide="icon" label="Solicitudes de amistad" />
  </q-tabs>
    <div class="layout-padding">
      <div class="text-center">
        <h3>Confirmar solicitudes</h3>
      </div>
      <div class="layout-view layout-padding">
      <q-list striped-odd sparse no-border>
        <q-item v-for="user in requests" :key="user.id">
          <q-item-main>
            <q-item-tile label>{{ user.name }}
              <q-btn color="secondary" class="on-right" @click="confirmRequest">Confirmar</q-btn>
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
} from "quasar";
import axios from "axios";
import menu from "../layouts/menu";

export default {
  data() {
    return {
      requests: []
    };
  },

  mounted() {
    this.fetchRequests();
  },

  methods: {
    fetchRequests() {
      axios.get("requests").then(
        response => {
          this.requests = response.data;
        },
        () => {
          Toast.create.negative("Fallo al recuperar lista de amigos");
        }
      );
    },
    confirmRequest() {
      axios.post("requests", { userdes: event.target.parentElement.id }).then(
        response => {
          Toast.create.positive("Solicitud de amistad aceptada");
          this.fetchRequests();
        },
        () => {
          Toast.create.negative("Something went wrong!");
        }
      );
    }
  },

  components: {
    "q-menu": menu,
    QList,
    QItem,
    QItemMain,
    QItemTile,
    QBtn,
    QTabs,
    QRouteTab
  }
};
</script>
