<template>
  <div>
    <div class="layout-view">
      <div class="text-center">
        <h3>Timeline </h3>
      </div>
      <div class="layout-view layout-padding">
        <q-pull-to-refresh :handler="refreshPosts"  pull-message="Tira para refrescar">
        <q-card v-for="post in posts" :key="post.timestamp" style="width: 100%;margin-left:auto;margin-right:auto" color="secondary">
          <q-card-title>
            {{post.body}}
            <span slot="subtitle">Creado por: {{post.user}}</span>
          </q-card-title>
          <q-card-separator />
          <q-card-main>
              {{post.timestamp}}
          </q-card-main>
        </q-card>
        </q-pull-to-refresh>
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
  QPullToRefresh
} from "quasar";
import axios from "axios";
import menu from "../layouts/menu";

export default {
  data() {
    return {
      posts: []
    };
  },

  mounted() {
    this.fetchPosts();
  },

  methods: {
    fetchPosts() {
      axios.get("posts").then(
        response => {
          this.posts = response.data;
        },
        () => {
          Toast.create.negative("Fallo al recuperar posts");
        }
      );
    },
    refreshPosts(done) {
      this.fetchPosts();
      done();
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
    QPullToRefresh
  }
};
</script>
