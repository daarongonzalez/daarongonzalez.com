export default function GradCapIcon({ color = "#001E5E" }: { color?: string }) {
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
      <path d="M2 9l10-5 10 5-10 5-10-5z"></path>
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"></path>
      <path d="M22 9v6"></path>
    </svg>
  );
}
