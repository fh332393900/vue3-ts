<template>
  <el-breadcrumb class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="index == levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <a v-else>{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: "Breadcrumb",
	setup() {
		// 路由层级
		const levelList = ref([]);
		const $route = useRoute();
		const $router = useRouter();
		watch(
			() => $route.path,
			() => {
				getBreadcrumb();
			}
		);
		/**
     * 判断第一个路由信息是不是首页
     * @author fenghang
     * @param {Object} route
     * @version v1
     */
		const isDashboard = (route) => {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim() === "工作台";
    }
		/**
     * 获取面包屑的路由信息
     * @author fenghang
     * @version v1
     */
		const getBreadcrumb = () => {
			let matched = $route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];
      //如果第一个路由信息不是首页，就添加一个
      if (!isDashboard(first)) {
        matched = [
          {
            path: "/dashboard",
            meta: {
              title: "工作台",
            },
          },
        ].concat(matched);
      }
      levelList.value = matched.filter((item) => item.meta && item.meta.title);
		}
		/**
     *  点击面包屑跳转
     * @author fenghang
     * @param {Object} item 要跳转的路由
     * @version v1
     */
		const handleLink = (item) => {
      const { redirect, path } = item;
      //如果是当前页面就不作跳转
      if (redirect !== $route.path) {
        if (redirect) {
          $router.push(redirect);
          return;
        }
        $router.push(path);
      }
    }
		getBreadcrumb();
		return {
			levelList,
			isDashboard,
			getBreadcrumb,
			handleLink
		};
	}
});
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}

// 面包屑的过渡动画
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
