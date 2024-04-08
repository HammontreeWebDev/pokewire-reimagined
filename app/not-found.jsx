// * Default Page for notFound() errors or URL pathing errors
import Image from "next/image";

export default function PageNotFound() {

    return (
        <>
      <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-dark-blue lg:grid-cols-[max(50%,36rem),1fr]">
        <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
          <a href="/login">
            <span className="sr-only">PokéWire Re-Imagined</span>
            <img
              className="h-10 w-auto sm:h-12"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </header>
        <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base font-semibold leading-8 text-poke-red">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-poke-black sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-poke-white">
              Sorry, we were not able to find the page you requested.
            </p>
            <div className="mt-10">
              <a href="/" className="text-sm font-semibold leading-7 text-poke-yellow">
                <span aria-hidden="true">&larr;</span> Back to home
              </a>
            </div>
          </div>
        </main>
        <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
          <div className="border-t border-gray-100 bg-dark-yellow py-10">
            <nav className="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm leading-7 text-poke-white lg:px-8">
              <a href="/login">Sign In</a>
              <svg viewBox="0 0 2 2" aria-hidden="true" className="h-0.5 w-0.5 fill-gray-300">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <a href="/signup">Sign Up</a>
            </nav>
          </div>
        </footer>
        <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
            {/* Photo by Koen  van den Reijen : https://www.pexels.com/photo/a-close-up-shot-of-a-sad-pikachu-stuffed-toy-6397725/ */}
          <Image
            src="/img/feedback/pikachu-sad.jpg"
            alt="sad pikachu"
            className="absolute inset-0 h-full w-full object-cover"
            width={3076}
            height={4614}
            //  w 3076 h 4614
          />
        </div>
      </div>
    </>
  )
}