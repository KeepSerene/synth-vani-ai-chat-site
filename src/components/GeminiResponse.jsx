// Asset import
import { logoIcon } from "../assets/assets";

// React imports
import { useCallback, useEffect, useState } from "react";

// Context import
import { useSnackbarContext } from "../contexts/SnackbarContextProvider";

// Helper import
import { toTitleCase } from "../utils/helpers";

// Library imports
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { hopscotch, coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IconButton } from "./Buttons";

function GeminiResponse({ response, children }) {
  const [colorTheme, setColorTheme] = useState("");

  // Set color theme for markdown code blocks on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark");

    setColorTheme(mediaQuery.matches ? hopscotch : coy);

    const handleThemeChange = (event) => {
      setColorTheme(event.matches ? hopscotch : coy);
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  const { showSnackbar, hideSnackbar } = useSnackbarContext();

  const handleCopy = useCallback(
    async (text) => {
      // Handle multiple consecutive clicks
      hideSnackbar();

      try {
        await navigator.clipboard.writeText(text);
        showSnackbar({ message: "Copied successfully!", timeOut: 2500 });
      } catch (err) {
        console.error(`Failed to copy: ${err}`);
        showSnackbar({
          type: "error",
          message: err.message || "Failed to copy!",
        });
      }
    },
    [hideSnackbar, showSnackbar]
  );

  // The function will run whenever a code block appears in the markdown
  const renderMarkdownCodeBlock = ({ children, className, ...rest }) => {
    const languageMatch = className?.match(/language-(\w+)/);

    return languageMatch ? (
      <>
        <div className="code-block">
          <div className="font-workSans text-bodySmall p-4 pb-0">
            {toTitleCase(languageMatch[1])}
          </div>

          <SyntaxHighlighter
            PreTag="div"
            language={languageMatch[1]}
            style={colorTheme}
            customStyle={{
              padding: 2,
              marginBlock: 0,
            }}
            codeTagProps={{
              style: {
                fontWeight: 400,
                padding: 14,
              },
            }}
            {...rest}
          >
            {children}
          </SyntaxHighlighter>
        </div>

        <div className="h-11 bg-light-surfaceContainer dark:bg-dark-surfaceContainer font-workSans text-bodySmall rounded-t-extraSmall rounded-b-medium pl-4 pr-2 flex justify-between items-center">
          <p>
            Use code&nbsp;
            <a
              href="https://gemini.google.com/faq#coding"
              target="_blank"
              className="link"
            >
              with caution.
            </a>
          </p>

          <IconButton
            icon="content_copy"
            size="small"
            onClick={handleCopy.bind(null, children)}
            aria-label="Copy code"
            title="Copy"
          />
        </div>
      </>
    ) : (
      <code className={className}>{children}</code>
    );
  };

  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-[max-content,minmax(0,1fr)] items-start gap-1 md:gap-5">
      {/* SynthVani avatar */}
      <figure className="w-8 h-8 flex justify-center items-center">
        <img
          src={logoIcon}
          alt="SynthVani avatar"
          width={32}
          height={32}
          title="SynthVani"
        />

        <figcaption className="sr-only">SynthVani avatar image</figcaption>
      </figure>

      {children}

      {response && (
        <article className="markdown-content">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{ code: renderMarkdownCodeBlock }}
          >
            {response}
          </Markdown>
        </article>
      )}
    </div>
  );
}

export default GeminiResponse;
