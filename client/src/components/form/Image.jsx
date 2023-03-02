export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "https://vs-airbnb.vercel.app/media/" + src;

  return <img {...rest} src={src} />;
}
