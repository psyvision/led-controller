<template>
  <f7-page name="home"
    ><f7-list>
      <f7-list-item title="Switch">
        <f7-toggle
          slot="after"
          :checked="status"
          @toggle:change="toggle"
        ></f7-toggle>
      </f7-list-item>
      <div id="demo-color-picker-inline"></div>
    </f7-list>
  </f7-page>
</template>

<script>
const axios = require("axios");

export default {
  name: "Home",
  data() {
    return {
      status: false,
      colour: null,
      init: true
    };
  },
  mounted() {
    const self = this;
    const app = self.$f7;
    self.colorPickerInline = app.colorPicker.create({
      value: self.colour,
      containerEl: "#demo-color-picker-inline",
      modules: ["sb-spectrum", "hsb-sliders"],
      on: {
        change(cp, value) {
          if (self.init === false) {
            axios
              .post("/api/colour", {
                r: value.rgb[0],
                g: value.rgb[1],
                b: value.rgb[2]
              })
              .then(function(response) {
                console.log(response);
              });

            self.colour = value;
          }
        }
      }
    });

    axios.get("/api/status").then(response => {
      console.log(response);

      if (response.data.status === "off") {
        this.status = false;
      } else {
        this.status = true;
      }

      self.colorPickerInline.setValue({
        rgb: [
          response.data.colour.r,
          response.data.colour.g,
          response.data.colour.b
        ]
      });

      self.init = false;
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
    toggle(value) {
      axios.post(`/api/${value ? "on" : "off"}`).then(function(response) {
        console.log(response);
      });
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
    }
  }
};
</script>

<style></style>
