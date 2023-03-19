import { ReactNode, FC } from 'react';

interface IComposeConxext {
  components?: FC<{ children?: ReactNode }>[];
  children?: ReactNode | undefined;
}

export default function ComposeContext(props: IComposeConxext) {
  const { components = [], children } = props;
  
  return (
    <>
      {components.reduceRight((acc, Comp: any) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
