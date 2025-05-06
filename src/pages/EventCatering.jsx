import React, { useContext, useState } from "react";
import MainDrawer from "@/components/drawer/MainDrawer";
import EventCateringDrawer from "@/components/drawer/EventCateringDrawer";
import EventCateringTable from "@/components/event-catering/EventCateringTable";
import PageTitle from "@/components/Typography/PageTitle";
import { Button, Card, CardBody, Input, Table, TableCell, TableContainer, TableHeader } from "@windmill/react-ui";
import { SidebarContext } from "@/context/SidebarContext";
import { FiPlus } from "react-icons/fi";
import useGetDatas from "@/hooks/useGetDatas";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";



const EventCatering = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, refetch } = useGetDatas("/events/all", "events");

  const filteredData = data?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <PageTitle>{"Event Catering List"}</PageTitle>
      <MainDrawer>
        <EventCateringDrawer refetchData={refetch} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-2">
                  <FiPlus />
                </span>
                Add Event
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      {
        isLoading ? (
          <TableLoading row={12} col={7} width={160} height={20} />
        ) : data.length!==0? (  
        <TableContainer >
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Subtitle</TableCell>
                {/* <TableCell>Description</TableCell> */}
                <TableCell>Date/Time</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <EventCateringTable eventsData={filteredData} isLoading={isLoading} refetch={refetch} />
          </Table>
        </TableContainer>
        ): (
          <NotFound title="No Event Found" description = "Please add some events" />
        )}
    </>
  );
};

export default EventCatering;