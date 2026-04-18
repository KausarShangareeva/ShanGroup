import ComingSoon from "@/Pages/ComingSoon/ComingSoon";

export const metadata = {
  title: "Комьюнити — ShanGroup",
  description: "Подробная информация о жилом комьюнити в ОАЭ.",
};

export default function Page({ params }) {
  return (
    <ComingSoon
      title="Страница комьюнити"
      description="Полная информация об этом районе появится совсем скоро — планировки, инфраструктура и актуальные объекты."
    />
  );
}
