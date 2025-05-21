import { useState, useEffect } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { useTranslation } from 'react-i18next';
import { Avatar, AccessoryType, ClothingType, EyebrowsType, FacialHairType, MouthType, TopType } from '../types/avatar';
import { Save } from 'lucide-react';

const skinColors = ['614335','ae5d29','d08b5b','edb98a','fd9841','ffdbb4'];
const accessories: AccessoryType[] = [ 'kurt', 'prescription01', 'prescription02', 'round', 'sunglasses', 'wayfarers'];
const clothings: ClothingType[] = ['blazerAndShirt', 'blazerAndSweater', 'collarAndSweater', 'graphicShirt', 'hoodie', 'overall', 'shirtCrewNeck', 'shirtScoopNeck', 'shirtVNeck']; 
const eyebrowsOptions: EyebrowsType[] = ['angryNatural', 'defaultNatural', 'flatNatural', 'frownNatural', 'raisedExcitedNatural', 'sadConcernedNatural', 'unibrowNatural', 'upDownNatural', 'angry', 'default', 'raisedExcited', 'sadConcerned', 'upDown'];
const topOptions: TopType[] = ['bigHair','bob','bun','curly','curvy','dreads','dreads01','dreads02','frida','frizzle','fro','froBand','hat','hijab','longButNotTooLong','miaWallace','shaggy','shaggyMullet','shavedSides','shortCurly','shortFlat','shortRound','shortWaved','sides','straight01','straight02','straightAndStrand','theCaesar','theCaesarAndSidePart','turban','winterHat1','winterHat02','winterHat03','winterHat04'];
const mouthOptions: MouthType[] = ['concerned', 'default', 'grimace', 'sad', 'serious', 'smile', 'screamOpen'];
const facialHairOptions: FacialHairType[] = ['beardLight', 'beardMajestic', 'beardMedium', 'moustacheFancy', 'moustacheMagnum'];

interface Props {
    avatar : Avatar;
    update : (field : string, value : string | undefined) => void;
    saveAvatar : () => void;
}

export default function AvatarCustomizer({avatar, update, saveAvatar}: Props) {
  const { t } = useTranslation('avatar');

  const [svg, setSvg] = useState('');

  useEffect(() => {
    const avatarSvg = createAvatar(avataaars, {
      radius: 40,
      backgroundColor: ['65c9ff'],
      accessories: avatar.accessory != undefined ? [avatar.accessory] : undefined,
      accessoriesProbability: 100,
      accessoriesColor: [avatar.accessoryColor.substring(1)],
      clothesColor: [avatar.clotheColor.substring(1)],
      clothing: [avatar.clothing],
      eyebrows: [avatar.eyebrows],
      eyes: ['surprised'],
      mouth: [avatar.mouth],
      hairColor: [avatar.hairColor.substring(1)],
      skinColor: [avatar.skinColor],
      top: [avatar.top],
      facialHair: avatar.facialHair != undefined ? [avatar.facialHair] : undefined,
      facialHairProbability: 100,
      facialHairColor: [avatar.hairColor.substring(1)]
    }).toString();

    const olhosIndex = avatarSvg.indexOf("M36 22a6 6 0 1 1-12 0 6 6 0 0 1 12 0ZM88 22a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z");
    const svgComOlhosColoridos = avatarSvg.substring(0,olhosIndex+83) + avatar.eyeColor.substring(1) + avatarSvg.substring(olhosIndex+86);

    setSvg(svgComOlhosColoridos);
  }, [
    avatar.accessory, avatar.accessoryColor, avatar.clotheColor, avatar.clothing,
    avatar.eyebrows, avatar.mouth, avatar.hairColor, avatar.skinColor,
    avatar.top, avatar.facialHair, avatar.eyeColor
  ]);

  return (
    <div className="w-66 p-4 max-w-md mx-auto space-y-4 bg-white shadow-2xl rounded-lg overflow-hidden">

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <label className="block font-semibold">{t('hairColor')}</label>
          <input
            type="color"
            value={avatar.hairColor}
            onChange={(e) => update('hairColor', e.target.value)}
            className="w-5 h-5 border-1 border-gray-300 rounded"
          />
        </div>

        <label className="block font-semibold mt-4">{t('skinColor')}</label>
        <select
          value={avatar.skinColor}
          onChange={(e) => update('skinColor', e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        >
          {skinColors.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        <label className="block font-semibold mt-4">{t('accessory')}</label>
        <select
          value={avatar.accessory ?? ''}
          onChange={(e) => update('accessory', e.target.value === '' ? undefined : e.target.value as AccessoryType)}
          className="w-full border border-gray-300 rounded p-2"
        >
            <option value="">Nenhum</option>
          {accessories.map((accessory) => (
            <option key={accessory} value={accessory}>{accessory}</option>
          ))}
        </select>

        <div className="flex items-center space-x-2">
          <label className="block font-semibold">{t('accessoryColor')}</label>
          <input
            type="color"
            value={avatar.accessoryColor}
            onChange={(e) => update('accessoryColor', e.target.value)}
            className="w-5 h-5 border-1 border-gray-300 rounded"
          />
        </div>

        <label className="block font-semibold mt-4">{t('clothing')}</label>
        <select
          value={avatar.clothing}
          onChange={(e) => update('clothing', e.target.value as ClothingType)}
          className="w-full border border-gray-300 rounded p-2"
        >
          {clothings.map((clothing) => (
            <option key={clothing} value={clothing}>{clothing}</option>
          ))}
        </select>

        <div className="flex items-center space-x-2">
          <label className="block font-semibold">{t('clotheColor')}</label>
          <input
            type="color"
            value={avatar.clotheColor}
            onChange={(e) => update('clotheColor', e.target.value)}
            className="w-5 h-5 border-1 border-gray-300 rounded"
          />
        </div>
      </div>

      <label className="block font-semibold mt-4">{t('eyebrows')}</label>
      <select
        value={avatar.eyebrows}
        onChange={(e) => update('eyebrows', e.target.value as EyebrowsType)}
        className="w-full border border-gray-300 rounded p-2"
      >
        {eyebrowsOptions.map((eyebrow) => (
          <option key={eyebrow} value={eyebrow}>{eyebrow}</option>
        ))}
      </select>

      <label className="block font-semibold mt-4">{t('top')}</label>
      <select
        value={avatar.top}
        onChange={(e) => update('top', e.target.value as TopType)}
        className="w-full border border-gray-300 rounded p-2"
      >
        {topOptions.map((top) => (
          <option key={top} value={top}>{top}</option>
        ))}
      </select>

      <label className="block font-semibold mt-4">{t('mouth')}</label>
      <select
        value={avatar.mouth}
        onChange={(e) => update('mouth', e.target.value as MouthType)}
        className="w-full border border-gray-300 rounded p-2"
      >
        {mouthOptions.map((mouth) => (
          <option key={mouth} value={mouth}>{mouth}</option>
        ))}
      </select>

      <label className="block font-semibold mt-4">{t('facialHair')}</label>
      <select
        value={avatar.facialHair ?? ''}
        onChange={(e) => update('facialHair', e.target.value === '' ? undefined : e.target.value as FacialHairType)}
        className="w-full border border-gray-300 rounded p-2"
      >
        <option value="">Nenhuma</option>
        {facialHairOptions.map((facialHair) => (
          <option key={facialHair} value={facialHair}>{facialHair}</option>
        ))}
      </select>

      <div className="flex items-center space-x-2">
        <label className="block font-semibold">{t('eyeColor')}</label>
        <input
          type="color"
          value={avatar.eyeColor}
          onChange={(e) => update('eyeColor', e.target.value)}
          className="w-5 h-5 border-1 border-gray-300 rounded"
        />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">{t('preview')}</h3>
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
          alt="Avatar"
          className="w-48 h-48 border rounded mx-auto"
        />
      </div>
      <button
        onClick={saveAvatar}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 flex justify-center items-center gap-2">
          <Save size={20} />
        {t('saveAvatar')}
      </button>
    </div>
    
  );
}
