import React, { useContext, useState } from "react";
import MainDrawer from "@/components/drawer/MainDrawer";
import OfferZoneDrawer from "@/components/drawer/OfferZoneDrawer";
import OfferZoneTable from "@/components/offer-zone/OfferZoneTable";
import PageTitle from "@/components/Typography/PageTitle";
import { Button, Card, CardBody, Input, Table, TableCell, TableContainer, TableHeader } from "@windmill/react-ui";
import { SidebarContext } from "@/context/SidebarContext";
import { FiPlus } from "react-icons/fi";
import useGetDatas from "@/hooks/useGetDatas";

const OfferZone = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, isLoading] = useGetDatas("/offer-zone", "offer-zone");

  const filteredData = data?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <PageTitle>{"Offer Zone List"}</PageTitle>
      <MainDrawer>
        <OfferZoneDrawer />
      </MainDrawer>

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
            <div>
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-2">
                  <FiPlus />
                </span>
                Add Offer
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <OfferZoneTable offersData={filteredData} isLoading={isLoading} />
        </Table>
      </TableContainer>
    </>
  );
};

export default OfferZone;
