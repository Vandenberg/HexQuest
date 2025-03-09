import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

// This component doesn't render anything, it just provides a hook for camera updates
const CameraController = ({ onCameraUpdate }) => {
  const { camera } = useThree();
  const prevCameraPosition = useRef(camera.position.clone());
  const prevCameraRotation = useRef(camera.rotation.clone());

  useEffect(() => {
    // Notify parent component of initial camera state
    if (onCameraUpdate) {
      onCameraUpdate(camera);
    }
  }, [camera, onCameraUpdate]);

  useFrame(() => {
    // Check if camera position or rotation has changed
    if (
      !camera.position.equals(prevCameraPosition.current) ||
      !camera.rotation.equals(prevCameraRotation.current)
    ) {
      // Update previous values
      prevCameraPosition.current.copy(camera.position);
      prevCameraRotation.current.copy(camera.rotation);

      // Notify parent component when camera changes
      if (onCameraUpdate) {
        onCameraUpdate(camera);
      }
    }
  });

  return null;
};

export default CameraController;
