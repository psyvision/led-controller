<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <b-button size="lg" variant="success" class="btn-block" @click="on"
            >On</b-button
          >
        </b-col>
        <b-col>
          <b-button size="lg" variant="danger" class="btn-block" @click="off"
            >Off</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <ColorPicker
            :width="300"
            :height="300"
            :disabled="false"
            start-color="#ffffff"
            @color-change="onColorChange"
          ></ColorPicker>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const axios = require("axios");
import ColorPicker from "vue-color-picker-wheel";

export default {
  name: "App",
  components: {
    ColorPicker
  },
  data() {
    return {
      colors: { r: 255, g: 255, b: 255 }
    };
  },
  methods: {
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null;
    },
    on() {
      axios.post("/api/status/on").then(function(response) {
        console.log(response);
      });
    },
    off() {
      axios.post("/api/status/off").then(function(response) {
        console.log(response);
      });
    },
    onColorChange(color) {
      var rgb = this.hexToRgb(color);

      console.log("Color has changed to: ", rgb);

      axios
        .post("/api/all", {
          r: rgb.r,
          g: rgb.g,
          b: rgb.b
        })
        .then(function(response) {
          console.log(response);
        });
    }
  }
};
</script>

<style></style>
