import { VideoCallReturnType } from "@/hooks/videoCall";
import { Audio, Video } from "@huddle01/react/components";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useEffect, useRef, useState } from "react";

const VideoCall = ({ vc }: { vc: VideoCallReturnType }) => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      setMaxHeight(containerHeight);
    }
  }, [containerRef.current]);

  const calculateWidth = (height: number): number => {
    return (height * 16) / 9;
  };

  let gridCols = "";
  let streams = 1;

  switch (streams) {
    case 1:
      gridCols = "grid-cols-1";
      break;
    case 2:
      gridCols = "grid-cols-1";
      break;
    case 3:
      gridCols = "grid-cols-2";
      break;
    default:
      gridCols = "grid-cols-2";
      break;
  }

  return (
    <div className="flex flex-1 gap-8 flex-col">
      <div className="flex justify-between items-center">
        {/* TODO: Add recording indicator */}
        <div className="flex gap-4 items-center">recording</div>
      </div>

      <div
        className={`grid ${gridCols} gap-4 justify-center items-center flex-1 place-items-center`}
        ref={containerRef}
      >
        {Array.from(Array(streams)).map((_, index) => {
          const width = calculateWidth(maxHeight);

          return (
            <div
              key={index}
              style={{ width: streams === 2 ? width / 2 - 16 : "100%" }}
              className={`shadow-blackA7 overflow-hidden rounded-md shadow-[0_2px_10px]`}
            >
              <AspectRatio.Root ratio={16 / 9}>
                <video
                  className="h-full w-full"
                  ref={vc.videoRef}
                  autoPlay
                  muted
                ></video>

                <div className="grid grid-cols-4">
                  {Object.values(vc.peers)
                    .filter((peer) => peer.cam)
                    .map((peer) => (
                      <>
                        role: {peer.role}
                        <Video
                          key={peer.peerId}
                          peerId={peer.peerId}
                          track={peer.cam || undefined}
                          debug
                        />
                      </>
                    ))}

                  {Object.values(vc.peers)
                    .filter((peer) => peer.mic)
                    .map((peer) => (
                      <Audio
                        key={peer.peerId}
                        peerId={peer.peerId}
                        track={peer.mic || undefined}
                      />
                    ))}

                  {/* <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                  alt="Landscape photograph by Tobias Tullius"
                /> */}
                </div>
              </AspectRatio.Root>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCall;
