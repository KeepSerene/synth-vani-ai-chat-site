// Custom library import
import { account } from "../../lib/appwrite";

// Library import
import { redirect } from "react-router-dom";

async function resetPasswordLoader({ request }) {
  const url = new URL(request.url);

  try {
    await account.get();

    return redirect("/");
  } catch (err) {
    console.error(`Failed to retrieve the user session info: ${err.message}`);
  }

  if (!(url.searchParams.get("userId") || url.searchParams.get("secret"))) {
    return redirect("/forgot-password");
  }

  return null;
}

export default resetPasswordLoader;
