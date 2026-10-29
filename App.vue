<script>
	export default {
		onLaunch() {
			// 预留：启动时的全局初始化（主题、埋点、登录态等）
		},
		onShow() {},
		onHide() {}
	}
</script>

<style lang="scss">
	/* ==========================================================================
	 * 全局基础样式
	 * 只放跨页面复用的基础元素和原子类，页面自己的样式写在页面里。
	 * ========================================================================== */

	page {
		background-color: $bg;
		color: $ink-1;
		font-size: 14px;
		line-height: 1.6;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
			'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	view,
	text,
	image,
	input,
	textarea {
		box-sizing: border-box;
	}

	/* 页面外壳：负责最小高度和移动端底部导航留白 */
	.screen {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: $bg;
	}

	@media (max-width: 1023px) {
		.screen {
			padding-bottom: calc(54px + constant(safe-area-inset-bottom));
			padding-bottom: calc(54px + env(safe-area-inset-bottom));
		}
	}

	/* 内容容器：手机贴边留 20px，桌面居中 1180px */
	.container {
		width: 100%;
		max-width: 1180px;
		margin-left: auto;
		margin-right: auto;
		padding-left: 20px;
		padding-right: 20px;
	}

	@media (min-width: 768px) {
		.container {
			padding-left: 32px;
			padding-right: 32px;
		}
	}

	@media (min-width: 1024px) {
		.container {
			padding-left: 48px;
			padding-right: 48px;
		}
	}

	/* 区块 */
	.section {
		padding-top: 40px;
		padding-bottom: 40px;
	}

	.section--soft {
		background-color: $bg-soft;
		border-top: 1px solid $line-soft;
		border-bottom: 1px solid $line-soft;
	}

	@media (min-width: 1024px) {
		.section {
			padding-top: 80px;
			padding-bottom: 80px;
		}
	}

	.section-head {
		max-width: 620px;
		margin-bottom: 24px;
	}

	.section-eyebrow {
		display: block;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 2.4px;
		color: $brand;
	}

	.section-title {
		margin-top: 10px;
		font-size: 24px;
		font-weight: 700;
		line-height: 1.35;
		letter-spacing: -0.4px;
		color: $ink-1;
	}

	.section-desc {
		margin-top: 10px;
		font-size: 14px;
		line-height: 1.7;
		color: $ink-2;
	}

	@media (min-width: 1024px) {
		.section-title {
			font-size: 32px;
		}

		.section-desc {
			font-size: 15px;
		}
	}

	/* 页头：工作台 / 工具页 / 关于页共用 */
	.page-head {
		padding-top: 24px;
		padding-bottom: 24px;
		background: linear-gradient(180deg, #f4faff 0%, #ffffff 100%);
		border-bottom: 1px solid $line-soft;
	}

	@media (min-width: 1024px) {
		.page-head {
			padding-top: 44px;
			padding-bottom: 40px;
		}
	}

	.page-eyebrow {
		display: block;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 2.4px;
		color: $brand;
	}

	.page-title {
		margin-top: 8px;
		font-size: 26px;
		font-weight: 700;
		letter-spacing: -0.4px;
		line-height: 1.3;
	}

	.page-desc {
		margin-top: 8px;
		max-width: 640px;
		font-size: 14px;
		color: $ink-2;
	}

	@media (min-width: 1024px) {
		.page-title {
			font-size: 34px;
		}

		.page-desc {
			font-size: 15px;
		}
	}

	/* 面包屑 */
	.crumb {
		display: flex;
		align-items: center;
		margin-bottom: 14px;
		font-size: 13px;
		color: $ink-3;
	}

	.crumb-item {
		color: $ink-2;
	}

	.crumb-sep {
		margin-left: 8px;
		margin-right: 8px;
		color: $ink-3;
	}

	.crumb-cur {
		color: $brand-deep;
		font-weight: 600;
	}

	/* 按钮 */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 0 20px;
		border: 1px solid $line;
		border-radius: 999px;
		background-color: $bg;
		color: $ink-1;
		font-size: 14px;
		font-weight: 600;
		line-height: 1;
		transition: transform 0.18s ease, box-shadow 0.18s ease, color 0.18s ease, border-color 0.18s ease;
	}

	.btn--primary {
		color: #ffffff;
		border-color: transparent;
		background: $brand-gradient;
		box-shadow: 0 8px 18px rgba(18, 150, 219, 0.24);
	}

	.btn--ghost {
		background-color: rgba(255, 255, 255, 0.72);
	}

	.btn--lg {
		height: 46px;
		padding: 0 26px;
		font-size: 15px;
	}

	.btn--block {
		width: 100%;
	}

	@media (hover: hover) and (pointer: fine) {
		.btn {
			cursor: pointer;
		}

		.btn--primary:hover {
			transform: translateY(-1px);
			box-shadow: 0 12px 26px rgba(18, 150, 219, 0.32);
		}

		.btn--ghost:hover {
			color: $brand-deep;
			border-color: rgba(18, 150, 219, 0.5);
		}
	}

	/* 卡片 */
	.card {
		padding: 22px;
		border: 1px solid $line;
		border-radius: $radius-lg;
		background-color: $bg;
		box-shadow: $shadow-1;
	}

	@media (min-width: 1024px) {
		.card {
			padding: 28px;
		}
	}

	/* 高亮文字 */
	.hl {
		color: $brand-deep;
		background-image: linear-gradient(180deg, rgba(56, 189, 248, 0) 62%, rgba(56, 189, 248, 0.35) 62%);
		background-repeat: no-repeat;
	}

	.muted {
		color: $ink-3;
	}

	/* ========================= H5 专属 ========================= */
	/* #ifdef H5 */
	@media (hover: hover) and (pointer: fine) {
		.crumb-item {
			cursor: pointer;
		}
	}

	::selection {
		background-color: rgba(18, 150, 219, 0.18);
	}

	/* 桌面端滚动条：更细，贴近原生应用 */
	@media (min-width: 1024px) {
		::-webkit-scrollbar {
			width: 10px;
			height: 10px;
		}

		::-webkit-scrollbar-track {
			background-color: transparent;
		}

		::-webkit-scrollbar-thumb {
			border: 3px solid transparent;
			border-radius: 999px;
			background-color: rgba(15, 23, 42, 0.18);
			background-clip: content-box;
		}

		::-webkit-scrollbar-thumb:hover {
			background-color: rgba(15, 23, 42, 0.3);
		}
	}
	/* #endif */
</style>
