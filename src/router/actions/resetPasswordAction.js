// Custom library import
import { account } from "../../lib/appwrite";

// Library import
import { redirect } from "react-router-dom";

async function resetPasswordAction({ request }) {
  const formData = await request.formData();
  const url = new URL(request.url);

  try {
    await account.updateRecovery(
      url.searchParams.get("userId"),
      url.searchParams.get("secret"),
      formData.get("password")
    );

    return redirect("/login");
  } catch (err) {
    console.error(`Failed to reset password: ${err.message}`);

    return {
      message: err.message,
    };
  }
}

export default resetPasswordAction;
