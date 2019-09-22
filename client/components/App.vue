<template>
  <f7-app :params="f7params" theme-dark>
    <f7-list>
      <f7-list-item title="Switch">
        <f7-toggle slot="after"></f7-toggle>
      </f7-list-item>
      <div id="demo-color-picker-inline"></div>
    </f7-list>
  </f7-app>
</template>

<script>
const axios = require("axios");

export default {
  name: "App",
  data() {
    return {
      colors: { r: 255, g: 255, b: 255 }
    };
  },
  mounted() {
    const self = this;
    const app = self.$f7;
    self.colorPickerInline = app.colorPicker.create({
      value: self.inlinePickerValue,
      containerEl: "#demo-color-picker-inline",
      modules: ["sb-spectrum", "hsb-sliders", "alpha-slider"],
      on: {
        change(cp, value) {
          self.inlinePickerValue = value;
        }
      }
    });
  },
  beforeDestroy() {
    const self = this;
    self.colorPickerInline.destroy();
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
      axios.post("/api/on").then(function(response) {
        console.log(response);
      });
    },
    off() {
      axios.post("/api/off").then(function(response) {
        console.log(response);
      });
    },
    onColorChange(color) {
      var rgb = this.hexToRgb(color);

      console.log("Colour has changed to: ", rgb);

      axios
        .post("/api//colour", {
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
