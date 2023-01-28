<script lang="ts">
    import { playerImage } from "../stores/playerImage";

import player1 from "../stores/player1";

    let originalImageUrl: string = $playerImage;
let resizedImage: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('resized-image');
let newWidth: number = 38; // desired width of the resized image
let newHeight: number = 48; // desired height of the resized image

let originalImage: HTMLImageElement = new Image();
originalImage.src = originalImageUrl;

originalImage.onload = function() {
    resizedImage.width = newWidth;
    resizedImage.height = newHeight;
    let ctx: CanvasRenderingContext2D = resizedImage.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
}   

let dataURL:string = resizedImage.toDataURL();
playerImage.set(dataURL);
console.log($playerImage)

</script>