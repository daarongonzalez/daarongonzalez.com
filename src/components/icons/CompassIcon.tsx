export default function CompassIcon({ color = "#654808" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M15 9l-2 6-6 2 2-6 6-2z"></path>
    </svg>
  );
}
