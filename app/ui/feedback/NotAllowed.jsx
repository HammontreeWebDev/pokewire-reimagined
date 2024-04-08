import Image from "next/image";

export default function NotAllowed() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="relative isolate min-h-full">
            {/* Photo by Carolina Castilla Arias: https://www.pexels.com/photo/close-up-photo-of-pokemon-pikachu-figurine-1716861/ */}
          <Image
            src={'/img/feedback/pikachu-stop.jpg'}
            alt="pikachu figurine"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
            width={2976}
            height={1984}
          />
          <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <Image
                src={'/img/logos/poke-logo.png'}
                alt={"Poke Ball"}
                className="mx-auto h-16 w-auto"
                width={1920}
                height={1920}
            />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-poke-red bg-poke-black rounded-2xl sm:text-5xl">Access Denied!</h1>
            <p className="mt-4 text-base text-poke-black bg-poke-white rounded-2xl sm:mt-6">You have either been logged out or you tried to access something you shouldn't have. . .</p>
            <div className="mt-10 flex justify-center">
              <a href="/login" className="text-sm font-semibold leading-7 text-white">
                <span aria-hidden="true">&larr;</span> Log In
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }