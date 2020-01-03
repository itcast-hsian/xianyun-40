// 保存user下的数据
export const state = () => ({
    // name: "某jack"

    // 登录后的数据，包含token和user对象
    userInfo: {}
});

// 同步修改state的数据
export const mutations = {
    // 自定义一个函数，修改name属性
    // mutations函数的第一个参数必须是state，state就是上面的state对象
    // setName(state, data){
    //     // 函数的修改方式是为了方便修改的其他逻辑
    //     state.name = data;
    // }

    // 修改userInfo
    setUserInfo(state, data){
        state.userInfo = data;
    }
};

// 异步修改state的数据，存放公共的请求函数，并且该函数可能会修改state的数据（不一定要修改）
export const actions = {
    // 登录函数可能会复用，会多个地方调用到，刚好该函数请求完成后修改state中userInfo
    login(store, data){
        // 登录接口提交, (必要要添加return)
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            // 登录成功后返回上一个页面
            this.$router.back();
            // 调用user下的mutations的方法
            store.commit("setUserInfo", res.data);

            return true;
        })
    },

    // 发送手机验证码 
    sendCaptcha(store, data){
        return this.$axios({
            url: "/captchas",
            method: 'POST',
            data: {
                // 手机号码
                tel: data
            }
        })
    },

    // 注册的请求
    register(store, data){
        return this.$axios({
            url: "/accounts/register",
            method: 'POST',
            data
        }).then(res => {
            // 登录成功后返回上一个页面
            this.$router.back();
            // 调用user下的mutations的方法
            store.commit("setUserInfo", res.data);

            return true;
        })
    }
}






