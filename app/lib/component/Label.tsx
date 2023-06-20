export const Label = ({
  label,
  className,
}: {
  label: string | number;
  className: string;
}) => {
  return <p className={`${className} w-2`}>{label}</p>;
};
Label.defaultProps = {
  className: "",
};
