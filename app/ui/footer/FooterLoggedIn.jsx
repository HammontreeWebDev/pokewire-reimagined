import Image from 'next/image';

const navigation = {
    pokefinder: [
        { name: 'Find Pokémon', href: '/pokefinder' },
    ],
    wiredex: [
        { name: 'Preview', href: '/wiredex' },
        { name: 'My Pokémon', href: '/wiredex/my-pokemon' },
    ],
    gamedex: [
        { name: 'Find Games', href: '/gamedex' },
        { name: 'My Games', href: '/gamedex' },

    ],
    routelist: [
        { name: 'Search Routes', href: '/routelist' },
        { name: 'My Routes', href: '/routelist' },

    ],
}

export default function FooterLoggedIn() {
    return (
        <footer className="bg-gradient-to-tr from-[var(--poke-blue)] to-transparent antialiased" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Image
                            src="/img/logos/poke-logo.png"
                            alt="pokewire reimagined"
                            width={50}
                            height={50}
                        />
                        <p className="text-sm leading-6 text-gray-300">
                            A re-imagining of

                            <a href='https://luckysal.github.io/pokewire/index.html'>
                            <span className="font-extrabold text-poke-white hover:animate-pulse">
                                &nbsp;Poké
                                <span className="text-poke-red">
                                    Wire
                                </span>
                            </span>
                            </a>

                            , originally a collaborative project built by students from The University Of Central Florida.
                        </p>
                        <p className="text-sm leading-6 text-gray-300">
                            Powered by
                            <span className="font-extrabold text-poke-white">
                                &nbsp;Poké
                                <span className="text-poke-red">
                                    API
                                </span>
                            </span>
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Poké
                                    <span className="text-poke-red">
                                        Finder
                                    </span>
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.pokefinder.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Wiré
                                    <span className="text-poke-red">
                                        Dex
                                    </span>
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.wiredex.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Gamé
                                    <span className="text-poke-red">
                                        Dex
                                    </span>
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.gamedex.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Routé
                                    <span className="text-poke-red">
                                        List
                                    </span>
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.routelist.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-poke-white">
                        &copy; 2024 Hammontree Full-Stack Solutions LLC. All rights reserved.
                        </p>
                </div>
            </div>
        </footer>
    )
}
