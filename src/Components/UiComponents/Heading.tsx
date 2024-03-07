interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} my-5`}>
      <div className=" font-Texturina text-xl font-bold">{title}</div>

      <div className="  font-Texturina font-light text-neutral-500">
        {subTitle}
      </div>
    </div>
  );
};

export default Heading;
