<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
  import { getPartsById } from './mongo.js';
  import { getImageUrl } from './storage.js';

  let id = '';
  let parts = null;
  let imageUrl = '';

  async function handleSubmit(event) {
    event.preventDefault();
    parts = await getPartsById(id);
    imageUrl = await getImageUrl(id);
  }
</script>

<main>
  <h1>Part Lookup</h1>
  <form on:submit={handleSubmit}>
    <label>
      ID:
      <input type="text" bind:value={id} />
    </label>
    <button type="submit">Search</button>
  </form>
  {#if parts}
    <h2>{id}</h2>
    <img src={imageUrl} alt={id} />
    <ul>
      {#each Object.values(parts) as part}
        <li>{part.partname}</li>
      {/each}
    </ul>
  {:else if id}
    <p>No parts found for ID {id}</p>
  {/if}
</main>

