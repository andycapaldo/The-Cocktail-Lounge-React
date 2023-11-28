import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserType from "../types/auth";

type HomeProps = {
    loggedInUser: Partial<UserType>|null
}


export default function Home({ loggedInUser }: HomeProps) {
  return (
    <>
        <h1>Hello World!</h1>
    </>
  )
}