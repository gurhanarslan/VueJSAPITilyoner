<template>
  <div class="container-fluid fixed-bottom border">
    <div class="row">
      
      <div class="col-md-4 col-4 text-left border-danger">
        <transition-group enter-active-class="animated slideInUp">
          <div :key="name" class="box">
            <table class="table table-striped">
              <tbody>
                <tr v-for="item in name">
                  <td>{{item.teams}}</td>
                  <td>{{item.guess}}</td>
                  <td>{{item.rate}}</td>
                  <td></td>
                </tr>

                <tr class="bg-success text-white">
                  <td>Maç Sayısı : {{name.length}}</td>
                  <td>
                    <select v-model.number="val" class="form-control">
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </td>
                  <td >{{(rate)}}</td>
                  <td>{{(val*rate).toFixed(2)}} TL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rate: 1,
      val: 1,
      k: 0
    };
  },
  methods: {
    totalrate() {
      console.log(this.rate+'1')
      if(this.insert){
     this.rate = this.rate * this.total[this.total.length-1]
      }
      else{
        return this.rate
      }
      
      
      this.rate = this.rate.toFixed(2);
       console.log(this.total.length+'2')
    }/*
    totalrate(){
      if(this.total.length>this.ratelength){
        return this.rate
      }
      else{
        this.rate = this.rate * this.total[ratelength]
      }
    }*/
  },

  props: ["name", "total","insert"],
  watch:{ 
    total() {
      return this.totalrate();
    
  }
  }
};
</script>

<style>
.box {
  width: 500px;
  height: auto;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid green;
  background-color: white;
}
</style>