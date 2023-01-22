exports.filt_year_parser = (params, saison) => {
  if (saison) {
    let start = saison.split("-")[0];
    let end = saison.split("-")[1];
    return {
      createdAt: {
        $gte: new Date(start, 7, 1),
        $lt: new Date(end, 6, 31),
      },
      ...params,
    };
  } else {
    return { ...params };
  }
};
