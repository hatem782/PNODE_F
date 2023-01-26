const SaisonModel = require("../models/saison.model");

exports.filt_year_parser = async (params, saison) => {
  let allSdata = await SaisonModel.findOne({ title: saison });
  if (allSdata) {
    const { startDate, endDate } = allSdata;
    return {
      createdAt: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
      ...params,
    };
  } else {
    return { ...params };
  }
};
