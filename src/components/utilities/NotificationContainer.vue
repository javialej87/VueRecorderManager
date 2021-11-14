<template>
  <v-container style="position: fixed; z-index: 1000">
    <NotificationDialog
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    >
    </NotificationDialog>
  </v-container>
</template>

<script>
import NotificationDialog from './NotificationDialog'
import { mapState } from 'vuex'

export default {
  components: {
    NotificationDialog
  },
  computed: {
    ...mapState('notification', ['notifications'])
  }
}
</script>
