"use client";

import '@livekit/components-styles';
import {
    LiveKitRoom,
    VideoConference,
    GridLayout,
    ParticipantTile,
    RoomAudioRenderer,
    ControlBar,
    useTracks,
    useParticipants,
} from '@livekit/components-react';
import { useEffect, useState } from 'react';
import { Track } from 'livekit-client';
import { Loader2, PhoneOutgoing } from 'lucide-react';

export default function CallPage() {
    // TODO: get user input for room and name



    const joinedUsers = useParticipants()

    useEffect(() => {

        console.log(joinedUsers)
    }, [joinedUsers])



    if (joinedUsers?.length == 1) {
        return (
            <div className='h-full w-full flex flex-col justify-center items-center gap-4' >
                <PhoneOutgoing className=' ' />
                <h1 className='animate-pulse'>Calling...</h1>
            </div>
        )
    }

    return (
        <>
            {/* Your custom component with basic video conferencing functionality. */}
            <VideoConference />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            {/* <RoomAudioRenderer /> */}
            {/* Controls for the user to start/stop audio, video, and screen 
                    share tracks and to leave the room. */}
            {/* <ControlBar /> */}

        </>
    );
}

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
            {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
            <ParticipantTile />
        </GridLayout>
    );
}