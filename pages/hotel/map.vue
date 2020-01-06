<template>
  <div style="padding:100px;">
    <!-- 引入高德地图的js -->
    <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=	819d9ea7b3f50ec473041569fcfc6a23"></script> 

    <!-- 地图的容器 -->
    <div id="container"></div> 
  </div>
</template>

<script>
export default {
    mounted(){
        var map = new AMap.Map('container', {
            zoom:11,//级别
            center: [113.4278180000,23.1293300000],//中心点坐标
            viewMode:'3D',//使用3D视图
        });

        var marker1 = new AMap.Marker({
            position: new AMap.LngLat(113.4278180000,23.1293300000),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '黑马程序员',
            icon: 'https://fs-km.7moor.com/N00000021451/km/2018-08-30/1535629155660/52cdcfd0-ac49-11e8-b46c-47849b41fd55?imageView2/1/w/50/h/50'
        });

        var marker2 = new AMap.Marker({
            position: new AMap.LngLat(113.4378180000,23.1393300000),
            title: '北京'
        });

        map.add([marker1, marker2]);


        map.indoorMap.on('click',function(result){
            console.log(result.shop.id);
        }); 
    }
}
</script>

<style scoped lang="less">
#container {width:500px; height: 500px; }  
</style>