import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { compact } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const PEOPLE_QUERY = gql`
  query getAllPeople {
    allPeople {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;

function People() {
  const { loading, error, data } = useQuery(PEOPLE_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allPeople.map(({ name, gender }) => (
    <div key={name} class="card">
      <div class="card-body">
        <h4 class="card-title">{name}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{gender}</h6>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div className="details-button">
          <button type="button" class="btn buttonDec">
            Details
          </button>
        </div>
      </div>
    </div>
  ));
}
export default People;