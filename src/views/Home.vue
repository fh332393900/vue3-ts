<template>
  <div class="home">
    321
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Home',
	setup() {
		const arr: Array<number | string> = []
		type Fn<T> = () => T
		interface TestIn {
			length: number;
		}
		function test <T extends TestIn> (num: T): T {
			return num
		}
		console.log(test([]))
		return {}
	}
});
</script>
