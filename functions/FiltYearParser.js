const SaisonModel = require("../models/saison.model");

exports.filt_year_parser = async (params, saison) => {
  const { startDate, endDate } = await SaisonModel.findOne({ title: saison });
  console.log({ startDate, endDate });
  if (saison) {
    let start = saison.split("-")[0];
    let end = saison.split("-")[1];
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
