"use client";

import { useState } from "react";
import VimeoVideo from "@/components/VimeoVideo";
import VideoModal from "@/components/VideoModal";

export default function VideoSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideo = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
  };
  return (
    <section
      id="mentorias"
      className="relative h-screen overflow-hidden isolate bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <VimeoVideo
          videoId="76979871" // Sample Vimeo video ID - replace with your actual video
          autoplay={true}
          muted={true}
          loop={true}
          background={true}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Transformando Vidas
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Através de palestras inspiradoras, mentorias personalizadas e
            empreendimentos inovadores, construímos juntos um melhor futuro.
          </p>
          <button
            onClick={handleOpenVideo}
            className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Conheça Meu Trabalho
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        videoId="76979871" // Replace with your actual video ID
      />
    </section>
  );
}
