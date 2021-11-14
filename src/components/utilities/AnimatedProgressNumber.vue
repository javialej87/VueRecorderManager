<template>
  <span>{{ getTwValue }}</span>
</template>

<script>
import { TweenLite } from 'gsap'
import numeral from 'numeral'

export default {
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    delay: {
      type: Number,
      default: 1
    },
    formatValue: {
      type: String,
      default: '0'
    }
  },
  computed: {
    getTwValue() {
      return numeral(this.tweeningValue).format(this.formatValue)
    }
  },
  methods: {
    actualizarValor(value) {
      let valor = value ? numeral(Number(value)).value() : 0
      this.tweeningValue = 0

      TweenLite.to(this.$data, this.delay, {
        tweeningValue: valor
      })
    }
  },
  data: function () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value(newValue) {
      this.actualizarValor(newValue)
    }
  },
  mounted() {
    this.actualizarValor(this.value)
  }
}
</script>
