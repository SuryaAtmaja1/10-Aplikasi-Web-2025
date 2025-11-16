export default function ArrowRightCircle({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      className={className} // allow Tailwind sizing
      {...props}
    >
      <path
        fill="#FA7921"
        fillRule="evenodd"
        d="M2.5 20a17.5 17.5 0 1 0 35 0 17.5 17.5 0 0 0-35 0M40 20a20 20 0 1 1-40 0 20 20 0 0 1 40 0m-28.75-1.25a1.25 1.25 0 0 0 0 2.5h14.483l-5.368 5.365a1.252 1.252 0 0 0 1.77 1.77l7.5-7.5a1.25 1.25 0 0 0 0-1.77l-7.5-7.5a1.252 1.252 0 0 0-1.77 1.77l5.368 5.365z"
        clipRule="evenodd"
      />
    </svg>
  );
}