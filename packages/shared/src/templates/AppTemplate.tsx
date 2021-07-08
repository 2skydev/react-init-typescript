export type TName = 'APP';

export interface IProps {
  hello: string;
}

export default function AppTemplate({ hello }: IProps) {
  return <>hello wroldd!!</>;
}
