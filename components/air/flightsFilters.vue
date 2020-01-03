<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}}
                / 
                {{data.info.departDate}}
            </el-col>

            <!-- label是页面显示的值
            value是change事件中返回的值 -->
            <el-col :span="4">
                <el-select size="mini" 
                v-model="airport" 
                placeholder="起飞机场">
                    <el-option
                    v-for="(item, index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" 
                v-model="flightTimes"  
                placeholder="起飞时间">
                    <el-option
                    v-for="(item, index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" 
                v-model="company"  
                placeholder="航空公司">
                    <el-option
                    v-for="(item, index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" 
                v-model="airSize" 
                placeholder="机型">
                    <el-option
                    v-for="(item, index) in flightSize"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                type="primary" 
                round 
                plain 
                size="mini" 
                @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
        <!-- 随便调用为了函数可以执行 -->
        <span>{{filterData}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小

            // 飞机的大小
            flightSize: [
                { label: "大", value: "L" },
                { label: "中", value: "M" },
                { label: "小", value: "S" }
            ]
        }
    },

    computed: {
        // 用于监听选项的变化，返回过滤后符合条件的数组，返回给父组件
        filterData(){
            const arr = this.data.flights.filter(item => {
                // 默认每条数据都是符合条件
                let valid = true;

                if(this.airport && item.org_airport_name !== this.airport){
                    valid = false;
                }

                // 起飞时间
                if(this.flightTimes){
                    const [from, to] = this.flightTimes.split(",");
                    // 出发时间的小时
                    const start = +item.dep_time.split(":")[0];
                   if(start < from || start >= to){
                       valid = false;
                   }
                }

                if(this.company && item.airline_name !== this.company){
                    valid = false;
                }

                if(this.airSize && item.plane_size !== this.airSize){
                    valid = false;
                }

                return valid;
            })

            this.$emit("setDataList", arr);

            // 为了页面渲染空的字符串
            return "";
        }
    },

    props: {
        // 传入的总数据
        data: {
            type: Object,
            default(){return {}}
        }
    },
    methods: {
        // // 选择机场时候触发
        // handleAirport(value){
        //     // 过滤后数组
        //     const arr = this.data.flights.filter(v => {
        //         return value === v.org_airport_name;
        //     })
            
        //     // 触发父组件的修改dataList的函数
        //     this.$emit("setDataList", arr)
        // },

        // // 选择出发时间时候触发
        // handleFlightTimes(value){
        //     // 数组的解构
        //     const [from, to] = value.split(",");

        //     // 过滤后数组
        //     const arr = this.data.flights.filter(v => {
        //         // 判断出发时间是否在选中的时间段内
        //         const start = +v.dep_time.split(":")[0]
        //         return start >= +from && start < +to;
        //     })
            
        //     // 触发父组件的修改dataList的函数
        //     this.$emit("setDataList", arr)
        // },

        //  // 选择航空公司时候触发
        // handleCompany(value){
        //     // 修改父组件中flightsData中的flights

        //     // 过滤后数组
        //     const arr = this.data.flights.filter(v => {
        //         return value === v.airline_name;
        //     })
            
        //     // 触发父组件的修改dataList的函数
        //     this.$emit("setDataList", arr)
        // },

        //  // 选择机型时候触发
        // handleAirSize(value){
        //    // 过滤后数组
        //     const arr = this.data.flights.filter(v => {
        //         return value === v.plane_size;
        //     })
            
        //     // 触发父组件的修改dataList的函数
        //     this.$emit("setDataList", arr)
        // },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport = "";        
            this.flightTimes = "";    
            this.company =  "";      
            this.airSize = "";   
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>