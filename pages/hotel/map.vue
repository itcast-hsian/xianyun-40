<template>
  <div style="padding:100px;">
    <!-- 引入高德地图的js -->
    <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=	819d9ea7b3f50ec473041569fcfc6a23&plugin=AMap.Driving"></script> 

    <!-- 地图的容器 -->
    <el-row>
        <el-col :span="12">
            <div id="container"></div> 
        </el-col>
        <el-col :span="8" :offset="4">
            <el-form>
                <el-form-item>
                    <el-row type="flex" justify="space-between">
                        <span v-for="(item, index) in ['驾车','公交','步行','骑行']"
                        :key="index"
                        class="tabSpan"
                        @click="handleChangeTab(index)"
                        :class="{active: current === index}">
                        {{item}}
                        </span>
                    </el-row>
                </el-form-item>
            
                <el-form-item>
                    <el-input placeholder="起点位置"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="终点位置"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button>搜索</el-button>
                </el-form-item>
            </el-form>
            
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return {
            current: 0
        }
    },
    methods: {
        handleChangeTab(index){
            this.current = index;
        }
    },
    mounted(){
        var map = new AMap.Map('container', {
            zoom:11,//级别
            center: [113.4278180000,23.1293300000],//中心点坐标
            viewMode:'3D',//使用3D视图
        });

        var marker1 = new AMap.Marker({
            position: new AMap.LngLat(113.4278180000,23.1293300000),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '黑马程序员',
            // icon: 'https://fs-km.7moor.com/N00000021451/km/2018-08-30/1535629155660/52cdcfd0-ac49-11e8-b46c-47849b41fd55?imageView2/1/w/50/h/50'
        });


        map.add([marker1]);

        // 显示室内的结构图
        // map.indoorMap.on('click',function(result){
        //     console.log(result.shop.id);
        // }); 

        // 路线规划
        var driving = new AMap.Driving({
            map,
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME
        })
        
        var startLngLat = [113.4278180000,23.1293300000]
        var endLngLat = [113.3245904, 23.1066805]
        
        driving.search(startLngLat, endLngLat, function (status, result) {
            // 未出错时，result即是对应的路线规划方案
            console.log(status, result)
        })
        
    }
}
</script>

<style scoped lang="less">
#container {width:500px; height: 500px; }  

.tabSpan{
    cursor: pointer;
}

.active{
    color:red;
    text-decoration: underline;
}
</style>