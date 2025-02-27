import { getCopyrightYear } from "../utils/helpers";

function Copyright() {
  return (
    <p>
      &copy;{" "}
      <a href="https://github.com/KeepSerene" target="_blank" className="">
        KeepSerene
      </a>
      , <span>{getCopyrightYear()}</span>. All rights reserved.
    </p>
  );
}

export default Copyright;
