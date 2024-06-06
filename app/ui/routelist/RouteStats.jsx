import { useEffect, useState } from "react";

export default function RouteStats({ selectedPokemon }) {

  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    if (selectedPokemon && selectedPokemon.routes) {
      setRouteData(selectedPokemon.routes);
    } else {
      setRouteData([]);
    }
  }, [selectedPokemon]);

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {routeData?.map((route, index) => (
            <div key={index} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-6 text-gray-400">{`Location: ${route.location_area.name}`}</p>
              <div className="mt-2">
                {route.version_details?.map((version, vIndex) => (
                  <div key={vIndex} className="mb-4">
                    <p className="text-sm font-medium leading-6 text-gray-400">{`Version: ${version.version.name}`}</p>
                    {version.encounter_details.map((detail, dIndex) => (
                      <div key={dIndex} className="mt-2 flex items-baseline gap-x-2">
                        <p className="text-sm text-gray-400">{`Method: ${detail.method.name}`}</p>
                        <p className="text-sm text-gray-400">{`Chance: ${detail.chance}`}</p>
                        <p className="text-sm text-gray-400">{`Min Level: ${detail.min_level}`}</p>
                        <p className="text-sm text-gray-400">{`Max Level: ${detail.max_level}`}</p>
                        {detail.condition_values.length > 0 && (
                          <p className="text-sm text-gray-400">{`Condition: ${detail.condition_values.map(cond => cond.name).join(', ')}`}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
