import { useState, useRef } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const AudioPlayer = ({ imageURL, imageAlt, soundTitle, audioSrc }) => {

    const [play, setPlay] = useState(false);
    const pokeRef = useRef(null);
    const MAX = 20;

    function toggleAudio() {
        if (play) {
            pokeRef.current?.pause();
            setPlay(false);
        } else {
            pokeRef.current?.play();
            setPlay(true);
        }
    }

    function handleVolume(e) {
        const { value } = e.target;
        const volume = Number(value) / MAX;
        pokeRef.current.volume = volume;
    }

    return (
        <>
                <div className="bg-poke-black flex h-fit max-w-fit flex-col rounded-2xl p-6 text-center shadow">
                    <div className="flex flex-col space-y-0 items-center">
                        <Image
                            width={200}
                            height={200}
                            className="h-auto w-full flex-shrink-0 rounded-t-lg pb-2"
                            src={imageURL}
                            alt={imageAlt}
                        />
                        <dl className="my-1 flex flex-col">
                            <dd className="text-lg text-white">{soundTitle}</dd>
                        </dl>
                        <button
                            onClick={toggleAudio}
                            type="button"
                            className="rounded-full text-white shadow-sm"
                        >
                            {!play ? (
                                <PlayIcon className="h-10 w-10" aria-hidden="true" />
                            ) : (
                                <PauseIcon className="h-10 w-10" aria-hidden="true" />
                            )}
                        </button>
                        <div className="flex">
                            <input
                                type="range"
                                className="mr-2 w-full accent-cyan-700"
                                min={0}
                                max={MAX}
                                onChange={(e) => handleVolume(e)}
                            />
                            <SpeakerWaveIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
                <audio ref={pokeRef} src={audioSrc} />
        </>
    )
}

export default AudioPlayer;