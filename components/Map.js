import React, {useState, useEffect} from 'react';
import getCenter from 'geolib/es/getCenter';
import getBounds from 'geolib/es/getBounds';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

function Map({searchResults}) {

  const coordinates = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat
  }));

  const center = getCenter(coordinates);
  const bounds = getBounds(coordinates);

  const [selectedLocation, setSelectedLocation] = useState({});
  const [viewport, setViewport] = useState({    
    width:"100%",
    height:"100%",
    latitude:center.latitude,
    longitude:center.longitude,
    zoom:10
  });

  return (
    <ReactMapGL
      mapStyle={process.env.map_style}
      mapboxAccessToken={process.env.map_key}
      onMove={evt => setViewport(evt.viewport)}
      fitBounds={bounds}
      {...viewport}>
        {
          searchResults.map(result => (
            <div key={result.long}>
              <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}>
                <p 
                  role="img"
                  onClick={() => setSelectedLocation(result)}
                  className="cursor-pointer text-2xl animate-bounce"
                  aria-label="push-pin">
                  <span role="img" aria-label="sheep">📌</span>
                </p>
              </Marker>             
                
              {selectedLocation.long === result.long ? (
                  /* Show popup onclick */
                  <Popup
                    onClose={() => setSelectedLocation({})}
                    closeOnClick={true}
                    longitude={result.long}
                    latitude={result.lat}>
                    {result.title}
                  </Popup>
              ) : false } 
            </div>
          ))
        }
    </ReactMapGL>
  );
}

export default Map