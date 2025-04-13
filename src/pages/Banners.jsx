import BannerTable from "@/components/Banners/BannerTable";
import AnimatedContent from "@/components/common/AnimatedContent";
import BannerDrawer from "@/components/drawer/BannerDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useGetDatas from "@/hooks/useGetDatas";
import { Button, Table, TableCell, TableContainer, TableHeader } from "@windmill/react-ui";
import React, { useContext, useEffect } from "react";
import { FiPlus } from "react-icons/fi";

const Banners = () => {
  const [data, isLoading, refetch] = useGetDatas("/banners/getall", "allbanners");
  const { toggleDrawer } = useContext(SidebarContext);
  return (
    <>
      <PageTitle>{"Banner List"}</PageTitle>
      <MainDrawer>
        <BannerDrawer />
      </MainDrawer>

      <AnimatedContent>
        <div className="w-full flex justify-end mb-12 items-end">
          <Button onClick={toggleDrawer} className="w-2/12 rounded-md h-12">
            <span className="mr-2">
              <FiPlus />
            </span>
            {"Add Banner"}
          </Button>
        </div>
      </AnimatedContent>
      <TableContainer>
        <Table>
            <TableHeader>
                <tr>
                  <TableCell>{"ID"}</TableCell>
                  <TableCell>{"Name"}</TableCell>
                  <TableCell>{"Image"}</TableCell>
                  <TableCell>{"Image_Thumb"}</TableCell>
                  <TableCell>{"Status"}</TableCell>
                  <TableCell>{"Action"}</TableCell>
                  <TableCell>{"Delete"}</TableCell>
                </tr>
            </TableHeader>
            <BannerTable data={data} isLoading={isLoading} refetch={refetch} />
        </Table>
      </TableContainer>
    </>
  );
};

export default Banners;
