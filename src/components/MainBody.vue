<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="justify-space-between main-color white--text">
        <v-img :src="srcImageBmat" max-width="200"></v-img>
        Recordings Manager
      </v-card-title>
      <v-card-text>
        <RecordingsSummary></RecordingsSummary>
        <RecordingsView></RecordingsView>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import RecordingsView from '@/components/RecordingsView'
import RecordingsSummary from '@/components/RecordingsSummary'

export default {
  components: {
    RecordingsSummary,
    RecordingsView
  },
  data() {
    return {
      showNewRecording: false,
      srcImageBmat: require('../assets/bmat-logotype.png')
    }
  }
}
</script>
