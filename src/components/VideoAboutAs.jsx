import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const isYouTubeUrl = (url) =>
  url && (url.includes("youtube.com") || url.includes("youtu.be"));

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  // Already an embed URL
  if (url.includes("youtube.com/embed")) return url;
  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^?&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  return url;
};

export const VideoAboutAs = ({ videoSrc, posterImage, title }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const isYoutube = isYouTubeUrl(videoSrc);

  const handlePlayVideo = () => {
    if (isYoutube) {
      setIsPlaying(true);
    } else {
      const video = document.getElementById("about-video");
      if (video) {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="relative group overflow-hidden rounded-3xl h-[400px]">
        {isYoutube ? (
          isPlaying ? (
            <iframe
              src={`${getYouTubeEmbedUrl(videoSrc)}?autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title || t("about.videoTitle")}
            />
          ) : (
            <img
              src={posterImage}
              alt={title || t("about.videoTitle")}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <video
            id="about-video"
            src={videoSrc}
            poster={posterImage}
            className="w-full h-full object-cover"
            controls={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}

        {/* Overlay with text and play button */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-white text-2xl md:text-4xl font-noto font-bold mb-8">
                {title || t("about.videoTitle")}
              </h2>

              {/* Play Button */}
              <button
                onClick={handlePlayVideo}
                className="bg-secondary hover:bg-secondary/90 text-white rounded-full p-6 transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl"
                aria-label="Play video"
              >
                <FaPlay size={30} className="mr-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
