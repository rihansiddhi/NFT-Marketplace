import React, { Fragment } from "react";
import Select from "../helperComponents/staticSelect";
import { creatorOptions, genreOptions, marketOptions, recentOptions } from "../../constants/NftListing";

const FilterSection = () => {
  return (
    <Fragment>
      <Select
        value="BTCNFT"
        data={marketOptions}
        label="Market"
      />
      <Select
        value="Hip"
        data={genreOptions}
        label="Genre"
      />
      <Select
        value="Verified Only"
        data={creatorOptions}
        label="Creator"
      />
    </Fragment>
  );
};

export default FilterSection;