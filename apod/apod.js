function contentLoader() {
    sendApiReq();
}

async function sendApiReq() {
    let res = await fetch('https://api.nasa.gov/planetary/apod?api_key=LO6kQ6p7PbYP8Q2OBHcmqsH7WYqdZL6RAvB5SN10');
    let data = await res.json();
    useApiData(data);
}

function useApiData(data) {
    document.querySelector("#title").innerHTML += data.title;
    document.querySelector("#date").innerHTML += data.date;
    let url = data.url
    document.querySelector("#content").innerHTML += `<img src="${url}" class="main-img" /> <br/>`;
    document.querySelector("#content").innerHTML += data.explanation;
}

function getAverageRGB(url) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = url.naturalHeight || url.offsetHeight || url.height;
    width = canvas.width = url.naturalWidth || url.offsetWidth || url.width;

    context.drawImage(url, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;



}