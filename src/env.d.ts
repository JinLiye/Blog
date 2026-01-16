/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

// Work around occasional `astro check` typing issues with Svelte 5 components + hydration directives.
// This keeps runtime behavior unchanged while preventing false-positive type errors.
declare module "*.svelte" {
	const Component: any;
	export default Component;
}
