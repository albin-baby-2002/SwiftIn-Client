interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} my-6`}>
      <div className=" text-xl font-bold font-Texturina">{title}</div>

      <div className="  font-light text-neutral-500 font-Texturina">
        {subTitle}
      </div>
    </div>
  );
};

export default Heading;
