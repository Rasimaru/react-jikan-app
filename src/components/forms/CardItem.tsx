export type ItemProps = {
  id: number;
  name: string;
  email: string;
  picture?: string;
  country: string;
};

function CardItem({ item }: { item: ItemProps }) {
  return (
    <div
      key={item.id}
      className="p-4 flex flex-col gap-1 items-start justify-start rounded shadow min-w-[300px] min-h-[300px]"
    >
      <p>Name: {item.name}</p>
      <p>Email: {item.email}</p>
      <p>Country: {item.country}</p>
      {item.picture && (
        <img src={item.picture} alt="preview" className="h-30 object-contain mt-2 rounded w-full" />
      )}
    </div>
  );
}
export default CardItem;
