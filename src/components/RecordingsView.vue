<template>
  <v-container fluid>
    <transition
      enter-active-class="animate__animated animate__fadeIn animate__fast"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
      appear
      mode="out-in"
    >
      <v-sheet v-if="!showRecordingDetail" :key="'recordingTable'">
        <v-row class="mt-2">
          <v-col class="d-flex">
            <v-text-field
              v-model="searchRecording"
              class="rounded-xl"
              label="Search record"
              outlined
              append-icon="mdi-magnify"
              dense
            >
            </v-text-field>
            <v-btn
              class="ml-2"
              color="primary"
              fab
              small
              dark
              @click="showNewRecording = true"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              class="ml-2"
              color="success"
              fab
              small
              dark
              @click="refreshRecords"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              :headers="recordTableHeaders"
              :items="recordings"
              :items-per-page="5"
              :search="searchRecording"
              :loading="loadingRecordings"
              class="elevation-1 row-pointer"
              @click:row="viewRecordingDetail"
            >
              <template v-slot:[`item.delete`]="{ item }">
                <v-icon small @click.stop.prevent="deleteRecording(item)"
                  >mdi-trash-can</v-icon
                >
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet v-else :key="'recordingDetail'">
        <v-row>
          <v-col cols="12">
            Go back
            <v-btn icon @click="showRecordingDetail = false">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <RecordingDetail :recording="selectedRecording"></RecordingDetail>
          </v-col>
        </v-row>
      </v-sheet>
    </transition>

    <NewRecordDialog
      :dialogRecording="showNewRecording"
      @close-dialog="closeDialog"
    ></NewRecordDialog>
  </v-container>
</template>

<script>
import recordingServices from '@/services/recordings.service'
import NewRecordDialog from '@/components/NewRecording'
import RecordingDetail from '@/components/RecordingDetail'

export default {
  components: {
    NewRecordDialog,
    RecordingDetail
  },
  methods: {
    _initRecordingService() {
      return new recordingServices({
        onResponse: this.handleResponse,
        onError: this.handleError
      })
    },
    refreshRecords() {
      this.recordings.splice(1, this.recordings.length)
      this.loadingRecordings = true

      this.recordingInstanceService.getRecordings()
    },
    closeDialog() {
      this.showNewRecording = false
      this.recordingInstanceService.getRecordings()
    },
    deleteRecording(item) {
      this.recordingInstanceService.deleteRecording(item.id)
    },
    handleResponse(response, service) {
      switch (service) {
        case 'getRecordings':
          this.loadingRecordings = false
          if (response) this.recordings = response.data.recordings
          break
        case 'deleteRecording':
          this.recordingInstanceService.getRecordings()
      }
    },
    handleError(error) {
      console.log(error)
    },
    viewRecordingDetail(recording) {
      this.selectedRecording = recording
      this.showRecordingDetail = true
    }
  },
  mounted() {
    this.recordingInstanceService.getRecordings()
  },
  data() {
    return {
      recordingInstanceService: this._initRecordingService(),
      recordings: [],
      searchRecording: '',
      loadingRecordings: true,
      recordTableHeaders: [
        {
          text: 'Id',
          align: 'center',
          value: 'id',
          class: 'table-header-class white--text'
        },
        {
          text: 'Iswc',
          align: 'center',
          value: 'iswc',
          class: 'table-header-class white--text'
        },
        {
          text: 'Work title',
          align: 'center',
          value: 'work_title',
          class: 'table-header-class white--text'
        },
        {
          text: 'Share',
          align: 'center',
          value: 'share',
          class: 'table-header-class white--text'
        },
        {
          text: 'Delete',
          align: 'center',
          value: 'delete',
          class: 'table-header-class white--text'
        }
      ],
      showNewRecording: false,
      selectedRecording: '',
      showRecordingDetail: false
    }
  }
}
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
