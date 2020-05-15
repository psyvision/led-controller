<template>
  <f7-app :params="f7params" theme-dark>
    <f7-view main class="safe-areas" url="/"></f7-view>
  </f7-app>
</template>

<script>
import routes from "../routes.js";

export default {
  name: "App",
  data() {
    return {
      f7params: {
        name: "LED Controller", // App name
        theme: "auto", // Automatic theme detection

        // App root data
        data: function() {
          return {};
        },

        // App routes
        routes: routes

        // Register service worker
        //serviceWorker: {
        //  path: "/service-worker.js"
        //}
      }
    };
  }
};
</script>

<style></style>
