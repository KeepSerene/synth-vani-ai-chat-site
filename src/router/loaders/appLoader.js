// Custom library import
import { account } from "../../lib/appwrite";

// Library import
import { redirect } from "react-router-dom";

export default async function appLoader() {
  const data = {};

  try {
    data.user = await account.get();
  } catch (err) {
    console.error(`Failed to retrieve the user session info: ${err.message}`);

    return redirect("/login");
  }

  return data;
}
