// Custom library import
import { account } from "../../lib/appwrite";

// Library import
import { redirect } from "react-router-dom";

async function loginLoader() {
  try {
    await account.get();
  } catch (err) {
    console.error(`Failed to retrieve the user session info: ${err.message}`);

    return null;
  }

  // After successful session retrieval, redirect the user to the home page
  return redirect("/");
}

export default loginLoader;
