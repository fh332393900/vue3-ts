import { createStore } from 'vuex';
import getters from './getters';


const modulesFiles = require.context('./modules', true, /\.js$/);
console.log(require.context('./modules', true, /\.js$/));
//引入modules中的文件
const modules = modulesFiles.keys().reduce((modules: any, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});

export default createStore({
	modules,
	getters
});