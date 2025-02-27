// Component imports
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";

// Library import
import { Form, Link } from "react-router-dom";

// Asset imports
import { logoLight, logoDark } from "../../public/assets/assets";

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
                wrapperClassStr="border"
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
            </Form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;
