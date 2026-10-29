/**
 * 颜色工具集
 * 纯函数实现，不依赖任何平台 API，方便测试和复用。
 *
 * 支持解析：
 *   #RGB / #RGBA / #RRGGBB / #RRGGBBAA（# 可省略）
 *   rgb(r, g, b) / rgba(r, g, b, a)，分量支持百分比
 *   裸写：80, 247, 255
 */

const HEX_ONLY = /^#?[0-9a-f]+$/i
const FUNC_FORM = /^rgba?\s*\(([^()]*)\)$/i
const NUMERIC_FORM = /^[\d.%\s,]+$/
const VALID_HEX_LENGTH = [3, 4, 6, 8]

function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value))
}

function fail(message) {
	return { ok: false, error: message }
}

function success(color, source) {
	return { ok: true, color, source }
}

/** 颜色分量：支持 "128"、"128.6"、"50%" */
function toByte(raw) {
	const text = String(raw).trim()
	if (!text) return null
	const num = parseFloat(text)
	if (!isFinite(num)) return null
	const value = text.charAt(text.length - 1) === '%' ? (num / 100) * 255 : num
	return clamp(Math.round(value), 0, 255)
}

/** 透明度：支持 "0.5"、"50%" */
function toAlpha(raw) {
	const text = String(raw).trim()
	if (!text) return null
	const num = parseFloat(text)
	if (!isFinite(num)) return null
	const value = text.charAt(text.length - 1) === '%' ? num / 100 : num
	return clamp(value, 0, 1)
}

function parseComponents(parts) {
	if (parts.length !== 3 && parts.length !== 4) {
		return fail('需要 3 个颜色分量，可选第 4 个透明度')
	}
	const r = toByte(parts[0])
	const g = toByte(parts[1])
	const b = toByte(parts[2])
	if (r === null || g === null || b === null) {
		return fail('颜色分量必须是 0-255 的数字或百分比')
	}
	const a = parts.length === 4 ? toAlpha(parts[3]) : 1
	if (a === null) {
		return fail('透明度必须是 0-1 的数字或百分比')
	}
	return success({ r, g, b, a }, 'rgb')
}

function parseHex(text) {
	const raw = text.replace(/^#/, '')
	if (!HEX_ONLY.test('#' + raw) || VALID_HEX_LENGTH.indexOf(raw.length) === -1) {
		return fail('十六进制颜色需要 3、4、6 或 8 位，例如 #1296db')
	}
	const groups = raw.length <= 4
		? raw.split('').map((char) => char + char)
		: raw.match(/.{2}/g)
	const r = parseInt(groups[0], 16)
	const g = parseInt(groups[1], 16)
	const b = parseInt(groups[2], 16)
	const a = groups.length === 4 ? parseInt(groups[3], 16) / 255 : 1
	return success({ r, g, b, a }, 'hex')
}

/**
 * 解析用户输入的颜色
 * @returns {{ ok: true, color: {r,g,b,a}, source: string } | { ok: false, error: string }}
 */
export function parseColor(input) {
	const text = String(input === null || input === undefined ? '' : input).trim()
	if (!text) {
		return fail('请输入颜色值，例如 #1296db 或 rgb(18, 150, 219)')
	}

	const fn = text.match(FUNC_FORM)
	if (fn) {
		return parseComponents(fn[1].split(/[\s,/]+/).filter(Boolean))
	}

	if (HEX_ONLY.test(text)) {
		return parseHex(text)
	}

	if (NUMERIC_FORM.test(text) && text.indexOf(',') > -1) {
		return parseComponents(text.split(/[\s,/]+/).filter(Boolean))
	}

	return fail('无法识别的格式，试试 #1296db 或 rgb(18, 150, 219)')
}

function hexPair(value) {
	const text = clamp(Math.round(value), 0, 255).toString(16)
	return text.length < 2 ? '0' + text : text
}

/** 透明度文本：去掉多余的小数位 */
export function alphaText(alpha) {
	return String(Math.round(clamp(alpha, 0, 1) * 100) / 100)
}

/** 转 #RRGGBB / #RRGGBBAA（透明度 < 1 时自动补上 alpha） */
export function toHex(color) {
	const base = '#' + hexPair(color.r) + hexPair(color.g) + hexPair(color.b)
	const alpha = color.a
	return (alpha === undefined || alpha >= 1 ? base : base + hexPair(alpha * 255)).toUpperCase()
}

/** 转 rgb() / rgba() */
export function toRgbString(color) {
	const base = [color.r, color.g, color.b].map((v) => Math.round(v)).join(', ')
	if (color.a === undefined || color.a >= 1) {
		return 'rgb(' + base + ')'
	}
	return 'rgba(' + base + ', ' + alphaText(color.a) + ')'
}

/** 转 hsl() / hsla() */
export function toHslString(color) {
	const r = color.r / 255
	const g = color.g / 255
	const b = color.b / 255
	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	const delta = max - min
	const lightness = (max + min) / 2

	let hue = 0
	let saturation = 0
	if (delta !== 0) {
		saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)
		if (max === r) {
			hue = (g - b) / delta + (g < b ? 6 : 0)
		} else if (max === g) {
			hue = (b - r) / delta + 2
		} else {
			hue = (r - g) / delta + 4
		}
		hue *= 60
	}

	const head = Math.round(hue) + ', ' + Math.round(saturation * 100) + '%, ' + Math.round(lightness * 100) + '%'
	if (color.a === undefined || color.a >= 1) {
		return 'hsl(' + head + ')'
	}
	return 'hsla(' + head + ', ' + alphaText(color.a) + ')'
}

function luminanceChannel(value) {
	const channel = value / 255
	return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
}

/** 在指定底色上应该使用深色还是浅色文字 */
export function contrastColor(color) {
	const luminance = 0.2126 * luminanceChannel(color.r) +
		0.7152 * luminanceChannel(color.g) +
		0.0722 * luminanceChannel(color.b)
	return luminance > 0.45 ? '#0f172a' : '#ffffff'
}

/** 随机颜色，用于「随机一个」按钮 */
export function randomColor() {
	const byte = () => Math.floor(Math.random() * 256)
	return { r: byte(), g: byte(), b: byte(), a: 1 }
}
