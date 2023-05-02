function addGrain(num) {
    loadPixels()

    for (let i = 0; i < (width * pixelDensity()) * (height * pixelDensity()) * 4; i += 4) {
        let noise = map(fxrand(), 0, 1, -num, num)
        pixels[i] = pixels[i] + noise
        pixels[i + 1] = pixels[i + 1] + noise
        pixels[i + 2] = pixels[i + 2] + noise
        pixels[i + 3] = pixels[i + 3] + noise
    }

    updatePixels()
}

function keyPressed(){
  if(key === 's')
    save('geo petals.jpg');
  // else if(key === 'f'){
  //   fxpreview();
  // }
}

function load() {
    window.$fxhashFeatures = {
        "Bg": bgP,
        "Palette Name": p.name,
    }
}