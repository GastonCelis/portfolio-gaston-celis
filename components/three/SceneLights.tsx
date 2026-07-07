export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[-2.5, 1.2, -3]} intensity={18} color="#8b5cf6" />
      <directionalLight position={[3, 2, 4]} intensity={1.1} color="#e0e7ff" />
    </>
  );
}
