import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import VideoList from './component/video_list/videoList';
import SearchHeader from './component/search_header/searchHeader';
import VideoDetail from './component/video_detail/videoDetail';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video)
  }
  const search = query => {
    youtube.search(query) //
    .then(videos => 
      setVideos(videos))
      setSelectedVideo(null);
  }


  useEffect(() => {
    youtube
        .mostPopular() //
        .then((videos) => setVideos(videos));
  },[])

  return (
      <div className={styles.app}>
          <SearchHeader onSearch={search} />
          <section className={styles.content}>
              {selectedVideo && <div className={styles.detail}>
                  <VideoDetail video={selectedVideo} />
              </div>}
              <div className={styles.list} >
                  <VideoList videos={videos} onVideoClick={selectVideo} display={ selectedVideo ? 'list' : 'grid'} />
              </div>
          </section>
      </div>
  );
}

export default App;
