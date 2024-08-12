type CardProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`w-full mx-auto bg-white p-1 md:p-4 rounded-md shadow-[0_4px_10px_0px_rgba(0,0,0,0.1)] ${className}`}
    >
      {children}
    </div>
  );
};
