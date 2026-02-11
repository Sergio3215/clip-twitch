import { useParams } from 'react-router-dom';

export default function ClipViewer() {
    const { id } = useParams<{ id: string }>();
    const hostname = window.location.hostname;

    if (!id) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-black">
            <iframe
                src={`https://clips.twitch.tv/embed?clip=${id}&parent=${hostname}&autoplay=true`}
                height="360"
                width="640"
                allowFullScreen
                className="w-full h-full"
            >
            </iframe>
        </div>
    );
}
