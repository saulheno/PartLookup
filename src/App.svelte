<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Result from './lib/Result.svelte'
  import { getPartsById } from "./mongo.js";
  import { getImageUrl } from "./storage.js";
  import { each, loop_guard } from "svelte/internal";

  let id = "";
  let parts = null;
  let imageUrl = "";
  let searchID = "";

  async function handleSubmit(event) {
    event.preventDefault();
    parts = null;
    imageUrl = "";
    parts = await getPartsById(id);
    if (parts === null) {
      parts = "None"
      searchID = id
    } else {
      imageUrl = await getImageUrl(id);
    }
    
  }

  async function handleClick(event) {
    event.preventDefault();
    id = "";
    parts = null;
    imageUrl = "";
  }
</script>

<main>
  <div id="surround">
    <div id="Header">
      <h1 on:click={handleClick}>Part Lookup</h1>
    </div>
    <div id="search">
      <form on:submit={handleSubmit}>
        <label>
          ID:
          <input type="text" bind:value={id} />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  </div>
  <Result {parts} {imageUrl} {id} {searchID}/>
</main>
