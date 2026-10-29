<template>
	<view class="screen">
		<app-nav active="workbench" />

		<view class="page-head">
			<view class="container">
				<view class="crumb">
					<text class="crumb-item" @click="goPage('workbench')">工作台</text>
					<text class="crumb-sep">/</text>
					<text class="crumb-cur">随机吃什么</text>
				</view>
				<view class="page-title">随机吃什么</view>
				<view class="page-desc">把「随便」交给运气，从常吃的九个选项里替你拍一个决定。</view>
			</view>
		</view>

		<view class="section">
			<view class="container">
				<view class="panel">
					<view class="card stage">
						<text class="stage-label">今天吃</text>

						<view class="stage-value" :class="{ 'is-rolling': rolling }">
							<text class="stage-emoji">{{ currentEmoji }}</text>
							<text class="stage-name">{{ displayName }}</text>
						</view>

						<view class="stage-actions">
							<view class="btn btn--primary btn--lg" :class="{ 'is-busy': rolling }" @click="roll">
								{{ buttonText }}
							</view>
						</view>

						<text class="stage-meta">共 {{ foods.length }} 种 · 已选 {{ count }} 次</text>
					</view>

					<view class="card list-card">
						<view class="list-head">
							<text class="list-title">全部选项</text>
							<text class="list-hint">下一次不会重复上一次</text>
						</view>

						<view class="food-grid">
							<view
								v-for="item in foods"
								:key="item.id"
								class="food-item"
								:class="{ 'is-active': current && item.id === current.id }"
							>
								<text class="food-emoji">{{ item.emoji }}</text>
								<text class="food-name">{{ item.name }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<app-tabbar active="workbench" />
	</view>
</template>

<script>
	import { goPage } from '@/utils/nav.js'
	import { FOOD_LIST, FOOD_STORAGE_KEY, FOOD_COUNT_KEY, pickFood } from '@/utils/food.js'
	import AppNav from '@/components/app-nav/app-nav.vue'
	import AppTabbar from '@/components/app-tabbar/app-tabbar.vue'

	export default {
		components: { AppNav, AppTabbar },
		data() {
			return {
				foods: FOOD_LIST,
				current: null,
				rollingName: '',
				rolling: false,
				lastId: '',
				count: 0,
				rollTimer: null,
				settleTimer: null
			}
		},
		computed: {
			displayName() {
				if (this.rolling) return this.rollingName || '…'
				return this.current ? this.current.name : '？'
			},
			currentEmoji() {
				if (this.rolling) return '🎲'
				return this.current ? this.current.emoji : '🍽️'
			},
			buttonText() {
				if (this.rolling) return '挑选中…'
				return this.current ? '再选一次' : '帮我选一个'
			}
		},
		onLoad() {
			try {
				const lastId = uni.getStorageSync(FOOD_STORAGE_KEY)
				const count = uni.getStorageSync(FOOD_COUNT_KEY)
				if (lastId) {
					this.lastId = lastId
					this.current = this.foods.filter((item) => item.id === lastId)[0] || null
				}
				if (count) this.count = Number(count) || 0
			} catch (e) {
				// 存储不可用时忽略，不影响选择功能
			}
		},
		onUnload() {
			this.clearTimers()
		},
		beforeDestroy() {
			this.clearTimers()
		},
		methods: {
			goPage,
			roll() {
				if (this.rolling) return

				this.rolling = true
				this.rollTimer = setInterval(() => {
					const food = this.foods[Math.floor(Math.random() * this.foods.length)]
					this.rollingName = food.name
				}, 70)

				this.settleTimer = setTimeout(() => {
					this.clearTimers()
					const next = pickFood(this.foods, this.lastId)
					this.current = next
					this.lastId = next.id
					this.rollingName = ''
					this.rolling = false
					this.count += 1
					this.persist()
				}, 720)
			},
			clearTimers() {
				if (this.rollTimer) {
					clearInterval(this.rollTimer)
					this.rollTimer = null
				}
				if (this.settleTimer) {
					clearTimeout(this.settleTimer)
					this.settleTimer = null
				}
			},
			persist() {
				try {
					uni.setStorageSync(FOOD_STORAGE_KEY, this.lastId)
					uni.setStorageSync(FOOD_COUNT_KEY, this.count)
				} catch (e) {
					// 存储失败不影响本次结果
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.panel {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 16px;
		align-items: start;
	}

	/* ---------------- 结果 ---------------- */
	.stage {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30px;
		padding-bottom: 26px;
		text-align: center;
		background: linear-gradient(180deg, #f4faff 0%, #ffffff 72%);
	}

	.stage-label {
		font-size: 12px;
		letter-spacing: 2px;
		color: $ink-3;
	}

	.stage-value {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10px;
		min-height: 96px;
	}

	.stage-emoji {
		font-size: 34px;
		line-height: 1.4;
	}

	.stage-name {
		margin-top: 4px;
		font-size: 30px;
		font-weight: 800;
		letter-spacing: -0.5px;
		color: $ink-1;
	}

	.stage-value.is-rolling .stage-name {
		opacity: 0.55;
	}

	.stage-actions {
		display: flex;
		margin-top: 18px;
	}

	.btn.is-busy {
		opacity: 0.75;
	}

	.stage-meta {
		margin-top: 14px;
		font-size: 12px;
		color: $ink-3;
	}

	/* ---------------- 选项列表 ---------------- */
	.list-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
	}

	.list-title {
		font-size: 14px;
		font-weight: 700;
		color: $ink-1;
	}

	.list-hint {
		font-size: 11px;
		color: $ink-3;
	}

	.food-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 10px;
		margin-top: 14px;
	}

	.food-item {
		display: flex;
		align-items: center;
		padding: 10px 12px;
		border: 1px solid $line-soft;
		border-radius: 12px;
		background-color: $bg-soft;
	}

	.food-item.is-active {
		border-color: rgba(18, 150, 219, 0.45);
		background-color: $brand-soft;
	}

	.food-emoji {
		margin-right: 8px;
		font-size: 16px;
	}

	.food-name {
		font-size: 13px;
		color: $ink-2;
	}

	.food-item.is-active .food-name {
		font-weight: 700;
		color: $brand-deep;
	}

	@media (min-width: 768px) {
		.food-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.panel {
			grid-template-columns: 1fr 1fr;
			grid-gap: 24px;
		}

		.stage {
			padding-top: 52px;
			padding-bottom: 46px;
		}

		.stage-value {
			min-height: 130px;
		}

		.stage-emoji {
			font-size: 44px;
		}

		.stage-name {
			font-size: 44px;
		}

		.food-grid {
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 12px;
		}
	}
</style>
