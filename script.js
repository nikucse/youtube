const url = 'https://api.freeapi.app/api/v1/public/youtube/videos';
const options = { method: 'GET', headers: { accept: 'application/json' } };

let data = [];
document.addEventListener('DOMContentLoaded', () => {
  fetchVideos();
});

async function fetchVideos() {
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    data = responseData.data.data;
    displayVideos(responseData.data.data);
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

function displayVideos(data) {
  const videoList = document.getElementById('videoList');
  videoList.innerHTML = '';
  data.forEach((items) => {
    const { snippet, id } = items.items;
    const { title, description } = snippet;

    const videoElement = document.createElement('div');
    videoElement.className =
      'bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-gray-200';

    videoElement.innerHTML = `
      <div class="flex flex-col items-center justify-center p-4 gap-4">
        <h1 class="text-lg font-bold text-center">${title}</h1>
        <img src="${snippet.thumbnails.medium.url}" alt="${title}" class="w-full h-48 object-cover" />
        <p class="text-gray-600 text-center">${description}</p>
      </div>
    `;

    videoElement.addEventListener('click', () => {
      window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
    });

    videoList.appendChild(videoElement);
  });
}

function searchVideos() {
  const inputValue = document
    .getElementById('search')
    .value.toLowerCase()
    .trim();

  const searchItems = data.filter((items) => {
    const title = items.items.snippet.title.toLowerCase();
    return title.includes(inputValue);
  });

  displayVideos(searchItems);
}
