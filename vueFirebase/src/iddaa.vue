<template>

  <div class="container">
     <div class="loading" :class="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <table class="table table-striped text-center ">
      <thead class="bg-success">
        <tr>
          <th>Maç Günü</th>
             <th>Saati</th>
          <th>Lig</th>
          <th>Maç</th>
          <th>Durum</th>
          <th >1</th>
          <th >0</th>
          <th >2</th> 
       
        </tr>
      </thead>
     <tbody>
       <tr v-for="(user,index) in users">
         <td>{{user.ede}}</td>
             <td>{{user.edh}}</td>
         <td>{{user.cn}}</td>
         <td>{{user.en}}</td>
         <td>{{live()}}</td>
         <td @click="choosing(index,0)" style="cursor:pointer;" :class="score(user.m[0].o[0].odd)" >{{user.m[0].o[0].odd}}</td>
         <td @click="choosing(index,1)" style="cursor:pointer;"  :class="score(user.m[0].o[1].odd)">{{user.m[0].o[1].odd}}</td>
         <td @click="choosing(index,2)" style="cursor:pointer;"  :class="score(user.m[0].o[2].odd)">{{user.m[0].o[2].odd}} </td>
     
       </tr> 
     </tbody>
      
    </table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      userName:null,
      users:[],
      rate:[],
      buckets:[],
      show:true,
      loading:true,
      insert:false
    }
  },
  computed:{
      isLoading(){
      if(this.users.length==0){
        return 'd-block'
      }
      else{
        return 'd-none'
      }
    }
  },
  methods:{
  
      choosing(value,g){
          let match = this.users[value]
          let teams = match.en
          let rate = match.m[0].o[g].odd
           let rate2 = match.m[0].o[g].odd
          
          let guess = match.m[0].o[g].ona
    
 let same = this.buckets.filter(response =>{
          if(response.teams==teams){
            return true
          }
          else{
           return false
          }
        })
      

        

   /* for (let i = 0; i < this.buckets.length; i++) {
      let same= this.buckets[i].teams.includes(teams);
      console.log(same)
     if(same)
      {
        alert('Bu Maçı Zaten Eklemiştiniz! ')
        this.buckets.splice(value, 2);
        this.rate.splice(value,1)
      console.log(this.buckets)
     
      }
      else{
          
      }
    }*/
        this.buckets.push({teams:teams,rate:rate,guess:guess})
            this.rate.push(rate2)
            this.insert=true
         let length = this.buckets.length
       if(same.length>0){
          alert('Bu maçı daha önce eklemiştiniz!')
            this.buckets.pop();
            this.rate.pop();
            this.insert=false
        
        }
           
            
   
      console.log(rate)
     this.$emit("rate-section",this.rate)
this.$emit("insert",this.insert)
     this.$emit("rate-length",this.rate.length)

console.log(this.rate)
        this.$emit("matches-section",this.buckets)

      },
    saveUser(){
      this.$http.post('users.json',{userName : this.userName})
      .then((response)=>{
        console.log(response);
      })
    },

    live(){
     return this.users.live ? 'Maç Başladı' : 'Maç Başlamadı!'
    },
    score(value){
      if(value<2){
        return 'text-success'
      }
      else if(2<=value && value<=3){
          return 'text-warning'
      }
      else if(value>=3){
        return 'text-danger'
      }
},
    getUsers(){
      let vm=this
        vm.users=[]
      vm.$http.get('')
      .then((response)=>{
       let data = response.data.data;
        
        for (let i = 0; i < data.events.length; i++) {
          
            vm.users.push(data.events[i])
        }
        
      console.log(data.events)
   
        
      })
    },
    deleteUser(value){
      this.$http.delete('users/'+ value +'.json')
      .then((response) =>{
        console.log(response)
      })
      
    }
  },
  updateUser(){
    this.$http.put('',this.users.length-1,this.userName)
    .then((response) => {
      console.log(response)
    })
  },
       beforeMount(){
    this.getUsers()
 },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
