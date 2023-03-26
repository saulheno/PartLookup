<script>
  import Result from './Result.svelte'
  import Home from './Home.svelte';
  import Search from './Search.svelte';
  import { getPartsById } from "./mongo.js";
  import {getPartsSearch} from "./mongo.js";
  import { getImageUrl } from "./storage.js";

  let id = "";
  let searchTerm = "";
  let parts = null;
  let imageUrl = "";
  let searchID = "";
  let data = null;

  async function handleSubmit(event) {
    event.preventDefault();
    parts = null;
    imageUrl = "";
    console.log(searchTerm);
    data = await getPartsSearch(searchTerm);
    
  }

  async function handleImgClick(img_id) {
    parts = null;
    imageUrl = "";
    id = img_id;
    parts = await getPartsById(id);
    console.log(parts)
    if (parts === null) {
      parts = "None";
      searchID = id;
    } else {
      imageUrl = await getImageUrl(id);
    }
  }

  async function handleClick(event) {
    event.preventDefault();
    searchTerm = "";  
    data = null;
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
          <input type="text" bind:value={searchTerm} />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  </div>
  <Home {parts} {handleImgClick} {data}/>
  <Search {parts} {handleImgClick} {data}/>
  <Result {parts} {imageUrl} {id} {searchID}/>
</main>
