import { useState } from "react";
import FrontComponent from "../components/FrontComponent";
import { API } from "../helpers/API";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const pgHeading = "Login";
  const [response, setResponse] = useState("");

  const navigate = useNavigate();
  const URL = `${API}/login/user`;

  async function handleClick(user) {
    // check for empty data
    if (!user.email || !user.password) {
      setResponse({ error: "Fields are required" });
      return;
    }
    setResponse({ temp_message: "Checking User..." });
    // validate user
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) setResponse(() => data);
        if (data.data) {
          setResponse(() => data);

          localStorage.setItem("user_token", data.sessionToken);

          navigate(`/dashboard`, { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1484503793037-5c9644d6a80a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D")'}}>
    <FrontComponent
      pgHeading={pgHeading}
      response={response}
      setResponse={setResponse}
      handleClick={handleClick}
    />
  </div>
  );
};

export default Login;
