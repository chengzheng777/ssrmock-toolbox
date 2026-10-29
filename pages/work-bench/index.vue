<template>
	<view class="screen">
		<app-nav active="workbench" />

		<view class="page-head">
			<view class="container">
				<text class="page-eyebrow">WORKBENCH</text>
				<view class="page-title">工作台</view>
				<view class="page-desc">常用的小工具都收在这里，点开就能用，不需要注册，也不需要下载。</view>
			</view>
		</view>

		<view class="section">
			<view class="container">
				<view class="tool-grid">
					<tool-card
						v-for="tool in tools"
						:key="tool.key"
						:icon="tool.icon"
						:title="tool.title"
						:desc="tool.desc"
						:tags="tool.tags"
						:accent="tool.accent"
						@select="goPage(tool.key)"
					/>
					<tool-card
						icon="＋"
						title="更多工具"
						desc="时间戳、单位换算、URL 编解码……想到哪个加哪个。"
						:tags="['规划中']"
						accent="#98a2b3"
						disabled
					/>
				</view>
			</view>
		</view>

		<view class="section section--soft">
			<view class="container">
				<view class="section-head">
					<text class="section-eyebrow">TIPS</text>
					<view class="section-title">使用小贴士</view>
				</view>

				<view class="tip-grid">
					<view v-for="tip in tips" :key="tip.title" class="tip">
						<view class="tip-title">{{ tip.title }}</view>
						<view class="tip-desc">{{ tip.desc }}</view>
					</view>
				</view>
			</view>
		</view>

		<app-footer />
		<app-tabbar active="workbench" />
	</view>
</template>

<script>
	import { goPage } from '@/utils/nav.js'
	import AppNav from '@/components/app-nav/app-nav.vue'
	import AppTabbar from '@/components/app-tabbar/app-tabbar.vue'
	import AppFooter from '@/components/app-footer/app-footer.vue'
	import ToolCard from '@/components/tool-card/tool-card.vue'

	export default {
		components: { AppNav, AppTabbar, AppFooter, ToolCard },
		data() {
			return {
				tools: [
					{
						key: 'color',
						icon: '🎨',
						title: '颜色转换',
						desc: 'HEX、RGB、RGBA、HSL 互相转换，输入即出结果，点一下就能复制。',
						tags: ['#hex', 'rgb', 'hsl'],
						accent: '#1296db'
					},
					{
						key: 'food',
						icon: '🍜',
						title: '随机吃什么',
						desc: '选择困难的时候，从常吃的九个选项里替你拍一个决定。',
						tags: ['随机', '决策'],
						accent: '#f59e0b'
					}
				],
				tips: [
					{
						title: '输入即转换',
						desc: '颜色工具没有「转换」按钮，边输入边出结果，输错了会直接告诉你哪里不对。'
					},
					{
						title: '结果一键复制',
						desc: '结果每一行右侧都有「复制」，HEX、RGB、HSL 直接进剪贴板。'
					},
					{
						title: '桌面自动分栏',
						desc: '浏览器宽度到 1024px 时，工具页会自动变成左右分栏，手机上则是单列布局。'
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
	.tool-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 14px;
	}

	.tip-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 14px;
	}

	.tip {
		padding: 20px;
		border: 1px solid $line;
		border-radius: $radius;
		background-color: #ffffff;
	}

	.tip-title {
		font-size: 15px;
		font-weight: 700;
		color: $ink-1;
	}

	.tip-desc {
		margin-top: 6px;
		font-size: 13px;
		line-height: 1.7;
		color: $ink-2;
	}

	@media (min-width: 768px) {
		.tool-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 18px;
		}

		.tip-grid {
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 18px;
		}
	}

	@media (min-width: 1024px) {
		.tool-grid {
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 22px;
		}

		.tip {
			padding: 24px;
		}
	}
</style>
