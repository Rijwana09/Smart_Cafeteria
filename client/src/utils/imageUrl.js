// The server serves uploaded images from its root (not under /api), so
// relative paths returned by the upload endpoint (e.g. "/uploads/x.jpg")
// need the server's origin prepended. Full URLs (http://...) pass through
// unchanged, so this is safe to use on any food.image value.
const SERVER_ORIGIN = "http://localhost:5000";

export const resolveImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${SERVER_ORIGIN}${image}`;
};
