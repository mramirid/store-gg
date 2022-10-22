import Image from "next/image";

export default function FeatureStep(props: {
  iconName: "feature-step-1" | "feature-step-2" | "feature-step-3";
  title: string;
  descriptions: [string, string];
}) {
  return (
    <div className="col-lg-4">
      <div className="card border-0">
        <span>
          <Image
            src={`/icons/${props.iconName}.svg`}
            width={80}
            height={80}
            alt={props.title}
          />
        </span>
        <p className="title fw-semibold text-2xl mb-2 color-palette-1">
          {props.title}
        </p>
        <p className="text-lg color-palette-1 mb-0">
          {props.descriptions[0]}
          <br />
          {props.descriptions[1]}
        </p>
      </div>

      <style jsx>{`
        .card {
          background-color: #f9faff;
          padding: 1.875rem;
          border-radius: 1.625rem;
          margin-right: 16px;
        }

        .title {
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
}
