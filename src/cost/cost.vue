<template>
  <div id="cost">
    <cost-header></cost-header>
    <cost-duration :Destination="Destination"></cost-duration>
    <!--<cost-charging></cost-charging>-->
  </div>
</template>

<script>
import $ from 'jquery'
import CostHeader from './components/CostHeader'
import CostDuration from './components/Duration'
import CostCharging from './components/charging'
export default {
  name: 'cost',
  data () {
    return {
      Destination: ''
    }
  },
  components: {
    CostHeader: CostHeader,
    CostDuration: CostDuration,
    CostCharging: CostCharging
  },
  mounted () {
    const ScreenHeight = document.documentElement.clientHeight
    $('#cost').css('height', ScreenHeight)
    this.Destination = window.localStorage.destination
    // console.log('Destination' + this.Destination)
  }
}
</script>

<style scoped>
#cost {
  width: 100%;
  background: #eee;
}
</style>
