import axios from "axios";

const handleFireHouseOfNations = async (include: string, exclude: string) => {
  const URL =
    "https://affsusportalbackprod01.azurewebsites.net/api/Offering/GetExposes";
  const HEADERS = {
    "Content-Type": "application/json",
    Referer: "https://request.home-in-berlin.de/",
  };
  const BODY = {
    pagingOptions: {
      take: 100,
      skip: 0,
    },
  };
  let result = null;

  try {
    const response = await axios.post(URL, BODY, { headers: HEADERS });
    result = response.data.entites.map(
      ({
        name,
        totalRent,
        rentalSpace,
        pmPropertyBrochureAvailability = [],
      }) => {
        const { moveInDate = null } = pmPropertyBrochureAvailability[0] || {}; // Default to null if no moveInDate

        return {
          name,
          totalRent,
          rentalSpace,
          moveInDate,
        };
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }

  // TODO: apply the filter of includeText and excludeText
  console.log(result);
  return result;
};

export { handleFireHouseOfNations };
