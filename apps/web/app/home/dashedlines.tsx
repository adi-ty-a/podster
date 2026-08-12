export default function DashedLine() {
  return (
    <svg width="300" height="100">
      <line
        x1="20"
        y1="50"
        x2="280"
        y2="50"
        stroke="black"
        strokeWidth="4"
        strokeDasharray="10 5"
      />
    </svg>
  );
}