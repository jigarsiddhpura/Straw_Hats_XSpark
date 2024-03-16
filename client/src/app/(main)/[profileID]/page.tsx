import { type FC } from "react";

interface pageProps {
  params: {
    profileID: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  return <>page</>;
};

export default page;
