<template>
  <div>
    <div class="layout-view">
      <div class="text-center">
        <h3>Crear Post </h3>
      </div>
      <div class="layout-view layout-padding">
        <p class="caption">Contenido del post</p>
        <q-input v-model="body"/>
        <template>
          <p class="caption">Tipo de post</p>
          <q-option-group
          color="secondary"
          type="radio"
          v-model="type"
          :options="[
          { label: 'Información', value: '1' },
          { label: 'Evento', value: '2' },
          ]"
          />
</template>
      <q-btn color="secondary" class="on-right" @click="create">Crear</q-btn>
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
  QCardTitle,
  QCardMain,
  QCardSeparator,
  QPullToRefresh,
  QOptionGroup
} from "quasar";
import axios from "axios";
import menu from "../layouts/menu";

export default {
  data() {
    return {
      body: "",
      type: ""
    };
  },

  methods: {
    create() {
      axios.post("create", { body: this.body, type: this.type }).then(
        response => {
          Toast.create.positive("Post creado");
        },
        () => {
          Toast.create.negative("Fallo al crear post");
        }
      );
    }
  },

  components: {
    "q-menu": menu,
    QBtn,
    QToolbar,
    QIcon,
    QToolbarTitle,
    QField,
    QInput,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    QPullToRefresh,
    QOptionGroup
  }
};
</script>
