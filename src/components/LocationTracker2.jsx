import React, { useState, useEffect } from "react";

const LocationTracker2 = () => {
  const apiKey = "R4G5ctQMCOPqzR3WbfrwjQv7FLc8npljpHQTdWdvnEw";
  const [userLocation, setUserLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationText, setLocationText] = useState("");
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  const loadHereMaps = () => {
    if (!window.H) {
      const script = document.createElement("script");
      script.src = `https://js.api.here.com/v3/3.1/mapsjs-core.js`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const script2 = document.createElement("script");
        script2.src = `https://js.api.here.com/v3/3.1/mapsjs-service.js`;
        script2.async = true;
        script2.defer = true;
        document.body.appendChild(script2);

        const script3 = document.createElement("script");
        script3.src = `https://js.api.here.com/v3/3.1/mapsjs-ui.js`;
        script3.async = true;
        script3.defer = true;
        document.body.appendChild(script3);

        const script4 = document.createElement("script");
        script4.src = `https://js.api.here.com/v3/3.1/mapsjs-mapevents.js`;
        script4.async = true;
        script4.defer = true;
        document.body.appendChild(script4);
      };
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    loadHereMaps();
  }, []);

  const searchNearbyVetHospitals = async (latitude, longitude) => {
    try {
      const platform = new window.H.service.Platform({ apikey: apiKey });
      const service = platform.getSearchService();

      return new Promise((resolve, reject) => {
        service.discover({
          at: `${latitude},${longitude}`,
          q: 'veterinary OR animal hospital OR pet hospital',
          limit: 20,
          radius: 5000 // 5km radius
        }, (result) => {
          if (result.items) {
            console.log('Found hospitals:', result.items); // Debug log
            resolve(result.items);
          } else {
            console.log('No hospitals found'); // Debug log
            resolve([]);
          }
        }, (error) => {
          console.error('Search error:', error); // Debug log
          reject(error);
        });
      });
    } catch (error) {
      console.error('Error in searchNearbyVetHospitals:', error);
      return [];
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const platform = new window.H.service.Platform({ apikey: apiKey });
      const service = platform.getSearchService();

      return new Promise((resolve, reject) => {
        service.reverseGeocode(
          {
            at: `${latitude},${longitude}`
          },
          (result) => {
            const address = result.items[0];
            if (address) {
              const formattedAddress = `${address.address.street || ''} ${address.address.houseNumber || ''}, ${address.address.district || ''} ${address.address.city || ''}, ${address.address.countryName || ''}`;
              resolve(formattedAddress.trim());
            } else {
              resolve(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    } catch (error) {
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
  };

  const handleLocationTracking = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setMapVisible(true);
        
        try {
          const [address, hospitals] = await Promise.all([
            getAddressFromCoordinates(latitude, longitude),
            searchNearbyVetHospitals(latitude, longitude)
          ]);
          
          console.log('Found hospitals:', hospitals); // Debug log
          setLocationText(address);
          setNearbyHospitals(hospitals);
        } catch (error) {
          console.error('Error in handleLocationTracking:', error); // Debug log
          setLocationText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
        
        setLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error); // Debug log
        alert("Please enable location services or enter manually.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (userLocation && mapVisible && window.H && nearbyHospitals.length > 0) {
      const platform = new window.H.service.Platform({ apikey: apiKey });
      const defaultLayers = platform.createDefaultLayers();

     
      const map = new window.H.Map(
        document.getElementById("map"),
        defaultLayers.vector.normal.map,
        {
          center: { lat: userLocation.latitude, lng: userLocation.longitude },
          zoom: 13,
        }
      );

     
      const behavior = new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(map)
      );

     
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);

      
      const userMarker = new window.H.map.Marker({
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      }, {
        volatility: true
      });
      map.addObject(userMarker);

    
      const hospitalIcon = new window.H.map.Icon(
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="12" fill="#FF4444"/>
          <path d="M7 12H17M12 7V17" stroke="white" stroke-width="2"/>
        </svg>`,
        { size: { w: 24, h: 24 } }
      );

      
      nearbyHospitals.forEach(hospital => {
        if (hospital.position) {
          const marker = new window.H.map.Marker(
            { lat: hospital.position.lat, lng: hospital.position.lng },
            { icon: hospitalIcon }
          );

          
          const bubbleContent = `
            <div style="padding: 10px; max-width: 200px;">
              <strong style="font-size: 14px;">${hospital.title}</strong>
              <p style="font-size: 12px; margin-top: 5px;">${hospital.address.label}</p>
            </div>
          `;

          
          marker.addEventListener('tap', (evt) => {
            const bubble = new window.H.ui.InfoBubble(
              { lat: hospital.position.lat, lng: hospital.position.lng },
              { content: bubbleContent }
            );
            ui.addBubble(bubble);
          });

          map.addObject(marker);
        }
      });

      
      const group = new window.H.map.Group();
      map.addObject(group);

      return () => {
        map.dispose();
      };
    }
  }, [userLocation, mapVisible, nearbyHospitals]);

  return (
    <div className="flex flex-col min-h-auto bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Find Nearby Veterinary Help
            </h2>
            
            <button
              className={`
                group
                relative
                inline-flex
                items-center
                justify-center
                px-6
                py-2.5
                text-sm
                font-medium
                bg-gradient-to-r
                from-blue-600
                to-blue-700
                text-white
                rounded-lg
                shadow-md
                hover:from-blue-700
                hover:to-blue-800
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                transition-all
                duration-200
                ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'}
              `}
              onClick={handleLocationTracking}
              disabled={loading}
            >
              <span className={`
                absolute
                inset-0
                w-full
                h-full
                rounded-lg
                bg-white/10
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-200
              `}></span>
              <span className="mr-2 text-base">📍</span>
              <span>
                {loading ? 'Getting Location...' : 'Find Nearby Vet Hospitals'}
              </span>
            </button>

            {locationText && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full max-w-xl">
                <div className="flex items-start">
                  <span className="text-gray-500 mr-2">📌</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Current Location:</p>
                    <p className="text-sm text-gray-600">{locationText}</p>
                  </div>
                </div>
              </div>
            )}

            {nearbyHospitals.length > 0 ? (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full max-w-xl">
                <h3 className="text-lg font-semibold mb-3">Nearby Veterinary Hospitals ({nearbyHospitals.length})</h3>
                <div className="space-y-3">
                  {nearbyHospitals.map((hospital, index) => (
                    <div key={index} className="flex items-start p-2 hover:bg-gray-100 rounded">
                      <span className="text-red-500 mr-2">🏥</span>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{hospital.title}</p>
                        <p className="text-sm text-gray-600">{hospital.address.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : locationText && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full max-w-xl">
                <p className="text-sm text-gray-600">No veterinary hospitals found nearby. Try increasing the search radius.</p>
              </div>
            )}
          </div>

          {mapVisible && (
            <div className="mt-6 relative min-h-[480px] rounded-xl overflow-hidden border-2 border-gray-200">
              <div 
                id="map" 
                className="absolute inset-0 w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationTracker2;