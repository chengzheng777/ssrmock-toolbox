<template>
	<view class="nav">
		<view class="nav-inner container">
			<view class="brand" @click="goPage('home')">
				<view class="brand-mark">柒</view>
				<view class="brand-copy">
					<text class="brand-name">柒的工具箱</text>
					<text class="brand-en">QI TOOLBOX</text>
				</view>
			</view>

			<view class="nav-menu">
				<text
					v-for="item in menus"
					:key="item.key"
					class="nav-link"
					:class="{ 'is-active': item.key === active }"
					@click="goPage(item.key)"
				>{{ item.text }}</text>
			</view>

			<view class="nav-actions">
				<text class="nav-cta" @click="goPage('workbench')">开始使用</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { goPage } from '@/utils/nav.js'

	export default {
		name: 'AppNav',
		props: {
			// 当前高亮的菜单：home / workbench / mine
			active: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				menus: [
					{ key: 'home', text: '首页' },
					{ key: 'workbench', text: '工作台' },
					{ key: 'mine', text: '关于' }
				]
			}
		},
		methods: {
			goPage
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		position: sticky;
		top: 0;
		z-index: 90;
		padding-top: var(--status-bar-height, 0px);
		background-color: rgba(255, 255, 255, 0.86);
		border-bottom: 1px solid rgba(230, 234, 240, 0.9);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 58px;
	}

	.brand {
		display: flex;
		align-items: center;
	}

	.brand-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 9px;
		background: $brand-gradient;
		color: #ffffff;
		font-size: 16px;
		font-weight: 700;
		box-shadow: 0 4px 10px rgba(18, 150, 219, 0.28);
	}

	.brand-copy {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.brand-name {
		font-size: 15px;
		font-weight: 700;
		line-height: 1.2;
		color: $ink-1;
	}

	.brand-en {
		font-size: 9px;
		line-height: 1.5;
		letter-spacing: 1.4px;
		color: $ink-3;
	}

	.nav-menu {
		display: none;
		align-items: center;
	}

	.nav-link {
		padding: 8px 14px;
		border-radius: 999px;
		font-size: 14px;
		color: $ink-2;
		transition: color 0.18s ease, background-color 0.18s ease;
	}

	.nav-link.is-active {
		color: $brand-deep;
		font-weight: 600;
		background-color: $brand-soft;
	}

	.nav-actions {
		display: flex;
		align-items: center;
	}

	.nav-cta {
		padding: 8px 16px;
		border-radius: 999px;
		background: $brand-gradient;
		color: #ffffff;
		font-size: 13px;
		font-weight: 600;
		box-shadow: 0 6px 14px rgba(18, 150, 219, 0.22);
	}

	/* 小程序右上角有胶囊按钮，避免和「开始使用」打架，小屏上直接不显示这个按钮 */
	/* #ifdef MP */
	.nav-cta {
		display: none;
	}
	/* #endif */

	@media (min-width: 768px) {
		.nav-menu {
			display: flex;
		}
	}

	@media (min-width: 1024px) {
		.nav-inner {
			height: 76px;
		}

		.nav-link {
			font-size: 15px;
		}

		.nav-cta {
			padding: 10px 20px;
			font-size: 14px;
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.nav-link:hover {
			color: $brand-deep;
			background-color: rgba(232, 246, 253, 0.7);
		}

		.brand,
		.nav-cta {
			cursor: pointer;
		}
	}
</style>
