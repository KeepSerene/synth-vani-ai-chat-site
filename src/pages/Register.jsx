// Component imports
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";
import { Button } from "../components/Button";
import Copyright from "../components/Copyright";

// Library import
import { Form, Link } from "react-router-dom";

// Asset imports
import { logoLight, logoDark, banner } from "../../public/assets/assets";

function Register() {
  return (
    <>
      <PageTitle title="Create an account" />

      <div>
        <div>
          <Link to="/">
            <img src={logoLight} width={133} height={24} alt="SynthVani logo" />

            <img src={logoDark} width={133} height={24} alt="SynthVani logo" />
          </Link>

          <section>
            <h2>Create an account</h2>

            <p>
              Register today and gain access to powerful tools that will
              supercharge your ideas.
            </p>

            <Form method="POST">
              <InputField
                wrapperElemClassStr="border"
                type="text"
                idName="full-name-input"
                labelText="Full name"
                placeholderText="Full name"
                required={true}
                autoFocus={true}
              />

              <InputField
                type="email"
                idName="email-input"
                labelText="Email"
                placeholderText="Email"
                required={true}
              />

              <InputField
                type="password"
                idName="password-input"
                labelText="Password"
                placeholderText="Enter your password"
                required={true}
              />

              <Button type="submit">Create account</Button>
            </Form>

            <p>
              Already have an account?
              <Link to="/login">Sign in</Link>
            </p>
          </section>

          <Copyright />
        </div>

        <div>
          <img src={banner} alt="" className="cover-img" />

          <p>Chat with SynthVani to supercharge your ideas.</p>
        </div>
      </div>
    </>
  );
}

export default Register;
