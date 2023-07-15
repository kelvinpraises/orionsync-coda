import { useEffect, useReducer } from "react";

import useHuddle01 from "@/hooks/huddle01";

interface VideoCallState {
  loading: boolean;
  joinedRoom: boolean;
  recording: boolean;
  showUpload: boolean;
}

export type VideoCallReturnType = ReturnType<typeof useVideoCall>;

export const useVideoCall = (data: { name: string; roomId: string }) => {
  const h = useHuddle01();

  const [state, updateState] = useReducer(
    (
      current: VideoCallState,
      update: Partial<VideoCallState>
    ): VideoCallState => ({
      ...current,
      ...update,
    }),
    {
      loading: true,
      joinedRoom: true,
      recording: false,
      showUpload: false,
    }
  );

  useEffect(() => {
    h.initialize(h.projectId);
    h.setDisplayNameText(data.name);
  }, [data.name, h.projectId]);

  useEffect(() => {
    if (!h.joinLobby.isCallable) return;
    h.joinLobby(data.roomId);
  }, [data.roomId, h.joinLobby.isCallable]);

  useEffect(() => {
    if (
      [
        h.setDisplayName.isCallable,
        h.fetchVideoStream.isCallable,
        h.stopVideoStream.isCallable,
        h.fetchAudioStream.isCallable,
        h.stopAudioStream.isCallable,
        h.joinRoom.isCallable,
      ].every(Boolean)
    ) {
      h.setDisplayName(h.displayNameText);
      updateState({ loading: false });
    }
  }, [
    h.displayNameText,
    h.setDisplayName.isCallable,
    h.fetchVideoStream.isCallable,
    h.stopVideoStream.isCallable,
    h.fetchAudioStream.isCallable,
    h.stopAudioStream.isCallable,
    h.joinRoom.isCallable,
  ]);

  const joinRoom = () => {
    return h.joinRoom;
  };

  return {
    state,
    fetchVideoStream: h.fetchVideoStream,
    stopVideoStream: h.stopVideoStream,
    fetchAudioStream: h.fetchAudioStream,
    stopAudioStream: h.stopAudioStream,
    videoRef: h.videoRef,
    peers: h.peers,
    joinRoom,
  };
};
