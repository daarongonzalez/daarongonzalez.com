export default function BracketsIcon({ color = "#001E5E" }: { color?: string }) {
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
      <path d="M8 6L2 12l6 6"></path>
      <path d="M16 6l6 6-6 6"></path>
    </svg>
  );
}
