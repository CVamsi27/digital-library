import { CardAddModal, CardCustom } from "ui";

export default function Page({ params }: { params: { category: string } }): JSX.Element {
  return (
    <>
      <div className="flex justify-end mt-4 mr-4">
        <CardAddModal/>
      </div>
      <CardCustom />
    </>
  );
}
