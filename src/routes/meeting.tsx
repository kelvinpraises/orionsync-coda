import JoinCall from "@/component/JoinCall";
import UploadRecord from "@/component/UploadRecord";
import VideoCall from "@/component/VideoCall";
import { useVideoCall } from "@/hooks/videoCall";
import { deferredLoader, useLoaderData } from "@/utils";

export const Component = () => {
  const data = useLoaderData<typeof loader>();
  const vc = useVideoCall(data);

  return (
    <>
      <div
        data-show={vc.state.showDialog}
        className="m-4 group absolute z-[9999 w-[calc(100vw_-_32px)] h-[calc(100vh_-_32px)] overflow-hidden left-0 top-0 [transition:visibility_0s_linear_0.5s,opacity_0.5s_linear] opacity-0 invisible data-[show=true]:delay-[0s] data-[show=true]:opacity-100 data-[show=true]:visible"
      >
        <div className="absolute w-screen h-screen left-0 top-0"></div>
        <div className="relative z-[1] block box-border -translate-y-2/4 max-w-[720px] w-full rounded-lg shadow-[1px_1px_6px_rgba(0,0,0,0.3)]  transition-all duration-[0.5s] mx-auto my-0 py-0 top-2/4 bg-white max-h-0 opacity-0 group-data-[show=true]:max-h-96 group-data-[show=true]:opacity-100">
          {vc.state.showUpload && <UploadRecord vc={vc} />}
          {!vc.state.joinedRoom && <JoinCall loaderData={data} vc={vc} />}
        </div>
      </div>

      <main
        data-blur={vc.state.blurMain}
        className="data-[blur=true]:blur-[6px] transition-all duration-[0.5s] ease-[ease-out] w-full"
      >
        <VideoCall loaderData={data} vc={vc} />
      </main>
    </>
  );
};

export const loader = deferredLoader(({ request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "";
  const photoUrl = url.searchParams.get("photoUrl") || "";
  const roomId = url.searchParams.get("roomId") || "ges-pbhp-pjo";
  return { name, photoUrl, roomId };
});

export async function action() {}
