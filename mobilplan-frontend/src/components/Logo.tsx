import MobilplanIcon from '../assets/mobilplan.png'; // Assuming it's an image

export default function Logo({ width, height }: { width: number; height: number }) {
  return (
    <img
      src={MobilplanIcon}
      alt="Mobilplan Logo"
      width={width} // Set width dynamically using props
      height={height} // Set height dynamically using props
      style={{ objectFit: 'cover' }} // Optional: Maintain aspect ratio
    />
  );
}
