import { useEffect, useRef } from "react";
import * as fabric from "fabric";
export function DesignCanvas({ onReady, size = { width: 400, height: 300 } }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  // Initialize canvas only once
  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: size.width,
        height: size.height,
        backgroundColor: "#ffffff",
      });

      fabricRef.current = canvas;

      if (onReady) {
        onReady(canvas);
      }

      return () => {
        if (fabricRef.current) {
          fabricRef.current.dispose();
          fabricRef.current = null;
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReady]);

  // Update canvas size and scaling
  useEffect(() => {
    const handleResize = () => {
      if (!fabricRef.current || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const { width: internalWidth, height: internalHeight } = size;

      // Calculate scale to fit container width
      const scale = Math.min(1, containerWidth / internalWidth);

      fabricRef.current.setDimensions({
        width: internalWidth * scale,
        height: internalHeight * scale,
      });

      fabricRef.current.setZoom(scale);
      fabricRef.current.renderAll();
    };

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initial resize
    handleResize();

    return () => observer.disconnect();
  }, [size]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center items-center overflow-hidden"
    >
      <div className="inline-block shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
