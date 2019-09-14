<template>
    <div id="app">
        <b-container>
            <b-row>
                <b-col>
                    <b-button size="lg" variant="success" class="btn-block">On</b-button>
                </b-col>
                <b-col>
                    <b-button size="lg" variant="danger" class="btn-block">Off</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <ColorPicker :width="300" :height="300" :disabled="false" startColor="#ffffff" @colorChange="onColorChange"></ColorPicker>

                    <chrome-picker v-model="colors" @input="updateValue"></chrome-picker>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
const Chrome = require('vue-color').Chrome
const axios = require('axios')
import ColorPicker from 'vue-color-picker-wheel'

export default {
  name: "app",
  components: {
    'chrome-picker': Chrome,
    ColorPicker
  },
  data () {
    return {
      colors: { r: 255, g: 255, b: 255 }
    }
  },
  methods: {
      onColorChange(color) {
      console.log('Color has changed to: ', color);
    },
    updateValue (value) {
      //this.colors = value
      //console.log(`R: ${value.rgba.r}, G: ${value.rgba.g}, B: ${value.rgba.b}`)

      axios.post('/api/all', {
          r: value.rgba.r,
          g: value.rgba.g,
          b: value.rgba.b
      }).then(function (response) {
          //console.log(response)
      })
    }
  }
};
</script>

<style>
</style>