<template>
  <g>
    <svg v-if="getSize().w>0" :width="getSize().w" :height="getSize().h" :x="getMin().x" :y="getMin().y">
      <path :d="'M'+(sx-getMin().x)+','+(sy-getMin().y)+' '+'C'+(sx-getMin().x)+','+getSize().h/3+' '+(ex-getMin().x)+','+getSize().h*2/3+' '+(ex-getMin().x)+','+(ey-getMin().y)" :stroke="strokeColor" fill="transparent"/>
    </svg>
    <svg v-else :width="strokeWidth*3" :height="getSize().h" :x="getMin().x - strokeWidth" :y="getMin().y">
      <line :x1="strokeWidth" :y1="1" :x2="strokeWidth" :y2="getSize().h" :stroke="strokeColor" fill="transparent" />
    </svg>
  </g>
</template>

<script>

import * as d3 from 'd3'
export default {
  name: 'CustomSpline',
  props: [
    'sx',
    'sy',
    'ex',
    'ey',
    'strokeColor'
  ],
  data () {
    return {
      fontSize: 12,
      strokeWidth: 1,
 
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load: function () {
 
    },
    getMin(){
      
      return {x:Math.min(this.sx, this.ex), y:Math.min(this.sy, this.ey)}
    },
    getSize(){
      return {w: Math.abs(this.sx - this.ex), h:Math.abs(this.sy- this.ey)}
    }

   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
