<script setup lang="ts">
import { AppPath } from '@/config/router';
import TypographyStyle from '@/style/typography.module.css';
</script>

<template>
	<main :class="$style.main_content">
		<h1 :class="TypographyStyle.heading3">
			The page you are looking for was not found
		</h1>
		<p>
			Back to 
			<router-link :to="AppPath.Main">main page</router-link>.
		</p>
	</main>
</template>

<style module>
.main_content {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	margin: calc(var(--spacing-unit) * 4);
	gap: calc(var(--spacing-unit) * 2);
}
</style>
