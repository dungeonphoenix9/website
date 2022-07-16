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
    document.querySelector("#content").innerHTML += data.date;
    document.querySelector("#content").innerHTML += `<img src="${data.url}" class="main-img" /> <br/>`;
    document.querySelector("#content").innerHTML += data.explanation;
}