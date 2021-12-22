<!--
 * @Description: 食物随机选择
 * @Author: 
 * @Date: 
 * @Editors: 
 * @LastEditTime: 
-->
<template>
	<view class="container">
		<view class="show-list">
			<view v-for="(item, index) in show_list" :key="item.value">
				{{ item.name }}
			</view>
		</view>
		<view class="value">
			{{ value }}
		</view>
		<button>开始</button>
	</view>
</template>

<script>
	import foodList from "./foot.js";
	export default {
		name: '',
		components: {},
		filters: {},
		props: {},
		data() {
			return {
				value: '点击开始选择',
			};
		},
		computed: {
			show_list() {
				return foodList;
			}
		},
		methods: {},
		watch: {},
		onLoad(options) {},
		onReady() {
			console.log('---', foodList)
		},
	}
</script>

<style lang="scss" scoped>
</style>
