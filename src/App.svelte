<script lang="ts">
    import Game from './components/Game.svelte';

  import DisplayNfTs from "./components/DisplayNFTs.svelte";
  import Hero from "./components/Hero.svelte";
  // import Navbar from "./components/Navbar.svelte";
  import { account } from "./stores/account";
    import { playerImage } from './stores/playerImage';

</script>

<!-- <Navbar/> -->
{#if $account && !$playerImage}
<!-- {console.log("front page ", $account)} -->
<DisplayNfTs />
{:else if $playerImage}
<Game/>
{:else}
<Hero />
{/if}

<style>
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>