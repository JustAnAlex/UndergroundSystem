class UndergroundSystem {
  journeys = [];

  _getKey(startStation, endStation) {
    return [startStation, endStation].sort().join('_');
  }

  _findJourney(id) {
    return this.journeys.find((journey) => journey.id === id && !journey.checkOutStation);
  };

  checkIn(id, startStation, checkInTime) {
    const journey = this._findJourney(id);

    if (journey) {
      journey.checkInStation = startStation;
      journey.checkInTime = checkInTime;
    } else {
      this.journeys.push({ id, checkInStation: startStation, checkInTime });
    }
  }
  
  checkOut(id, endStation, checkOutTime) {
    const journey = this._findJourney(id);

    if (!journey) return;

    journey.checkOutTime = checkOutTime;
    journey.checkOutStation = endStation;
  }
  
  getAverageTime(startStation, endStation) {
    const matchingJourneys = this.journeys.filter((journey) => 
      this._getKey(startStation, endStation) === this._getKey(journey.checkInStation, journey.checkOutStation)
    );

    if (!matchingJourneys.length) return 0;

    const totalDuration = matchingJourneys.reduce((acc, journey) => 
      acc + journey.checkOutTime - journey.checkInTime, 0);

    return totalDuration / matchingJourneys.length;
  }
}

const undergroundSystem = new UndergroundSystem();
undergroundSystem.checkIn(1, 'Leyton', 11);
undergroundSystem.checkIn(1, 'Leyton', 10);
undergroundSystem.checkOut(1, 'Waterloo', 20); // 10

undergroundSystem.checkIn(1, 'Waterloo', 23);
undergroundSystem.checkOut(1, 'Leyton', 26); // 3

undergroundSystem.checkIn(2, 'Leyton', 25);
undergroundSystem.checkOut(2, 'Waterloo', 30); //5 
// 18 /3 = 6

undergroundSystem.checkIn(1, 'Leyton', 15);
undergroundSystem.checkOut(1, 'Kaspiy', 22); // 7

console.log(undergroundSystem.getAverageTime('Leyton', 'Waterloo') ); // 6
console.log(undergroundSystem.getAverageTime('Waterloo', 'Leyton') );// 6


