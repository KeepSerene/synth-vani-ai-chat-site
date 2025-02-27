import { Helmet } from "react-helmet";

function PageTitle({ title = "SynthVani" }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageTitle;
