import useSWR from "swr";
import { niceFetch } from "..";

function AccountPage() {
  const { data, error } = useSWR("http://localhost:1750/api/me", niceFetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h1>Logged in</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

export default AccountPage;
