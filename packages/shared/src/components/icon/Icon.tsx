import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
}

export default function Icon({ icon, className, ...props }: Props) {
  return (
    <i className={clsx('icon material-icons-round', className)} {...props}>
      {icon}
    </i>
  );
}
