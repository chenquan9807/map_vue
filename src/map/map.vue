<template>
  <div id="map">
    <map-header
      :Destination="Destination"
      @User="User"
    >
    </map-header>
    <div id="allmap" :style = "'height:' + MapHeight + 'px'"></div>
    <div id="route"></div>
    <div id="location" v-on:click="refresh">
      <i class="iconfont refresh">&#xe622;</i>
    </div>
    <info
      :Destination="Destination" :Distance="Distance"
      :MapHeight="MapHeight" :pointA="pointA" :pointB="pointB" :status="status"
      @infoDown="infoDown" @InfoOut="route"
    >
    </info>
    <user></user>
  </div>
</template>
<script>
import BMap from 'BMap'
// import axios from 'axios'
import $ from 'jquery'
import store from '../store'
import MapHeader from './components/header'
import Info from './components/info'
import User from '../user/user'
import mypoint from '../assets/images/pt.svg'
import none from '../assets/images/pt1.svg'
import enough from '../assets/images/pt2.svg'
import warning from '../assets/images/pt4.svg'
export default {
  name: 'Map',
  components: {
    MapHeader: MapHeader,
    Info: Info,
    User: User
  },
  data () {
    return {
      point: {},
      points: {},
      MapHeight: 0,
      Destination: '',
      Distance: '',
      pointA: {},
      pointB: {},
      status: 0,
      arrived: false,
      left: false
    }
  },
  mounted () {
    if (!window.localStorage.username || !window.localStorage.password) {
      this.$router.push({path: '/login'})
    }
    // websocket连接-----10.151.91.33----39.108.79.28:80
    var websocket = new WebSocket('ws://39.108.79.28/SmartPark/websocket/' + window.localStorage.username)
    window.websocket = websocket
    // websocket连接成功
    window.websocket.onopen = function () {
      console.log('WebSocket连接成功')
      window.websocket.send(window.localStorage.username)
    }
    // 连接发生错误的回调方法
    window.websocket.onerror = function () {
      console.log('websocket连接出错')
    }
    window.websocket.onmessage = function (event) {
      var data = $.parseJSON(event.data)
      if (data[0] === window.localStorage.username) {
        window.clearInterval(window.arrived) // 去除广播定时器
        vm.$router.push({path: '/cost'})
      }
    }
    // 连接关闭的回调方法
    window.websocket.onclose = function () {
      console.log('websocket关闭')
    }
    store.commit('username', window.localStorage.username)
    store.commit('password', window.localStorage.password)
    store.commit('license', window.localStorage.license)
    let vm = this
    vm.GetMapHeight()
    vm.CteateMap()
    var geolocation = new BMap.Geolocation()
    window.map.enableScrollWheelZoom(true)
    geolocation.enableSDKLocation()
    geolocation.getCurrentPosition(function (r) {
      vm.point = r.point
      // eslint-disable-next-line
      if (this.getStatus() === BMAP_STATUS_SUCCESS) {
        if (parseInt(window.localStorage.n) === 1) {
          window.localStorage.n = window.localStorage.n + 1
          window.location.reload()
          this.$router.go(0)
        }
        vm.Mark(vm.point, mypoint)
        vm.PointGet()
      } else {
        alert('failed' + this.getStatus())
      }
    })
    // 搜索结果列表
    var ac = new BMap.Autocomplete({
      'input': 'search', 'location': window.map
    })
    ac.addEventListener('onhighlight', function (e) {
      vm.chooseDes(e)
    })
    var myValue
    ac.addEventListener('onconfirm', function (e) { // 鼠标点击下拉列表后的事件
      var _value = e.item.value
      myValue = _value.province + _value.city + _value.district + _value.street + _value.business
      vm.G('searchResultPanel').innerHTML = 'onconfirm<br />index = ' + e.item.index + '<br />myValue = ' + myValue
      window.myValue = myValue
      vm.setPlace()
    })
  },
  methods: {
    GetMapHeight () {
      const ScreenHeight = document.documentElement.clientHeight
      this.MapHeight = ScreenHeight - $('#header').height()
    },
    CteateMap () {
      var map = new BMap.Map('allmap')
      var point = new BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 4)
      // map.disableDoubleClickZoom()
      window.map = map
    },
    PointGet () {
      let vm = this
      $.ajax({
        url: 'https://bird.ioliu.cn/v1?url=http://39.108.79.28/SmartPark/Park/searchNearbyParks',
        // https://bird.ioliu.cn/v1?url=
        // url: '/api/Park/searchNearbyParks',
        type: 'post',
        // data对象中的属性名要和服务端控制器的参数名一致 login(name, password)
        data: {
          'longitude': vm.point['lng'],
          'latitude': vm.point['lat']
        },
        dataType: 'json',
        success: function (response) {
          // console.log(response.data)
          vm.points = response.data
        },
        error: function (e) {
          console.log(e)
        }
      })
    },
    Mark (point, ImgUrl) {
      var myIcon = new BMap.Icon(ImgUrl, new BMap.Size(48, 48))
      var marker = new BMap.Marker(point, {icon: myIcon})
      // window.map.centerAndZoom(point, 14)
      window.map.addOverlay(marker)
      // eslint-disable-next-line
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE) // 跳动的动画
      return marker
    },
    MapView (points) {
      // eslint-disable-next-line
      var view = window.map.getViewport(eval(points))
      var mapZoom = view.zoom
      var centerPoint = view.center
      window.map.centerAndZoom(centerPoint, mapZoom)
    },
    route (pointA, pointB, m) {
      var vm = this
      $('#Info').hide(500)
      $('#location').hide(500)
      if (m === 1) {
        $('#allmap').css('height', vm.MapHeight - 300)
      }
      if (m === 0) {
        $('#allmap').css('height', vm.MapHeight - 200)
      }
      $('#route').css('height', 300)
      $('#beforeSearch').hide()
      $('#header').css('height', '42px')
      $('#afterSearch').show('slow')
      var transit = new BMap.DrivingRoute(window.map, {
        renderOptions: {
          map: window.map,
          panel: 'route',
          enableDragging: true// 起终点可进行拖拽
        }
      })
      window.map.clearOverlays() // 清除地图上所有覆盖物
      transit.search(pointA, pointB)
      vm.arrive()
    },
    arrive () {
      var arrived = window.setInterval(function () {
        window.websocket.send(window.localStorage.username)
        console.log(window.localStorage.username)
      }, 10000)
      window.arrived = arrived
    },
    addIW (point) {
      var marker
      var vm = this
      if (point['status'] < 1) marker = this.Mark(point, none)
      if (point['status'] > 15) marker = this.Mark(point, enough)
      if (point['status'] >= 1 && point['status'] <= 15) marker = this.Mark(point, warning)
      marker.addEventListener('click', function () {
        var info = $('#Info')
        if (info.is(':hidden')) {
          $('#location').hide(500)
          vm.MapHeight = vm.MapHeight - 100
        }
        info.fadeIn()
        vm.Destination = point['name']
        window.localStorage['destination'] = vm.Destination
        var pointA = new BMap.Point(point['lng'], point['lat'])
        var pointB = new BMap.Point(vm.point['lng'], vm.point['lat'])
        vm.Distance = (window.map.getDistance(pointA, pointB)).toFixed(0)
        vm.pointA = pointA
        vm.pointB = pointB
        vm.status = point['status']
        window.map.setCenter(pointA)
      })
    },
    G (id) {
      return document.getElementById(id)
    },
    chooseDes (e) { // 鼠标放在下拉列表上的事件
      var str = ''
      var vm = this
      var _value = e.fromitem.value
      var value = ''
      if (e.fromitem.index > -1) {
        value = _value.province + _value.city + _value.district + _value.street + _value.business
      }
      str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value
      value = ''
      if (e.toitem.index > -1) {
        _value = e.toitem.value
        value = _value.province + _value.city + _value.district + _value.street + _value.business
      }
      str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value
      vm.G('searchResultPanel').innerHTML = str
    },
    setPlace () {
      var vm = this
      var r = confirm('确认要去这里吗？')
      if (r === true) {
        window.map.clearOverlays() // 清除地图上所有覆盖物
        // eslint-disable-next-line
        function myFun () {
          var pointB = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
          window.map.centerAndZoom(pointB, 18)
          var pointA = new BMap.Point(vm.point['lng'], vm.point['lat'])
          var points = [pointA, pointB]
          vm.route(pointA, pointB, 1)
          vm.MapView(points)
        }
        var local = new BMap.LocalSearch(window.map, { // 智能搜索
          onSearchComplete: myFun
        })
        vm.Destination = window.myValue
        $('#beforeSearch').hide()
        $('#header').css('height', '42px')
        $('#afterSearch').show('slow')
        local.search(window.myValue)
      }
    },
    infoDown () {
      $('#Info').hide(500)
      $('#location').show(500)
      this.MapHeight = this.MapHeight + 100
      this.MapView(window.pointspark)
    },
    User () {
      var user = $('#User')
      user.show()
      user.removeClass('fadeOutLeft')
      user.addClass('animated fadeInUpBig')
    },
    refresh () {
      var vm = this
      window.map.clearOverlays() // 清除地图上所有覆盖物
      var geolocation = new BMap.Geolocation()
      window.map.enableScrollWheelZoom(true)
      geolocation.enableSDKLocation()
      geolocation.getCurrentPosition(function (r) {
        vm.point = r.point
        // eslint-disable-next-line
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          vm.Mark(vm.point, mypoint)
          vm.PointGet()
        } else {
          alert('failed' + this.getStatus())
        }
      })
    },
    changecity () {
      let vm = this
      // console.log(r.point)
      // lat: 28.077113685045
      // lng: 113.01701576319
      alert('该地区暂未提供服务\n即将为您切换到体验区')
      vm.point['lng'] = 113.01701576319
      vm.point['lat'] = 28.077113685045
      vm.Mark(vm.point, mypoint)
      vm.PointGet()
    }
  },
  watch: {
    points () {
      window.testnum = 0
      var pointspark = []
      var point = {}
      for (let key in this.point) {
        point[key] = this.point[key]
      }
      pointspark.push(point)
      for (let item in this.points) {
        window.testnum = 1
        var dic = {}
        for (let key in this.points[item]) {
          if (key === 'parkID') {
            dic['id'] = this.points[item][key]
          }
          if (key === 'latitude') {
            dic['lat'] = this.points[item][key]
          }
          if (key === 'longitude') {
            dic['lng'] = this.points[item][key]
          }
          if (key === 'parkingSpace') {
            dic['status'] = this.points[item][key]
          }
          if (key === 'parkName') {
            dic['name'] = this.points[item][key]
          }
        }
        this.addIW(dic)
        pointspark.push(dic)
      }
      window.pointspark = pointspark
      if (window.testnum === 0) {
        this.changecity()
      }
      this.MapView(pointspark)
    }
  }
}
</script>
<style scoped>
  #allmap {
    width: 100%;
  }
  #route {
    overflow: auto;
  }
  #location {
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 80px;
    left: 30px;
    cursor: pointer;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }
  .refresh {
    font-size: 30px;
    color: #ff6354;
    margin: 0;
    padding: 0;
  }
</style>
