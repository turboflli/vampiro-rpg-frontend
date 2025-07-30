import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Plus, Trash } from "lucide-react";
import { getAllPlaces, getPlaceByName, getAllDomains, deletePlace } from "../services/placeService";
import { useState, useEffect } from "react";
import { Place, Domain } from "../types/place";
import PlaceIconType from "./PlaceIconType";

export default function PlaceList() {
    const { t } = useTranslation("place");
    const [places, setPlaces] = useState<Place[]>([]);
    const [domains, setDomains] = useState<Domain[]>([]);
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
    }, []);
    const findPlaceByName = (name: string) => {
        if (!name) {
            getAllPlaces()
                .then(data => setPlaces(data))
                .catch(() => alert("Erro ao buscar lugares"));
            return;
        }
        getPlaceByName(name)
            .then(data => setPlaces(data))
            .catch(() => alert("Erro ao buscar lugares"));
    }

    const removePlace = (id: number) => {
        deletePlace(id)
            .then(() => {
                getAllPlaces()
                    .then(data => setPlaces(data))
                    .catch(() => alert("Erro ao buscar lugares"));
            })
            .catch(() => alert("Erro ao deletar lugar"));
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 text-black">
            <h1 className="text-2xl font-bold text-center mb-6">{t("titlePlace")}</h1>
            <Link to="/createPlace" className="flex items-center text-blue-600 hover:underline">
                <Plus className="h-5 w-5 mr-2" /> {t("newPlace")}
            </Link>
            <input type="text" placeholder={t("searchPlace")} onChange={e => {
                const timeout = setTimeout(() => findPlaceByName(e.target.value), 500);
                return () => clearTimeout(timeout);
            }} className="w-full p-2 border border-gray-300 rounded mb-4"/>
            <div className="grid grid-cols-2 gap-4">
                {places.map(place => (
                  <div className="relative border border-2 rounded overflow-hidden hover:bg-gray-100"
                  style={{
                    borderColor: domains.find((d) => d.id === place.domainId)?.color,
                    backgroundImage: `url('${place.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>
                    
                    {/* Overlay escuro/branco transparente */}
                    <div className="absolute inset-0 bg-white bg-opacity-70 pointer-events-none" />
                  
                    {/* Conteúdo visível acima da imagem */}
                    <div className="relative z-10 p-4 text-black">
                      <Link
                        to={`/editPlace/${place.id}`}
                        key={place.id}
                      >
                      <h2 className="flex items-center gap-2 text-lg font-semibold">
                      
                        <PlaceIconType
                          type={place.type}
                          style={{
                            color: domains.find((domain) => domain.id === place.domainId)?.color,
                          }}
                        />
                        {place.name}
                      </h2>
                      </Link>
                      <p>
                        {t("domain")}: {domains.find((domain) => domain.id === place.domainId)?.name}
                      </p>
                      <p>{t("description")}: {place.description}</p>
                      <ul className="list-disc pl-6">
                        {place.subPlaces.map((subPlace, index) => (
                          <li key={index}>{subPlace.name}</li>
                        ))}
                      </ul>
                    </div>
                  
                  <button onClick={() => removePlace(place.id!)} className="bg-red-500 hover:bg-red-600 text-white rounded absolute z-10 bottom-2 right-2">
                        <Trash className="h-5 w-5" />
                      </button>
                  </div>                  
                ))}
            </div>
        </div>
    );
}