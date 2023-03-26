<script>
import { getImageUrl } from "./storage.js";
  import { getParts } from "./mongo.js";
  import { onMount } from "svelte";
 
  export let handleImgClick;
  export let parts;
  export let data;

  let url = "";




  const setURL = async (img_id) => {
    url = await getImageUrl(img_id);
    return url;
  };
</script>

{#if data != null && parts == null || parts == "None" }
  <div class="thumbnails">
    {#each Object.keys(data) as img_id}
      <div class="container">
        {#await setURL(img_id) then url}
          <img src={url} alt={img_id} on:click={handleImgClick(img_id)}  />
        {:catch error}
          <div>Error: {error.message}</div>
        {/await}
        <div class="caption">{img_id + " " + data[img_id]}</div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .thumbnails {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: vw(100);
    margin: 0 auto;
  }

  .container {
    position: relative;
    width: calc(100% / 6);
    margin-bottom: 10px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  img:hover {
  cursor: pointer;
  }

  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 18px;
    padding: 10px;
    box-sizing: border-box;
  }
  /* Media queries for mobile devices */
  @media (max-width: 600px) {
    .thumbnails {
      flex-direction: column;
    }

    .container {
      width: 100%;
    }

    .caption {
      font-size: 14px;
    }
  }

  </style>