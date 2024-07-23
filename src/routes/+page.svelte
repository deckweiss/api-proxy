<script lang="ts">
    function loadData() {
        fetch('/api/v1/locations');
    }
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={loadData}>Load data</button>
