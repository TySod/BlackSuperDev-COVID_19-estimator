
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('public/serviceWorker.js')
      .then((res) => `service worker registered ${res}`)
      .catch((err) => err);
  });
}
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

  const centInc = data.region.avgDailyIncomePopulation;
  const avgInc = data.region.avgDailyIncomeInUSD;
  const dur = data.periodType;
  const eInfected = data.reportedCases * 10;
  const pInfected = data.reportedCases * 50;
  const beds = data.totalHospitalBeds;
  const elT = data.timeToElapse;

  const timeEst = (time, period) => {
    if (period === 'weeks') {
      return time * 7;
    } if (period === 'months') {
      return time * 30;
    }
    return time;
  };

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
  const eSCasesByRequestedTime = (0.15 * periodCheck(dur));
  const eHBedsByRequestedTime = Math.trunc((beds * 0.35) - (0.15 * periodCheck(dur)));
  const eC4ICUByRequestedTime = Math.trunc(periodCheck(dur) * 0.05);
  const eC4VentilatorsByRequestedTime = Math.trunc(periodCheck(dur) * 0.02);
  const eDollarsInFlight = Math.trunc((periodCheck(dur) * centInc * avgInc) / timeEst(elT, dur));
  const impact = {
    currentlyInfected: eInfected,
    infectionsByRequestedTime: eRequestedTime,
    severeCasesByRequestedTime: eSCasesByRequestedTime,
    hospitalBedsByRequestedTime: eHBedsByRequestedTime,
    casesForVentilatorsByRequestedTime: eC4VentilatorsByRequestedTime,
    casesForICUByRequestedTime: eC4ICUByRequestedTime,
    dollarsInFlight: eDollarsInFlight
  };


  const pRequestedTime = severeCalc(dur);
  const pSCByRequestedTime = 0.15 * severeCalc(dur);
  const pHBedsByRequestedTime = Math.trunc((beds * 0.35) - (severeCalc(dur) * 0.15));
  const pC4ICUByRequestedTime = Math.trunc(severeCalc(dur) * 0.05);
  const pC4VentilatorsByRequestedTime = Math.trunc(severeCalc(dur) * 0.02);
  const pDollarsInFlight = Math.trunc((severeCalc(dur) * centInc * avgInc) / timeEst(elT, dur));
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
};
export default covid19ImpactEstimator;
