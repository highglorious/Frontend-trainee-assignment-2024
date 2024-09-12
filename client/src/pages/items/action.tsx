import { ActionFunctionArgs } from "react-router-dom";
import { addItem } from "../../api/api";

export async function itemsAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  console.log("ACTION ITEM", formData);
  const response = await addItem(formData);

  return response;
}
