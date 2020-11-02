import { useRouter } from "next/dist/client/router";
import useSWR, { mutate } from "swr";
import { niceFetch } from "../..";
import { API_URL } from "../../../config";

function TokenPage() {
  const router = useRouter();
  const { token } = router.query;

  const { data, error } = useSWR(
    token ? `${API_URL}/login/${token}` : null,
    niceFetch
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  mutate(`${API_URL}/me`);

  return (
    <div>
      <h1>Logged in</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

export default TokenPage;
