import AnimatedContent from "@/components/common/AnimatedContent";
import UploadMany from "@/components/common/UploadMany";
import MainDrawer from "@/components/drawer/MainDrawer";
import DailyDealsDrawer from "@/components/drawer/DailyDealsDrawer";
import DailyDealsTable from "@/components/daily-deals/DailyDealsTable";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useGetDatas from "@/hooks/useGetDatas";
import { Button, Card, CardBody, Input, Table, TableCell, TableContainer, TableHeader } from "@windmill/react-ui";
import React, { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";

const DailyDeals = () => {
  const [data, isLoading] = useGetDatas("/daily-deals", "daily-deals");
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Filtered data based on search query
  const filteredData = data?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <PageTitle>{"Daily Deals List"}</PageTitle>
      <MainDrawer>
        <DailyDealsDrawer />
      </MainDrawer>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs flex justify-between items-center overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody className="flex gap-96">
            <UploadMany title="Daily Deals" exportData={data} />
          </CardBody>
          <div className="w-full md:w-48 lg:w-48 xl:w-48">
            <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
              <span className="mr-2">
                <FiPlus />
              </span>
              {"Add Daily Deal"}
            </Button>
          </div>
        </Card>

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                type="search"
                placeholder="Search Daily Deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <div className="w-1/3">
                <Button
                  onClick={() => setSearchQuery("")}
                  type="submit"
                  className="h-12 w-full bg-emerald-700"
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"Id"}</TableCell>
                <TableCell>{"Product Name"}</TableCell>
                <TableCell>{"Deal Price"}</TableCell>
                <TableCell>{"Deal Quantity"}</TableCell>
                <TableCell>{"Start Date"}</TableCell>
                <TableCell>{"End Date"}</TableCell>
                <TableCell>{"Actions"}</TableCell>
              </tr>
            </TableHeader>
            <DailyDealsTable dailyDealsData={filteredData} isLoading={isLoading} />
          </Table>
        </TableContainer>
      </AnimatedContent>
    </>
  );
};

export default DailyDeals;
