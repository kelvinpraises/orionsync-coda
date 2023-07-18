import { Await, deferredLoader, useLoaderData } from "@/utils";
import { Outlet } from "react-router-dom";

export const Component = () => {
  const {} = useLoaderData<typeof loader>();
  return <Outlet />;
};

export const loader = deferredLoader(({}) => {
  return {};
});

export async function action() {}
