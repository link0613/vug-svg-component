<template>
  <g>
    <svg :width="getRealSize()" :height="getRealSize()" :x="cx" :y="cy">
      <circle :cx="getRealCenterPosition()" :cy="getRealCenterPosition()" :r="radius" :stroke="strokeColor" :stroke-width="strokeWidth" :fill="backgroundColor" />
      <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" :fill="textColor">{{text}}</text>
    </svg>
  </g>
</template>

<script>

import * as d3 from 'd3'
export default {
  name: 'CustomCircle',
  props: [
    'radius',
    'text',
    'cx',
    'cy',
    'backgroundColor',
    'textColor'
  ],
  data () {
    return {
      fontSize: 12,
      strokeWidth: 1,
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
</style>
