const covid19ImpactEstimator = (data) => {
  // let input = data;
  // // input = {
  // //   region: {
  // //     name: 'Africa',
  // //     avgAge: 19.7,
  // //     avgDailyIncomeUse: 5,
  // //     avgDailyIncomePopulation: 0.71
  // //   },
  // //   periodType: 'days',
  // //   timeToElapse: 58,
  // //   reportedCases: 674,
  // //   population: 66622705,
  // //   totalHospitalBeds: 1380614
  // // };
  // let data.reportedCases ;
  // let data.totalHospitalBeds;

  const periodCheck = (val) => {
    if (val === 'weeks') {
      return 2 ** Math.floor((data.timeToElapse * 7) / 3);
    }
    if (val === 'months') {
      return 2 ** Math.floor((data.timeToElapse * 30) / 3);
    }
    return 2 ** Math.floor(data.timeToElapse / 3);
  };


  const eInfected = data.reportedCases * 10;
  const eRequestedTime = eInfected * periodCheck(data.periodType);
  const eSCasesByRequestedTime = eRequestedTime * 0.15;
  const eHBedsByRequestedTime = data.totalHospitalBeds * 0.35 - eSCasesByRequestedTime;
  const eC4ICUByRequestedTime = eRequestedTime * 0.05;
  const eC4VentilatorsByRequestedTime = eRequestedTime * 0.02;
  const eDollarsInFlight = eRequestedTime * 0.65 * 0.71 * 30;
  const impact = {
    currentlyInfected: eInfected,
    infectionsByRequestedTime: eRequestedTime,
    eSevereCasesByRequestedTime: eSCasesByRequestedTime,
    hospitalBedsByRequestedTime: eHBedsByRequestedTime,
    casesForVentilatorsByRequestedTime: eC4VentilatorsByRequestedTime,
    casesForICUByRequestedTime: eC4ICUByRequestedTime,
    dollarsInFlight: eDollarsInFlight
  };


  const pInfected = data.reportedCases * 50;
  const pRequestedTime = pInfected * periodCheck(data.periodType);
  const pSCByRequestedTime = pRequestedTime * 0.15;
  const pHBedsByRequestedTime = data.totalHospitalBeds * 0.35 - pSCByRequestedTime;
  const pC4ICUByRequestedTime = pRequestedTime * 0.05;
  const pC4VentilatorsByRequestedTime = pRequestedTime * 0.02;
  const pDollarsInFlight = pRequestedTime * 0.65 * 0.71 * 30;
  const severeImpact = {
    currentlyInfected: pInfected,
    infectionsByRequestedTime: pRequestedTime,
    severeCasesByRequestedTime: pSCByRequestedTime,
    hospitalBedsByRequestedTime: pHBedsByRequestedTime,
    casesForICUByRequestedTime: pC4ICUByRequestedTime,
    casesForVentilatorsByRequestedTime: pC4VentilatorsByRequestedTime,
    dollarsInFlight: pDollarsInFlight
  };

  return { data, impact, severeImpact };


  // const estimator = chain(
  //   estimateCurrentlyInfected,
  //   estimateProjectedInfections,

  //   estimateSevereCases,
  //   estimateBedSpaceAvailability,

  //   estimateCasesForICU,
  //   estimateCasesForVentilators,
  //   estimateDollarsinFlight
  // );

  // return estimator({
  //   data,
  //   impact: {},
  //   severeImpact: {}
  // });
};
export default covid19ImpactEstimator;
