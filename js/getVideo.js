
const pageId = 'YOUR_PAGE_ID';
const accessToken = 'YOUR_ACCESS_TOKEN';
const videoContainer = document.getElementById('videoContainer');

async function fetchLatestVideo() {
    try {
    const response = await fetch(`https://graph.facebook.com/v13.0/${pageId}/videos?access_token=${accessToken}&fields=embed_html,title,description&limit=1`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
    const video = data.data[0];
    videoContainer.innerHTML = `
                        <div class="video-title">${video.title || 'Latest Video'}</div>
                        <div class="video-embed">${video.embed_html}</div>
                        <div class="video-description">${video.description || ''}</div>
                    `;
} else {
    videoContainer.innerHTML = '<p>No videos found.</p>';
}
} catch (error) {
    console.error('Error fetching Facebook video:', error);
    videoContainer.innerHTML = '<p>Error loading video. Please try again later.</p>';
}
}

fetchLatestVideo();
