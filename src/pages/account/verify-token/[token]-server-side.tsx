import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { niceFetch } from "../..";

type User = {
  id: string;
  name: string;
  email: string;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const json = await niceFetch(
    `http://localhost:1750/api/login/${context.params?.token}`
  );

  const user: User = json.user;

  return { props: { user } };
};

function TokenPage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Logged in</h1>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </div>
  );
}

export default TokenPage;
