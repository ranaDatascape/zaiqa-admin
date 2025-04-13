import React, { useContext } from "react";
import PageTitle from "@/components/Typography/PageTitle";
import MainDrawer from "@/components/drawer/MainDrawer";
import SliderImagesDrawer from "@/components/drawer/SliderImagesDrawer";
import AnimatedContent from "@/components/common/AnimatedContent";
import { Button, Table, TableCell, TableContainer, TableHeader } from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";
import { SidebarContext } from "@/context/SidebarContext";
import SliderImagesTable from "@/components/sliderImages/SliderImagesTable";
import useGetDatas from "@/hooks/useGetDatas";

const SliderImages = () => {
    const [data, isLoading, refetch] = useGetDatas("/slider-image/all", "sliderimages");
    const { toggleDrawer} = useContext(SidebarContext);
  return (
    <>
      <PageTitle>{"Slider Images"}</PageTitle>

      <MainDrawer>
        <SliderImagesDrawer />
      </MainDrawer>

      <AnimatedContent>
        <div className="w-full flex justify-end mb-12 items-end">
          <Button onClick={toggleDrawer} className="w-2/12 rounded-md h-12">
            <span className="mr-2">
              <FiPlus />
            </span>
            {"Add Image"}
          </Button>
        </div>
      </AnimatedContent>

      <TableContainer>
        <Table>
            <TableHeader>
                <tr>
                  <TableCell>{"ID"}</TableCell>
                  <TableCell>{"Title"}</TableCell>
                  <TableCell>{"Image"}</TableCell>
                  <TableCell>{"Position"}</TableCell>
                  <TableCell>{"Link"}</TableCell>
                  <TableCell>{"Status"}</TableCell>
                  <TableCell>{"Action"}</TableCell>
                </tr>
            </TableHeader>
            <SliderImagesTable data={data} isLoading={isLoading} refetch={refetch} />
        </Table>
      </TableContainer>
    </>
  );
};

export default SliderImages;
