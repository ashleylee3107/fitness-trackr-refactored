import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getActivity, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivity() {
      setError(null);

      try {
        const result = await getActivity(activityId);
        setActivity(result);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchActivity();
  }, [activityId]);

  async function handleDelete() {
    setError(null);

    try {
      await deleteActivity(token, activityId);
      navigate("/activities");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p role="alert">{error}</p>;
  if (!activity) return <p>Loading...</p>;

  return (
    <section>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName}</p>

      {token && <button onClick={handleDelete}>Delete</button>}
    </section>
  );
}
