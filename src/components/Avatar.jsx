import { avatars } from "../lib/appwrite";

function Avatar({ name = "", title = "" }) {
  return (
    <figure className="avatar">
      <img
        src={avatars.getInitials(name, 48, 48)}
        alt={`${name} avatar`}
        width={48}
        height={48}
        title={title}
      />

      <figcaption className="sr-only">
        Avatar image of {name ? name : "Default"}
      </figcaption>
    </figure>
  );
}

export default Avatar;
