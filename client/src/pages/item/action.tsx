import { ActionFunctionArgs } from "react-router-dom";
import { editItem } from "../../api/api";

export async function itemAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  console.log("ACTION ITEM", formData);
  const response = await editItem(formData, params.itemId);

  return response;
}
