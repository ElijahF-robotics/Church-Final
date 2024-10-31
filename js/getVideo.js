const pageId = '149378955143983';
const videoContainer = document.getElementById('videoContainer');

// Function to pull the access token from the api
async function getPrivateKey() {
    const response = await fetch('http://127.0.0.1:5000/getPrivateKey', {
        mode: 'cors'
    });
    const data = await response.json();
    console.log("DATA", data);
    return data.private_key;
}

// Get the latest video and update the webpage
async function fetchLatestVideo() {
    // const accessToken = await getPrivateKey();
    const accessToken = 'EAAPXi3xX7dMBOZC7LwqRfZBPiNCgcy5924UE1nWKOyvN95Bv7r7HQ8R3BRwUeZBOt8evfGq20EDi5ssCWdpuZBHwS83swUVOvx1P0PDO4pxvk9Xj22U0i1iF6nYRYDJE6IQAozZB3q7AhuqyQDThZAZBbSf0BOMDFxJiDuWfSEZCNjkkshcPNcH23fFC7giv';

    try {
        const response = await fetch(`https://graph.facebook.com/v21.0/${pageId}/live_videos?access_token=${accessToken}&fields=embed_html,title,description&limit=1`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const video = data.data[0];
            const title = getTitle(video.title);
            const description = getDescription(video.title);

            videoContainer.innerHTML = `
                        <div class="video-title">${title || 'Latest Video'}</div>
                        <div class="video-embed">${video.embed_html}</div>
                        <div class="video-description">${description || ''}</div>
                    `;
        } else {
            videoContainer.innerHTML = '<p>No videos found.</p>';
        }
    } catch (error) {
        console.error('Error fetching Facebook video:', error);
        videoContainer.innerHTML = '<p>Error loading video. Please try again later.</p>';
    }
}

// Take the title and remove the CCLI
function getTitle(str) {
    const array = str.split(' ');
    var returnString = "";
    for(var i = 0; i < array.length; i++) {
        if (array[i] == "CCLI"){
            break;
        }
        returnString += array[i];
        returnString += " "
    }
    return returnString
}

// Get just the CCLI
function getDescription(str) {
    const array = str.split(' ');
    var reachedCCLI = false
    var returnString = "";
    for(var i = 0; i < array.length; i++) {
        if (reachedCCLI){
            returnString += array[i] + " ";
        } else if(array[i] == "CCLI"){
            reachedCCLI = true;
            returnString += "CCLI" + " "
        }
    }
    return returnString
}

fetchLatestVideo()