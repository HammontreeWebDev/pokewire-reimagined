export default function GettingStarted({titleText, content}) {
    return (
      <div className="sm:flex">
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          <svg
            className="h-32 w-full border border-gray-300 bg-white text-gray-300 sm:w-32"
            preserveAspectRatio="none"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-bold text-poke-yellow">{titleText}</h4>
          <p className="mt-1 text-poke-white">
            {content}
          </p>
        </div>
      </div>
    )
  }  