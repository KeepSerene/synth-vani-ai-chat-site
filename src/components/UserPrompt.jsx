// Library import
import { useLoaderData } from "react-router-dom";

// Custom hook import
import { useToggle } from "../hooks/useToggle";

// React imports
import { useEffect, useRef, useState } from "react";

// Component imports
import Avatar from "./Avatar";
import { IconButton } from "./Buttons";

function UserPrompt({ prompt = "" }) {
  const { user } = useLoaderData();

  const [shouldExpand, toggleExpandedState] = useToggle();

  const promptBoxRef = useRef(null);

  const [shouldShowExpandableBtn, setShouldShowExandableBtn] = useState(false);

  useEffect(() => {
    if (promptBoxRef.current) {
      setShouldShowExandableBtn(
        promptBoxRef.current.scrollHeight > promptBoxRef.current.clientHeight
      );
    }
  }, []);

  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-[max-content,minmax(0,1fr),max-content] items-start gap-1 md:gap-5">
      <Avatar name={user?.name} title="You" />

      <p
        ref={promptBoxRef}
        className={`text-bodyLarge whitespace-pre-wrap ${
          !shouldExpand ? "line-clamp-4" : ""
        } pt-1`}
      >
        {prompt}
      </p>

      {shouldShowExpandableBtn && (
        <IconButton
          onClick={toggleExpandedState}
          icon={!shouldExpand ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          aria-label={!shouldExpand ? "Click to expand" : "Click to collapse"}
          title={!shouldExpand ? "Expand" : "Collapse"}
        />
      )}
    </div>
  );
}

export default UserPrompt;
