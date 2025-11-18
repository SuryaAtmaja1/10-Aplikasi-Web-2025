export default function extractDriveId(url) {
  if (!url) return null;
  const match = url.match(/id=([^&]+)/);
  return match ? match[1] : null;
}
