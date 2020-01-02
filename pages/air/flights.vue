<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                
                <!-- 航班信息 -->
                <FlightsItem v-for="(item, index) in flightsData.flights"
                :key="index"
                :data="item"/>

                <!-- 分页组件 -->
                <!-- size-change: 切换条数时候触发事件
                current-change: 切换你页数时候触发的事件
                current-page: 当然显示的页面
                total: 总条数 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"

export default {
    data(){
        return {
            // 航班总数据 { info, flights, total, options }
            flightsData: {},
            // 当前的页面
            pageIndex: 1,
            // 当然的条数
            pageSize: 5,
            // 总条数
            total: 0
        }
    },
    components: {
        FlightsListHead,
        FlightsItem
    },

    mounted(){
        // 请求机票的列表，（请求尽量放到父组件中，好处方便管理数据，和组件之间的数据共享）
        this.$axios({
            url: "/airs",
            params: this.$route.query
        }).then(res => {
            this.flightsData = res.data;
        })
    },

    methods: {
        // 切换分页条数时候触发
        handleSizeChange(value){},
        // 切换你页数时候触发的事件
        handleCurrentChange(value){}
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>