import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function Details() {
    const { data: session, status } = useSession();

    const { pokemon } = useParams();
    
    console.log(pokemon)

    return (
        <div className="bg-poke-black w-full">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-poke-white">
                        Wiré
                        <span className="text-poke-red">
                            Dex
                        </span></h2>

                    <a href="/wiredex/my-pokemon" className="hidden text-sm font-semibold text-poke-blue hover:text-[var(--poke-yellow)] sm:block">
                        <span aria-hidden="true"> &larr;</span>
                        &nbsp;Back
                    </a>

                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                    {
                        status === "loading"
                            ?
                            <p className="text-poke-white anitmate-pulse"> . . . Loading</p>
                            :
                            <>
                                {/* // ! Display Pokemon that is being queried */}
                                <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                                    {/* 
                                                <img
                                                    src={}
                                                    alt={}
                                                    className="object-cover object-center group-hover:opacity-75"
                                                /> */}

                                    <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                                    <div className="flex items-end p-6">
                                        <div>
                                            <h3 className="font-semibold text-white">

                                                <span className="absolute inset-0" />
                                                { }

                                            </h3>
                                            <p aria-hidden="true" className="mt-1 text-sm text-white">
                                                View Stats
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>

                <div className="mt-6 sm:hidden">
                    <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        Browse all categories
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
