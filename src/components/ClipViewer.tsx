import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

type Clip = {
    channel: string;
    clipId: string;
    raider: string;
    clipTitle: string;
    bgColor: string;
}

export default function ClipViewer() {
    const { channel } = useParams<{ channel: string }>();
    const hostname = window.location.hostname;

    const [clip, setClip] = useState<Clip | null>(null);

    useEffect(() => {
        const socket = io('https://service-clips-twitch-production.up.railway.app/');
        // Escuchamos el evento "clip" que emite tu app.post en el servidor
        socket.on("clip", (data: Clip) => {
            if (channel) {
                if (channel === data.channel) {
                    setClip(data);

                    // setTimeout(() => {
                    //     setClip(null);
                    // }, 20000);
                }
                else {
                    setClip(null);
                }
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [])

    useEffect(() => {
        // console.log(clip);

    }, [clip])

    if (!channel) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white text-black dark:bg-black dark:text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-transparent text-black dark:text-white font-semibold font-[Arial] uppercase text-shadow-black">
            {
                clip && (
                    <div className={`flex flex-col items-center justify-center h-screen w-screen p-12 border-2 border-${clip.bgColor}-950 rounded-lg bg-${clip.bgColor}-950`}>
                        <h1 className="text-6xl font-bold pb-10 bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">{clip.clipTitle}</h1>
                        <iframe
                            src={`https://clips.twitch.tv/embed?clip=${clip.clipId}&autoplay=true&parent=${hostname}&parent=streamelements.com&parent=localhost`}
                            height="360"
                            width="640"
                            allowFullScreen
                            className="w-screen h-screen p-3"
                            referrerPolicy="no-referrer-when-downgrade"
                            sandbox="allow-scripts allow-same-origin"
                        >
                        </iframe>
                        <h2 className="text-6xl font-bold pt-10 bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">Clip de {clip.raider}</h2>
                    </div>
                )
            }
        </div>
    );
}
