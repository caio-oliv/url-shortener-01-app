<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { TextInputTransform, useFieldState, useForm } from 'vue-typed-form';
import { type CreateShortUrlData } from '@/service/ShortUrl';
import { zodFormAdapter } from '@/validation/ZodHelper';
import { CreateShortUrlSchema } from '@/validation/ShortUrl';
import ShortUrlEntry from '@/component/ShortUrlEntry.vue';
import TextInput from '@/component/form/TextInput.vue';
import VButton from '@/component/form/VButton.vue';
import Typography from '@/style/typography.module.css';
import { useShortUrlHistory } from '@/composable/useShortUrlHistory';

const urlHistory = useShortUrlHistory();

const formApi = useForm<CreateShortUrlData>({
	initialValues: { expires: null },
	submit: async (data) => {
		const result = await urlHistory.createUrl(data);

		switch (result.type) {
			case 'SUCCESS': {
				formApi.reset({ expires: null, long_url: '' });
				break;
			}
			case 'CONFLICT': {
				alert('Short URL already exists');
			}
		}
	},
	validateOnBlur: false,
	validate: zodFormAdapter(CreateShortUrlSchema),
});

const longUrl = useFieldState({
	formApi,
	name: 'long_url',
	transformer: TextInputTransform,
});
</script>

<template>
	<main :class="$style.page_container">
		<h1 :class="[Typography.heading1, $style.page_title]">URL Shortener</h1>

		<form :class="$style.form_container" @submit.prevent="formApi.submit">
			<TextInput
				label="URL"
				variant="contained"
				size="large"
				fullwidth
				inputmode="url"
				placeholder="https://example.com/your-long-url"
				v-bind="longUrl.prop"
				v-on="longUrl.event"
			/>
			<VButton type="submit" variant="contained" size="large" fullwidth>
				Create
			</VButton>
		</form>

		<div :class="$style.text_container">
			<p :class="$style.page_description">
				Make trackable short URL. Use this tool to shorten links from any origin and use it in all places that you may wanna share.
			</p>
		</div>

		<div :class="$style.shortened_url_list_container">
			<h4 :class="Typography.heading4">URLs</h4>
			<p>Your shortened URLs</p>

			<ul>
				<li v-for="shortUrl in urlHistory.urls" :key="shortUrl.slug" :class="$style.shortened_url_item">
					<ShortUrlEntry :short-url="shortUrl" />
				</li>
			</ul>
		</div>
	</main>
</template>

<style module>
.page_container {
	display: flex;
	flex-flow: column nowrap;
	gap: calc(var(--spacing-unit) * 4);
}

.page_title {
	align-self: center;
}

.page_description {
	align-self: center;
	width: 100%;
}

.form_container {
	display: flex;
	flex-flow: column nowrap;
	align-self: center;
	gap: calc(var(--spacing-unit) * 1.5);
	width: 100%;
}

.text_container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: calc(var(--spacing-unit) * 1.5);
	width: 100%;
}

.shortened_url_list_container {
	display: flex;
	flex-flow: column nowrap;
	gap: calc(var(--spacing-unit) * 2);
}

.shortened_url_item {
	display: block;
}
</style>
