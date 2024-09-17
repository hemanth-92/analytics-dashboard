export type UserPurchaseProps = {
  name: string;
  email: string;
  image: any;
  salesAmount: string;
};
export default function UserPurchaseCard(props: UserPurchaseProps) {
  const defaultImage = "./mesh.jpg";
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full">
          <img
            width={300}
            height={300}
            src={props.image || defaultImage}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap opacity-30 sm:w-auto">
            {props.email}
          </div>
        </div>
      </section>
      <p className="text-sm">{props.salesAmount}</p>
    </div>
  );
}
