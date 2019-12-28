<template>
	<div style="padding:100px;">
		<div>
			<span v-for="(item, index) in ['新闻', '体育', '娱乐']"
			:key="index"
			@click="handleClick(index)"
			:class="{ active: current === index }">
			{{item}}
			</span>
		</div>

		<div v-if="current === 0">
			<ul>
				<li>普通新闻1</li>
				<li>普通新闻2</li>
				<li>普通新闻3</li>
			</ul>
		</div>
		<div v-if="current === 1">
			<ul>
				<li>体育新闻1</li>
				<li>体育新闻2</li>
				<li>体育新闻3</li>
			</ul>
		</div>
		<div v-if="current === 2">
			<ul>
				<li>娱乐新闻1</li>
				<li>娱乐新闻2</li>
				<li>娱乐新闻3</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			// 最重要的变量，记录当前的高亮的状态
			current: 0
		}
	},

	methods: {
		handleClick(index){
			this.current = index;
		}
	}
};
</script>

<style scoped lang="less">
.active{
	color: red;
}
</style>