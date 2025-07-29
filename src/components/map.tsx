import { useEffect, useState } from "react";
import { getAllPlaces, getAllDomains } from "../services/placeService";
import { getAllBlocks, createBlock, deleteBlock } from "../services/blockService";
import { Place, Domain } from "../types/place";
import { Block } from "../types/block";
import { MapContainer, Marker, Popup, Polygon, Tooltip, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import PlaceIconType from "./PlaceIconType";
import { PenLine, RulerDimensionLine, Save, Trash, Undo } from "lucide-react";
import { useTranslation } from "react-i18next";

// Função que converte suas coordenadas para o CRS.Simple
function toLatLng(x: number, y: number) {
    const lat = y*10
    const lng = x*10
    return L.latLng(lat, lng); // Leaflet usa (lat, lng) == (y, x)
}

const lines = [];

// Grade vertical
for (let x = -2000; x <= 2000; x += 100) {
  lines.push([
    [2000, x],
    [-2000, x],
  ]);
}

// Grade horizontal
for (let y = -2000; y <= 2000; y += 100) {
  lines.push([
    [y, -2000],
    [y, 2000],
  ]);
}

function MapClickClear({ onClear }: { onClear: (e: L.LeafletEvent) => void }) {
    useMapEvents({
      click: (e: L.LeafletEvent) => {
        onClear(e);
      },
    });
    return null;
  }

export default function Map() {

    const { t } = useTranslation("place");
    

    const [places, setPlaces] = useState<Place[]>([]);
    const [domains, setDomains] = useState<Domain[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [activedFunction, setActivedFunction] = useState<string>("ruler");
    const [coordinates, setCoordinates] = useState<L.LatLng[]>([]);
    const [blocks, setBlocks] = useState<Block[]>([]);

    useEffect(() => {
        getAllPlaces()
            .then(data => {
                setPlaces(data)
            })
            .catch(() => alert("Erro ao buscar lugares"));
        getAllDomains()
            .then(data => {
                setDomains(data)
            })
            .catch(() => alert("Erro ao buscar domínios"));
        getAllBlocks()
            .then(data => {
                setBlocks(data)
            })
            .catch(() => alert("Erro ao buscar blocos"));
    }, []);

    const newPolygonLayout = {color: "#777744",
            fillColor: "#BBBB77",
            fillOpacity: 0.5};
        
    

    const getLucideIcon = (place: Place) => {
        const color = domains.find((d) => d.id === place.domainId)?.color || "#777777"
        const svgString = renderToStaticMarkup(<PlaceIconType type={place.type} style={{ color: color, height: "24px", width: "24px" }} />);
        const selectedBorder = selectedIds.includes(place.id!) ? "2px solid blue" : ""
        return L.divIcon({
            html: `<div style="padding:2px;width:32px;height:32px;border-radius:50%;border:${selectedBorder}">${svgString}</div>`,
            className: "", // remove estilo padrão do Leaflet
            iconSize: [36, 36],
            iconAnchor: [12, 0],
        });
    }

    const editButtons = () => {
        if (activedFunction === "pen") {
            return (
                <div className="flex justify-start space-x-2">
                    <button onClick={() => undoCoordinates()} className="bg-gray-500 hover:bg-gray-600 text-white rounded">
                        <Undo className="h-5 w-5" />
                    </button>
                    <button onClick={() => savePolygon()} className="bg-green-500 hover:bg-green-600 text-white rounded">
                        <Save className="h-5 w-5" />
                    </button>
                    <button onClick={() => setCoordinates([])} className="bg-red-500 hover:bg-red-600 text-white rounded">
                        <Trash className="h-5 w-5" />
                    </button>
                </div>
            );
        }
        return null;
    }

   const handleClickMap = (e: L.LeafletEvent) => {
        if (activedFunction === "pen") {
            handlePenClickMap(e);
        } else if (activedFunction === "ruler") {
            handleRulerClickMap(e);
        }
    }

    const handlePenClickMap = (e: L.LeafletEvent) => {
        e.latlng.lng = Math.round(e.latlng.lng);
        e.latlng.lat = Math.round(e.latlng.lat);
        setCoordinates([...coordinates, e.latlng]);
    }

    const undoCoordinates = () => {
        setCoordinates(coordinates.slice(0, -1));
    }

    const savePolygon = () => {
        createBlock({
            id: undefined,
            color: "#777777",
            coordinates: coordinates.map((c) => [c.lat, c.lng]),
        })
        .then(() => {
            setCoordinates([]);
            getAllBlocks()
                .then(data => {
                    setBlocks(data)
                })
                .catch(() => alert("Erro ao buscar blocos"));
        })
    }

    const removeBlock = (id: number) => {
        deleteBlock(id)
            .then(() => {
                getAllBlocks()
                    .then(data => {
                        setBlocks(data)
                    })
                    .catch(() => alert("Erro ao buscar blocos"));
            })
            .catch(() => alert("Erro ao deletar bloco"));
    }

    const handleRulerClickMap = (e: L.LeafletEvent) => {
        setSelectedIds([])
    }

    const handleClick = (place: Place) => {
        if (activedFunction === "pen") {
            handlePenClickPlace(place);
        } else if (activedFunction === "ruler") {
            handleRulerClickPlace(place);
        }
    }

    const handlePenClickPlace = (place: Place) => {
        window.open(`/editPlace/${place.id}`, '_blank');
    }

    const handleRulerClickPlace = (place: Place) => {
        if (selectedIds.includes(place.id!)) {
            setSelectedIds((prev) =>
                prev.filter((pid) => pid !== place.id)
            );
            return;
        }
        if (selectedIds.length == 0) {
            setSelectedIds([place.id!])
            return;
        } if (selectedIds.length == 2) {
            setSelectedIds([place.id!])
        }
        setSelectedIds([...selectedIds, place.id!])
    }

    const calculateDistance = () => {
        var dist = 0;
        const selectedCoordinates = getSelectedPlacesCoordinates()
        for (let i = 0; i < selectedIds.length - 1; i++) {
            dist += Math.sqrt(Math.pow(selectedCoordinates[i].lng - selectedCoordinates[i + 1].lng, 2) + Math.pow(selectedCoordinates[i].lat - selectedCoordinates[i + 1].lat, 2))
        }
        return dist;
    }
    

    const getSelectedPlacesCoordinates = () => {
        const selectedCoordinates = [];
        for (const id of selectedIds) {
            const place = places.find((p) => p.id === id);
            if (place) {
                selectedCoordinates.push(toLatLng(place.x_coordinate!, place.y_coordinate!));
            }
        }
        return selectedCoordinates;
    }

    const renderLines = () => {
        return lines.map((line, i) => (
                <Polyline
                key={i}
                positions={line}
                pathOptions={{ color: "#ccc", weight: 1 }}
                />
            ))
    }

    const renderBlocks = () => {
        return blocks.map((block, i) => (
            <Polygon pathOptions={{ color: block.color, weight: 3 }} positions={block.coordinates.map((c) => L.latLng(c[0], c[1]))} >
                <Popup>                            
                    <button onClick={() => removeBlock(block.id!)} className="flex items-center space-x-2">
                    <Trash className="h-5 w-5 text-red-500" />
                        {t("remove")}
                    </button>
                    </Popup>
            </Polygon>
        ))
    }

    const renderPlaces = () => {
        return places.map((place, i) => (
            <Marker key={i} position={toLatLng(place.x_coordinate!, place.y_coordinate!)} icon={getLucideIcon(place)}
            eventHandlers={{
                click: () => handleClick(place),
            }}
            >
            <Tooltip direction="top" opacity={1}>{place.name}</Tooltip>
            </Marker>
        ))
    }

    return (
        <div className="max-w-4xl h-screen mx-auto p-6 bg-white shadow-2xl rounded-lg text-black space-y-6 justify-center items-center">
            <h2 className="text-2xl font-bold text-center">Mapa</h2>
                <div className="flex justify-start space-x-2">
                    <button onClick={() => setActivedFunction("pen")} className={activedFunction === "pen" ? "selected" : ""}>
                        <PenLine className="h-8 w-8" />
                    </button>
                    <button onClick={() => setActivedFunction("ruler")} className={activedFunction === "ruler" ? "selected" : ""}>
                        <RulerDimensionLine className="h-8 w-8" />
                    </button>
                </div>
                {editButtons()}
                {selectedIds.length > 1 && (
                    <p>{t("distance")}: {calculateDistance()}</p>
                )}
                <MapContainer
                center={[0, 0]}
                zoom={-1}
                style={{ height: "90%", width: "100%", border: "1px solid gray", backgroundColor: "#ffffff" }}
                minZoom={-5}
                maxZoom={5}
                crs={L.CRS.Simple}
                maxBounds={L.latLngBounds([[-2100, -2100], [2100, 2100]])}
                >
                {renderLines()}
                <Polyline positions={[[0, -2000], [0, 2000]]} pathOptions={{ color: "black", weight: 2 }} />
                <Polyline positions={[[-2000, 0], [2000, 0]]} pathOptions={{ color: "black", weight: 2 }} />
                {renderBlocks()}
                {renderPlaces()}
                {selectedIds.length > 1 && (
                    <Polyline
                    positions={getSelectedPlacesCoordinates()}
                    pathOptions={{ color: "red", weight: 3 }}
                    />
                )}

                {coordinates.length > 0 && (
                <Polygon pathOptions={newPolygonLayout} positions={coordinates} />
                )}

                <MapClickClear onClear={(e) => handleClickMap(e)} />
                
                </MapContainer>
          </div>
          );
}