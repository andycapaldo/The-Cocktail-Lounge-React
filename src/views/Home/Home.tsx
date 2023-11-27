import { useState } from "react";
import UserType from "../../types/auth";

type HomeProps = {
    loggedInUser: Partial<UserType>
}


export default function Home({ loggedInUser }: HomeProps) {
  return (
    <div>Home</div>
  )
}