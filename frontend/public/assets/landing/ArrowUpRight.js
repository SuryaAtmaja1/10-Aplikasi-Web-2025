export default function ArrowUpRight({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={48}
      height={48}
      fill="none"
      viewBox="0 0 48 48"
      className={className} // allow Tailwind sizing
      {...props}
    >
      <path
        fill="#FFF9F4"
        fillRule="evenodd"
        d="M48.003 2a2 2 0 0 0-2-2h-24a2 2 0 0 0 0 4h19.172L.587 44.584a2.002 2.002 0 1 0 2.832 2.832L44.003 6.828V26a2 2 0 0 0 4 0z"
        clipRule="evenodd"
    ></path>
    </svg>
  );
}