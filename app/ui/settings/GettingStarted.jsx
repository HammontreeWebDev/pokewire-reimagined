import Image from "next/image";

export default function GettingStarted({titleText, content, imageSrc, imageAlt}) {
    return (
      <div className="sm:flex">
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          <Image 
          src={imageSrc}
          className="w-20"
          alt={imageAlt}
          width={1920}
          height={1920}
          />
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