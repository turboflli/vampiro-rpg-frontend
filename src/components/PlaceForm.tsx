import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Place, Domain, PlaceType } from "../types/place";
import { createPlace, updatePlace, getPlace } from "../services/placeService";
import { useNavigate, useParams } from "react-router-dom";
import { initialPlace } from "../types/initials";
import { getAllDomains } from "../services/placeService";
import PlaceTypeSelect from "./PlaceTypeSelect.tsx";
import { Plus, Trash } from "lucide-react";

export default function PlaceForm() {
    const { t } = useTranslation("place");
    const navigate = useNavigate();
    const [place, setPlace] = useState<Place>(initialPlace);
    const { id } = useParams();

    const [domains, setDomains] = useState<Domain[]>([]);
    
    useEffect(() => {
        getAllDomains()
            .then(data => setDomains(data))
            .catch(() => alert("Erro ao buscar domínios"));
    }, []);
    
    useEffect(() => {
        if (id) {
            getPlace(Number(id))
                .then(data => setPlace(data))
                .catch(() => alert("Erro ao buscar lugar"));
        }
    }, [id]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            updatePlace(place)
            .then(() => alert(t('placeUpdated')))
            .catch(() => alert(t('errorUpdatingPlace')));
            navigate("/place");
        } else {
            createPlace(place)
            .then(() => alert(t('placeCreated')))
            .catch(() => alert(t('errorCreatingPlace')));
            navigate("/place");
        }
    }

    const addSubPlace = () => {
        setPlace({ ...place, subPlaces: [...place.subPlaces, { name: "", description: ""} ] });
    }

    const removeSubPlace = (i: number) => {
        const copy = [...place.subPlaces];
        copy.splice(i, 1);
        setPlace({ ...place, subPlaces: copy });
    }
    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg text-black space-y-6 ">
            <h1 className="text-2xl font-bold text-center mb-6">{t('place')}</h1>
            <div className="flex items-center gap-4">
                <input type="text" placeholder={t('name')} value={place.name} onChange={e => setPlace({ ...place, name: e.target.value })} className="border p-2 rounded bg-white w-1/2" required/>
                <PlaceTypeSelect onChange={(value) => setPlace({ ...place, type: value as PlaceType })} value={place.type} />
            </div>
            <div className="flex items-center gap-4">
                <textarea placeholder={t('description')} value={place.description} onChange={e => setPlace({ ...place, description: e.target.value })} className="border p-2 rounded bg-white w-full" required/>
            </div>
            <div className="flex items-center gap-4">
                <select value={place.domainId} onChange={e => setPlace({ ...place, domainId: Number(e.target.value) })} className="border p-2 rounded bg-white w-1/2">
                    <option value="">{t('selectDomain')}</option>
                    {domains.map(domain => (
                        <option key={domain.id} value={domain.id} style={{ color: domain.color }}>{domain.name}</option>
                    ))}
                </select>
                <fieldset className="flex items-center gap-2 w-1/4">
                    <label>X:</label>
                    <input type="number" placeholder="X" value={place.x_coordinate?.toString() || ""} onChange={e => {
                        const val = e.target.value;
                        setPlace({ ...place, x_coordinate: val === "" ? null : Number(val) });
                    }} className="border p-2 rounded bg-white " required/>
                </fieldset>
                <fieldset className="flex items-center gap-2 w-1/4">
                    <label>Y:</label>
                    <input type="number" placeholder="Y" value={place.y_coordinate?.toString() || ""} onChange={e => {
                        const val = e.target.value;
                        setPlace({ ...place, y_coordinate: val === "" ? null : Number(val) });
                    }} className="border p-2 rounded bg-white " required/>
                </fieldset>
            </div>
            <div className="flex items-center flex-col gap-4">
                <input type="text" placeholder={t('image')} value={place.image} onChange={e => setPlace({ ...place, image: e.target.value })} className="border p-2 rounded bg-white w-full" />
                {place.image && (
                    <img
                        src={place.image}
                        alt="Preview"
                        className="max-h-64 mx-auto mt-4 rounded border shadow"
                    />
                )}

            </div>
            <div className="mt-6">
                <legend className="text-lg font-semibold mb-2 text-center">{t('subPlaces')}</legend>
                <div className="grid grid-cols-1 gap-4 ">
                    {place.subPlaces.map((d, i) => (
                        <div key={i} className="flex gap-4 mb-2">
                            <input className="border p-2 rounded bg-white flex-1 w-1/4" placeholder={t('name')} value={d.name} onChange={e => setPlace({ ...place, subPlaces: place.subPlaces.map((subPlace, index) => index === i ? { ...subPlace, name: e.target.value } : subPlace) })} />
                            <textarea placeholder={t('description')} value={d.description} onChange={e => setPlace({ ...place, subPlaces: place.subPlaces.map((subPlace, index) => index === i ? { ...subPlace, description: e.target.value } : subPlace) })} className="border p-2 rounded bg-white w-3/4" />
                            <button type="button" onClick={() => removeSubPlace(i)} className="text-red-500" data-testid="remove-discipline"><Trash size={16} /></button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addSubPlace} className="mt-2 text-blue-600 flex items-center gap-2"><Plus size={16} /> {t('addSubPlace')}</button>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">{t('create')}</button>
        </form>
    );
}