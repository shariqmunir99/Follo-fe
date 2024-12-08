import React from "react";
import PaginatedList from "@/components/PaginatedList";
import { UserService } from "../../../../../services/user.service";

const MyEvents = () => {
  const queryKey = ["event", "my-events", "infinite"];
  const queryFn = ({ pageParam = 1 }) =>
    UserService.getMyEventsPaginated(pageParam);

  return <PaginatedList queryKey={queryKey} queryFn={queryFn} />;
};

export default MyEvents;
