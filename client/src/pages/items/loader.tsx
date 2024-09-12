import { LoaderFunctionArgs } from "react-router-dom";
import { getItems } from "../../api/api";

export async function itemsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const limit = url.searchParams.get("_limit") || "";
  const nameLike = url.searchParams.get("name_like") || "";

  if (!url.searchParams.get("_page")) {
    url.searchParams.append("_page", "1");
  }

  const [items, pagination] = await getItems(`advertisements/${url.search}`);

  if (!items) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { items, nameLike, limit, pagination };
}
