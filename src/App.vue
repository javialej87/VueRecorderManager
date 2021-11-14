<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col class="ma-auto" :cols="getColsBreakPoint">
          <MainBody></MainBody>
        </v-col>
      </v-row>
    </v-main>
    <NotificationContainer></NotificationContainer>
  </v-app>
</template>

<script>
import MainBody from '@/components/MainBody'
import NotificationContainer from '@/components/utilities/NotificationContainer'

export default {
  name: 'App',
  components: {
    MainBody,
    NotificationContainer
  },
  computed: {
    getColsBreakPoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '12' //iphone plus
        case 'sm':
          return '12' //ipad
        case 'md':
          return '10'
        case 'lg':
          return '10'
        case 'xl':
          return '10'
        default:
          return '6'
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" src="./scss/app.scss"></style>
