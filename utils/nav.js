/**
 * 统一路由表与跳转方法
 * 页面路径只在这里写一次，组件和页面都从这里引用。
 */

export const PAGE = {
	home: '/pages/home/index',
	workbench: '/pages/work-bench/index',
	color: '/pages/tools/color/index',
	food: '/pages/tools/food/index',
	mine: '/pages/mine/index'
}

const MAIN_PAGES = ['home', 'workbench', 'mine']

function currentRoute() {
	if (typeof getCurrentPages !== 'function') return ''
	const pages = getCurrentPages()
	if (!pages || !pages.length) return ''
	const page = pages[pages.length - 1]
	return page.route ? '/' + page.route : ''
}

/**
 * 跳到某个页面
 * 主页面之间用 reLaunch（清空栈，和底部导航的行为一致），工具页用 navigateTo（保留返回）
 * @param {string} key PAGE 中的键
 */
export function goPage(key) {
	const url = PAGE[key]
	if (!url) return
	if (currentRoute() === url) return

	if (MAIN_PAGES.indexOf(key) > -1) {
		uni.reLaunch({ url })
		return
	}

	uni.navigateTo({
		url,
		fail: () => uni.reLaunch({ url })
	})
}

/**
 * 返回上一页；没有上一页时（例如直接打开工具链接）回到工作台
 * @param {string} fallbackKey 兜底页面
 */
export function goBack(fallbackKey) {
	const pages = typeof getCurrentPages === 'function' ? getCurrentPages() : []
	if (pages && pages.length > 1) {
		uni.navigateBack({ delta: 1 })
		return
	}
	uni.reLaunch({ url: PAGE[fallbackKey] || PAGE.home })
}

/** 复制文本并给出提示 */
export function copyText(text, tips) {
	if (!text) return
	uni.setClipboardData({
		data: String(text),
		success: () => {
			uni.showToast({ title: tips || '已复制', icon: 'none' })
		},
		fail: () => {
			uni.showToast({ title: '复制失败，请手动选择', icon: 'none' })
		}
	})
}
