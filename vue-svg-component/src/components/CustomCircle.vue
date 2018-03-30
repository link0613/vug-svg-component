<template>
  <div class="main-container">
    <div class="preview-container">
      <svg :width="getRealSize()" :height="getRealSize()">
        <circle :cx="getRealCenterPosition()" :cy="getRealCenterPosition()" :r="radius" :stroke="strokeColor" :stroke-width="strokeWidth" :fill="backgroundColor" />
        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" :fill="textColor">{{text}}</text>
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
      radius: 50,
      cx: 0,
      cy: 0,
      backgroundColor: "#ff3399",
      text: "Sample Text",
      fontSize: 12,
      textColor: "#00ff00",
      strokeWidth: 2,
      strokeColor:"#000000",
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load: function () {
    },
    getRealSize(){
      return (this.radius + this.strokeWidth) * 2
    },
    getRealCenterPosition(){
      return this.radius + 1
    } 
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
