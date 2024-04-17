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
                <div className="bg-poke-black flex h-fit max-w-fit flex-col rounded-2xl pb-4 text-center shadow">
                    <div className="relative flex flex-col space-y-0">
                        <Image
                            width={200}
                            height={200}
                            className="mx-auto max-h-48 w-full flex-shrink-0 rounded-t-lg pb-2"
                            src={imageURL}
                            alt={imageAlt}
                        />
                        <button
                            onClick={toggleAudio}
                            type="button"
                            className="absolute right-5 left-0 top-[15%] m-auto w-9 rounded-full p-2 text-white shadow-sm"
                        >
                            {!play ? (
                                <PlayIcon className="h-12 w-12" aria-hidden="true" />
                            ) : (
                                <PauseIcon className="h-12 w-12" aria-hidden="true" />
                            )}
                        </button>
                        <dl className="mt-1 flex flex-col p-4 ">
                            <dd className="text-lg text-white">{soundTitle}</dd>
                        </dl>
                        <div className="mx-4 flex">
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