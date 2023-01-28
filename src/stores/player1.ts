import { writable } from "svelte/store";
import type { NFT } from "../domain/nft";
const player1 = writable<NFT>();
export default player1