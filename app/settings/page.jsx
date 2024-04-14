'use client'
import userAuthentication from "@/app/utils/userAuthentication";
import GettingStarted from "@/app/ui/settings/GettingStarted";

export default function SettingsPage() {
    userAuthentication();

    return (
        <>

            <GettingStarted
                titleText={'Getting Started'}
                content={'Welcome! Here, you will be able to customize your experience with PokéWire Re-Imagined. This page will walk through all of the things you will be able to do so that you can get the most out of your time here.'}
                imageSrc={'/img/profile_settings/GettingStartedIcon.png'}
                imageAlt={'Premiere Ball'}
            />

            <GettingStarted
                titleText={'My Pokémon'}
                content={
                    <div className="flex flex-col items-center">
                    <ul className="text-poke-white list-disc text-left rounded-2xl p-6 mt-3">
                        <li>
                            Set or change your favorite pokémon.
                        </li>

                        <li>
                            Set pokémon picture display preferences
                        </li>
                    </ul>
                    </div>
                }
            />

            <GettingStarted
                titleText={'Change Avatar'}
                content={
                    <div className="flex flex-col items-center">
                    <ul className="text-poke-white list-disc text-left rounded-2xl p-6 mt-3">
                        <li>
                            Upload a profile picture or avatar
                        </li>

                        <li>
                            Change existing profile picture or avatar
                        </li>
                    </ul>
                    </div>
                }
            />

            <GettingStarted
                titleText={'Change Email Address'}
                content={
                    <div className="flex flex-col items-center">
                    <ul className="text-poke-white list-disc text-left rounded-2xl p-6 mt-3">
                        <li>
                            Update email address
                        </li>
                    </ul>
                    </div>
                }
            />

            <GettingStarted
                titleText={'Change Password'}
                content={
                    <div className="flex flex-col items-center">
                    <ul className="text-poke-white list-disc text-left rounded-2xl p-6 mt-3">
                        <li>
                            Update password
                        </li>
                    </ul>
                    </div>
                }
            />

            <GettingStarted
                titleText={'Help'}
                content={
                    <div className="flex flex-col items-center">
                    <ul className="text-poke-white list-disc text-left rounded-2xl p-6 mt-3">
                        <li>
                            Browse FAQ's
                        </li>

                        <li>
                            Submit questions to the dev team
                        </li>

                        <li>
                            Report Bugs / Glitches
                        </li>
                    </ul>
                    </div>
                }
            />

        </>
    )
}