import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import ExtraFacilities from "../ExtraFacilities/ExtraFacilities";
import HeroSection from "../HeroSection/HeroSection";
import ItemsSection from "../ItemsSection/ItemsSection";
import OurQuality from "../OurQuality/OurQuality";
import WarehouseAgreement from "../WarehouseAgreement/WarehouseAgreement";
import Loading from "../../Shared/Loading/Loading";

const Home = () => {
  const [, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }
  return (
    <section>
      <HeroSection />
      <ItemsSection />
      <ExtraFacilities />
      <OurQuality />
      <WarehouseAgreement />
    </section>
  );
};

export default Home;
