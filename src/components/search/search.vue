<template>
  <div>
    <div class="layout-view">
      <div class="layout-padding">
        <q-list striped-odd sparse no-border>
          <div class="text-center">
          <h1>Buscar</h1>
          </div>
            </q-item-main>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
  import { QList, QItem, QItemMain, QItemTile } from 'quasar'
  import menu from '../layouts/menu'
  export default{
    components: { 'q-menu': menu, QList, QItem, QItemMain, QItemTile }
  }
</script>
