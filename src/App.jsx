// Component imports
import PageTitle from "./components/PageTitle";
import Topbar from "./components/Topbar";

function App() {
  return (
    <>
      <PageTitle title="SynthVani - Your Ideas, Divinely Amplified" />

      {/* Sidebar */}
      <div className=""></div>

      <div className="">
        {/* Topbar */}
        <Topbar />

        {/* Main content */}
        <div className="">
          <div className=""></div>
        </div>

        {/* Prompt field */}
        <div className="">
          <p>SynthVani can make mistakes! Please double-check responses.</p>

          <a
            href="https://support.google.com/gemini?p=privacy_notice"
            target="_blank"
            className=""
          >
            Your privacy & Gemini apps
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
