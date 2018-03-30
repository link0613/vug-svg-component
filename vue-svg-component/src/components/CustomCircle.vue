<template>
  <div class="main-container">
    <h1>{{ msg }}</h1>
    <div class="preview-container">
      <svg viewBox="0 0 500 600">
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      </svg>
    </div>  
  </div>
</template>

<script>

import * as d3 from 'd3'
export default {
  name: 'CustomCircle',
  data () {
    return {
      msg: 'How are you?',
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load: function () {
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
  }
  .preview-container {
    max-width: 600px;
    max-height: 500px;
    min-width: 400px;
    width: 100vw;
    height: 100vh;
  }
</style>
