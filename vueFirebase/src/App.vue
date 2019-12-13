<template>
  <div class="container-fluid">
  <div class="text-center"> <h3> {{date}} -- {{ratelength}} {{insert}}</h3>  </div> <hr>
    <appIddaa @insert="insert=$event" @rate-length="ratelength=$event" @rate-section="rate=$event" @matches-section="matches=$event"></appIddaa>
    <bucket :insert="insert" :ratelength="ratelength" :total="rate" :name="matches"></bucket>
  </div>
</template>

<script>
import Iddaa from './iddaa'
import Loading from './Loading'
import bucket from './Bucket'

export default {
 components:{
   appIddaa:Iddaa,
   bucket:bucket,
   appLoading : Loading
 },
 data(){
   return{
     page:"appIddaa",
     matches:[],
     insert:null,
     rate:[],
     ratelength:null

   }

 },
computed:{
  date(){
    let date= new Date;
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth();
    
    return  +year+'/'+(month+1)+'/'+day
  }
}
}
</script>

<style>

</style>