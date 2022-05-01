import React from "react";
import ExtraFacilities from "../ExtraFacilities/ExtraFacilities";
import HeroSection from "../HeroSection/HeroSection";
import ItemsSection from "../ItemsSection/ItemsSection";
import OurQuality from "../OurQuality/OurQuality";
import WarehouseAgreement from "../WarehouseAgreement/WarehouseAgreement";

const Home = () => {
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
