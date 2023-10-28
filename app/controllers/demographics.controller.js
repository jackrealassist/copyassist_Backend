require("dotenv").config();
const axios = require("axios");

const API_CENSUS_URL = process.env.API_CENSUS_URL;
const API_CENSUS_KEY = process.env.API_CENSUS_KEY;

/* Income Demographics */
const incomeVariables =
  "B19013_001E,B19113_001E,B19113A_001E,B19113B_001E,B17001_002E,B17001_003E,B17001_004E,B17001_005E";

/* population Demographics */
const populationVariables =
  "B01001_001E,B01001_001E,B01001_003E,B01001_004E," +
  "B01001_005E,B01001_006E,B01001_007E,B01001_008E,B01001_009E," +
  "B01001_010E,B01001_011E,B01001_012E,B01001_013E,B01001_014E," +
  "B01001_015E,B05006_001E,B05006_002E,B05006_013E";

/* household Demographics */
const householdVariables = "B01001_001E,B01001_002E,B01001_003E,B01001_004E,B25010_001E";
// Define the parameters for the API request

/* housing Demographics */
const housingVariables = "B25002_001E,B25002_002E,B25002_003E";

/* heatSource Demographics */
const heatSourceVariables =
  "B25040_002E,B25040_003E,B25040_004E,B25040_005E,B25040_006E,B25040_007E,B25040_008E";

/* education Demographics */
const educationVariables =
  "B14001_002E,B14001_003E,B14001_004E,B14001_005E,B15003_001E,B15003_002E,B15003_003E,B15003_004E,B15003_005E,B15003_006E";

/* employment Demographics */
const employmentVariables =
  "B23025_004E,B23025_005E,B23025_006E," +
  "C24010_004E,B23025_002E,B24080_002E,C24010_003E,C24010_004E,C24010_005E," +
  "C24010_006E,C24010_007E,C24010_008E,C24010_009E,C24010_010E,C24010_011E," +
  "B24080_006E,B24080_007E,B24080_008E,B24080_009E,B24080_010E,B24080_011E," +
  "B24080_012E,B24080_013E,B24080_014E,B24080_015E,B24080_016E,B24080_017E";

/* commuting Demographics */
const commutingVariables =
  "B08303_002E,B08301_001E,B08301_002E,B08301_003E,B08301_004E,B08301_005E,B08301_006E";

/* health Demographics */
const healthVariables =
  "B18101_001E,B18101_002E,B18101_003E,B18101_004E,B18101_005E,B18101_006E,B18101_007E";

/* language Demographics */
const languageVariables = "B16001_001E,B16001_002E,B16001_003E,B16001_004E,B16001_005E,B16001_006E";

/* ancestry Demographics */
const ancestryVariables =
  "B04004_001E,B04004_002E,B04004_003E,B04004_004E,B04004_005E,B04004_006E,B04004_007E,B04004_008E,B04004_009E,B04004_010E";

/* raceEthnicity Demographics */
const raceEthnicityVariables =
  "B03002_003E,B03002_004E,B03002_005E,B03002_006E,B03002_007E,B03002_008E,B03002_009E,B03002_012E,B03002_013E";

const handleRequest = async (axiosPromise) => {
  try {
    const response = await axiosPromise;
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Request failed");
  }
};

// all
exports.all = async (req, res) => {
  let state = req.params.state;
  let income,
    population,
    household,
    housing,
    heatSource,
    education,
    employment,
    commuting,
    health,
    language,
    ancestry,
    raceEthnicity,
    demographicsResponseObject;

  // Define the parameters for each API request
  const incomeParams = {
    get: incomeVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const populationParams = {
    get: populationVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const householdParams = {
    get: householdVariables,
    for: "state:" + state,
  };
  const housingParams = {
    get: housingVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const heatSourceParams = {
    get: heatSourceVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const educationParams = {
    get: educationVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const employmentParams = {
    get: employmentVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const commutingParams = {
    get: commutingVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const healthParams = {
    get: healthVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const languageParams = {
    get: languageVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const ancestryParams = {
    get: ancestryVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };
  const raceEthnicityParams = {
    get: raceEthnicityVariables,
    for: "state:" + state,
    key: API_CENSUS_KEY,
  };

  // Concurrent Call to all API's
  const [
    response1,
    response2,
    response3,
    response4,
    response5,
    response6,
    response7,
    response8,
    response9,
    response10,
    response11,
    response12,
  ] = await Promise.all([
    handleRequest(axios.get(API_CENSUS_URL, { params: incomeParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: populationParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: householdParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: housingParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: heatSourceParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: educationParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: employmentParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: commutingParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: healthParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: languageParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: ancestryParams })),
    handleRequest(axios.get(API_CENSUS_URL, { params: raceEthnicityParams })),
  ]);

  // Calculating the Results
  income = {
    medianHouseholdIncome: parseInt(response1[1][0]),
    medianFamilyIncome: parseInt(response1[1][1]),
    medianMarriedCoupleFamilyIncome: parseInt(response1[1][2]),
    medianNonFamilyHouseholdIncome: parseInt(response1[1][3]),
    percentBelowPovertyLevel: parseFloat(response1[1][4]),
    age18BelowPovertyLevel: parseFloat(response1[1][5]),
    age18To64BelowPovertyLevel: parseFloat(response1[1][6]),
    age65PlusBelowPovertyLevel: parseFloat(response1[1][7]),
  };

  population = {
    totalPopulation: parseInt(response2[1][0]),
    under18YearsOld: parseInt(response2[1][2]),
    under5YearsOld: parseInt(response2[1][3]),
    age5To9: parseInt(response2[1][4]),
    age10To14: parseInt(response2[1][5]),
    age15To19: parseInt(response2[1][6]),
    age20To24: parseInt(response2[1][7]),
    age25To34: parseInt(response2[1][8]),
    age35To44: parseInt(response2[1][9]),
    age45To54: parseInt(response2[1][10]),
    age55To59: parseInt(response2[1][11]),
    age60To64: parseInt(response2[1][12]),
    age65To74: parseInt(response2[1][13]),
    age75To84: parseInt(response2[1][14]),
    age85AndOver: parseInt(response2[1][15]),
    foreignBornPopulation: parseInt(response2[1][16]),
    naturalizedUSCitizen: parseInt(response2[1][17]),
    notUSCitizen: parseInt(response2[1][18]),
  };

  household = {
    totalPopulation: parseInt(response3[1][0]),
    malePopulation: parseInt(response3[1][1]),
    femalePopulation: parseInt(response3[1][2]),
    marriedPopulation: parseInt(response3[1][3]),
    averageFamilySize: parseInt(response3[1][4]),
  };

  const totalHousingUnits = parseInt(response4[1][0]);
  const occupiedHousingUnits = parseInt(response4[1][1]);
  const vacantHousingUnits = parseInt(response4[1][2]);
  const percentOccupied = (occupiedHousingUnits / totalHousingUnits) * 100;
  const percentVacant = (vacantHousingUnits / totalHousingUnits) * 100;

  housing = {
    totalHousingUnits: totalHousingUnits,
    occupiedHousingUnits: occupiedHousingUnits,
    vacantHousingUnits: vacantHousingUnits,
    percentOccupied: percentOccupied,
    percentVacant: percentVacant,
  };

  heatSource = {
    utilityGas: parseInt(response5[1][0]),
    bottledTankLPGas: parseInt(response5[1][1]),
    electricity: parseInt(response5[1][2]),
    fuelOilKerosene: parseInt(response5[1][3]),
    coalOrCoke: parseInt(response5[1][4]),
    allOtherFuels: parseInt(response5[1][5]),
    noFuelUsed: parseInt(response5[1][6]),
  };

  education = {
    enrolledInNurseryPreschool: parseInt(response6[1][0]),
    enrolledInK12: parseInt(response6[1][1]),
    enrolledInCollegeUndergrad: parseInt(response6[1][2]),
    enrolledInGraduateProfessionalSchool: parseInt(response6[1][3]),
    attainedBachelorDegreeOrHigher: parseInt(response6[1][4]),
    attainedHighSchoolOrEquivalentDegree: parseInt(response6[1][5]),
    attainedSomeCollegeNoDegree: parseInt(response6[1][6]),
    attainedAssociateDegree: parseInt(response6[1][7]),
    attainedBachelorDegree: parseInt(response6[1][8]),
    attainedGraduateOrProfessionalDegree: parseInt(response6[1][9]),
  };

  employment = {
    meanUsualHoursWorkedForWorkers: parseFloat(response7[1][0]),
    meanUsualHoursWorkedForWorkersMale: parseFloat(response7[1][1]),
    meanUsualHoursWorkedForWorkersFemale: parseFloat(response7[1][2]),
    managementBusinessScienceArtsOccupations: parseInt(response7[1][3]),
    totalCivilianEmployedPopulation: parseInt(response7[1][4]),
    serviceOccupation: parseInt(response7[1][5]),
    salesAndOfficeOccupations: parseInt(response7[1][6]),
    naturalResourcesConstructionMaintenanceOccupations: parseInt(response7[1][7]),
    productionTransportationMaterialMovingOccupations: parseInt(response7[1][8]),
    employeeOfPrivateCompanyWorkers: parseInt(response7[1][9]),
    selfEmployedIncorporatedBusinessWorkers: parseInt(response7[1][10]),
    privateNotForProfitWageSalaryWorkers: parseInt(response7[1][11]),
    localStateFederalGovernmentWorkers: parseInt(response7[1][12]),
    selfEmployedOwnNotIncorporatedBusinessUnpaidFamilyWorkers: parseInt(response7[1][13]),
    employmentRate: parseFloat(response7[1][14]),
    agricultureForestryFishingHuntingMining: parseInt(response7[1][15]),
    construction: parseInt(response7[1][16]),
    manufacturing: parseInt(response7[1][17]),
    wholesaleTrade: parseInt(response7[1][18]),
    retailTrade: parseInt(response7[1][19]),
    transportationWarehousingUtilities: parseInt(response7[1][20]),
    information: parseInt(response7[1][21]),
    financeInsuranceRealEstateRentalLeasing: parseInt(response7[1][22]),
    professionalScientificManagementAdministrativeWasteManagementServices: parseInt(
      response7[1][23]
    ),
    educationalServicesHealthCareSocialAssistance: parseInt(response7[1][24]),
    artsEntertainmentRecreationAccommodationFoodServices: parseInt(response7[1][25]),
    otherServicesExceptPublicAdministration: parseInt(response7[1][26]),
    publicAdministration: parseInt(response7[1][27]),
  };

  commuting = {
    meanWorkTravelTime: parseFloat(response8[1][0]),
    driveAlone: parseInt(response8[1][1]),
    carpool: parseInt(response8[1][2]),
    publicTransportation: parseInt(response8[1][3]),
    walk: parseInt(response8[1][4]),
    otherMeans: parseInt(response8[1][5]),
    workFromHome: parseInt(response8[1][6]),
  };

  health = {
    disabledPopulation: parseInt(response9[1][0]),
    hearingDifficulty: parseInt(response9[1][1]),
    visionDifficulty: parseInt(response9[1][2]),
    cognitiveDifficulty: parseInt(response9[1][3]),
    ambulatoryDifficulty: parseInt(response9[1][4]),
    selfCareDifficulty: parseInt(response9[1][5]),
    independentLivingDifficulty: parseInt(response9[1][6]),
  };

  language = {
    languageOtherThanEnglishSpokenAtHome: parseInt(response10[1][0]),
    englishOnly: parseInt(response10[1][1]),
    spanish: parseInt(response10[1][2]),
    otherIndoEuropeanLanguages: parseInt(response10[1][3]),
    asianAndPacificIslanderLanguages: parseInt(response10[1][4]),
    otherLanguages: parseInt(response10[1][5]),
  };

  ancestry = {
    percentAmerican: parseFloat(response11[1][0]),
    percentEnglish: parseFloat(response11[1][1]),
    percentFrenchExceptBasque: parseFloat(response11[1][2]),
    percentGerman: parseFloat(response11[1][3]),
    percentIrish: parseFloat(response11[1][4]),
    percentItalian: parseFloat(response11[1][5]),
    percentNorwegian: parseFloat(response11[1][6]),
    percentPolish: parseFloat(response11[1][7]),
    percentScottish: parseFloat(response11[1][8]),
    percentSubsaharanAfrican: parseFloat(response11[1][9]),
  };

  raceEthnicity = {
    white: parseInt(response12[1][0]),
    blackOrAfricanAmerican: parseInt(response12[1][1]),
    americanIndianAndAlaskaNative: parseInt(response12[1][2]),
    asian: parseInt(response12[1][3]),
    nativeHawaiianAndPacificIslander: parseInt(response12[1][4]),
    someOtherRace: parseInt(response12[1][5]),
    twoOrMoreRaces: parseInt(response12[1][6]),
    hispanicOrLatino: parseInt(response12[1][7]),
    notHispanicOrLatinoWhiteAlone: parseInt(response12[1][8]),
  };

  demographicsResponseObject = {
    income: income,
    population: population,
    household: household,
    housing: housing,
    heat_source: heatSource,
    education: education,
    employment: employment,
    commuting: commuting,
    health: health,
    language: language,
    ancestry: ancestry,
    race_ethnicity: raceEthnicity,
  };

  res.status(200).json({ demographics: demographicsResponseObject });
};

// income
exports.income = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B19013_001E,B19113_001E,B19113A_001E,B19113B_001E,B17001_002E,B17001_003E,B17001_004E,B17001_005E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        const medianHouseholdIncome = parseInt(data[1][0]);
        const medianFamilyIncome = parseInt(data[1][1]);
        const medianMarriedCoupleFamilyIncome = parseInt(data[1][2]);
        const medianNonFamilyHouseholdIncome = parseInt(data[1][3]);
        const percentBelowPovertyLevel = parseFloat(data[1][4]);
        const age18BelowPovertyLevel = parseFloat(data[1][5]);
        const age18To64BelowPovertyLevel = parseFloat(data[1][6]);
        const age65PlusBelowPovertyLevel = parseFloat(data[1][7]);

        res.status(200).json({
          medianHouseholdIncome: medianHouseholdIncome,
          medianFamilyIncome: medianFamilyIncome,
          medianMarriedCoupleFamilyIncome: medianMarriedCoupleFamilyIncome,
          medianNonFamilyHouseholdIncome: medianNonFamilyHouseholdIncome,
          percentBelowPovertyLevel: percentBelowPovertyLevel,
          age18BelowPovertyLevel: age18BelowPovertyLevel,
          age18To64BelowPovertyLevel: age18To64BelowPovertyLevel,
          age65PlusBelowPovertyLevel: age65PlusBelowPovertyLevel,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// population
exports.population = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B01001_001E,B01001_001E,B01001_003E,B01001_004E," +
    "B01001_005E,B01001_006E,B01001_007E,B01001_008E,B01001_009E," +
    "B01001_010E,B01001_011E,B01001_012E,B01001_013E,B01001_014E," +
    "B01001_015E,B05006_001E,B05006_002E,B05006_013E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const totalPopulation = parseInt(data[1][0]);
        const under18YearsOld = parseInt(data[1][2]);
        const under5YearsOld = parseInt(data[1][3]);
        const age5To9 = parseInt(data[1][4]);
        const age10To14 = parseInt(data[1][5]);
        const age15To19 = parseInt(data[1][6]);
        const age20To24 = parseInt(data[1][7]);
        const age25To34 = parseInt(data[1][8]);
        const age35To44 = parseInt(data[1][9]);
        const age45To54 = parseInt(data[1][10]);
        const age55To59 = parseInt(data[1][11]);
        const age60To64 = parseInt(data[1][12]);
        const age65To74 = parseInt(data[1][13]);
        const age75To84 = parseInt(data[1][14]);
        const age85AndOver = parseInt(data[1][15]);
        const foreignBornPopulation = parseInt(data[1][16]);
        const naturalizedUSCitizen = parseInt(data[1][17]);
        const notUSCitizen = parseInt(data[1][18]);

        res.status(200).json({
          totalPopulation: totalPopulation,
          under18YearsOld: under18YearsOld,
          under5YearsOld: under5YearsOld,
          age5To9: age5To9,
          age10To14: age10To14,
          age15To19: age15To19,
          age20To24: age20To24,
          age25To34: age25To34,
          age35To44: age35To44,
          age45To54: age45To54,
          age55To59: age55To59,
          age60To64: age60To64,
          age65To74: age65To74,
          age75To84: age75To84,
          age85AndOver: age85AndOver,
          foreignBornPopulation: foreignBornPopulation,
          naturalizedUSCitizen: naturalizedUSCitizen,
          notUSCitizen: notUSCitizen,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// household
exports.household = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables = "B01001_001E,B01001_002E,B01001_003E,B01001_004E,B25010_001E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const totalPopulation = parseInt(data[1][0]);
        const malePopulation = parseInt(data[1][1]);
        const femalePopulation = parseInt(data[1][2]);
        const marriedPopulation = parseInt(data[1][3]);
        const averageFamilySize = parseFloat(data[1][4]);

        res.status(200).json({
          totalPopulation: totalPopulation,
          totalPopulation: totalPopulation,
          femalePopulation: femalePopulation,
          marriedPopulation: marriedPopulation,
          averageFamilySize: averageFamilySize,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// housing
exports.housing = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables = "B25002_001E,B25002_002E,B25002_003E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const totalHousingUnits = parseInt(data[1][0]);
        const occupiedHousingUnits = parseInt(data[1][1]);
        const vacantHousingUnits = parseInt(data[1][2]);
        const percentOccupied = (occupiedHousingUnits / totalHousingUnits) * 100;
        const percentVacant = (vacantHousingUnits / totalHousingUnits) * 100;

        res.status(200).json({
          totalHousingUnits: totalHousingUnits,
          occupiedHousingUnits: occupiedHousingUnits,
          vacantHousingUnits: vacantHousingUnits,
          percentOccupied: percentOccupied,
          percentVacant: percentVacant,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// heatSource
exports.heatSource = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B25040_002E,B25040_003E,B25040_004E,B25040_005E,B25040_006E,B25040_007E,B25040_008E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const utilityGas = parseInt(data[1][0]);
        const bottledTankLPGas = parseInt(data[1][1]);
        const electricity = parseInt(data[1][2]);
        const fuelOilKerosene = parseInt(data[1][3]);
        const coalOrCoke = parseInt(data[1][4]);
        const allOtherFuels = parseInt(data[1][5]);
        const noFuelUsed = parseInt(data[1][6]);

        res.status(200).json({
          utilityGas: utilityGas,
          bottledTankLPGas: bottledTankLPGas,
          electricity: electricity,
          fuelOilKerosene: fuelOilKerosene,
          coalOrCoke: coalOrCoke,
          allOtherFuels: allOtherFuels,
          noFuelUsed: noFuelUsed,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// education
exports.education = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B14001_002E,B14001_003E,B14001_004E,B14001_005E,B15003_001E,B15003_002E,B15003_003E,B15003_004E,B15003_005E,B15003_006E";

  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const enrolledInNurseryPreschool = parseInt(data[1][0]);
        const enrolledInK12 = parseInt(data[1][1]);
        const enrolledInCollegeUndergrad = parseInt(data[1][2]);
        const enrolledInGraduateProfessionalSchool = parseInt(data[1][3]);
        const attainedBachelorDegreeOrHigher = parseInt(data[1][4]);
        const attainedHighSchoolOrEquivalentDegree = parseInt(data[1][5]);
        const attainedSomeCollegeNoDegree = parseInt(data[1][6]);
        const attainedAssociateDegree = parseInt(data[1][7]);
        const attainedBachelorDegree = parseInt(data[1][8]);
        const attainedGraduateOrProfessionalDegree = parseInt(data[1][9]);

        res.status(200).json({
          enrolledInNurseryPreschool: enrolledInNurseryPreschool,
          enrolledInK12: enrolledInK12,
          enrolledInCollegeUndergrad: enrolledInCollegeUndergrad,
          enrolledInGraduateProfessionalSchool: enrolledInGraduateProfessionalSchool,
          attainedBachelorDegreeOrHigher: attainedBachelorDegreeOrHigher,
          attainedHighSchoolOrEquivalentDegree: attainedHighSchoolOrEquivalentDegree,
          attainedSomeCollegeNoDegree: attainedSomeCollegeNoDegree,
          attainedAssociateDegree: attainedAssociateDegree,
          attainedBachelorDegree: attainedBachelorDegree,
          attainedGraduateOrProfessionalDegree: attainedGraduateOrProfessionalDegree,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// employment
exports.employment = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B23025_004E,B23025_005E,B23025_006E," +
    "C24010_004E,B23025_002E,B24080_002E,C24010_003E,C24010_004E,C24010_005E," +
    "C24010_006E,C24010_007E,C24010_008E,C24010_009E,C24010_010E,C24010_011E," +
    "B24080_006E,B24080_007E,B24080_008E,B24080_009E,B24080_010E,B24080_011E," +
    "B24080_012E,B24080_013E,B24080_014E,B24080_015E,B24080_016E,B24080_017E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const meanUsualHoursWorkedForWorkers = parseFloat(data[1][0]);
        const meanUsualHoursWorkedForWorkersMale = parseFloat(data[1][1]);
        const meanUsualHoursWorkedForWorkersFemale = parseFloat(data[1][2]);
        const managementBusinessScienceArtsOccupations = parseInt(data[1][3]);
        const totalCivilianEmployedPopulation = parseInt(data[1][4]);
        const serviceOccupation = parseInt(data[1][5]);
        const salesAndOfficeOccupations = parseInt(data[1][6]);
        const naturalResourcesConstructionMaintenanceOccupations = parseInt(data[1][7]);
        const productionTransportationMaterialMovingOccupations = parseInt(data[1][8]);
        const employeeOfPrivateCompanyWorkers = parseInt(data[1][9]);
        const selfEmployedIncorporatedBusinessWorkers = parseInt(data[1][10]);
        const privateNotForProfitWageSalaryWorkers = parseInt(data[1][11]);
        const localStateFederalGovernmentWorkers = parseInt(data[1][12]);
        const selfEmployedOwnNotIncorporatedBusinessUnpaidFamilyWorkers = parseInt(data[1][13]);
        const employmentRate = parseFloat(data[1][14]);
        const agricultureForestryFishingHuntingMining = parseInt(data[1][15]);
        const construction = parseInt(data[1][16]);
        const manufacturing = parseInt(data[1][17]);
        const wholesaleTrade = parseInt(data[1][18]);
        const retailTrade = parseInt(data[1][19]);
        const transportationWarehousingUtilities = parseInt(data[1][20]);
        const information = parseInt(data[1][21]);
        const financeInsuranceRealEstateRentalLeasing = parseInt(data[1][22]);
        const professionalScientificManagementAdministrativeWasteManagementServices = parseInt(
          data[1][23]
        );
        const educationalServicesHealthCareSocialAssistance = parseInt(data[1][24]);
        const artsEntertainmentRecreationAccommodationFoodServices = parseInt(data[1][25]);
        const otherServicesExceptPublicAdministration = parseInt(data[1][26]);
        const publicAdministration = parseInt(data[1][27]);

        res.status(200).json({
          meanUsualHoursWorkedForWorkers: meanUsualHoursWorkedForWorkers,
          meanUsualHoursWorkedForWorkersMale: meanUsualHoursWorkedForWorkersMale,
          meanUsualHoursWorkedForWorkersFemale: meanUsualHoursWorkedForWorkersFemale,
          managementBusinessScienceArtsOccupations: managementBusinessScienceArtsOccupations,
          totalCivilianEmployedPopulation: totalCivilianEmployedPopulation,
          serviceOccupation: serviceOccupation,
          salesAndOfficeOccupations: salesAndOfficeOccupations,
          naturalResourcesConstructionMaintenanceOccupations:
            naturalResourcesConstructionMaintenanceOccupations,
          productionTransportationMaterialMovingOccupations:
            productionTransportationMaterialMovingOccupations,
          employeeOfPrivateCompanyWorkers: employeeOfPrivateCompanyWorkers,
          selfEmployedIncorporatedBusinessWorkers: selfEmployedIncorporatedBusinessWorkers,
          privateNotForProfitWageSalaryWorkers: privateNotForProfitWageSalaryWorkers,
          localStateFederalGovernmentWorkers: localStateFederalGovernmentWorkers,
          selfEmployedOwnNotIncorporatedBusinessUnpaidFamilyWorkers:
            selfEmployedOwnNotIncorporatedBusinessUnpaidFamilyWorkers,
          employmentRate: employmentRate,
          agricultureForestryFishingHuntingMining: agricultureForestryFishingHuntingMining,
          construction: construction,
          manufacturing: manufacturing,
          wholesaleTrade: wholesaleTrade,
          retailTrade: retailTrade,
          transportationWarehousingUtilities: transportationWarehousingUtilities,
          information: information,
          financeInsuranceRealEstateRentalLeasing: financeInsuranceRealEstateRentalLeasing,
          professionalScientificManagementAdministrativeWasteManagementServices:
            professionalScientificManagementAdministrativeWasteManagementServices,
          educationalServicesHealthCareSocialAssistance:
            educationalServicesHealthCareSocialAssistance,
          artsEntertainmentRecreationAccommodationFoodServices:
            artsEntertainmentRecreationAccommodationFoodServices,
          otherServicesExceptPublicAdministration: otherServicesExceptPublicAdministration,
          publicAdministration: publicAdministration,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// commuting
exports.commuting = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B08303_002E,B08301_001E,B08301_002E,B08301_003E,B08301_004E,B08301_005E,B08301_006E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const meanWorkTravelTime = parseFloat(data[1][0]);
        const driveAlone = parseInt(data[1][1]);
        const carpool = parseInt(data[1][2]);
        const publicTransportation = parseInt(data[1][3]);
        const walk = parseInt(data[1][4]);
        const otherMeans = parseInt(data[1][5]);
        const workFromHome = parseInt(data[1][6]);

        res.status(200).json({
          meanWorkTravelTime: meanWorkTravelTime,
          driveAlone: driveAlone,
          carpool: carpool,
          publicTransportation: publicTransportation,
          walk: walk,
          otherMeans: otherMeans,
          workFromHome: workFromHome,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// health
exports.health = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B18101_001E,B18101_002E,B18101_003E,B18101_004E,B18101_005E,B18101_006E,B18101_007E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const disabledPopulation = parseInt(data[1][0]);
        const hearingDifficulty = parseInt(data[1][1]);
        const visionDifficulty = parseInt(data[1][2]);
        const cognitiveDifficulty = parseInt(data[1][3]);
        const ambulatoryDifficulty = parseInt(data[1][4]);
        const selfCareDifficulty = parseInt(data[1][5]);
        const independentLivingDifficulty = parseInt(data[1][6]);

        res.status(200).json({
          disabledPopulation: disabledPopulation,
          hearingDifficulty: hearingDifficulty,
          visionDifficulty: visionDifficulty,
          cognitiveDifficulty: cognitiveDifficulty,
          ambulatoryDifficulty: ambulatoryDifficulty,
          selfCareDifficulty: selfCareDifficulty,
          independentLivingDifficulty: independentLivingDifficulty,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// language
exports.language = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables = "B16001_001E,B16001_002E,B16001_003E,B16001_004E,B16001_005E,B16001_006E";
  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const languageOtherThanEnglishSpokenAtHome = parseInt(data[1][0]);
        const englishOnly = parseInt(data[1][1]);
        const spanish = parseInt(data[1][2]);
        const otherIndoEuropeanLanguages = parseInt(data[1][3]);
        const asianAndPacificIslanderLanguages = parseInt(data[1][4]);
        const otherLanguages = parseInt(data[1][5]);

        res.status(200).json({
          languageOtherThanEnglishSpokenAtHome: languageOtherThanEnglishSpokenAtHome,
          englishOnly: englishOnly,
          spanish: spanish,
          otherIndoEuropeanLanguages: otherIndoEuropeanLanguages,
          asianAndPacificIslanderLanguages: asianAndPacificIslanderLanguages,
          otherLanguages: otherLanguages,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// ancenstry
exports.ancestry = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B04004_001E,B04004_002E,B04004_003E,B04004_004E,B04004_005E,B04004_006E,B04004_007E,B04004_008E,B04004_009E,B04004_010E";

  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const percentAmerican = parseFloat(data[1][0]);
        const percentEnglish = parseFloat(data[1][1]);
        const percentFrenchExceptBasque = parseFloat(data[1][2]);
        const percentGerman = parseFloat(data[1][3]);
        const percentIrish = parseFloat(data[1][4]);
        const percentItalian = parseFloat(data[1][5]);
        const percentNorwegian = parseFloat(data[1][6]);
        const percentPolish = parseFloat(data[1][7]);
        const percentScottish = parseFloat(data[1][8]);
        const percentSubsaharanAfrican = parseFloat(data[1][9]);

        res.status(200).json({
          percentAmerican: percentAmerican,
          percentEnglish: percentEnglish,
          percentFrenchExceptBasque: percentFrenchExceptBasque,
          percentGerman: percentGerman,
          percentIrish: percentIrish,
          percentItalian: percentItalian,
          percentNorwegian: percentNorwegian,
          percentPolish: percentPolish,
          percentScottish: percentScottish,
          percentSubsaharanAfrican: percentSubsaharanAfrican,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// raceEthnicity
exports.raceEthnicity = async (req, res) => {
  // Specify the variables you want to retrieve
  const variables =
    "B03002_003E,B03002_004E,B03002_005E,B03002_006E,B03002_007E,B03002_008E,B03002_009E,B03002_012E,B03002_013E";

  // Define the parameters for the API request
  const params = {
    get: variables,
    for: "state:" + req.params.state, // New York state FIPS code
    key: API_CENSUS_KEY,
  };

  // Make the API request using Axios
  axios
    .get(API_CENSUS_URL, { params })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        // Extract the relevant values
        // The data will be in the format of an array. Extract the relevant values.
        const white = parseInt(data[1][0]);
        const blackOrAfricanAmerican = parseInt(data[1][1]);
        const americanIndianAndAlaskaNative = parseInt(data[1][2]);
        const asian = parseInt(data[1][3]);
        const nativeHawaiianAndPacificIslander = parseInt(data[1][4]);
        const someOtherRace = parseInt(data[1][5]);
        const twoOrMoreRaces = parseInt(data[1][6]);
        const hispanicOrLatino = parseInt(data[1][7]);
        const notHispanicOrLatinoWhiteAlone = parseInt(data[1][8]);

        res.status(200).json({
          white: white,
          blackOrAfricanAmerican: blackOrAfricanAmerican,
          americanIndianAndAlaskaNative: americanIndianAndAlaskaNative,
          asian: asian,
          nativeHawaiianAndPacificIslander: nativeHawaiianAndPacificIslander,
          someOtherRace: someOtherRace,
          twoOrMoreRaces: twoOrMoreRaces,
          hispanicOrLatino: hispanicOrLatino,
          notHispanicOrLatinoWhiteAlone: notHispanicOrLatinoWhiteAlone,
        });
      } else {
        console.error("Failed to retrieve data from the Census API.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
