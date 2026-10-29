/**
 * uni-app 的 vue-loader 会直接 require('@vue/component-compiler-utils') 并用它编译模板，
 * 但 npm 装出来的是 Vue 官方 3.3.0，缺少 uni-app 依赖的 recyclableRender/components 输出，
 * 编译时会报 “Export 'recyclableRender' is not defined”。
 *
 * 这里把 uni-app 自带的修订版（3.1.0）覆盖到 node_modules/@vue/component-compiler-utils。
 * npm install 后会自动执行（postinstall），也可以手动：npm run patch
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const target = path.join(root, 'node_modules', '@vue', 'component-compiler-utils')
const patched = path.join(root, 'node_modules', '@dcloudio', 'vue-cli-plugin-uni', 'packages', '@vue', 'component-compiler-utils')

function readVersion (dir) {
	try {
		return JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version
	} catch (e) {
		return ''
	}
}

if (!fs.existsSync(patched)) {
	console.log('[patch] 找不到 uni-app 自带的 component-compiler-utils，跳过')
	process.exit(0)
}

const version = readVersion(target)
if (version === '3.1.0') {
	console.log('[patch] @vue/component-compiler-utils 已是 uni-app 修订版 3.1.0')
	process.exit(0)
}

if (!fs.existsSync(target)) {
	console.log('[patch] 尚未安装依赖，跳过（安装完成后会自动重试）')
	process.exit(0)
}

const backup = target + '.orig'
if (!fs.existsSync(backup)) {
	fs.renameSync(target, backup)
} else {
	fs.rmSync(target, { recursive: true, force: true })
}
fs.mkdirSync(target, { recursive: true })
fs.cpSync(patched, target, { recursive: true })

console.log(`[patch] @vue/component-compiler-utils ${version || '(未知)'} -> 3.1.0（原版本备份在 ${path.basename(backup)}）`)
