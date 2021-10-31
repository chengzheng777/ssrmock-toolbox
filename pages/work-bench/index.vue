<template>
	<view class="home-container">
		<view class="">
			<input v-model="rgbValue" />
			<button @click="sumbit()">开启转换</button>
			<text class="">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rgbValue: 'rgb(80, 247, 255)',
				title: '初始空白',
			}
		},
		onLoad() {},
		methods: {
			// 点击按钮
			sumbit() {
				this.title = this.colorHex(this.rgbValue);
			},
			// rgb 转 16
			colorHex(value) {
				// 16进制颜色的正则表达式
				const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
				// 开始匹配 
				if (/^(rgb|RGB)/.test(value)) { // 查找是否包含rgb字段
					let strHex = "#"; // 初始目标值
					let colorArr = value.replace(/(?:\(|\)|rgb|RGB)/g, "").split(","); // 先删除 括号+rgb 再转成数组
					for (const item of colorArr) {
						let hex = Number(item).toString(16); // 转成 16 进制
						hex = hex.length < 2 ? `0${hex}` : hex; // 判断只有1位的情况
						strHex += hex; // 累加
					};
					console.log('打印', strHex)
					return strHex;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
	}
</style>
