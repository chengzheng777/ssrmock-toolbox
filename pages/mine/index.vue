<template>
	<view class="screen">
		<app-nav active="mine" />

		<view class="page-head">
			<view class="container">
				<text class="page-eyebrow">ABOUT</text>
				<view class="page-title">关于这个工具箱</view>
				<view class="page-desc">一个自己用的小工具集合：解决具体的小问题，代码也保持能看懂的样子。</view>
			</view>
		</view>

		<view class="section">
			<view class="container about-grid">
				<view class="card">
					<view class="card-title">项目信息</view>
					<view class="info-list">
						<view v-for="item in infos" :key="item.label" class="info-row">
							<text class="info-label">{{ item.label }}</text>
							<text class="info-value">{{ item.value }}</text>
						</view>
					</view>
					<view class="card-actions">
						<view class="btn btn--primary" @click="openRepo">查看仓库</view>
						<view class="btn" @click="clearLocal">清空本地记录</view>
					</view>
				</view>

				<view class="card">
					<view class="card-title">更新日志</view>
					<view v-for="log in logs" :key="log.version" class="log">
						<view class="log-head">
							<text class="log-version">{{ log.version }}</text>
							<text class="log-date">{{ log.date }}</text>
						</view>
						<view v-for="line in log.items" :key="line" class="log-line">· {{ line }}</view>
					</view>
				</view>
			</view>
		</view>

		<app-footer />
		<app-tabbar active="mine" />
	</view>
</template>

<script>
	import { copyText } from '@/utils/nav.js'
	import { FOOD_STORAGE_KEY, FOOD_COUNT_KEY } from '@/utils/food.js'
	import AppNav from '@/components/app-nav/app-nav.vue'
	import AppTabbar from '@/components/app-tabbar/app-tabbar.vue'
	import AppFooter from '@/components/app-footer/app-footer.vue'

	const REPO_URL = 'https://github.com/chengzheng777/ssrmock-toolbox'

	export default {
		components: { AppNav, AppTabbar, AppFooter },
		data() {
			return {
				infos: [
					{ label: '版本', value: 'v1.1.0' },
					{ label: '技术栈', value: 'uni-app · Vue 2 · SCSS' },
					{ label: '支持平台', value: 'H5 · 微信小程序 · App' },
					{ label: '仓库', value: 'github.com/chengzheng777/ssrmock-toolbox' }
				],
				logs: [
					{
						version: 'v1.1.0',
						date: '当前版本',
						items: [
							'首页改成官网式落地页，桌面端自动切换 PC 布局',
							'颜色转换支持双向解析、透明度、HSL 与一键复制',
							'随机食物真正实现随机，并记住上一次的结果',
							'补齐工作台与关于页，统一顶部导航、底部导航和页脚'
						]
					},
					{
						version: 'v1.0.0',
						date: '初版',
						items: ['搭好 uni-app 骨架和三个 tab 页面', '实现 rgb 转十六进制的初版']
					}
				]
			}
		},
		methods: {
			openRepo() {
				// #ifdef H5
				window.open(REPO_URL, '_blank')
				// #endif
				// #ifndef H5
				copyText(REPO_URL, '仓库地址已复制')
				// #endif
			},
			clearLocal() {
				try {
					uni.removeStorageSync(FOOD_STORAGE_KEY)
					uni.removeStorageSync(FOOD_COUNT_KEY)
					uni.showToast({ title: '本地记录已清空', icon: 'none' })
				} catch (e) {
					uni.showToast({ title: '清空失败', icon: 'none' })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 16px;
	}

	.card-title {
		font-size: 16px;
		font-weight: 700;
		color: $ink-1;
	}

	.info-list {
		margin-top: 14px;
	}

	.info-row {
		display: flex;
		align-items: flex-start;
		padding-top: 11px;
		padding-bottom: 11px;
		border-bottom: 1px solid $line-soft;
	}

	.info-row:last-child {
		border-bottom: none;
	}

	.info-label {
		flex: 0 0 72px;
		font-size: 13px;
		color: $ink-3;
	}

	.info-value {
		flex: 1;
		font-size: 13px;
		color: $ink-1;
		word-break: break-all;
	}

	.card-actions {
		display: flex;
		flex-wrap: wrap;
		margin-top: 18px;
	}

	.card-actions .btn {
		margin-right: 10px;
		margin-bottom: 10px;
	}

	.log {
		padding-top: 16px;
	}

	.log + .log {
		margin-top: 14px;
		border-top: 1px solid $line-soft;
	}

	.log-head {
		display: flex;
		align-items: baseline;
	}

	.log-version {
		font-size: 14px;
		font-weight: 700;
		color: $brand-deep;
	}

	.log-date {
		margin-left: 8px;
		font-size: 12px;
		color: $ink-3;
	}

	.log-line {
		margin-top: 6px;
		font-size: 13px;
		line-height: 1.7;
		color: $ink-2;
	}

	@media (min-width: 1024px) {
		.about-grid {
			grid-template-columns: 1fr 1fr;
			grid-gap: 20px;
			align-items: start;
		}
	}
</style>
