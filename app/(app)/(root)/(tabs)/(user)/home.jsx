import React from "react";
import PaginatedList from "@/components/PaginatedList";
import { UserService } from "../../../../../services/user.service";

const MyEvents = () => {
  const queryKey = ["home", "infinite"];
  const queryFn = ({ pageParam = 1 }) => UserService.getHomepage(pageParam);

  return <PaginatedList queryKey={queryKey} queryFn={queryFn} />;
};

export default MyEvents;
