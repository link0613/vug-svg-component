<template>
  <g>
    <svg :width="dx+strokeWidth*2" :height="dy+strokeWidth*2" :x="cx-dx/2" :y="cy-dy/2">
      <rect :x="strokeWidth" :y="strokeWidth" :width="dx-strokeWidth" :height="dy-strokeWidth" :stroke="strokeColor" :stroke-width="strokeWidth" :fill="backgroundColor"/>
      <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" :fill="textColor" :font-size="fontSize">{{text}}</text>
    </svg>  
  </g>

</template>

<script>

import * as d3 from 'd3'
export default {
  name: 'CustomRectangle',
  props: [
    'radius',
    'text',
    'cx',
    'cy',
    'dx',
    'dy',
    'backgroundColor',
    'textColor',
    'strokeColor'
  ],
  data () {
    return {
      fontSize: 12,
      strokeWidth: 1,
      minX: 0,
      minY: 0,
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
</style>
