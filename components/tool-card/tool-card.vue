<template>
	<view class="tool-card" :class="{ 'is-disabled': disabled }" @click="handleTap">
		<view class="tool-top">
			<view class="tool-icon" :style="{ backgroundColor: softAccent }">{{ icon }}</view>
			<text v-if="!disabled" class="tool-arrow">→</text>
		</view>

		<view class="tool-title">{{ title }}</view>
		<view class="tool-desc">{{ desc }}</view>

		<view v-if="tags && tags.length" class="tool-tags">
			<text v-for="tag in tags" :key="tag" class="tool-tag">{{ tag }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ToolCard',
		props: {
			icon: { type: String, default: '🔧' },
			title: { type: String, default: '' },
			desc: { type: String, default: '' },
			tags: { type: Array, default: () => [] },
			accent: { type: String, default: '#1296db' },
			disabled: { type: Boolean, default: false }
		},
		computed: {
			softAccent() {
				// 8 位十六进制自带透明度，省掉一层 rgba 计算
				return this.accent + '1f'
			}
		},
		methods: {
			handleTap() {
				if (this.disabled) return
				this.$emit('select')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tool-card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 20px;
		border: 1px solid $line;
		border-radius: $radius-lg;
		background-color: $bg;
		box-shadow: $shadow-1;
		transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
	}

	.tool-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.tool-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 13px;
		font-size: 22px;
	}

	.tool-arrow {
		font-size: 16px;
		color: $ink-3;
	}

	.tool-title {
		margin-top: 16px;
		font-size: 17px;
		font-weight: 700;
		color: $ink-1;
	}

	.tool-desc {
		margin-top: 6px;
		font-size: 13px;
		line-height: 1.7;
		color: $ink-2;
	}

	.tool-tags {
		display: flex;
		flex-wrap: wrap;
		margin-top: 14px;
	}

	.tool-tag {
		margin-right: 6px;
		margin-top: 6px;
		padding: 3px 9px;
		border-radius: 999px;
		background-color: $bg-soft;
		border: 1px solid $line-soft;
		font-size: 11px;
		color: $ink-3;
	}

	.tool-card.is-disabled {
		border-style: dashed;
		box-shadow: none;
		background-color: rgba(246, 249, 252, 0.6);
	}

	.tool-card.is-disabled .tool-title,
	.tool-card.is-disabled .tool-desc {
		color: $ink-3;
	}

	@media (min-width: 1024px) {
		.tool-card {
			padding: 26px;
		}

		.tool-title {
			font-size: 18px;
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.tool-card:not(.is-disabled) {
			cursor: pointer;
		}

		.tool-card:not(.is-disabled):hover {
			transform: translateY(-4px);
			border-color: rgba(18, 150, 219, 0.3);
			box-shadow: $shadow-2;
		}

		.tool-card:not(.is-disabled):hover .tool-arrow {
			color: $brand;
			transform: translateX(3px);
		}

		.tool-arrow {
			transition: transform 0.2s ease, color 0.2s ease;
		}
	}
</style>
