import PageTitle from "@/components/Typography/PageTitle";
import useGetDatas from "../hooks/useGetDatas";
import {
  Card,
  CardBody,
  Input,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from "@windmill/react-ui";
import ReviewTable from "@/components/review/ReviewTable";
import { useState } from "react";
import AnimatedContent from "@/components/common/AnimatedContent";

const Review = () => {
  const [data, isLoading] = useGetDatas("/review", "all-review");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    <>
      <PageTitle>{"Review"}</PageTitle>
      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <div className="flex justify-between items-center">
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  placeholder="Search offers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </AnimatedContent>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>ProductName</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <ReviewTable reviewData={filteredData} isLoading={isLoading} />
        </Table>
      </TableContainer>
    </>
  );
};

export default Review;
