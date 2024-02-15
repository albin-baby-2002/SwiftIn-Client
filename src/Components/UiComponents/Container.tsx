interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
           max-w-[1150px]
           mx-auto
           px-2
           sm:px-6
           lg:px-10"
    >
      {children}
    </div>
  );
};

export default Container;
