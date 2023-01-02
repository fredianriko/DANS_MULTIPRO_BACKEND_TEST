exports.Search = async ({ data, description, location, fulltime }) => {
  //regex to remove html element
  const cleanStr = /<[^>]*>/g;

  //iterate data
  const filteredData = data.filter((item) => {
    var cleansedDescription;
    var cleansedLocation;
    var cleansedFulltime;

    if (item !== null) {
      cleansedDescription = item.description ? item.description.replace(cleanStr, "") : null;
      cleansedLocation = item.location ? item.location.toLowerCase().replace(/\s/g, "") : null;
      cleansedFulltime = item.type ? item.type.toLowerCase().replace(/\s/g, "") : null;
    }

    // match with search param
    const matchDescription = description ? cleansedDescription.match(description) : [];
    const matchLocation = location ? cleansedLocation.match(location) : [];
    const matchFullTime = fulltime ? cleansedFulltime.match(fulltime) : [];

    let result;

    result = {
      matchDescription,
      matchLocation,
      matchFullTime,
    };

    return result;
  });
  return filteredData;
};
