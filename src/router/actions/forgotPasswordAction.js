import { account } from "../../lib/appwrite";

async function forgotPasswordAction({ request }) {
  const formData = await request.formData();

  try {
    await account.createRecovery(
      formData.get("email"),
      `${window.location.origin}/reset-password`
    );

    return {
      ok: true,
      message:
        "You'll receive a password reset link shortly. Please check your email inbox and follow the instructions to reset your password.",
    };
  } catch (err) {
    console.error(`Failed to get a password reset email: ${err.message}`);

    return {
      ok: false,
      message: err.message,
    };
  }
}

export default forgotPasswordAction;
