import { Helmet } from "react-helmet";

function PageTitle({ title = "SynthVani - Your Ideas, Divinely Amplified" }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageTitle;
