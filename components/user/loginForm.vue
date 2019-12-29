<template>
	<!-- model: 表单数据对象(指向data中某个属性) -->
	<!-- ref: 获取dom元素  -->
	<!-- rules: 验证表单的规则 -->
	<el-form :model="form" ref="form" :rules="rules" class="form">
		<el-form-item class="form-item" prop="username">
			<el-input placeholder="用户名/手机" v-model="form.username"></el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="password">
			<el-input placeholder="密码" type="password" v-model="form.password"></el-input>
		</el-form-item>

		<p class="form-text">
			<nuxt-link to="#">忘记密码</nuxt-link>
		</p>

		<el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
	</el-form>
</template>

<script>
export default {
	data() {
		// rule: 定义校验规则（不是必须的）
		// value: 表单输入框的值
		// callback: 回调函数，可以接受错误的提示，如果验证通过callback就不用传递参数，callback必须要调用
		const validateUsername = (rule, value, callback) => {
			const reg = /^1[3-9][0-9]{9}$/;
			// 正则下面的test方法返回布尔值
			if (reg.test(value)) {
				// 验证通过
				callback();
			} else {
				callback("手机号码格式错误");
			}
		};

		return {
			// 表单数据
			form: {
				username: "",
				password: ""
			},
			// 表单规则
			rules: {
				username: [{ validator: validateUsername, trigger: "blur" }],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" }
				]
			}
		};
	},
	methods: {
		// 提交登录
		handleLoginSubmit() {

            // validate方法是elementui给el-form表单提供验证的函数
            // valid代表验证是否通过
			this.$refs["form"].validate(valid => {
                if(!valid) return;

                // 调用actions的登录方法
                this.$store.dispatch("user/login", this.form).then(res => {
                    if(res === true){
                        this.$message.success("登录成功，返回上一个页面");
                    }
                })

			});
		}
	}
};
</script>

<style scoped lang="less">
.form {
	padding: 25px;
}

.form-item {
	margin-bottom: 20px;
}

.form-text {
	font-size: 12px;
	color: #409eff;
	text-align: right;
	line-height: 1;
}

.submit {
	width: 100%;
	margin-top: 10px;
}
</style>
