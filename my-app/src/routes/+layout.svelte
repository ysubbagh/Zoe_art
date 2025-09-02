<script lang="ts">
	import '../app.css';
	import NavBar from '../lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<svelte>
	<NavBar />
</svelte>

{@render children?.()}