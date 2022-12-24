import { useId } from "react";
import { formatIDR } from "utils/format";

export type TopUpCategory = {
  _id: string;
  name: string;
  totalSpent: number;
};

export default function TopUpCategories(props: {
  className: string;
  categories: readonly TopUpCategory[];
}) {
  let categories = [...props.categories];

  if (categories.length > 3) {
    const firstCategory = categories.shift() as TopUpCategory;
    const secondCategory = categories.shift() as TopUpCategory;
    const otherCategories: TopUpCategory = {
      _id: crypto.randomUUID(),
      name: "Other Categories",
      totalSpent: categories.reduce((acc, cur) => acc + cur.totalSpent, 0),
    };
    categories = [firstCategory, secondCategory, otherCategories];
  }

  return (
    <section className={props.className}>
      <h2 className="text-lg fw-medium color-palette-1 mb-14">
        Top Up Categories
      </h2>

      <div className="main-content">
        <div className="row">
          {categories.map((category) => (
            <div
              className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4"
              key={category._id}
            >
              <TopUpCategory
                name={category.name}
                totalSpent={category.totalSpent}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopUpCategory(props: Pick<TopUpCategory, "name" | "totalSpent">) {
  return (
    <div className="categories-card">
      <div className="d-flex align-items-center mb-24">
        <CategoryIcon />
        <p className="color-palette-1 mb-0 ms-12">{props.name}</p>
      </div>
      <div>
        <p className="text-sm color-palette-2 mb-1">Total Spent</p>
        <p className="text-2xl color-palette-1 fw-medium m-0">
          {formatIDR(props.totalSpent)}
        </p>
      </div>

      <style jsx>{`
        .categories-card {
          background-color: #ffffff;
          padding: 1.875rem;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}

function CategoryIcon() {
  const maskId = useId();
  const nestedMaskId = useId();

  return (
    <svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id={maskId}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={60}
        height={60}
      >
        <circle cx={30} cy={30} r={30} fill="#D7D7F8" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle cx={30} cy={30} r={30} fill="#D7D7F8" />
        <mask
          id={nestedMaskId}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={10}
          y={12}
          width={40}
          height={30}
        >
          <rect
            x={10}
            y="12.5"
            width={40}
            height="28.75"
            rx={6}
            fill="#695DE9"
          />
        </mask>
        <g mask={`url(#${nestedMaskId})`}>
          <rect
            x={10}
            y="12.5"
            width={40}
            height="28.75"
            rx={6}
            fill="#695DE9"
          />
          <circle cx={43} cy={19} r={10} fill="#4F46B5" />
        </g>
        <circle cx={43} cy={18} r={9} fill="#2B2467" />
        <path
          d="M42.5109 13.0768C42.6649 12.603 43.3352 12.603 43.4891 13.0768L44.3279 15.6581C44.3967 15.87 44.5942 16.0135 44.817 16.0135H47.5311C48.0293 16.0135 48.2365 16.651 47.8334 16.9438L45.6376 18.5392C45.4574 18.6701 45.3819 18.9023 45.4508 19.1142L46.2895 21.6955C46.4435 22.1693 45.9012 22.5633 45.4981 22.2705L43.3023 20.6751C43.1221 20.5442 42.878 20.5442 42.6977 20.6751L40.5019 22.2705C40.0989 22.5633 39.5566 22.1693 39.7105 21.6955L40.5492 19.1142C40.6181 18.9023 40.5427 18.6701 40.3624 18.5392L38.1666 16.9438C37.7635 16.651 37.9707 16.0135 38.4689 16.0135H41.1831C41.4059 16.0135 41.6033 15.87 41.6722 15.6581L42.5109 13.0768Z"
          fill="white"
        />
        <rect x={25} y={40} width={10} height="7.5" fill="#695DE9" />
        <rect
          x="17.5"
          y="47.5"
          width={25}
          height="2.5"
          rx="1.25"
          fill="#695DE9"
        />
        <path
          d="M32.6875 35.3125L15.5 35.3125"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 18.3125L15.5 18.3125"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.4375 29.5L15.5 29.5"
          stroke="#B7B0F4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
