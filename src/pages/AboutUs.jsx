import AboutUsTable from "@/components/about-us/AboutUsTable";
import AnimatedContent from "@/components/common/AnimatedContent";
import AboutUsDrawer from "@/components/drawer/AboutUsDrawer";
import BannerDrawer from "@/components/drawer/BannerDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useGetDatas from "@/hooks/useGetDatas";
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from "@windmill/react-ui";
import { useContext } from "react";
import { FiPlus } from "react-icons/fi";

const AboutUs = () => {
  const [data, isLoading, refetch] = useGetDatas(
    "about-us/all",
    "all-about-us"
  );
  const { toggleDrawer } = useContext(SidebarContext);
  return (
    <>
      <PageTitle>{"About US"}</PageTitle>
      <MainDrawer>
        <AboutUsDrawer />
      </MainDrawer>

      <AnimatedContent>
        <div className="w-full flex justify-end mb-12 items-end">
          <Button onClick={toggleDrawer} className="w-2/12 rounded-md h-12">
            <span className="mr2">
              <FiPlus />
            </span>
            {"Add AboutUs"}
          </Button>
        </div>
      </AnimatedContent>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{"ID"}</TableCell>
              <TableCell>{"Name"}</TableCell>
              <TableCell>{"Main Title"}</TableCell>
              <TableCell>{"Sub Title"}</TableCell>
              <TableCell>{"Main Image"}</TableCell>
              <TableCell>{"Status"}</TableCell>
              <TableCell>{"Action"}</TableCell>
              <TableCell>{"Delete"}</TableCell>
            </tr>
          </TableHeader>
          <AboutUsTable data={data?.data} isLoading={isLoading}  refetch={refetch} />
        </Table>
      </TableContainer>
    </>
  );
};

export default AboutUs;
