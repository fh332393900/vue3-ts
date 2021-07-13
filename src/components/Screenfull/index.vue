<template>
  <div>
    <i class="el-icon-full-screen" @click="toggle" />
  </div>
</template>

<script>
import { useFullscreen } from '@vueuse/core';
import { defineComponent } from "vue";
export default defineComponent({
  name: "Screenfull", //全屏按钮组件
  setup(props) {
    const { toggle, isFullscreen } = useFullscreen();
		return {
			isFullscreen,
			toggle,
		};
  }
});
</script>
