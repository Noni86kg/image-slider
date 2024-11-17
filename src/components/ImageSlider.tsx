import { useCallback, useEffect, useRef, useState } from "react";
import Draggable from 'react-draggable';
import { ImageInfo } from '../App'
import './ImageSlider.css'

// The ImageSlider component renders a draggable and navigable image carousel.
// Props:
// - data: Array of image information objects (e.g., URLs).
// - parentWidth: Width of the parent container, used to calculate slide positions.
const ImageSlider = ({ data, parentWidth }: { data: ImageInfo[], parentWidth: number }) => {
  const timerRef = useRef(null) as any; // Ref for managing the automatic slide timer.
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Tracks the currently displayed slide index.
  const [controlledPosition, setControlledPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 }); // Manages the draggable position of the slider.
  const { length } = data; // The number of slides in the data array.

  // Navigates to the previous slide. Wraps around to the last slide if on the first slide.
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setControlledPosition({ x: -(newIndex * parentWidth), y: 0 });
  };

  // Navigates to the next slide. Wraps around to the first slide if on the last slide.
  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setControlledPosition({ x: -(newIndex * parentWidth), y: 0 });
  }, [currentIndex, data]);

  // Directly navigates to a specific slide index.
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
    setControlledPosition({ x: -(slideIndex * parentWidth), y: 0 });
  };

  // Automatically transitions to the next slide every 2 seconds.
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Clear any existing timer to prevent overlapping intervals.
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 2000); // 2-second interval for auto-slide.

    return () => clearTimeout(timerRef.current); // Clean up the timer on unmount or dependency change.
  }, [goToNext]);

  // Handles drag-stop events, determining whether to change slides based on drag distance.
  const handleStop = (_e: any, position: { x: number }) => {
    const { x } = position;
    const dragToX = x + (parentWidth * currentIndex); // Calculate the total drag distance relative to the current slide.
    const changeImg = Math.abs(dragToX) > (parentWidth / 2); // Change slide if dragged more than half the parent width.

    if (changeImg) {
      if (dragToX > 0) {
        goToPrevious(); // Dragged to the right, navigate to the previous slide.
      } else {
        goToNext(); // Dragged to the left, navigate to the next slide.
      }
    }
  };

  return (
    <div className="slider">
      {/* Navigation arrows */}
      <div className="arrow arrow-left" onClick={goToPrevious}>
        <div>
          ❰
        </div>
      </div>
      <div className="arrow arrow-right" onClick={goToNext}>
        <div>
          ❱
        </div>
      </div>

      {/* Draggable slides container */}
      <div className="slides-container-overflow">
        <Draggable
          position={controlledPosition}
          bounds={{ top: 0, left: -((length - 1) * parentWidth), right: 0, bottom: 0 }} // Limit drag boundaries.
          onStop={handleStop}
        >
          <div className="slides-container" style={{ width: parentWidth * length }}>
            {data.map((imgInfo: ImageInfo, slideIndex: number) => (
              <div
                className="slide"
                key={slideIndex}
                style={{ backgroundImage: `url(${imgInfo.image})` }} // Sets slide background to the image URL.
              ></div>
            ))}
          </div>
        </Draggable>
      </div>

      {/* Dots for navigation */}
      <div className="dots-container">
        {data.map((_: ImageInfo, slideIndex: number) => (
          <div
            className={`dot${currentIndex === slideIndex ? ' active' : ''}`} // Highlight the active dot.
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)} // Navigate to the corresponding slide on click.
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
