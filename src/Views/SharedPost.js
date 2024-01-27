import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function SharedPost() {
  const { id } = useParams();

  useEffect(() => {
    getSharedPost();
  }, []);

  async function getSharedPost() {
    await axios
      .get(`https://server.ideavista.online/api/sharedpost/${id}`)
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <p>Login success</p>
    </div>
  );
}

export default SharedPost;
