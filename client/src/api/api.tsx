import { Advertisment, LinkHeaderProps } from "./types";

//Jason-server url hardcoded?
const url = "http://localhost:3000/";

function parseLinkHeaders(header: string) {
  //В запросе _page ответ возвращает заголовок  Link header  для пагинации
  //Link header: first, prev, next and last links.

  const links: LinkHeaderProps = {};

  if (header.length === 0) {
    return links;
  }

  // Split parts by comma
  const parts = header.split(",");

  // Parse each part into a named link
  for (let i = 0; i < parts.length; i++) {
    const section = parts[i].split(";");
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, "$1").trim();
    const name = section[1].replace(/rel="(.*)"/, "$1").trim();
    links[name as keyof LinkHeaderProps] = new URL(url).search;
  }
  return links;
}

export async function getItems(params: string) {
  const response = await fetch(`${url}${params}`);
  const parsed = parseLinkHeaders(response.headers.get("Link") || "");

  const data = await response.json();
  return [data, parsed];
}

export async function addItem(formData: FormData) {
  const data = Object.fromEntries(formData) as unknown as Advertisment;
  data.createdAt = new Date().toISOString();
  data.price = parseFloat(data.price as unknown as string);
  data.views = 0;
  data.likes = 0;

  const response = await fetch(`${url}advertisements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}

export async function editItem(formData: FormData, itemId: string | undefined) {
  const data = Object.fromEntries(formData) as unknown as Advertisment;
  data.createdAt = new Date().toISOString();
  data.price = parseFloat(data.price as unknown as string);

  const response = await fetch(`${url}advertisements/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}
