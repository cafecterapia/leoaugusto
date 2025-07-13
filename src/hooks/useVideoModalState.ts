import { useState, useEffect } from "react";

let globalVideoModalState = false;
const videoModalListeners = new Set<(isOpen: boolean) => void>();

const setGlobalVideoModalState = (isOpen: boolean) => {
  globalVideoModalState = isOpen;

  // Update body class only on client side
  if (typeof document !== "undefined") {
    if (isOpen) {
      document.body.classList.add("video-modal-open");
    } else {
      document.body.classList.remove("video-modal-open");
    }
  }

  // Notify all listeners
  videoModalListeners.forEach((listener) => listener(isOpen));
};

export const useVideoModalState = () => {
  const [isOpen, setIsOpen] = useState(globalVideoModalState);

  useEffect(() => {
    const listener = (newState: boolean) => {
      setIsOpen(newState);
    };

    videoModalListeners.add(listener);

    return () => {
      videoModalListeners.delete(listener);
    };
  }, []);

  return {
    isVideoModalOpen: isOpen,
    setVideoModalOpen: setGlobalVideoModalState,
  };
};
