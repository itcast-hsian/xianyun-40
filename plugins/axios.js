
import {Message} from "element-ui";

export default ({$axios}) => {
    // 拦截axios的错误
    $axios.onError(res => {
        // response是js原生Error对象的属性
        const {statusCode, message} = res.response.data;

        if(statusCode === 400){
            // Message相当于this.$message
            Message.error(message)
        }
    })
}