export default function GDriveImage({ fileId, alt, className }) {
  const src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/proxy/gdrive?id=${encodeURIComponent(fileId)}`;

  return (
    <img
      src={src}
      alt={alt || "gdrive image"}
      className={className}
    />
  );
}