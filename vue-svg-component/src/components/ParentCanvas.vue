<template>
  <div class="main-container">
    <h1>{{msg}}</h1>
    <svg width="100%" height="100%">
      <CustomCircle/>
    </svg>  
  </div>
</template>

<script>

import * as d3 from 'd3'
import CustomCircle from '@/components/CustomCircle'
export default {
  name: 'ParentCanvas',
  data () {
    return {
      msg: "Thank you!!!",
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
  .preview-container {
    max-width: 600px;
    max-height: 500px;
    min-width: 400px;
    width: 100vw;
    height: 100vh;
  }
</style>
