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
                content={'This section will allow you to . . . '}
                imageSrc={'/img/profile_settings/MyPokemonIcon.png'}
                imageAlt={'Park Ball'}
            />

            <GettingStarted
                titleText={'Change Avatar'}
                content={'This section will allow you to . . . '}
                imageSrc={'/img/profile_settings/ChangeAvatarIcon.png'}
                imageAlt={'Dream Ball'}
            />

            <GettingStarted
                titleText={'Change Email Address'}
                content={'This section will allow you to . . . '}
                imageSrc={'/img/profile_settings/ChangeEmailAddressIcon.png'}
                imageAlt={'Sports Ball'}
            />

            <GettingStarted
                titleText={'Change Password'}
                content={'This section will allow you to . . . '}
                imageSrc={'/img/profile_settings/ChangePasswordIcon.png'}
                imageAlt={'Captains Ball'}
            />

            <GettingStarted
                titleText={'Help'}
                content={'This section will allow you to . . . '}
                imageSrc={'/img/profile_settings/HelpIcon.png'}
                imageAlt={'Ultra Ball'}
            />

        </>
    )
}