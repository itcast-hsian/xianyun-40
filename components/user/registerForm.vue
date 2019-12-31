<template>
	<el-form :model="form" ref="form" :rules="rules" class="form">
		<el-form-item class="form-item" prop="username">
			<el-input placeholder="用户名手机" v-model="form.username"></el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="captcha">
			<el-input placeholder="验证码" v-model="form.captcha">
				<template slot="append">
					<el-button @click="handleSendCaptcha">发送验证码</el-button>
				</template>
			</el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="nickname">
			<el-input placeholder="昵称" v-model="form.nickname"></el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="password">
			<el-input placeholder="密码" type="password" v-model="form.password"></el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="checkPassword">
			<el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
		</el-form-item>

		<el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
	</el-form>
</template>

<script>
export default {
	data() {
        // rule是当前规则（当前不需要）
        // value是输入框的值
        // callback是必须要调用
		const validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.form.password) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
			}
		};
		return {
			// 表单数据
			form: {
				username: "",
				captcha: "",
				nickname: "",
				password: "",
				checkPassword: ""
			},
			// 表单规则
			rules: {
				username: [
					{
						required: true,
						message: "手机号码不能为空",
						trigger: "blur"
					}
				],
				captcha: [
					{
						required: true,
						message: "验证码不能为空",
						trigger: "blur"
					}
				],
				nickname: [
					{ required: true, message: "昵称不能为空", trigger: "blur" }
				],
				password: [
					{ required: true, message: "密码不能为空", trigger: "blur" }
				],
				checkPassword: [
                    { validator: validatePass,  trigger: "blur" }
                ]
			}
		};
	},
	methods: {
		// 发送验证码
		handleSendCaptcha() {
            // 发送手机验证码之前判断手机号码不能为空
            if(this.form.username.trim() === ""){
                this.$message.error("手机号码不能为空");
                return;
            }

            this.$store.dispatch("user/sendCaptcha", this.form.username).then(res => {
                this.$message.success("验证码已经发送到手机上：000000");
            })
        },

		// 注册
		handleRegSubmit() {
			console.log(this.form);
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