export default function WritePlus({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 72 72"
      className={className} // allow Tailwind sizing
      {...props}
    >
      <path fill="#363231" d="M0 0h72v72H0z"></path>
      <path
        stroke="#FFF9F4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.367"
        d="M20.712 52.274h7.89l20.713-20.712a5.579 5.579 0 1 0-7.89-7.89L20.712 44.382zM39.452 25.644l7.89 7.89M44.384 50.301h11.835M50.301 44.384v11.835"
      ></path>
    </svg>
  );
}