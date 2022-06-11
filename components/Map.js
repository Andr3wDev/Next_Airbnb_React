import React, {useState, useEffect} from 'react';
import getCenter from 'geolib/es/getCenter';
import getBounds from 'geolib/es/getBounds';
import mapboxgl from '!mapbox-gl'
mapboxgl.accessToken = process.env.mapbox_key;

function Map({searchResults}) {

  useEffect(() => {
    const coordinates = searchResults.map(
      result => ({longitude: result.long,latitude: result.lat})      
    );
    const center = getCenter(coordinates);
    const bounds = getBounds(coordinates);
    
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      center:[center.longitude,center.latitude],
      zoom: 6,
      pitch: 0      
    });

    /* Add markers */
    coordinates.map(item => {    
      const marker = new mapboxgl.Marker()
        .setLngLat([item.longitude, item.latitude])
        .addTo(map);
    });

    /* Set map bounds */
    map.fitBounds([
      [bounds.minLng, bounds.minLat],
      [bounds.maxLng, bounds.maxLat] 
    ],{
        padding: 80
    });

  },[searchResults]);

  return <div id="map" className='flex-grow'/>;
}

export default Map