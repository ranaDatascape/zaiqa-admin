import React, { useContext } from "react";
import PageTitle from "@/components/Typography/PageTitle";
import MainDrawer from "@/components/drawer/MainDrawer";
import TestimonialsDrawer from "@/components/drawer/TestimonialsDrawer";
import { Button, Table, TableCell, TableContainer, TableHeader } from "@windmill/react-ui";
import { SidebarContext } from "@/context/SidebarContext";
import useGetDatas from "@/hooks/useGetDatas";
import TestimonialsTable from "@/components/testimonials/TestimonialsTable";
import AnimatedContent from "@/components/common/AnimatedContent";

const Testimonials = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const [data, isLoading] = useGetDatas("/testimonials/all", "testimonials");

  return (
    <>
      <PageTitle>Testimonials</PageTitle>
      <MainDrawer>
        <TestimonialsDrawer />
      </MainDrawer>

      <AnimatedContent>
        <div className="flex justify-end">
          <Button onClick={toggleDrawer} className="mb-4">
            Add Testimonial
          </Button>
        </div>
      </AnimatedContent>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{"ID"}</TableCell>
              <TableCell>{"Name"}</TableCell>
              <TableCell>{"Designation"}</TableCell>
              <TableCell>{"Image"}</TableCell>
              <TableCell>{"Status"}</TableCell>
              <TableCell>{"Action"}</TableCell>
              <TableCell>{"Delete"}</TableCell>
            </tr>
          </TableHeader>
          <TestimonialsTable testimonials={data} isLoading={isLoading} />
        </Table>
      </TableContainer>
    </>
  );
};

export default Testimonials;
