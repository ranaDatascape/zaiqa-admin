import React, { useContext } from "react";
import PageTitle from "@/components/Typography/PageTitle";
import MainDrawer from "@/components/drawer/MainDrawer";
import GalleryDrawer from "@/components/drawer/GalleryDrawer";
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from "@windmill/react-ui";
import { SidebarContext } from "@/context/SidebarContext";
import useGetDatas from "@/hooks/useGetDatas";
import GalleryTable from "@/components/gallery/GalleryTable";
import AnimatedContent from "@/components/common/AnimatedContent";

const Gallery = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const [data, isLoading] = useGetDatas("/gallery", "gallery");

  return (
    <>
      <PageTitle>Gallery</PageTitle>
      <MainDrawer>
        <GalleryDrawer />
      </MainDrawer>

      <AnimatedContent>
        <div className="flex justify-end">
          <Button onClick={toggleDrawer} className="mb-4">
            Add Gallery Image
          </Button>
        </div>

        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"Id"}</TableCell>
                <TableCell>{"Title"}</TableCell>
                <TableCell>{"Image"}</TableCell>
                <TableCell>{"Image_thumb"}</TableCell>
                <TableCell>{"Status"}</TableCell>
                <TableCell>{"Actions"}</TableCell>
                <TableCell>{"Delete"}</TableCell>
              </tr>
            </TableHeader>
            <GalleryTable galleries={data} isLoading={isLoading} />
          </Table>
        </TableContainer>
      </AnimatedContent>
    </>
  );
};

export default Gallery;
