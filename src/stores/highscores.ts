import { writable } from "svelte/store";
import type HighScore from "../domain/highscore";
const highscores = writable<HighScore>();
export default highscores