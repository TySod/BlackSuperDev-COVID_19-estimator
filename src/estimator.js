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

  const timeEst = (time) => {
    if (time === 'weeks') {
      return (data.timeToElapse) * 30 * 7;
    } if (time === 'months') {
      return (data.timeToElapse) * 30 * 30;
    }
    return (data.timeToElapse) * 30;
  };
  const percentIncome = data.region.avgDailyIncomePopulation;
  const avgInc = data.region.avgDailyIncomeUse;
  const dur = data.periodType;
  const eInfected = data.reportedCases * 10;
  const pInfected = data.reportedCases * 50;
  const beds = data.totalHospitalBeds;


  const periodCheck = (val) => {
    if (val === 'weeks') {
      return eInfected * (2 ** Math.trunc((data.timeToElapse * 7) / 3));
    }
    if (val === 'months') {
      return eInfected * (2 ** Math.trunc((data.timeToElapse * 30) / 3));
    }
    return eInfected * (2 ** Math.trunc(data.timeToElapse / 3));
  };

  const severeCalc = (cases) => {
    if (cases === 'weeks') {
      return pInfected * (2 ** Math.trunc((data.timeToElapse * 7) / 3));
    }
    if (cases === 'months') {
      return pInfected * (2 ** Math.trunc((data.timeToElapse * 30) / 3));
    }
    return pInfected * (2 ** Math.trunc(data.timeToElapse / 3));
  };

  const eRequestedTime = periodCheck(dur);
  const eSCasesByRequestedTime = Math.trunc(0.15 * periodCheck(dur));
  const eHBedsByRequestedTime = Math.trunc((beds * 0.35) - periodCheck(dur));
  const eC4ICUByRequestedTime = Math.trunc(periodCheck(dur) * 0.05);
  const eC4VentilatorsByRequestedTime = Math.trunc(periodCheck(dur) * 0.02);
  const eDollarsInFlight = Math.trunc(((periodCheck(dur) * percentIncome * avgInc)) / timeEst(dur));
  const impact = {
    currentlyInfected: eInfected,
    infectionsByRequestedTime: eRequestedTime,
    eSevereCasesByRequestedTime: eSCasesByRequestedTime,
    hospitalBedsByRequestedTime: eHBedsByRequestedTime,
    casesForVentilatorsByRequestedTime: eC4VentilatorsByRequestedTime,
    casesForICUByRequestedTime: eC4ICUByRequestedTime,
    dollarsInFlight: eDollarsInFlight
  };


  const pRequestedTime = periodCheck(dur);
  const pSCByRequestedTime = severeCalc(dur);
  const pHBedsByRequestedTime = Math.trunc((beds * 0.35) - severeCalc(dur));
  const pC4ICUByRequestedTime = Math.trunc(severeCalc(dur) * 0.05);
  const pC4VentilatorsByRequestedTime = Math.trunc(severeCalc(dur) * 0.02);
  const pDollarsInFlight = Math.trunc(((severeCalc(dur) * percentIncome * avgInc)) / timeEst(dur));
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
