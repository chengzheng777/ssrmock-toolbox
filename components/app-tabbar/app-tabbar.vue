<template>
	<view class="tabbar">
		<view
			v-for="item in tabs"
			:key="item.key"
			class="tab"
			:class="{ 'is-active': item.key === active }"
			@click="goPage(item.key)"
		>
			<image
				class="tab-icon"
				:src="item.key === active ? item.iconOn : item.iconOff"
				mode="aspectFit"
			/>
			<text class="tab-text">{{ item.text }}</text>
		</view>
	</view>
</template>

<script>
	import { goPage } from '@/utils/nav.js'

	export default {
		name: 'AppTabbar',
		props: {
			active: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				tabs: [
					{
						key: 'home',
						text: '首页',
						iconOff: '/static/img/tabber/tabber_home_off.png',
						iconOn: '/static/img/tabber/tabber_home_on.png'
					},
					{
						key: 'workbench',
						text: '工作台',
						iconOff: '/static/img/tabber/tabber_work_off.png',
						iconOn: '/static/img/tabber/tabber_work_on.png'
					},
					{
						key: 'mine',
						text: '关于',
						iconOff: '/static/img/tabber/tabber_mine_off.png',
						iconOn: '/static/img/tabber/tabber_mine_on.png'
					}
				]
			}
		},
		methods: {
			goPage
		}
	}
</script>

<style lang="scss" scoped>
	/* 只在手机/平板上出现；桌面端由顶部导航接管 */
	.tabbar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 95;
		display: flex;
		align-items: center;
		height: 54px;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: rgba(255, 255, 255, 0.94);
		border-top: 1px solid $line;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.tab {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 54px;
		color: $ink-3;
	}

	.tab-icon {
		width: 20px;
		height: 20px;
		opacity: 0.72;
	}

	.tab-text {
		margin-top: 2px;
		font-size: 10px;
		line-height: 1.4;
	}

	.tab.is-active {
		color: $brand-deep;
	}

	.tab.is-active .tab-icon {
		opacity: 1;
	}

	@media (min-width: 1024px) {
		.tabbar {
			display: none;
		}
	}
</style>
