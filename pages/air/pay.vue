<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{orderData.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">

                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>

                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
// 生成二维码的插件
import QRCode from "QRCode";

export default {
    data(){
        return {
            // 订单详情
            orderData: {},
            // 定时器
            timer: false
        }
    },
    methods: {
        checkPay(){
            this.timer = setInterval(() => {
                // 查询付款的状态
                this.$axios({
                    url: "/airorders/checkpay",
                    method: "POST",
                    data: {
                        id: this.orderData.id,  // 订单id
                        nonce_str: this.orderData.price, // 订单的金额
                        out_trade_no: this.orderData.orderNo, // 订单编号
                    },
                    headers: {
                        // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
                        Authorization: "Bearer " + this.$store.state.user.userInfo.token
                    }
                }).then(res => {
                    if(res.data.statusTxt !== "订单未支付"){
                        this.$alert("订单支付成功", "提示");
                        // 停止定时器
                        clearInterval(this.timer);
                    }
                })
            }, 3000);
        }
    },
    mounted(){
        // 获取订单id
        const {id} = this.$route.query;

        setTimeout(() => {
            // 请求订单的详情
            this.$axios({
                url: "/airorders/" + id,
                headers: {
                    // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
                    Authorization: "Bearer " + this.$store.state.user.userInfo.token
                }
            }).then(res => {
                // 订单的详情
                this.orderData = res.data;
                // 获取canvas元素
                const stage = document.getElementById("qrcode-stage");
                // 生成二维码
                QRCode.toCanvas(stage, this.orderData.payInfo.code_url, {
                    width: 200
                })
                // 检查支付状态
                this.checkPay();
            })
        }, 0); 
    },

    destroyed(){
        // 组件卸载时候清除定时器
        clearInterval(this.timer);
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>