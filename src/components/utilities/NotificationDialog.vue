<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="snackbarTimeout"
    :color="notification.type"
    outlined
    rounded="xl"
  >
    <div class="d-flex">
      <v-icon :color="notification.type" class="mr-2">{{ getIcon }}</v-icon>
      <div v-html="notification.message"></div>
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn
        :color="notification.type"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        X
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    getIcon() {
      switch (this.notification.type) {
        case 'error':
          return 'mdi-alert-octagon-outline'
        case 'success':
          return 'mdi-check-box-outline'
        case 'info':
          return 'mdi-information-outline'
        default:
          return ''
      }
    }
  },
  methods: {
    ...mapActions('notification', ['remove'])
  },
  mounted() {
    this.snackbar = true
    this.timeOut = setTimeout(() => {
      this.remove(this.notification)
    }, 6000)
  },
  beforeDestroy() {
    clearTimeout(this.timeOut)
  },
  data() {
    return {
      snackbar: false,
      snackbarTimeout: 5000,
      timeOut: null
    }
  }
}
</script>
