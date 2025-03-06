// Library import
import { Link, useNavigation } from "react-router-dom";

// Component import
import { LinearLoader } from "../components/Loaders";

function Error404() {
  const navigation = useNavigation();

  return (
    <>
      <section className="h-dvh w-[calc(100%-2rem)] text-center mx-auto flex flex-col justify-center items-center">
        <h1 className="text-displayMedium md:text-displayLarge font-medium">
          404{" "}
          <span className="hidden md:inline capitalize">- Page not found</span>
        </h1>

        <p className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-2 mb-4">
          The page you are looking for does not exist or has been moved!
        </p>

        <Link to="/" className="btn filled primary">
          Go home
          <div className="state-layer" />
        </Link>
      </section>

      {navigation.state === "loading" && (
        <LinearLoader classStr="fixed left-0 top-0 right-0" />
      )}
    </>
  );
}

export default Error404;
