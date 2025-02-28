// Custom library import
import { account } from "../../lib/appwrite";

// Library import
import { redirect } from "react-router-dom";

async function registrationLoader() {
  try {
    const user = await account.get();
    console.log(user);
  } catch (err) {
    console.error(
      `An error occurred while retrieving the current session: ${err}`
    );

    return null;
  }

  // After successful current session retrieval, redirect the user to the home page
  return redirect("/");
}

export default registrationLoader;
