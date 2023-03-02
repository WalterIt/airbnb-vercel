export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "https://vs-airbnb.vercel.app/uploads/" + src;

  return <img {...rest} src={src} />;
}
