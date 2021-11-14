<template>
  <v-card fluid>
    <v-card-title class="justify-space-between main-color white--text">
      <div>Record Detail - ID:{{ recording.id }}</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="2">
          <div class="text-h6 font-weight-medium primary--text">Work title</div>
          <div class="text-subtitle-1">{{ recording.work_title }}</div>
        </v-col>
        <v-col cols="12" md="2">
          <div class="text-h6 font-weight-medium primary--text">ISWC</div>
          <div class="text-subtitle-1">{{ recording.iswc }}</div>
        </v-col>
        <v-col cols="12" md="8">
          <div class="text-h6 font-weight-medium primary--text">
            Other titles
          </div>
          <template v-for="(titles, index) in getRecordingTitles">
            <v-chip
              class="ma-2 text-subtitle-1"
              :key="'title' + index"
              color="primary"
              >{{ titles }}</v-chip
            >
          </template>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-h6 font-weight-medium primary--text">
            Interested Parties
          </div>
          <v-list dense v-if="recording.interested_parties.length > 0">
            <template
              v-for="(interestedParty, index) in recording.interested_parties"
            >
              <v-card :key="'party' + index" class="mt-2 mb-2">
                <v-card-text>
                  <v-row no-gutters>
                    <v-col>
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title>
                            Full Name: {{ interestedParty.full_name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Ipi Pa Number: {{ interestedParty.ipi_na_num }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            Role: {{ interestedParty.role }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col>
                      <v-row>
                        <v-col
                          cols="12"
                          md="6"
                          v-for="(
                            address, indexaddress
                          ) in interestedParty.address"
                          :key="'address' + indexaddress + 'record' + index"
                        >
                          <v-card elevation="2">
                            <v-card-title>
                              Address {{ indexaddress + 1 }}
                            </v-card-title>
                            <v-card-text>
                              <div>
                                Country: {{ address.countryCde }} -
                                {{ address.countryDesc }}
                              </div>
                              <div>
                                State:
                                {{ address.stateCde }} -
                                {{ address.stateDesc }}
                              </div>
                              <div>
                                Province:
                                {{ address.province }}
                              </div>
                              <div>
                                City:
                                {{ address.city }}
                              </div>
                              <div>
                                Postal Code:
                                {{ address.postalCde }}
                              </div>
                              <div>
                                Name2:
                                {{ address.name2 }}
                              </div>
                              <div>Name3: {{ address.name3 }}</div>

                              <div>Line 1: {{ address.line1 }}</div>
                              <div>Line 2: {{ address.line2 }}</div>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </v-list>
          <v-chip v-else color="primary"> - </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    recording: {
      type: Object,
      required: true
    }
  },
  computed: {
    getRecordingTitles() {
      return this.recording.titles.length > 0 ? this.recording.titles : ['-']
    }
  }
}
</script>
