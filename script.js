
function handleDownload() {
  const url = document.getElementById('url').value;
  if (url) {
      window.location.href = `Download.html?url=${encodeURIComponent(url)}`;
  } else {
      alert("Please enter a valid TikTok URL.");
  }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function displayVideoInfo() {
    const url = getUrlParameter('url');
    if (url) {
        const options = {
            method: 'GET',
            url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index',
            params: { url: url },
            headers: {
                'X-RapidAPI-Key': 'b9ab437e9amshd1177093a109ec5p19a1f3jsnbd62e18af13a',
                'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            if (response.data && response.data.video && response.data.video.length > 0) {
                const videoUrl = response.data.video[0];
                const coverUrl = response.data.cover || 'https://via.placeholder.com/300'; // Fallback cover image
                const videoTitle = response.data.desc || "TikTok Video"; // Ensure response contains 'desc' for title

                document.getElementById('video-title').innerText = videoTitle;
                document.getElementById('video-cover').src = coverUrl;
                document.getElementById('video-download-link').href = videoUrl;
            } else {
                alert("Failed to fetch video information. Please try again.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Failed to fetch video information. Please try again.");
        });
    } else {
        alert("No TikTok URL provided.");
    }
}

function downloadVideo() {
    const url = document.getElementById('video-download-link').href;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
        const blob = xhr.response;
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'TikYRSave{i}.mp4';
        a.click();
    };
    xhr.send();
}
