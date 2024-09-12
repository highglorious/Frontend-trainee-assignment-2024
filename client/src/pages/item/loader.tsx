import { LoaderFunctionArgs } from "react-router-dom";
import { getItems } from "../../api/api";

export async function itemLoader({ params }: LoaderFunctionArgs) {
  const itemParam = `advertisements/${params.itemId}`;
  console.log(itemParam);

  const [item] = await getItems(itemParam);

  if (!item) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return item;
}
