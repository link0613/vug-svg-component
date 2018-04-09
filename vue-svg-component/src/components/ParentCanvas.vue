<template>
  <div class="main-container">
    <h1>
      Resuable Multi-fuctional WorkFlowchart - Vue Component (fromScratch)
    </h1>
    <code>
      JSON Tree Structure - Various NodeElements - ColorSchema - Interactive - ...
    </code>
    <h2>{{msg}}</h2>
    <svg width="100%" height="900">
      
      <g v-for="(node,index) in nodeData" :key="node.key" >
        <CustomRectangle :text="node.text" :cx="getNodeInfo(index).x" :cy="getNodeInfo(index).y"  :dx="getNodeInfo(index).dx + 10" :dy="unitPixel*2" :backgroundColor="'#AB47BC'" :textColor="'#F3E5F5'" :strokeColor="'#7B1FA2'" />

        <CustomSpline v-if="index>0" :sx="getNodeInfo(index).x" :sy="getNodeInfo(index).y - unitPixel" :ex="getNodeInfo(index).x" :ey="getNodeInfo(index).y - unitPixel*2 + 3 " :strokeColor="'#7B1FA2'"   />
          
        <g v-for="question in node.question" :key="node.key + question"  >
          <CustomCircle :text="question" :cx="getChildInfo(index,question).x-unitPixel*4/5-1" :cy="getNodeInfo(index).y + unitPixel * 3 - 1"  :radius="unitPixel*4/5" :backgroundColor="'#E040FB'" :textColor="'#F3E5F5'" :strokeColor="'#7B1FA2'" />
          <CustomCircle :text="'+'" :cx="getChildInfo(index,question).x-unitPixel*3/5-1" :cy="getNodeInfo(index).y + unitPixel * 6 - unitPixel/2"  :radius="unitPixel*3/5" :backgroundColor="'#E1BEE7'" :textColor="'#6A1B9A'" :strokeColor="'#7B1FA2'" class="add-node"  v-on:click.native="showDiag1(index,question)"/>
          <CustomSpline :sx="getChildInfo(index,question).x" :sy="getNodeInfo(index).y + unitPixel * 3" :ex="getNodeInfo(index).x" :ey="getNodeInfo(index).y + unitPixel" :strokeColor="'#7B1FA2'"   />
          <CustomSpline :sx="getChildInfo(index,question).x" :sy="getNodeInfo(index).y + unitPixel * 6 - unitPixel/2" :ex="getChildInfo(index,question).x" :ey="getNodeInfo(index).y + unitPixel * 5- unitPixel/2" :strokeColor="'#7B1FA2'"   />
        </g>
        <g v-if="!node.question||node.question.length==0">
          <CustomSpline :sx="getNodeInfo(index).x" :sy="getNodeInfo(index).y + unitPixel * 3" :ex="getNodeInfo(index).x" :ey="getNodeInfo(index).y + unitPixel" :strokeColor="'#7B1FA2'"   />
          <CustomCircle :text="'+'" :cx="getNodeInfo(index).x-unitPixel*3/5" :cy="getNodeInfo(index).y + unitPixel * 2"  :radius="unitPixel*3/5" :backgroundColor="'#E1BEE7'" :textColor="'#6A1B9A'" :strokeColor="'#7B1FA2'" class="add-node"  v-on:click.native="showDiag1(index)"/>
        </g>

      </g>
    </svg>  

    <Modal v-if="visibleDiag1">
      <div class="row" slot="header">
        <div class="col-sm-12">
          Add new action
        </div>
      </div>
      <div slot="body">
        <div class="row">
          <button v-for="(category,index) in nodeCategories" :key="index" class="btn btn-primary col-sm-12" v-on:click="showDiag2(index)" >{{category.name}}</button>
        </div>
      </div>
    </Modal>

    <Modal v-if="visibleDiag2_wait">
      <div class="row" slot="header">
        <div class="col-sm-12">
          Add new action (Wait)
        </div>
      </div>
      <div slot="body">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group">
              <input type="number" class="form-control" id="diagInputWait" placeholder="Please input day(s)" v-model="inputValue"/>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" v-on:click="addNode()" >Add</button>
        <button class="btn btn-primary" v-on:click="hideDiag2()" >Cancel</button>
      </div>
    </Modal>

    <Modal v-if="visibleDiag2_condition">
      <div class="row" slot="header">
        <div class="col-sm-12">
          Add new action (Condition)
        </div>
      </div>
      <div slot="body">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Please input query" v-model="inputCondition[0].query"/> ?
            </div>
            <div v-for="(condition,index) in inputCondition" :key="index" class="form-group">
              <input type="text" class="form-control" placeholder="Please input result" v-model="inputCondition[index].result"/>
            </div>
            <button class="btn btn-primary" v-on:click="addResult()" >Add Result</button>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" v-on:click="addNode()" >Add Node</button>
        <button class="btn btn-primary" v-on:click="hideDiag2()" >Cancel</button>
      </div>
    </Modal>

    <button class="btn btn-primary btn-save" v-on:click="saveTree()">Save</button>
  </div>
</template>

<script>

import * as d3 from 'd3'
import CustomCircle from '@/components/CustomCircle'
import CustomSpline from '@/components/CustomSpline'
import CustomRectangle from '@/components/CustomRectangle'
import Modal from './Modal.vue'

export default {
  name: 'nodeData',
  data () {
    return {
      msg: "Please check me.",
      unitPixel: 20,
      ax: 0,
      ay: 0,
      selectedNode: null,
      selectedCategory: null,
      selectedQuestion: null,


      inputValue: null,

      inputCondition: [
        {query:'Do you know it?', result: 'Yes' },
        {query:'Do you know it?', result: 'No' },
      ],
      
      
      visibleDiag1: false,
      visibleDiag2_wait: false,
      visibleDiag2_condition: false,



      nodeCategories: [
        {name:'wait', text:'Waiting for {{value}} day(s)'},
        {name:'condition', text:'condition-'},
      ],
      nodeData: [
        {key:1, category:0, text:'START', value:{name:'link'}, parent:null},
        // {key:2, category:1, text:'Does the contact match the following 1s?', value:null, question:['Yes', 'No'], parent:1},
        // {key:3, category:0, text:'Send email {{email}}', value:{email:'kkkkc@gmail.com'}, answer:'Yes', parent:2},
        // {key:4, category:0, text:'Wait for {{day}}day(s)', value:{day:2}, parent:3},
        // {key:5, category:1, text:'Send email {{email}}', value:{email:'kkkks@gmail.com'}, parent:4, question:['1', '2', '3']},
        // {key:6, category:0, text:'Wait for {{day}}day(s)', value:{day:4}, parent:5, answer:'2'},
        // {key:7, category:0, text:'Notify {{email}}', value:{email:'kkkka@gmail.com'}, answer:'No', parent:2},
        // {key:8, category:1, text:'Does the contact match the following 1s?', value:null, question:['A', 'D', 'C','B'], parent:7},
        // {key:11, category:0, text:'Notify {{email}}', value:{email:'kkkka@gmail.com'}, answer:'D', parent:8},
        // {key:13, category:0, text:'3 {{email}}', value:{email:'3gmail.com'}, answer:'3', parent:5},
        // {key:14, category:0, text:'1 {{email}}', value:{email:'1il.com'}, answer:'1', parent:5},
        // {key:15, category:0, text:'1 sdfsdfsdfsdfsdf{{email}}', value:{email:'1il.com'}, parent:14},
       ],
      nodePosition: null
    }
  },
  components: {
    CustomCircle,
    CustomSpline,
    CustomRectangle,
    'Modal': Modal
  },
  mounted () {
    this.load()
  },
  methods: {
    getSubTreeWidth(i, rm){
      let w = 0, numChild = 0
      for (let index=0; index<rm.nodeData.length; index++) {
        if (rm.nodeData[i].key === rm.nodeData[index].parent) {
          numChild ++
          w += rm.getSubTreeWidth(index,rm)
          
        }
      }
      if (rm.nodeData[i].category===1) {
        let blackNode = rm.nodeData[i].question.length - numChild
        let captionW = rm.nodePosition[i].dx + rm.unitPixel
        if (blackNode>0) {
          w+= rm.unitPixel*2*blackNode
        }
        //rm.nodePosition[i].tw = Math.max(w,captionW)
        //return Math.max(w,captionW)
        rm.nodePosition[i].tw = w
        return w

      } else {
      
        if (numChild>0) {
          rm.nodePosition[i].tw = w
          return w
        } else {
          w = rm.nodePosition[i].dx + rm.unitPixel
          rm.nodePosition[i].tw = w
          return w
        }
      }

    },
    getNodeSize(rm){
      let index = 0
      rm.nodePosition=[]
      rm.nodeData.forEach(function(node) {
        rm.nodePosition.push({x:400, y:30, dx:0, dy:0, tw:0});
        rm.nodePosition[index].dx = rm.unitPixel * 2 / 7  * node.text.length + rm.unitPixel/2
        rm.nodePosition[index].dy = (node.category === 1) ? rm.unitPixel * 9 - rm.unitPixel/2 : rm.unitPixel * 5
        index++
      })
    },
    getNthChildIndex(i, n, rm) {
      for (let index = 0; index < rm.nodeData.length; index ++) {
        if (rm.nodeData[index].parent === rm.nodeData[i].key && rm.nodeData[i].question[n] === rm.nodeData[index].answer ){
          return index
        }
      }
      return null
    },
    setNodePosition(i, rm) {
      let index = 0
      if (rm.nodeData[i].category === 1) {
        let sx = - rm.nodePosition[i].tw / 2  
        let prevW = 0
        for (let qi = 0; qi<rm.nodeData[i].question.length; qi ++){
          
          let childIndex = rm.getNthChildIndex(i,qi,rm)
          

          if (childIndex==null) {
            sx += rm.unitPixel + prevW
            prevW = rm.unitPixel
            
          }else{
            sx += rm.nodePosition[childIndex].tw/2 + prevW
            rm.nodePosition[childIndex].x = rm.nodePosition[i].x + sx
            rm.nodePosition[childIndex].y = rm.nodePosition[i].y + rm.nodePosition[i].dy
            prevW = rm.nodePosition[childIndex].tw/2
            rm.setNodePosition(childIndex, rm)
          }
        }
      } else {
        rm.nodeData.forEach(function(element) {
          if (index != i) {
            if (rm.nodeData[index].parent === rm.nodeData[i].key){
              rm.nodePosition[index].x = rm.nodePosition[i].x
              rm.nodePosition[index].y = rm.nodePosition[i].y + rm.nodePosition[i].dy
              rm.setNodePosition(index, rm)
            }
          }
          index++
        })
      }
    },
    getNodeInfo(index) {
      
      if (this.nodePosition === null) {
        return {x:400, y:30, dx:0, dy:0, tw:0}
      }
      return this.nodePosition[index]
    },
    getChildInfo(i,question) {
      
      if (this.nodePosition === null) {
        return {x:500, y:500, dx:100, dy:100, tw:100}
      }

      for (let index = 0; index < this.nodeData.length; index ++) {
        if (this.nodeData[index].parent === this.nodeData[i].key && question=== this.nodeData[index].answer ){
          return this.nodePosition[index]
        }
      }      
      
      let qi;
      for (qi = 0; qi < this.nodeData[i].question.length; qi++) {
        if (this.nodeData[i].question[qi]===question){
          break;
        }
      }

      //blank child
      if (qi==0){
        return {x:this.nodePosition[i].x-this.nodePosition[i].tw/2+this.unitPixel, y:100, dx:this.unitPixel, dy:this.unitPixel, tw:this.unitPixel*2}
      }
      let prevNodeInfo = this.getChildInfo(i, this.nodeData[i].question[qi-1])
      return {x:prevNodeInfo.x + prevNodeInfo.tw/2+this.unitPixel, y:100, dx:this.unitPixel, dy:this.unitPixel, tw:this.unitPixel*2}
    },

    getNumberOfChild(index, question=null){
      let count = 0  
      for (let i=0;i<this.nodeData.length;i++){
        if (this.nodeData[index].key === this.nodeData[i].parent){
          if (this.nodeData[index].category === 1) {
            if (question == this.nodeData[i].answer) {
              count ++
            }
          } else {
            count ++
          }
        }
      }
      return count
    },

    load: function () {
      const rm = this
      //dx, dy
      this.getNodeSize(rm)
      this.getSubTreeWidth(0,rm)
      
      this.nodePosition[0].x = this.nodePosition[0].tw/2 
      
      this.setNodePosition(0,rm)
      
    },

    saveTree(){
      this.msg = "Please check console to show JSON.";
      console.log(this.nodeData)
    },

    showDiag1(index, question='') {
      
      if (this.getNumberOfChild(index, question) === 0) {
        this.visibleDiag1 = true;
        this.msg = question + index
        this.selectedNode = index
        this.selectedQuestion = question
      }

    },
    hideDiag1() {
      this.visibleDiag1 = false
      this.enableAddNode = true
    },
    showDiag2(index){
      this.hideDiag1()
      this.selectedCategory = index
      if (index === 0){
        this.visibleDiag2_wait = true
      } else if (index === 1) {
        this.inputCondition = [{query:'Is this okay?', result: 'Yes' },{query:'', result: 'No' }]
        this.visibleDiag2_condition = true
      }
    },
    hideDiag2(){
      this.visibleDiag2_wait = false;
      this.visibleDiag2_condition = false;
    },
    
    addNode(){
      let maxKey = 0
      this.nodeData.forEach(function(node) {
        if (maxKey<node.key){
          maxKey = node.key
        }
      })
      
      let text = this.nodeCategories[this.selectedCategory].text.replace('{{value}}',this.inputValue+'')
      let question=[]
      if (this.selectedCategory == 1) {
        if (this.verifyCondition()) {
          text = this.inputCondition[0].query
          this.inputCondition.forEach(function(element) {
            question.push(element.result)
          })
        } else {
          alert('Same results!!!')
          return
        }
      
      }

      this.nodeData.push({key:maxKey+1, category:this.selectedCategory, text:text, answer:this.selectedQuestion, value:this.inputValue, parent:this.nodeData[this.selectedNode].key, question:question  })
      this.load()
      this.hideDiag2()

    },
    addResult() {
      this.inputCondition.push({query:'Query', result: '?' })
    },
    verifyCondition() {
      for (let i = 0; i<this.inputCondition.length-1; i++) {
        for (let j=i+1; j<this.inputCondition.length; j++) {
          if (this.inputCondition[i].result.trim() == this.inputCondition[j].result.trim()) {
            return false
          }
        }
      }
      return true
 
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
  .btn-save {
    position: fixed;
    right: 30px;
    top: 30px;
    font-size: 20px;
  }
  circle:hover {
    opacity: 0.5;
  }
</style>
