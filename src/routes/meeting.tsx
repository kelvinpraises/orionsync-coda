import JoinCall from "@/component/JoinCall";
import UploadRecord from "@/component/UploadRecord";
import VideoCall from "@/component/VideoCall";
import { useVideoCall } from "@/hooks/videoCall";
import { deferredLoader, useLoaderData } from "@/utils";

export const Component = () => {
  const data = useLoaderData<typeof loader>();
  const vc = useVideoCall(data);

  if (vc.state.joinedRoom) {
    return <VideoCall vc={vc} />;
  }

  if (vc.state.showUpload) {
    return <UploadRecord vc={vc} />;
  }

  return <JoinCall vc={vc} />;
};

export const loader = deferredLoader(({}) => {
  return { name: "kelvin", roomId: "zds-hoys-src" };
});

export async function action() {}
