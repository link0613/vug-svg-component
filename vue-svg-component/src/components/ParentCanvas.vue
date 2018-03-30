<template>
  <div class="main-container">
    <h1>{{msg}}</h1>
    <div class="form-group">
      <label for="code">Please input the text: </label>
      <input type="text" class="form-control input-normal" v-model="svgText">
    </div>
    <svg width="100%" height="500">
      <CustomCircle :text="svgText" :cx="100" :cy="100"  :radius="50" :backgroundColor="'yellow'" :textColor="'red'" />
      <CustomCircle :text="svgText" :cx="200" :cy="200"  :radius="100" :backgroundColor="'#eeaaff'" :textColor="'black'" />
    </svg>  
      <code>
        {{tag1}}
      </code>
      <code>
        {{tag2}}
      </code>
    
  </div>
</template>

<script>

import * as d3 from 'd3'
import CustomCircle from '@/components/CustomCircle'
export default {
  name: 'ParentCanvas',
  data () {
    return {
      msg: "Please check me.",
      svgText: "Sample Text",
      tag1: '<CustomCircle :text="svgText" :cx="100" :cy="100"  :radius="50" :backgroundColor="\'yellow\'" :textColor="\'red\'" />',
      tag2: '<CustomCircle :text="svgText" :cx="200" :cy="200"  :radius="100" :backgroundColor="\'#eeaaff\'" :textColor="\'black\'" />"'
    }
  },
  components: {
    CustomCircle
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
</style>
