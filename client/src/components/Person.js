import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";

const PERSON_QUERY = gql`
  query getPerson($name: String!) {
    person(name: $name) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;

function Person() {
  const { name } = useParams();

  const { loading, error, data } = useQuery(PERSON_QUERY, {
    variables: { name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const person = data.person[0];
  const names = person.name;
  const height = person.height;
  const mass = person.mass;
  const gender = person.gender;
  const homeworld = person.homeworld;

  return (
    <div
      key={names}
      class="cardPerson"
      style={{ maxWidth: 30 + "rem" }}
    >
      <a href="/people"><button type="button" class="btn buttonClose">
            Close
      </button></a>
      <div class="card-body">
        <h4 class="card-title" style={{ textAlignLast: "left" }}>
          {names}
        </h4>
        <h6 class="card-subtitle mb-2 text-muted">Mass: {mass}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Height: {height}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Gender: {gender}</h6>
        <p class="card-text"> Homeworld: {homeworld}</p>
      </div>
    </div>
  );
}
export default Person;
