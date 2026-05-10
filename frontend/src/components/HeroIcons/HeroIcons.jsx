// Адаптер обратной совместимости. Все иконки теперь живут в одном реестре
// в @/components/Icon/Icon.jsx; этот файл оставлен только чтобы старые импорты
// `import { IcSearch, IcClose, ... } from "@/components/HeroIcons/HeroIcons"`
// продолжали работать без правок в десятках компонентов.
//
// Постепенно мигрируйте на `<Icon name="search" />` и удаляйте именованный
// импорт — когда импортов не останется, этот файл можно удалить.

import { getIconComponent } from "@/components/Icon/Icon";

function adapter(name) {
  const Cmp = getIconComponent(name);
  // eslint-disable-next-line react/display-name
  return (props) => (Cmp ? <Cmp {...props} /> : null);
}

export const IcChevron  = adapter("chevron");
export const IcSearch   = adapter("search");
export const IcPin      = adapter("pin");
export const IcDollar   = adapter("dollar");
export const IcBed      = adapter("bed");
export const IcSliders  = adapter("sliders");
export const IcClose    = adapter("close");
export const IcCheck    = adapter("check");
export const IcPhone    = adapter("phone");
export const IcCalendar = adapter("calendar");
export const IcTrend    = adapter("trend");
export const IcVerified = adapter("verified");
export const IcBuilding = adapter("building");
export const IcHeart    = adapter("heart");
export const IcArrow    = adapter("arrow");
