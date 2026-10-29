<template>
	<view class="screen">
		<app-nav active="home" />

		<!-- ================= 首屏 ================= -->
		<view class="hero">
			<view class="hero-glow hero-glow--a" />
			<view class="hero-glow hero-glow--b" />

			<view class="container hero-inner">
				<view class="hero-copy">
					<view class="hero-badge">
						<view class="hero-badge-dot" />
						<text class="hero-badge-text">轻量 · 免登录 · 全端可用</text>
					</view>

					<view class="hero-title">
						把琐碎的小事，收进<text class="hero-title-tail">一个<text class="hl">顺手的工具箱</text></text>
					</view>

					<view class="hero-sub">
						颜色转换、随机决策这些几分钟的小活，以前每次都要重新翻工具。现在收在一起，打开就能用；桌面浏览器打开，还是官网的样子。
					</view>

					<view class="hero-actions">
						<view class="btn btn--primary btn--lg" @click="goPage('workbench')">开始使用</view>
						<view class="btn btn--ghost btn--lg" @click="scrollToTools">浏览工具</view>
					</view>

					<view class="hero-tags">
						<text class="hero-tag">uni-app</text>
						<text class="hero-tag">Vue 2</text>
						<text class="hero-tag">响应式</text>
						<text class="hero-tag">H5 / 小程序 / App</text>
					</view>
				</view>

				<view class="hero-visual">
					<view class="mock">
						<view class="mock-head">
							<view class="mock-dots">
								<view class="mock-dot" />
								<view class="mock-dot" />
								<view class="mock-dot" />
							</view>
							<text class="mock-title">颜色转换</text>
						</view>
						<view class="mock-body">
							<view class="mock-row">
								<text class="mock-label">HEX</text>
								<text class="mock-value">#50F7FF</text>
							</view>
							<view class="mock-arrow">↓</view>
							<view class="mock-row">
								<text class="mock-label">RGB</text>
								<text class="mock-value">rgb(80, 247, 255)</text>
							</view>
							<view class="mock-color" style="background-color: #50f7ff;">
								<text class="mock-color-text">#50F7FF</text>
							</view>
						</view>
					</view>
					<view class="hero-chip hero-chip--1">🍜 今天吃什么？</view>
					<view class="hero-chip hero-chip--2">⚡ 打开即用</view>
				</view>
			</view>
		</view>

		<!-- ================= 工具 ================= -->
		<view id="tools" class="section">
			<view class="container">
				<view class="section-head">
					<text class="section-eyebrow">TOOLS</text>
					<view class="section-title">现在能用的工具</view>
					<view class="section-desc">每个工具只做一件事，不做多余的选择。</view>
				</view>

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
						desc="下一个正在路上：时间戳、单位换算、二维码……想用什么就加什么。"
						:tags="['规划中']"
						accent="#98a2b3"
						disabled
					/>
				</view>
			</view>
		</view>

		<!-- ================= 特性 ================= -->
		<view class="section section--soft">
			<view class="container">
				<view class="section-head">
					<text class="section-eyebrow">WHY</text>
					<view class="section-title">为什么是这个工具箱</view>
				</view>

				<view class="feature-grid">
					<view v-for="(item, index) in features" :key="item.title" class="feature">
						<text class="feature-index">0{{ index + 1 }}</text>
						<view class="feature-title">{{ item.title }}</view>
						<view class="feature-desc">{{ item.desc }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- ================= 行动号召 ================= -->
		<view class="section">
			<view class="container">
				<view class="cta">
					<view class="cta-copy">
						<view class="cta-title">从一个颜色开始</view>
						<view class="cta-desc">输入 #1296db 或 rgb(18, 150, 219)，立刻得到另一种写法。</view>
					</view>
					<view class="btn btn--primary btn--lg" @click="goPage('color')">打开颜色转换</view>
				</view>
			</view>
		</view>

		<app-footer />
		<app-tabbar active="home" />
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
				features: [
					{
						title: '双向解析',
						desc: 'HEX 与 RGB 互相转换，#RGB、#RRGGBB、rgba()、百分比和透明度都能认。'
					},
					{
						title: '一屏两端',
						desc: '浏览器宽度到 1024px 自动切换成官网式布局，手机上还是熟悉的 App 手势。'
					},
					{
						title: '加工具很轻',
						desc: '一个页面 + 一条路由 + 一张卡片，就能往里塞下一个新工具。'
					}
				]
			}
		},
		methods: {
			goPage,
			scrollToTools() {
				uni.pageScrollTo({
					selector: '#tools',
					duration: 300,
					fail: () => {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* ---------------- 首屏 ---------------- */
	.hero {
		position: relative;
		overflow: hidden;
		padding-top: 32px;
		padding-bottom: 44px;
		background: linear-gradient(180deg, #f1f9ff 0%, #ffffff 92%);
	}

	.hero-glow {
		position: absolute;
		border-radius: 50%;
		pointer-events: none;
	}

	.hero-glow--a {
		top: -120px;
		right: -80px;
		width: 340px;
		height: 340px;
		background: radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(56, 189, 248, 0) 68%);
	}

	.hero-glow--b {
		bottom: -120px;
		left: -100px;
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(18, 150, 219, 0.26) 0%, rgba(18, 150, 219, 0) 70%);
	}

	.hero-inner {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		align-self: flex-start;
		padding: 5px 12px;
		border: 1px solid rgba(18, 150, 219, 0.18);
		border-radius: 999px;
		background-color: rgba(255, 255, 255, 0.8);
	}

	.hero-title .hl {
		/* 高亮短语整体换行，避免被拆成两半 */
		white-space: nowrap;
	}

	.hero-title-tail {
		/* 「一个顺手的工具箱」不拆开，避免「个」被单独留在上一行 */
		white-space: nowrap;
	}

	.hero-badge-dot {
		width: 6px;
		height: 6px;
		margin-right: 7px;
		border-radius: 50%;
		background-color: #22c55e;
	}

	.hero-badge-text {
		font-size: 12px;
		font-weight: 600;
		color: $brand-deep;
	}

	.hero-title {
		margin-top: 18px;
		font-size: 28px;
		font-weight: 800;
		line-height: 1.4;
		letter-spacing: -0.6px;
		color: $ink-1;
	}

	.hero-sub {
		margin-top: 14px;
		max-width: 520px;
		font-size: 15px;
		line-height: 1.75;
		color: $ink-2;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		margin-top: 26px;
	}

	.hero-actions .btn {
		margin-right: 12px;
		margin-bottom: 10px;
	}

	.hero-tags {
		display: flex;
		flex-wrap: wrap;
		margin-top: 18px;
	}

	.hero-tag {
		margin-right: 8px;
		margin-bottom: 8px;
		padding: 4px 10px;
		border: 1px solid $line;
		border-radius: 7px;
		background-color: rgba(255, 255, 255, 0.72);
		font-size: 12px;
		color: $ink-2;
	}

	.hero-visual {
		position: relative;
		margin-top: 34px;
	}

	.mock {
		padding: 16px;
		border: 1px solid $line;
		border-radius: 20px;
		background-color: #ffffff;
		box-shadow: $shadow-3;
		transform: rotate(-1.4deg);
	}

	.mock-head {
		display: flex;
		align-items: center;
		padding-bottom: 12px;
		border-bottom: 1px solid $line-soft;
	}

	.mock-dots {
		display: flex;
	}

	.mock-dot {
		width: 8px;
		height: 8px;
		margin-right: 6px;
		border-radius: 50%;
		background-color: #e2e8f0;
	}

	.mock-title {
		margin-left: auto;
		font-size: 12px;
		color: $ink-3;
	}

	.mock-body {
		padding-top: 14px;
	}

	.mock-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 12px;
		border: 1px solid $line-soft;
		border-radius: 11px;
		background-color: $bg-soft;
	}

	.mock-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 1px;
		color: $ink-3;
	}

	.mock-value {
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 13px;
		color: $ink-1;
	}

	.mock-arrow {
		margin-top: 8px;
		margin-bottom: 8px;
		text-align: center;
		font-size: 14px;
		color: $brand;
	}

	.mock-color {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 72px;
		margin-top: 14px;
		border-radius: 12px;
	}

	.mock-color-text {
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 1px;
		color: #0f172a;
	}

	.hero-chip {
		display: none;
	}

	@media (min-width: 1024px) {
		.hero {
			padding-top: 76px;
			padding-bottom: 96px;
		}

		.hero-inner {
			flex-direction: row;
			align-items: center;
		}

		.hero-copy {
			flex: 1;
			padding-right: 40px;
		}

		.hero-title {
			max-width: 560px;
			font-size: 46px;
			line-height: 1.22;
			letter-spacing: -1.2px;
		}

		.hero-sub {
			font-size: 16px;
		}

		.hero-visual {
			flex: 0 0 46%;
			max-width: 500px;
			margin-top: 0;
		}

		.mock {
			padding: 20px;
			transform: rotate(-2deg);
		}

		.hero-chip {
			position: absolute;
			display: flex;
			align-items: center;
			padding: 8px 14px;
			border: 1px solid $line;
			border-radius: 999px;
			background-color: #ffffff;
			box-shadow: $shadow-2;
			font-size: 12px;
			color: $ink-2;
			white-space: nowrap;
		}

		.hero-chip--1 {
			top: -20px;
			left: -26px;
		}

		.hero-chip--2 {
			right: -26px;
			bottom: 30px;
		}
	}

	/* ---------------- 工具 ---------------- */
	.tool-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 14px;
	}

	@media (min-width: 768px) {
		.tool-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 18px;
		}
	}

	@media (min-width: 1024px) {
		.tool-grid {
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 22px;
		}
	}

	/* ---------------- 特性 ---------------- */
	.feature-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 14px;
	}

	.feature {
		padding: 20px;
		border: 1px solid $line;
		border-radius: $radius;
		background-color: #ffffff;
	}

	.feature-index {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 1.5px;
		color: $brand;
	}

	.feature-title {
		margin-top: 10px;
		font-size: 16px;
		font-weight: 700;
		color: $ink-1;
	}

	.feature-desc {
		margin-top: 6px;
		font-size: 13px;
		line-height: 1.7;
		color: $ink-2;
	}

	@media (min-width: 768px) {
		.feature-grid {
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 18px;
		}

		.feature {
			padding: 24px;
		}
	}

	/* ---------------- 行动号召 ---------------- */
	.cta {
		display: flex;
		flex-direction: column;
		padding: 28px;
		border-radius: 24px;
		background: linear-gradient(120deg, #0b1220 0%, #123a5a 58%, #0b7fb8 100%);
		color: #ffffff;
	}

	.cta-title {
		font-size: 22px;
		font-weight: 700;
	}

	.cta-desc {
		margin-top: 8px;
		max-width: 460px;
		font-size: 14px;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.72);
	}

	.cta .btn {
		align-self: flex-start;
		margin-top: 22px;
	}

	@media (min-width: 768px) {
		.cta {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 36px 40px;
		}

		.cta .btn {
			margin-top: 0;
			margin-left: 24px;
		}
	}
</style>
