<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn animate__fast"
    leave-active-class="animate__animated animate__fadeOut animate__faster"
    appear
  >
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card class="rounded-xl">
            <v-card-text class="text-center">
              <div class="text-h5 mb-2">Records</div>
              <AnimatedProgressNumber
                :value="totalRecords"
                :formatValue="'0'"
                :delay="2"
                class="text-h4 font-weight-bold primary--text"
              ></AnimatedProgressNumber>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="rounded-xl">
            <v-card-text class="text-center">
              <div class="text-h5 mb-2">Avg Share</div>
              <AnimatedProgressNumber
                :value="getAvgShare"
                :formatValue="'0,0.00'"
                :delay="2"
                class="text-h4 font-weight-bold primary--text"
              ></AnimatedProgressNumber>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="rounded-xl">
            <v-card-text class="text-center">
              <div class="text-h5 mb-2">Max Share</div>
              <AnimatedProgressNumber
                :value="getMaxShare"
                :formatValue="'0'"
                :delay="2"
                class="text-h4 font-weight-bold primary--text"
              ></AnimatedProgressNumber>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </transition>
</template>

<script>
import recordingServices from '@/services/recordings.service'
import AnimatedProgressNumber from '@/components/utilities/AnimatedProgressNumber'
import numeral from 'numeral'

export default {
  components: {
    AnimatedProgressNumber
  },
  computed: {
    totalRecords() {
      return this.recordings.length
    },
    getMaxShare() {
      return this.recordings.length > 0
        ? Math.max.apply(
            Math,
            this.recordings.map((item) => item.share)
          )
        : 0
    },
    getAvgShare() {
      return this.recordings.length > 0
        ? numeral(
            this.recordings
              .map((item) => item.share)
              .reduce((a, b) => a + b, 0) / this.recordings.length
          ).format('0,0.00')
        : 0
    }
  },
  methods: {
    _initRecordingService() {
      return new recordingServices({
        onResponse: this.handleResponse,
        onError: this.handleError
      })
    },
    handleResponse(response, service) {
      switch (service) {
        case 'getRecordings':
          this.loadingRecordings = false
          if (response) this.recordings = response.data.recordings
          break
      }
    },
    handleError(error) {
      console.log(error)
    },
    refreshRecords() {
      this.recordings.splice(1, this.recordings.length)
      this.loadingRecordings = true
      this.recordingInstanceService.getRecordings()
    }
  },
  mounted() {
    this.refreshRecords()
  },
  data() {
    return {
      recordingInstanceService: this._initRecordingService(),
      recordings: []
    }
  }
}
</script>
