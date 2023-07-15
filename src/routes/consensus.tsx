import { Await, deferredLoader, useLoaderData } from "@/utils";

export const Component = () => {
  const {} = useLoaderData<typeof loader>();
  return <div>Component</div>;
};

export const loader = deferredLoader(({}) => {
  return {};
});

export async function action() {}
