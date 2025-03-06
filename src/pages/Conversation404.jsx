import { Link, useRouteError } from "react-router-dom";

function Conversation404() {
  const error = useRouteError();

  return (
    <section className="h-full flex flex-col justify-center items-center">
      <h2 className="text-displayMedium font-semibold">{error.code}</h2>

      <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-2 mb-4">
        {error.message}
      </p>

      <Link to="/" className="btn filled primary">
        Create new chat
        <div className="state-layer" />
      </Link>
    </section>
  );
}

export default Conversation404;
