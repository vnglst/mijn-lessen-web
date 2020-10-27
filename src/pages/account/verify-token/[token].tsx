import { useRouter } from "next/dist/client/router";
import useSWR from "swr";
import { niceFetch } from "../..";

function TokenPage() {
  const router = useRouter();
  const { token } = router.query;

  const { data, error } = useSWR(
    token ? `http://localhost:1750/api/login/${token}` : null,
    niceFetch
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h1>Logged in</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

export default TokenPage;
