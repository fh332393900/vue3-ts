<template>
	<div class="sidebar-logo-container" >
		<transition name="sidebarLogoFade">
			<router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
				<!-- <h1 class="sidebar-title">{{ title }} </h1> -->
			</router-link>
			<router-link v-else key="expand" class="sidebar-logo-link" to="/">
				<img v-if="logo" :src="logo" class="sidebar-logo">
				<h1 class="sidebar-title">{{ title }} </h1>
			</router-link>
		</transition>
	</div>
</template>
<script>
import { ref } from 'vue'
export default {
	name: 'SidebarLogo',//菜单栏logo图标
	props: {
		//菜单是否伸缩
		collapse: {
			type: Boolean,
			required: true
		}
	},
	setup(props) {
		const title = ref('111')
		const logo = ref('')
		return {
			title,
			logo
		}
	}
}
</script>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      height: 42px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>