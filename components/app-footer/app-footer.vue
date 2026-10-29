<template>
	<view class="footer">
		<view class="container">
			<view class="footer-grid">
				<view class="footer-brand">
					<view class="footer-brand-line">
						<view class="footer-mark">柒</view>
						<text class="footer-name">柒的工具箱</text>
					</view>
					<view class="footer-desc">一个轻量的前端小工具箱，用 uni-app 写成，H5 / 小程序 / App 共用一套代码。</view>
				</view>

				<view v-for="col in cols" :key="col.title" class="footer-col">
					<view class="footer-col-title">{{ col.title }}</view>
					<text
						v-for="link in col.links"
						:key="link.key"
						class="footer-link"
						@click="goPage(link.key)"
					>{{ link.text }}</text>
				</view>
			</view>

			<view class="footer-bottom">
				<text class="footer-copy">© {{ year }} 柒的工具箱</text>
				<text class="footer-tech">Built with uni-app + Vue 2</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { goPage } from '@/utils/nav.js'

	export default {
		name: 'AppFooter',
		data() {
			return {
				cols: [
					{
						title: '页面',
						links: [
							{ key: 'home', text: '首页' },
							{ key: 'workbench', text: '工作台' },
							{ key: 'mine', text: '关于项目' }
						]
					},
					{
						title: '工具',
						links: [
							{ key: 'color', text: '颜色转换' },
							{ key: 'food', text: '随机吃什么' }
						]
					}
				]
			}
		},
		computed: {
			year() {
				return new Date().getFullYear()
			}
		},
		methods: {
			goPage
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		margin-top: auto;
		padding-top: 40px;
		padding-bottom: 28px;
		background-color: #0b1220;
		color: rgba(255, 255, 255, 0.66);
	}

	.footer-grid {
		display: flex;
		flex-direction: column;
	}

	.footer-brand {
		max-width: 340px;
	}

	.footer-brand-line {
		display: flex;
		align-items: center;
	}

	.footer-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: $brand-gradient;
		color: #ffffff;
		font-size: 15px;
		font-weight: 700;
	}

	.footer-name {
		margin-left: 10px;
		font-size: 15px;
		font-weight: 600;
		color: #ffffff;
	}

	.footer-desc {
		margin-top: 12px;
		font-size: 13px;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.52);
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		margin-top: 28px;
	}

	.footer-col-title {
		margin-bottom: 10px;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 1px;
		color: rgba(255, 255, 255, 0.38);
	}

	.footer-link {
		padding: 4px 0;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.7);
	}

	.footer-bottom {
		display: flex;
		flex-direction: column;
		margin-top: 32px;
		padding-top: 18px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		font-size: 12px;
		color: rgba(255, 255, 255, 0.4);
	}

	.footer-tech {
		margin-top: 4px;
	}

	@media (min-width: 768px) {
		.footer-grid {
			flex-direction: row;
			justify-content: space-between;
		}

		.footer-brand {
			flex: 1;
		}

		.footer-col {
			min-width: 140px;
			margin-top: 0;
			margin-left: 40px;
		}

		.footer-bottom {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.footer-tech {
			margin-top: 0;
		}
	}

	@media (min-width: 1024px) {
		.footer {
			padding-top: 64px;
			padding-bottom: 36px;
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.footer-link {
			transition: color 0.18s ease;
		}

		.footer-link:hover {
			color: #ffffff;
			cursor: pointer;
		}
	}
</style>
