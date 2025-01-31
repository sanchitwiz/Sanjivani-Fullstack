async function searchYouTube(query) {
    try {
        const yt = await import('youtube-search-without-api-key');
        const videos = await yt.search(query);
        const limitedVideos = videos.slice(0, 2).map(video => ({
            title: video.title,
            url: video.url
        }));
        
        console.log(limitedVideos);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
    }
}

searchYouTube('burn first aid');
