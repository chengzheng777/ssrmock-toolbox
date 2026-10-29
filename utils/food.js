/**
 * 随机食物：数据 + 抽取逻辑
 * 数据从原来的 pages/home/foot.js 迁移过来，单独放一层方便以后换数据源。
 */

export const FOOD_LIST = [
	{ id: 'noodle', name: '捞面', emoji: '🍜' },
	{ id: 'kfc', name: 'KFC', emoji: '🍗' },
	{ id: 'baozi', name: '包子', emoji: '🥟' },
	{ id: 'fish', name: '烤鱼', emoji: '🐟' },
	{ id: 'reganmian', name: '热干面', emoji: '🍝' },
	{ id: 'changfen', name: '肠粉', emoji: '🥢' },
	{ id: 'mifen', name: '湖南米粉', emoji: '🍲' },
	{ id: 'gaijiaofan', name: '盖浇饭', emoji: '🍚' },
	{ id: 'xiaomian', name: '重庆小面', emoji: '🌶️' }
]

export const FOOD_STORAGE_KEY = 'toolbox:food:last'
export const FOOD_COUNT_KEY = 'toolbox:food:count'

/**
 * 随机取一项，尽量避开上一次的结果，避免「连续两次都一样」的错觉
 * @param {Array} list 候选列表
 * @param {string} lastId 上一次的 id
 */
export function pickFood(list, lastId) {
	const source = list && list.length ? list : FOOD_LIST
	if (source.length === 1) return source[0]
	let next = source[Math.floor(Math.random() * source.length)]
	// 最多重试 10 次，避免极端情况下死循环
	for (let i = 0; i < 10 && next.id === lastId; i++) {
		next = source[Math.floor(Math.random() * source.length)]
	}
	return next
}
