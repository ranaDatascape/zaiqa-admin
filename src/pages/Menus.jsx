import React, { useContext, useState } from "react";
import MainDrawer from "@/components/drawer/MainDrawer";
import MenusDrawer from "@/components/drawer/MenusDrawer";
import MenusTable from "@/components/menus/MenusTable";
import PageTitle from "@/components/Typography/PageTitle";
import { Button, Card, CardBody, Input, Table, TableCell, TableContainer, TableHeader } from "@windmill/react-ui";
import { SidebarContext } from "@/context/SidebarContext";
import { FiPlus } from "react-icons/fi";
import useGetDatas from "@/hooks/useGetDatas";

const Menus = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, isLoading] = useGetDatas("/menus/", "menus");

  const filteredData = data?.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <PageTitle>{"Menus List"}</PageTitle>
      <MainDrawer>
        <MenusDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search menus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-2">
                  <FiPlus />
                </span>
                Add Menu
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
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <MenusTable menusData={filteredData} isLoading={isLoading} />
        </Table>
      </TableContainer>
    </>
  );
};

export default Menus;
