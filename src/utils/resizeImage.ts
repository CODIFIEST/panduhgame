import { playerImage } from "../stores/playerImage";
// Set the Width and Height you want your resized image to be
var width = 38; 
var height = 48; 


var canvas = document.createElement('canvas');  // Dynamically Create a Canvas Element
canvas.width  = width;  // Set the width of the Canvas
canvas.height = height;  // Set the height of the Canvas
var ctx = canvas.getContext("2d");  // Get the "context" of the canvas 
var img = document.getElementById("myimage");  // The id of your image container
ctx.drawImage(img,0,0,width,height);  // Draw your image to the canvas


var jpegFile = canvas.toDataURL("image/jpeg"); // This will save your image as a 
                                               //jpeg file in the base64 format.