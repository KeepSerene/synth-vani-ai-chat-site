// Component imports
import UserPrompt from "./UserPrompt";
import GeminiResponse from "./GeminiResponse";
import Skeleton from "./Skeleton";

function PromptPreloader({ prompt }) {
  return (
    <div className="max-w-[43.75rem] mx-auto">
      <UserPrompt prompt={prompt} />

      <GeminiResponse>
        <Skeleton />
      </GeminiResponse>
    </div>
  );
}

export default PromptPreloader;
