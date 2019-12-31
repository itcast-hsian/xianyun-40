<template>
	<div>
    <Header/>
		<!-- 相当于router-view,组件的占位符 -->
		<nuxt />
    <Footer/>
	</div>
</template>

<script>
// 头部组件
import Header from "@/components/header";
// 页面组件
import Footer from "@/components/footer";

export default {
  components: {
    Header,
    Footer
  },
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

ul,
li,
ol {
	list-style: none;
}

a {
	color: inherit;
	text-decoration: none;
}

a:hover {
	color: inherit;
}

i,
em {
	font-style: normal;
}
</style>
