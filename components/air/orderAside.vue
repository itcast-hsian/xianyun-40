<template>
    <div class="aside">
        <div class="air-info">
            <el-row type="flex" justify="space-between" class="info-top">
                <div>{{data.dep_date}}</div>
                <div>{{data.org_city_name}} - {{data.dst_city_name}}</div>
            </el-row>    
            <el-row 
            type="flex" 
            justify="space-between" 
            align="middle" 
            class="info-step">
                <el-col :span="5" class="flight-airport">
                    <strong>{{data.dep_time}}</strong>
                    <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
                </el-col>
                <el-col :span="14" class="flight-time">
                    <span>--- {{rankTime}} ---</span>
                    <span>{{data.airline_name}}{{data.flight_no}}</span>
                </el-col>
                <el-col :span="5" class="flight-airport">
                    <strong>{{data.arr_time}}</strong>
                    <span>浦东机场T2</span>
                </el-col>
            </el-row> 
        </div>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>订单总价</span>
            <span>金额</span>
            <span>数量</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>成人机票</span>
            <span>￥{{data.seat_infos.org_settle_price}}</span>
            <span>x1</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>机建＋燃油</span>
            <span>¥{{data.airport_tax_audlet}}/人/单程</span>
            <span>x1</span>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="info-bar">
            <span>应付总额：</span>
            <span class="price">￥ {{ $store.state.air.allPrice }}</span>
        </el-row>           
    </div>
</template>

<script>
export default {
    props: {
        // 父组件传递过来的对象
        data: {
            type: Object,
            default: {}
        }
    },

    computed: {
        // 相隔时间
        rankTime(){
            if(!this.data.arr_time) return;

            // 到达时间
            const arr = this.data.arr_time;
            const dep = this.data.dep_time;

            const end = arr.split(":"); // ['12', '30']
            const start = dep.split(":"); // ['10', '00']

            let end_min = (end[0] * 60 + +end[1]);
            const start_min = (start[0] * 60 + +start[1]);

            // 如果小于认为是到第二天
            if(end_min < start_min){
                end_min += 24 * 60;
            }
            
            // 相隔分钟
            const dis = end_min - start_min;
            // 小时
            const hours = Math.floor(dis / 60);
            // 分钟
            const min = dis % 60;

            return `${hours}时${min}分`;
        }
    },
}
</script>

<style scoped lang="less">
/*aside*/
.aside{
    width: 350px;
    height: fit-content;
    border:1px #ddd solid;
}

.air-info{
    padding:15px;

    .info-top{
        margin-bottom:10px;
        > div:last-child{
            font-size:14px;
        }
    }

    .info-step{
        .flight-airport{
            strong{
                display: block;
                font-size: 22px;
                font-weight: normal;
            }

            span{
                font-size: 12px;
                color:#999;
            }
        }

        .flight-time{
            text-align: center;
            font-size: 12px;
            color:#999;
            span{
                display: block;
            }
        }
    }
}

.info-bar{
    border-top:1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price{
        font-size:28px;
        color: orange;
    }
}
</style>