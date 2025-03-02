// Component imports
import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import { Button } from "../components/Buttons";
import { CircularLoader, LinearLoader } from "../components/Loaders";
import Copyright from "../components/Copyright";

// Library imports
import { Form, useActionData, useNavigation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Context custom hook import
import { useSnackbarContext } from "../contexts/SnackbarContextProvider";

// React import
import { useEffect } from "react";

// Asset import
import { banner } from "../assets/assets";

function ResetPassword() {
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
      <PageTitle title="Reset password" />

      <main className="w-screen h-dvh p-2 relative grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2">
        <div className="p-4 flex flex-col">
          <Logo classStr="mx-auto mb-auto lg:mx-0" />

          <section className="max-w-[30rem] w-full mx-auto flex flex-col gap-2">
            <h2 className="text-displaySmall text-light-onBackground dark:text-dark-onBackground font-semibold text-center">
              Set a new password
            </h2>

            <p className="text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center px-2 mt-1 mb-5">
              Please choose a strong password that hasn't been used before. Must
              be at least 8 characters long!
            </p>

            <Form method="post" className="grid grid-cols-1 gap-4">
              <InputField
                type="password"
                idName="password-input"
                name="password"
                labelText="New password"
                placeholderText="New password"
                required={true}
                autoFocus={true}
              />

              <Button
                btnType="submit"
                disabled={navigation.state === "submitting"}
              >
                {navigation.state === "submitting" ? (
                  <CircularLoader size="small" />
                ) : (
                  "Set password"
                )}
              </Button>
            </Form>
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

export default ResetPassword;
