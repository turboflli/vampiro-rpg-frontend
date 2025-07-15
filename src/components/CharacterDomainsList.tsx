import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDomainByCharacterId, getPlaceByDomainId } from "../services/placeService";
import { Domain, Place } from "../types/place";
import { Link } from "react-router-dom";
interface CharacterDomainsListProps {
    characterId: number;
}
export default function CharacterDomainsList({ characterId }: CharacterDomainsListProps) {
const [domains, setDomains] = useState<Domain[]>([]);
const [mapPlaces, setMapPlaces] = useState<Map<number, Place[]>>(new Map<number, Place[]>());
useEffect(() => {
    getDomainByCharacterId(characterId)
    .then(data => {
        setDomains(data)
        data.map(domain => {
            getPlaceByDomainId(domain.id!)
            .then(data => setMapPlaces(prev => new Map(prev.set(domain.id!, data))))
            .catch(() => alert("Erro ao buscar locais"));
        })
    })
    .catch(() => alert("Erro ao buscar domínios"));
}, []);

    const { t } = useTranslation("place");
    return (
        <div className="w-66 max-h-[500px] overflow-auto bg-white shadow-2xl rounded-lg text-black p-4 self-start">
      <h3 className="text-1xl font-bold mb-4">{t("titleDomain")}</h3>
      {domains.map(domain => (
        <div key={domain.id} className="mb-4">
          <h4 className="font-semibold" style={{ color: domain.color }}>{domain.name}</h4>
          <ul className="list-disc list-inside">
            {mapPlaces.get(domain.id!)?.map(place => (
              <li key={place.id}><Link
              to={`/editPlace/${place.id}`}>
              {place.name}
              </Link></li>
            ))}
          </ul>
        </div>
      ))}
        </div>
    );
}