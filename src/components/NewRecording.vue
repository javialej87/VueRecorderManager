<template>
  <v-dialog
    v-model="dialogRecording"
    persistent
    transition="dialog-bottom-transition"
    max-width="800"
  >
    <v-card>
      <v-card-title class="justify-space-between">
        New Recording
        <div class="d-flex">
          <span>Reset Fields</span>
          <v-btn icon @click="cleanFields()">
            <v-icon color="primary">mdi-refresh</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <ValidationObserver ref="observer">
          <v-form ref="newRecordForm">
            <v-row>
              <v-col cols="12" md="4">
                <ValidationProvider
                  name="iswc"
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-text-field
                    v-model="newRecording.iswc"
                    class="rounded-xl"
                    label="Iswc"
                    outlined
                    dense
                    :error-messages="errors"
                  >
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  name="Work Title"
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-text-field
                    v-model="newRecording.work_title"
                    class="rounded-xl"
                    label="Work Title"
                    outlined
                    dense
                    :error-messages="errors"
                  >
                  </v-text-field> </ValidationProvider
              ></v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  name="Share"
                  v-slot="{ errors }"
                  rules="required|percentage"
                >
                  <v-text-field
                    v-model="newRecording.share"
                    class="rounded-xl"
                    type="number"
                    label="Share"
                    outlined
                    dense
                    :error-messages="errors"
                  >
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <ValidationProvider name="Titles" v-slot="{ errors }" rules="">
                  <v-combobox
                    v-model="newRecording.titles"
                    label="Titles"
                    clearable
                    dense
                    multiple
                    outlined
                    small-chips
                    class="rounded-xl"
                    hint="Write one title at a time and press intro."
                    :error-messages="errors"
                  >
                  </v-combobox>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-card flat>
              <v-card-title>
                Interested Parties ({{ getinterested_partiesAmount }})
                <div class="ml-2">
                  <v-btn
                    fab
                    x-small
                    dark
                    color="primary"
                    @click.native.stop="addInterestedParty()"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-card-text v-if="newRecording.interested_parties">
                <transition-group
                  enter-active-class="animate__animated animate__fadeIn animate__fast"
                  leave-active-class="animate__animated animate__fadeOut animate__faster"
                >
                  <template
                    v-for="(item, index) in newRecording.interested_parties"
                  >
                    <v-card :key="'interestedParty' + index" class="mt-2">
                      <v-card-title class="justify-space-between">
                        New Interested Party -
                        {{ index + 1 }}
                        <v-btn
                          icon
                          class="red"
                          dark
                          @click="removeInterestedParty(index)"
                        >
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" md="4">
                            <ValidationProvider
                              name="Full Name"
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <v-text-field
                                v-model="item.full_name"
                                class="rounded-xl"
                                label="Full Name"
                                outlined
                                dense
                                :error-messages="errors"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="4">
                            <ValidationProvider
                              name="Ipi"
                              v-slot="{ errors }"
                              rules="required"
                              :key="'ipi' + index"
                            >
                              <v-text-field
                                v-model="item.ipi_na_num"
                                class="rounded-xl"
                                @keypress="isNumber($event)"
                                label="Ipi"
                                outlined
                                dense
                                :error-messages="errors"
                              >
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" md="4">
                            <ValidationProvider
                              name="Role"
                              v-slot="{ errors }"
                              rules="required"
                              :key="'role' + index"
                            >
                              <v-select
                                v-model="item.role"
                                :items="cmbRole"
                                label="Role"
                                :error-messages="errors"
                                class="rounded-xl"
                                outlined
                                dense
                              ></v-select>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <v-card flat>
                              <v-card-title>
                                Address ({{
                                  getinterested_partiesAddressAmount(item)
                                }})
                                <div class="ml-2">
                                  <v-btn
                                    color="primary"
                                    fab
                                    x-small
                                    dark
                                    @click.native.stop="
                                      addInterestedPartyAddress(item)
                                    "
                                  >
                                    <v-icon>mdi-plus</v-icon>
                                  </v-btn>
                                </div>
                              </v-card-title>
                              <transition-group
                                enter-active-class="animate__animated animate__fadeIn animate__fast"
                                leave-active-class="animate__animated animate__fadeOut animate__faster"
                              >
                                <template
                                  v-for="(
                                    address, indexAddress
                                  ) in item.address"
                                >
                                  <NewAddressForm
                                    class="mt-2"
                                    :key="
                                      'item' + index + 'address' + indexAddress
                                    "
                                    @remove-address="
                                      removeAddress(index, indexAddress)
                                    "
                                    @refresh-address="
                                      refreshAddress(address, $event)
                                    "
                                  ></NewAddressForm>
                                </template>
                              </transition-group>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </template>
                </transition-group>
              </v-card-text>
            </v-card>
          </v-form>
        </ValidationObserver>
      </v-card-text>
      <v-card-actions>
        <v-row no-gutters justify="end">
          <v-btn color="error" class="mr-1" @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveRecording">Save</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import recordingServices from '@/services/recordings.service'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import NewAddressForm from './NewAddressForm.vue'

extend('percentage', (value) => {
  if (value >= 0 && value <= 100) {
    return true
  }
  return 'The {_field_} field must be a number between 0 and 100'
})

extend('required', {
  ...required,
  message: 'The {_field_} field is mandatory'
})

export default {
  props: {
    dialogRecording: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    NewAddressForm
  },
  computed: {
    getinterested_partiesAmount() {
      return this.newRecording.interested_parties
        ? this.newRecording.interested_parties.length
        : 0
    },
    getinterested_partiesAddressAmount() {
      return (v) => {
        return v.address ? v.address.length : 0
      }
    }
  },
  methods: {
    _initRecordingService() {
      return new recordingServices({
        onResponse: this.handleResponse,
        onError: this.handleError
      })
    },
    closeDialog() {
      this.$refs.observer.reset()
      this.$emit('close-dialog')
    },
    saveRecording() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          this.recordingInstanceService.postRecording(this.newRecording)
          this.displayMsg('success', 'New recording saved!')
        } else
          this.displayMsg('error', 'Complete the mandatory fields to continue.')
      })
    },
    isNumber(evt) {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      const keyPressed = evt.key
      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault()
      }
    },
    addInterestedParty() {
      let newInterestedParty = {
        full_name: '',
        ipi_na_num: '',
        role: '',
        address: []
      }
      this.newRecording.interested_parties.push(newInterestedParty)

      this.expansionPanelValue = 1
    },
    addInterestedPartyAddress(item) {
      let newAddress = {
        countryDesc: '',
        stateCde: '',
        name3: '',
        postalCe: '',
        province: '',
        countryCde: '',
        city: '',
        stateDesc: '',
        name2: '',
        line2: '',
        line1: ''
      }
      item.address.push(newAddress)
    },
    removeInterestedParty(index) {
      this.newRecording.interested_parties.splice(index, 1)
    },
    removeAddress(indexInterestedParty, indexAddress) {
      this.newRecording.interested_parties[indexInterestedParty].address.splice(
        indexAddress,
        1
      )
    },
    cleanFields() {
      this.$refs.observer.reset()
      this.newRecording = {
        iswc: '',
        work_title: '',
        share: 0,
        titles: [],
        interested_parties: []
      }
    },
    refreshAddress(address, event) {
      Object.assign(address, event)
    }
  },
  data() {
    return {
      recordingInstanceService: this._initRecordingService(),
      newRecording: {
        iswc: '',
        work_title: '',
        share: 0,
        titles: [],
        interested_parties: []
      },
      cmbRole: ['Publisher', 'Writer', 'Composer']
    }
  }
}
</script>
