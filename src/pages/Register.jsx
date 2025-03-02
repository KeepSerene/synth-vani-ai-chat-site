// Component imports
import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import { Button } from "../components/Buttons";
import { CircularLoader, LinearLoader } from "../components/Loaders";
import Copyright from "../components/Copyright";

// Library imports
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Context custom hook import
import { useSnackbarContext } from "../contexts/SnackbarContextProvider";

// React import
import { useEffect } from "react";

// Asset import
import { banner } from "../assets/assets";

function Register() {
  const navigation = useNavigation();
  const data = useActionData();

  const { showSnackbar } = useSnackbarContext();

  useEffect(() => {
    if (data?.message) {
      showSnackbar({
        type: "error",
        message: data.message,
        timeOut: 6000,
      });
    }
  }, [data, showSnackbar]);

  return (
    <>
      <PageTitle title="Create an account" />

      <main className="w-screen h-dvh p-2 relative grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2">
        <div className="p-4 flex flex-col">
          <Logo classStr="mx-auto mb-auto lg:mx-0" />

          <section className="max-w-[30rem] w-full mx-auto flex flex-col gap-2">
            <h2 className="text-displaySmall text-light-onBackground dark:text-dark-onBackground font-semibold text-center">
              Create an Account
            </h2>

            <p className="text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center px-2 mt-1 mb-5">
              Where AI speaks your language, understands your vision.
            </p>

            <Form method="post" className="grid grid-cols-1 gap-4">
              <InputField
                type="text"
                idName="full-name-input"
                name="fullName"
                labelText="Full name"
                placeholderText="Full name"
                required={true}
                autoFocus={true}
              />

              <InputField
                type="email"
                idName="email-input"
                name="email"
                labelText="Email"
                placeholderText="Email"
                required={true}
              />

              <InputField
                type="password"
                idName="password-input"
                name="password"
                labelText="Password"
                placeholderText="Password"
                required={true}
              />

              <Button
                btnType="submit"
                disabled={navigation.state === "submitting"}
              >
                {navigation.state === "submitting" ? (
                  <CircularLoader size="small" />
                ) : (
                  "Create account"
                )}
              </Button>
            </Form>

            <p className="text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="link text-labelLarge text-light-onSurface dark:text-dark-onSurface"
              >
                Sign in
              </Link>
            </p>
          </section>

          <Copyright />
        </div>

        <div className="img-wrapper hidden lg:block lg:rounded-large lg:relative">
          <img src={banner} alt="" className="cover-img" />

          <p className="text-displayLarge 2xl:text-[4.5rem] text-light-onSurface font-semibold text-right leading-tight drop-shadow-sm absolute bottom-10 left-12 right-12 z-10">
            Chat with SynthVani - Where thoughts find their voice.
          </p>
        </div>
      </main>

      <AnimatePresence>
        {navigation.state === "loading" && (
          <LinearLoader classStr="absolute left-0 top-0 right-0" />
        )}
      </AnimatePresence>
    </>
  );
}

export default Register;
