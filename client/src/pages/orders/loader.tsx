import { LoaderFunctionArgs } from "react-router-dom";
import { getItems } from "../../api/api";

export async function ordersLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const [orders] = await getItems(`orders/${url.search}`);
  return orders;
}
