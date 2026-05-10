// Адаптер. Все иконки переехали в единый реестр @/components/Icon/Icon.jsx.
// MMIcon оставлен ради обратной совместимости с RichMegaMenu — постепенно
// мигрируйте JSX на `<Icon name={kind} />`, и этот файл можно будет удалить.

import { getIconComponent } from "@/components/Icon/Icon";

export default function MMIcon({ kind, size = 16, strokeWidth = 1.6 }) {
  const Cmp = getIconComponent(kind) || getIconComponent("info");
  return <Cmp size={size} strokeWidth={strokeWidth} />;
}
