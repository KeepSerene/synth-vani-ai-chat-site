import { getCopyrightYear } from "../utils/helpers";

function Copyright() {
  return (
    <p className="text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant capitalize mx-auto lg:mx-0 mt-auto">
      &copy;{" "}
      <a
        href="https://github.com/KeepSerene"
        target="_blank"
        className="link text-light-onSurface dark:text-dark-onSurface"
      >
        KeepSerene
      </a>
      , <span>{getCopyrightYear()}</span>. All rights reserved.
    </p>
  );
}

export default Copyright;
