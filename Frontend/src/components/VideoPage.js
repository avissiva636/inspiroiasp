import YoutubeEmbed from "./YoutubeEmbed";
import { useInspiroCrud } from "./context/InspiroContext";

const VideoPage = () => {
  const { Video } = useInspiroCrud();
  return (
    <div>
      <h1>Video Gallery</h1>
      <div>
        {Video.map((video, index) => (
          <div key={index}>
            <YoutubeEmbed embedId={video.embedId} />
            <p>{video.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VideoPage;
