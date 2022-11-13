import React from 'react';
import { useMap } from 'react-leaflet';

function SetViewOnUpdate({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
  
    return null;
}

export default SetViewOnUpdate;