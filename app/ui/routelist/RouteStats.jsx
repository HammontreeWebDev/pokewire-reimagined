import { useEffect, useState } from "react";
import { ArrowsPointingOut, XMarkIcon } from "../svg/svgImagesHelper";

export default function RouteStats({ selectedPokemon }) {
  const [routeData, setRouteData] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (selectedPokemon && selectedPokemon.routes) {
      setRouteData(selectedPokemon.routes);
      setExpandedSections({}); // Reset expanded sections
    } else {
      setRouteData([]);
      setExpandedSections({}); // Reset expanded sections
    }
  }, [selectedPokemon]);  

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => { console.log("Expanded Section: ", expandedSections) }, [expandedSections]);

  return (
    <div className="bg-poke-black min-h-screen overflow-y-auto">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex flex-col gap-4">
          {routeData?.map((route, index, e) => (
            <div key={index} className="bg-dark-yellow my-2 px-4 py-4 rounded-2xl box-shadow-rb">
              <div className={`bg-poke-black px-4 py-4 ${expandedSections[index] ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                <button
                  className="text-poke-white"
                  onClick={() => toggleSection(index)}>
                    {
                      expandedSections[index]
                      ?
                      <XMarkIcon />
                      :
                      <ArrowsPointingOut />
                    }
                </button>
                <h2 className="text-2xl text-poke-red text-center font-bold">Location:</h2>
                <p className="text-lg font-medium leading-6 text-poke-white text-center">
                  {route.location_area.name
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </p>
              </div>
              {expandedSections[index] && (
                <div className="bg-poke-black rounded-2xl">
                  {route.version_details?.map((version, vIndex) => (
                    <div key={vIndex} className="bg-poke-black px-4 py-4 border-t border-[var(--poke-white)] rounded-b-2xl">

                      <p className="text-lg text-poke-blue text-left font-bold">Version:&nbsp;
                        <span className="text-md font-medium text-poke-white text-left">
                          {version.version.name
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </span>
                      </p>

                      <p className="text-lg text-poke-yellow text-left font-bold">Max Chance Of Encounter:&nbsp;
                        <span className="text-md font-medium text-poke-white text-left">
                          {`${version.max_chance}%`}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
