<template>
  <v-card>
    <v-card-title class="justify-space-between">
      New Address
      <v-btn icon class="red" dark @click="removeAddress()">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <ValidationObserver ref="addressObserver">
        <v-form ref="newAddressForm">
          <v-row>
            <v-col cols="12" md="8">
              <ValidationProvider
                name="Country"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.countryDesc"
                  class="rounded-xl"
                  label="Country"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="4">
              <ValidationProvider
                name="Country Code"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.countryCde"
                  class="rounded-xl"
                  label="Country Code"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="8">
              <ValidationProvider
                name="State"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.stateDesc"
                  class="rounded-xl"
                  label="State"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="4">
              <ValidationProvider
                name="State Code"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.stateCde"
                  class="rounded-xl"
                  label="State Code"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="6">
              <ValidationProvider
                name="Province"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.province"
                  class="rounded-xl"
                  label="Province"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="6">
              <ValidationProvider
                name="City"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.city"
                  class="rounded-xl"
                  label="City"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <ValidationProvider
                name="Postal Code"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.postalCode"
                  class="rounded-xl"
                  label="Postal Code"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="5">
              <ValidationProvider
                name="Name 2"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.name2"
                  class="rounded-xl"
                  label="Name 2"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="5">
              <ValidationProvider
                name="Name 3"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.name3"
                  class="rounded-xl"
                  label="Name 3"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <ValidationProvider
                name="Line 1"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.line1"
                  class="rounded-xl"
                  label="Line 1"
                  type="number"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="6">
              <ValidationProvider
                name="Line 2"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  v-model="newAddress.name"
                  class="rounded-xl"
                  label="Line 2"
                  type="number"
                  outlined
                  dense
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'The {_field_} field is mandatory'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    removeAddress() {
      this.$emit('remove-address')
    }
  },
  //I have to watch the change in the address so the Parent can refresh the Object.
  watch: {
    newAddress: {
      handler(val) {
        this.$emit('refresh-address', val)
      },
      deep: true
    }
  },
  data() {
    return {
      newAddress: {
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
    }
  }
}
</script>
