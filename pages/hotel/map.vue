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
                    <el-input placeholder="起点位置" v-model="start"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="终点位置" v-model="end"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleSearch">搜索</el-button>
                </el-form-item>
                <el-form-item v-if="routes[0]">
                    <div>距离：{{ Number(routes[0].distance / 1000).toFixed(1) }}公里</div>
                    <div>时间：{{ routes[0].time }}</div>
                    <div>高速费：{{ routes[0].tolls }}元</div>
                    <div>高速的距离：{{ Number(routes[0].tolls_distance / 1000).toFixed(1) }}公里</div>
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
            current: 0,

            // 起点的关键字
            start: "",
            // 终点的关键字
            end: "",
            // 驾车对象
            driving: "",
            // 当前搜索的路线的信息
            routes: []
        }
    },
    methods: {
        // tab栏切换
        handleChangeTab(index){
            this.current = index;
        },

        // 根据搜索关键字路线的规划
        handleSearch(){
            var points = [
                { keyword: this.start, city:'全国' },
                { keyword: this.end, city:'全国' }
            ]
            
            this.driving.search(points, (status, result) => {
                if(status === "complete"){
                    this.routes = result.routes;

                    // 得到分钟
                    const time = this.routes[0].time / 60;
                    let hours, min, day;
                    if(time >= 60){
                        hours = Math.floor(time / 60);
                        min = time % 60;
                        this.routes[0].time = `${hours}小时${Number(min).toFixed(2)}分钟`
                    }
                    
                    if(hours >= 24){
                        day = Math.floor(hours / 24);
                        hours = hours % 24;
                        this.routes[0].time = `${day}天${hours}小时${Number(min).toFixed(2)}分钟`
                    }

                    if(time < 60){
                        this.routes[0].time = `${Number(time).toFixed(2)}分钟`
                    }
                }
            })
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
        // var driving = new AMap.Driving({
        //     map,
        //     // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        //     policy: AMap.DrivingPolicy.LEAST_TIME
        // })
        
        // var startLngLat = [113.4278180000,23.1293300000]
        // var endLngLat = [113.3245904, 23.1066805]
        
        // driving.search(startLngLat, endLngLat, function (status, result) {
        //     // 未出错时，result即是对应的路线规划方案
        //     console.log(status, result)
        // })


        // 路线搜索
        this.driving = new AMap.Driving({
            map,
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME
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