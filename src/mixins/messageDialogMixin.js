export const messageDialogMixin = {
  methods: {
    displayMsg(type, msg) {
      const notification = {
        type: type,
        message: msg
      }

      this.$store.dispatch('notification/add', notification)
    }
  }
}
