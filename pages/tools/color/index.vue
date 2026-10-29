<template>
	<view class="screen">
		<app-nav active="workbench" />

		<view class="page-head">
			<view class="container">
				<view class="crumb">
					<text class="crumb-item" @click="goPage('workbench')">工作台</text>
					<text class="crumb-sep">/</text>
					<text class="crumb-cur">颜色转换</text>
				</view>
				<view class="page-title">颜色转换</view>
				<view class="page-desc">HEX 与 RGB 双向互转，顺带给出 HSL 和透明度；输入即出结果，不用点按钮。</view>
			</view>
		</view>

		<view class="section">
			<view class="container">
				<view class="panel">
					<!-- 左：输入 -->
					<view class="card panel-col">
						<view class="field">
							<view class="field-head">
								<text class="field-label">颜色值</text>
								<text class="field-hint">#1296db / rgb(18, 150, 219) / 18,150,219</text>
							</view>
							<view class="field-box" :class="{ 'is-error': showError }">
								<input
									v-model="input"
									class="field-input"
									placeholder="输入或粘贴一个颜色"
									placeholder-class="field-placeholder"
								/>
								<text v-if="input" class="field-clear" @click="input = ''">清空</text>
							</view>
							<view class="field-status" :class="statusClass">{{ statusText }}</view>
						</view>

						<view class="field">
							<view class="field-head">
								<text class="field-label">常用颜色</text>
								<text class="field-hint">点一下填入</text>
							</view>
							<view class="swatches">
								<view
									v-for="item in presets"
									:key="item.value"
									class="swatch-item"
									@click="fill(item.value)"
								>
									<view class="swatch" :style="{ backgroundColor: item.value }" />
									<text class="swatch-name">{{ item.name }}</text>
								</view>
							</view>
						</view>

						<view class="field">
							<view class="field-head">
								<text class="field-label">试一试</text>
							</view>
							<view class="chips">
								<text
									v-for="sample in samples"
									:key="sample"
									class="chip"
									@click="fill(sample)"
								>{{ sample }}</text>
							</view>
						</view>

						<view class="actions">
							<view class="btn" @click="fillRandom">随机一个颜色</view>
						</view>
					</view>

					<!-- 右：预览与结果 -->
					<view class="card panel-col">
						<view class="preview" :class="{ 'is-empty': !canPreview }" :style="previewStyle">
							<text class="preview-value" :style="previewInkStyle">{{ previewText }}</text>
						</view>

						<view class="results">
							<view v-for="row in resultRows" :key="row.key" class="result-row">
								<text class="result-label">{{ row.label }}</text>
								<text class="result-value">{{ row.value || '—' }}</text>
								<text v-if="row.value && row.copyable" class="result-copy" @click="copy(row.value)">复制</text>
							</view>
						</view>
					</view>
				</view>

				<view class="note">
					<view class="note-title">能认哪些写法</view>
					<view class="note-text">
						#RGB、#RGBA、#RRGGBB、#RRGGBBAA（# 可以省略）；rgb() 和 rgba()，分量支持百分比，透明度和空格、大小写都不敏感。
						超出范围的值会自动收进 0-255。
					</view>
				</view>
			</view>
		</view>

		<app-tabbar active="workbench" />
	</view>
</template>

<script>
	import { goPage, copyText } from '@/utils/nav.js'
	import { parseColor, toHex, toRgbString, toHslString, contrastColor, randomColor } from '@/utils/color.js'
	import AppNav from '@/components/app-nav/app-nav.vue'
	import AppTabbar from '@/components/app-tabbar/app-tabbar.vue'

	export default {
		components: { AppNav, AppTabbar },
		data() {
			return {
				input: 'rgb(80, 247, 255)',
				presets: [
					{ name: '品牌蓝', value: '#1296db' },
					{ name: '青色', value: '#50f7ff' },
					{ name: '珊瑚', value: '#ff6384' },
					{ name: '琥珀', value: '#f59e0b' },
					{ name: '石墨', value: '#0f172a' },
					{ name: '半透明', value: 'rgba(18, 150, 219, 0.35)' }
				],
				samples: ['#1296db', '#fff', 'rgb(255, 99, 132)', 'rgba(15, 23, 42, 0.6)', '255, 99, 132']
			}
		},
		computed: {
			isEmpty() {
				return !String(this.input || '').trim()
			},
			parsed() {
				return parseColor(this.input)
			},
			showError() {
				return !this.isEmpty && !this.parsed.ok
			},
			statusClass() {
				if (this.isEmpty) return 'is-idle'
				return this.parsed.ok ? 'is-ok' : 'is-error'
			},
			statusText() {
				if (this.isEmpty) return '填入颜色后会自动转换'
				if (!this.parsed.ok) return this.parsed.error
				return this.parsed.source === 'hex' ? '已识别为十六进制颜色' : '已识别为 RGB 颜色'
			},
			canPreview() {
				return this.parsed.ok
			},
			previewStyle() {
				if (!this.canPreview) return {}
				return { backgroundColor: toRgbString(this.parsed.color) }
			},
			previewInkStyle() {
				if (!this.canPreview) return { color: '#98a2b3' }
				return { color: contrastColor(this.parsed.color) }
			},
			previewText() {
				if (!this.canPreview) return '无法预览'
				return toHex(this.parsed.color)
			},
			resultRows() {
				if (!this.canPreview) {
					return [
						{ key: 'hex', label: 'HEX', value: '', copyable: true },
						{ key: 'rgb', label: 'RGB', value: '', copyable: true },
						{ key: 'hsl', label: 'HSL', value: '', copyable: true },
						{ key: 'alpha', label: '透明度', value: '', copyable: false }
					]
				}
				const color = this.parsed.color
				return [
					{ key: 'hex', label: 'HEX', value: toHex(color), copyable: true },
					{ key: 'rgb', label: 'RGB', value: toRgbString(color), copyable: true },
					{ key: 'hsl', label: 'HSL', value: toHslString(color), copyable: true },
					{ key: 'alpha', label: '透明度', value: Math.round(color.a * 100) + '%', copyable: false }
				]
			}
		},
		methods: {
			goPage,
			fill(value) {
				this.input = value
			},
			fillRandom() {
				this.input = toHex(randomColor())
			},
			copy(value) {
				copyText(value, '已复制 ' + value)
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

	/* ---------------- 输入列 ---------------- */
	.field + .field {
		margin-top: 22px;
	}

	.field-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 9px;
	}

	.field-label {
		font-size: 13px;
		font-weight: 700;
		color: $ink-1;
	}

	.field-hint {
		font-size: 11px;
		color: $ink-3;
	}

	.field-box {
		display: flex;
		align-items: center;
		height: 46px;
		padding: 0 12px;
		border: 1px solid $line;
		border-radius: 12px;
		background-color: $bg-soft;
		transition: border-color 0.18s ease, background-color 0.18s ease;
	}

	.field-box.is-error {
		border-color: rgba(221, 82, 77, 0.55);
		background-color: #fff7f7;
	}

	.field-input {
		flex: 1;
		height: 44px;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 15px;
		color: $ink-1;
	}

	.field-placeholder {
		font-size: 13px;
		color: $ink-3;
	}

	.field-clear {
		padding-left: 10px;
		font-size: 12px;
		color: $ink-3;
	}

	.field-status {
		margin-top: 7px;
		font-size: 12px;
		line-height: 1.6;
	}

	.field-status.is-idle {
		color: $ink-3;
	}

	.field-status.is-ok {
		color: #0f9d58;
	}

	.field-status.is-error {
		color: #dd524d;
	}

	.swatches {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-gap: 8px;
	}

	.swatch-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.swatch {
		width: 100%;
		height: 34px;
		border: 1px solid rgba(15, 23, 42, 0.08);
		border-radius: 10px;
	}

	.swatch-name {
		margin-top: 5px;
		font-size: 10px;
		line-height: 1.4;
		color: $ink-3;
		text-align: center;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
	}

	.chip {
		margin-right: 8px;
		margin-bottom: 8px;
		padding: 6px 10px;
		border: 1px solid $line;
		border-radius: 8px;
		background-color: $bg-soft;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 12px;
		color: $ink-2;
	}

	.actions {
		margin-top: 22px;
	}

	/* ---------------- 预览与结果 ---------------- */
	.preview {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 140px;
		border-radius: 16px;
		overflow: hidden;
	}

	.preview.is-empty {
		background-image: repeating-linear-gradient(
			45deg,
			#f1f5f9 0,
			#f1f5f9 10px,
			#e8eef6 10px,
			#e8eef6 20px
		);
	}

	.preview-value {
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 20px;
		font-weight: 700;
		letter-spacing: 1.2px;
	}

	.results {
		margin-top: 10px;
	}

	.result-row {
		display: flex;
		align-items: center;
		padding: 11px 0;
		border-bottom: 1px solid $line-soft;
	}

	.result-row:last-child {
		border-bottom: none;
	}

	.result-label {
		flex: 0 0 54px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.8px;
		color: $ink-3;
	}

	.result-value {
		flex: 1;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 13px;
		color: $ink-1;
		word-break: break-all;
	}

	.result-copy {
		margin-left: 8px;
		padding: 4px 10px;
		border: 1px solid $line;
		border-radius: 999px;
		font-size: 11px;
		color: $ink-2;
	}

	/* ---------------- 说明 ---------------- */
	.note {
		margin-top: 18px;
		padding: 14px 16px;
		border: 1px dashed $line;
		border-radius: 14px;
		background-color: $bg-soft;
	}

	.note-title {
		font-size: 12px;
		font-weight: 700;
		color: $ink-1;
	}

	.note-text {
		margin-top: 5px;
		font-size: 12px;
		line-height: 1.75;
		color: $ink-2;
	}

	@media (min-width: 1024px) {
		.panel {
			grid-template-columns: 400px 1fr;
			grid-gap: 24px;
		}

		.preview {
			height: 210px;
		}

		.preview-value {
			font-size: 26px;
		}

		.result-row {
			padding: 13px 0;
		}

		.result-value {
			font-size: 14px;
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.swatch-item,
		.chip,
		.result-copy,
		.field-clear {
			cursor: pointer;
		}

		.chip:hover,
		.result-copy:hover {
			border-color: rgba(18, 150, 219, 0.45);
			color: $brand-deep;
		}

		.swatch:hover {
			transform: scale(1.06);
		}

		.swatch {
			transition: transform 0.18s ease;
		}
	}
</style>
