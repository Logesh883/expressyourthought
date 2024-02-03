import { Pagination, Stack } from "@mui/material";
import React from "react";

function PaginationFeed({ paginationcount, handlePagination }) {
  return (
    <div className="my-3 flex justify-center flex-wrap">
      <Stack spacing={5}>
        <Pagination
          count={paginationcount}
          color="secondary"
          onClick={(e) => {
            handlePagination(e);
          }}
          hidePrevButton
          hideNextButton
        />
      </Stack>
    </div>
  );
}

export default PaginationFeed;
