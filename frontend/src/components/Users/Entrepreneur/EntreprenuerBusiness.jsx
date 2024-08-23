import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EntrepreneurBusinessAPI } from "../../../services/User/entrepreneur/entrepreneurServices";

export default function EntrepreneurBusiness() {
  const { data, refetch, isError, isPending, isSuccess } = useQuery({
    queryFn: EntrepreneurBusinessAPI,
    queryKey: ["entrepreneur-business"],
  });
  const business = data;

  return <></>;
}
